// Generated during build. Credentials and Drive file IDs never enter the client bundle.
const manifests = import.meta.glob('./drive-media.generated.json', { eager: true, import: 'default' });

export function applyDriveMedia(data) {
  const manifest = manifests['./drive-media.generated.json'] || {};
  for (const [slot, url] of Object.entries(manifest)) {
    const parts = slot.split('.');
    let target = data;
    for (const part of parts.slice(0, -1)) {
      if (['__proto__', 'prototype', 'constructor'].includes(part)) throw new Error('Invalid media slot');
      target = target?.[part];
    }
    const key = parts.at(-1);
    if (!target || ['__proto__', 'prototype', 'constructor'].includes(key)) throw new Error(`Invalid media slot: ${slot}`);
    if (!/^\/drive-media\/[a-f0-9]{32}\.(jpg|jpeg|png|webp|avif|mp4|webm)$/.test(url)) throw new Error('Invalid media URL');
    target[key] = url;
  }
  return data;
}
