import { GoogleAuth } from 'google-auth-library';
import { createWriteStream } from 'node:fs';
import { mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const generated = path.join(root, 'src/data/drive-media.generated.json');
const output = path.join(root, 'public/drive-media');
const staging = path.join(root, 'public/.drive-media-staging');
const folder = process.env.GOOGLE_DRIVE_MEDIA_FOLDER_ID;

async function sync() {
  if (!folder) {
    if (process.argv.includes('--optional')) {
      console.log('Drive sync not configured; using existing media or placeholders.');
      return;
    }
    throw new Error('Set GOOGLE_DRIVE_MEDIA_FOLDER_ID to your dedicated media folder ID.');
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(folder)) throw new Error('Invalid Drive folder ID.');
  const config = JSON.parse(await readFile(path.join(root, 'drive-media.config.json'), 'utf8'));
  const credentials = process.env.GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON;
  const auth = new GoogleAuth({
    ...(credentials ? { credentials: JSON.parse(credentials) } : {}),
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });
  const token = await auth.getAccessToken();
  if (!token) throw new Error('No Google credentials available. See docs/google-drive-media.md.');
  async function request(url) {
    for (let attempt = 0; attempt < 4; attempt++) {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
        signal: AbortSignal.timeout(300000),
      });
      if (response.ok) return response;
      if ((response.status === 429 || response.status >= 500) && attempt < 3) {
        await response.body?.cancel();
        await new Promise(resolve => setTimeout(resolve, 1000 * 2 ** attempt));
        continue;
      }
      await response.body?.cancel();
      throw new Error(`Drive API returned HTTP ${response.status}; check access, API enablement and quota.`);
    }
  }
  const files = [];
  let pageToken;
  do {
    const url = new URL('https://www.googleapis.com/drive/v3/files');
    url.search = new URLSearchParams({
      q: `'${folder}' in parents and trashed = false`,
      fields: 'nextPageToken,files(id,name,mimeType,size,md5Checksum)',
      pageSize: '1000', supportsAllDrives: 'true', includeItemsFromAllDrives: 'true',
      ...(pageToken ? { pageToken } : {}),
    });
    const page = await (await request(url)).json();
    files.push(...page.files);
    pageToken = page.nextPageToken;
  } while (pageToken);

  const allowed = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif', '.mp4': 'video/mp4', '.webm': 'video/webm' };
  const manifest = {};
  await rm(staging, { recursive: true, force: true });
  await mkdir(staging, { recursive: true });
  try {
    for (const [slot, name] of Object.entries(config)) {
      const ext = path.extname(name).toLowerCase();
      if (path.basename(name) !== name || !allowed[ext]) throw new Error(`Unsupported media filename for ${slot}.`);
      const matches = files.filter(file => file.name === name);
      if (matches.length > 1) throw new Error(`Duplicate Drive filename: ${name}. Keep one copy in the folder.`);
      if (!matches.length) { console.log(`No ${name}; retaining the site's default for ${slot}.`); continue; }
      const file = matches[0];
      if (file.mimeType !== allowed[ext]) throw new Error(`Unexpected file type for ${name}.`);
      // Content-addressed public URLs prevent stale browser/CDN copies after replacing a file.
      if (!/^[a-f0-9]{32}$/.test(file.md5Checksum || '')) throw new Error(`Missing checksum for ${name}.`);
      const filename = `${file.md5Checksum}${ext}`;
      const response = await request(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(file.id)}?alt=media&supportsAllDrives=true`);
      await pipeline(Readable.fromWeb(response.body), createWriteStream(path.join(staging, filename)));
      manifest[slot] = `/drive-media/${filename}`;
      console.log(`Synced ${name}`);
    }
    if (!Object.keys(manifest).length) throw new Error('No configured media found. Check the folder, sharing and filenames.');
    // Publish only after every selected download succeeds; a failed sync stops the build.
    await rm(output, { recursive: true, force: true });
    await rename(staging, output);
    await writeFile(generated, JSON.stringify(manifest, null, 2) + '\n');
    console.log(`Drive media ready: ${Object.keys(manifest).length} placements.`);
  } finally {
    await rm(staging, { recursive: true, force: true });
  }
}

sync().catch(() => {
  // Credential/library exceptions may contain private key material. Never print raw errors.
  console.error('Drive media sync failed. Check credentials, API access, folder ID, duplicate names and media types. Build stopped. See docs/google-drive-media.md.');
  process.exitCode = 1;
});
