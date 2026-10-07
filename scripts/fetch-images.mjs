// Copies the photos and logo from the old WordPress site into public/images.
// Run once (npm run images) and commit the files, or let the deploy workflow run it.
import fs from 'node:fs';
const base = 'https://ithriveinfusion.com/wp-content/uploads/';
const files = {
  'logo.png': '2022/11/Logo-1536x1418.png',
  'ruth.jpg': '2023/01/ruth-image.jpg',
};
fs.mkdirSync('public/images', { recursive: true });
for (const [name, path] of Object.entries(files)) {
  const out = `public/images/${name}`;
  if (fs.existsSync(out)) { console.log('skip', name); continue; }
  try {
    const res = await fetch(base + path);
    if (!res.ok) throw new Error(res.status);
    fs.writeFileSync(out, Buffer.from(await res.arrayBuffer()));
    console.log('saved', name);
  } catch (e) { console.warn('could not fetch', name, e.message); }
}
