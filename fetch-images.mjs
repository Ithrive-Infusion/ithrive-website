// Copies the logo and photos from the original iThrive WordPress site into public/images,
// resized and compressed so pages load fast. Runs automatically on every Netlify build.
// To use a new photo, add a line below (name on the left, WordPress upload path on the right),
// or drop your own file into public/images with the same name.
import fs from 'node:fs';
import sharp from 'sharp';

const base = 'https://ithriveinfusion.com/wp-content/uploads/';
const files = {
  // brand + people
  'logo.png': '2022/11/Logo.png',
  'ruth.jpg': '2023/01/ruth-image.jpg',
  'laiven.jpg': '2023/07/WhatsApp-Image-2023-07-05-at-17.35.12.jpg',
  // page photos
  'hero.jpg': '2022/11/about-us.jpg',
  'iv-bag.jpg': '2022/11/item-3.jpg',
  'weight-loss.jpg': '2025/06/pexels-totalshape-2377045.jpg',
  'energy.jpg': '2025/06/4.png',
  'nurse.jpg': '2022/11/Downloader.la-63787ce52a3e3.jpg',
  // IV drips
  'drip-iempower.jpg': '2022/11/item-2.jpg',
  'drip-iprotect.jpg': '2025/06/1-1.png',
  'drip-ialleviate.jpg': '2022/11/item-8.jpg',
  'drip-irecover.jpg': '2025/06/ways-to-prevent-a-hangover.jpg',
  'drip-iglow.jpg': '2023/03/2683dbc2-fe0f-48a5-8ddc-6172ba96f14f.jpg',
  'drip-itrim.jpg': '2022/11/item-11.jpg',
  'drip-icleanse.jpg': '2022/11/item-14.jpg',
  'drip-iforeveryoung.jpg': '2023/07/pexels-limelight-teamwear-16885651.jpg',
  'drip-ithrive.jpg': '2023/03/635a7b58-98e6-40cd-8e87-b2cd5a68927c.jpg',
  'drip-ibrighten.jpg': '2025/06/3.png',
  'drip-ibrighten-plus.jpg': '2025/06/2-1.png',
  // weight loss options
  'wl-semaglutide.jpg': '2023/07/pexels-limelight-teamwear-16885651.jpg',
  'wl-tirzepatide.jpg': '2023/11/qtq80-pAmji4.jpeg',
  'wl-oral.jpg': '2023/07/pexels-supplements-on-demand-13779112.jpg',
};

fs.mkdirSync('public/images', { recursive: true });
for (const [name, path] of Object.entries(files)) {
  const out = `public/images/${name}`;
  if (fs.existsSync(out)) { console.log('skip', name); continue; }
  try {
    const res = await fetch(base + path);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (name.endsWith('.png')) {
      await sharp(buf).resize({ width: 360, withoutEnlargement: true }).png({ compressionLevel: 9 }).toFile(out);
    } else {
      await sharp(buf).flatten({ background: '#ffffff' }).resize({ width: 1200, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }).toFile(out);
    }
    console.log('saved', name);
  } catch (e) {
    console.warn('could not fetch', name, e.message);
  }
}
