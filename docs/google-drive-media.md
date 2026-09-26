# Google Drive media setup

Drive is the source library. During a build, the site downloads selected files through Drive API v3 and publishes them alongside the website. Visitors never sign into Google. This works with static hosting; it does not stream files directly from Drive or update an already published site automatically.

## One-time setup

1. Create a dedicated folder in Google Drive, for example **Portfolio Website Media**. Only put material intended for public website use here.
2. In [Google Cloud Console](https://console.cloud.google.com/), select/create a project and enable **Google Drive API**.
3. Create a service account (IAM & Admin → Service Accounts). It needs no project-wide IAM role for this read-only Drive task. Create a JSON key and keep it private.
4. Share only the media folder with the service account's `client_email`, as **Viewer**. The folder does not need public sharing. Workspace policies may require your administrator to allow this.
5. In your hosting provider's **build environment variables**, set:
   - `GOOGLE_DRIVE_MEDIA_FOLDER_ID`: the ID after `/folders/` in the folder URL.
   - `GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON`: the complete JSON key, stored as a secret.
6. Use Node.js 22 or newer, install dev dependencies (`npm ci`), and build with `npm run build`. Publish `dist` as before. The variables must be available during the build, not just at runtime.

Do not use a `VITE_` prefix for credentials; that exposes values to browser code. Never put the key in GitHub, your public folder, or chat. A ChatGPT Google Drive connection does not authenticate this website's build.

For local work, set `GOOGLE_APPLICATION_CREDENTIALS` to the private JSON key's absolute path and set `GOOGLE_DRIVE_MEDIA_FOLDER_ID` in your shell. The Google auth library reads that key automatically. This script does not automatically load `.env` files.

## Upload and update

`drive-media.config.json` maps website placements to exact filenames in the folder. For example:

| Filename | Placement |
| --- | --- |
| `hero-poster.jpg` | Hero image |
| `hero-reel.mp4` | Hero reel player |
| `portrait.jpg` | About portrait |
| `studio-bts.jpg` | Studio capabilities photo |
| `i24news-poster.jpg` / `i24news-reel.mp4` | i24NEWS project |
| `jns-poster.jpg` / `jns-reel.mp4` | JNS project |
| `studio-wide.jpg`, `studio-bts.jpg`, `studio-rig.jpg`, `studio-control.jpg`, `studio-onair.jpg` | Studio case study |
| `episode-panel.jpg` / `episode-panel.mp4` | Panel episode |
| `episode-interview.jpg` / `episode-interview.mp4` | Interview episode |
| `episode-podcast.jpg` / `episode-podcast.mp4` | Podcast episode |
| `episode-field.jpg` / `episode-field.mp4` | Field report |

Upload files directly into the folder (subfolders are not scanned). Replace existing files or keep one copy per name: duplicate names stop the build. You can change configured filenames to use JPEG, PNG, WebP, AVIF, MP4 or WebM. Use image formats for image slots and video formats for video slots. Export browser-compatible videos, preferably H.264/AAC MP4 with fast-start enabled; raw camera footage is unsuitable.

Then rebuild/redeploy the website. For local preview, run `npm run media:sync` followed by `npm run dev`. Updated files receive content-based URLs to avoid stale browser caches. Downloads and generated mappings are excluded from Git, but included in the published build. Website hosting storage and bandwidth still apply: this approach does not eliminate the public media copies on your host. For a large video library, a dedicated video host/CDN may be more suitable.

Only matching filenames are downloaded. Missing files retain the original site's defaults (which currently include demo videos); replace all intended placeholders before launch. Zero matches, duplicate filenames, invalid media, authentication errors or failed downloads stop the build. With no folder environment variable, ordinary builds continue using existing local media/placeholders.

Removing a file from Drive removes its mapping on the next successful sync, but does not revoke copies in old deployments or caches. Publish only media you intend visitors to access.

## Verification

`npm test` exercises sync success, pagination, duplicate-name rejection, missing setup and API failure using a simulated Drive service. `npm run build` checks the production bundle. A real end-to-end connection requires your folder and Google Cloud credentials.

API references: [downloads](https://developers.google.com/workspace/drive/api/guides/manage-downloads), [usage limits](https://developers.google.com/workspace/drive/api/guides/limits).
