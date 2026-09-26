import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, copyFile, rm } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
const exec = promisify(execFile);

test('Drive sync contract', async t => {
  for (const mode of ['success', 'duplicate', 'denied', 'empty', 'unconfigured']) {
    await t.test(mode, async () => {
      const dir = await mkdtemp(new URL('../.drive-test-', import.meta.url));
      try {
        await mkdir(`${dir}/scripts`);
        await mkdir(`${dir}/src/data`, { recursive: true });
        await copyFile(new URL('../scripts/sync-drive-media.js', import.meta.url), `${dir}/scripts/sync-drive-media.js`);
        await writeFile(`${dir}/drive-media.config.json`, JSON.stringify({ 'hero.media.posterImage': 'hero.jpg' }));
        await writeFile(`${dir}/mock.mjs`, `
          import { GoogleAuth } from 'google-auth-library';
          GoogleAuth.prototype.getAccessToken = async () => 'test-token';
          const file = {id:'id',name:'hero.jpg',mimeType:'image/jpeg',md5Checksum:'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'};
          globalThis.fetch = async url => {
            url = new URL(url);
            if (process.env.TEST_MODE === 'denied') return new Response('', {status:403});
            if (url.searchParams.get('alt') === 'media') return new Response('image bytes');
            if (process.env.TEST_MODE === 'empty') return Response.json({files:[]});
            if (process.env.TEST_MODE === 'duplicate') return Response.json({files:[file,file]});
            return Response.json(url.searchParams.has('pageToken') ? {files:[file]} : {files:[],nextPageToken:'page2'});
          };
        `);
        const env = { ...process.env, TEST_MODE: mode, GOOGLE_DRIVE_MEDIA_FOLDER_ID: mode === 'unconfigured' ? '' : 'folder', GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON: '' };
        const run = () => exec(process.execPath, ['--import', `${dir}/mock.mjs`, `${dir}/scripts/sync-drive-media.js`], { env });
        if (mode === 'success') {
          await run();
          const manifest = JSON.parse(await readFile(`${dir}/src/data/drive-media.generated.json`));
          assert.equal(manifest['hero.media.posterImage'], '/drive-media/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.jpg');
          assert.equal(await readFile(`${dir}/public/drive-media/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.jpg`, 'utf8'), 'image bytes');
        } else {
          await assert.rejects(run);
          await assert.rejects(readFile(`${dir}/src/data/drive-media.generated.json`));
        }
      } finally { await rm(dir, { recursive:true, force:true }); }
    });
  }
});
