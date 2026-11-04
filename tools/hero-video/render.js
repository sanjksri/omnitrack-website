const { chromium } = require('playwright');
const fs = require('fs');
const dir = __dirname;
const n = +(process.argv[2] || 192), fps = 24;
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 1080 } });
  await p.goto('file://' + dir + '/road.html');
  fs.mkdirSync(dir + '/frames', { recursive: true });
  for (let i = 0; i < n; i++) {
    const data = await p.evaluate((t) => { draw(t); return document.getElementById('c').toDataURL('image/png').split(',')[1]; }, i / fps);
    fs.writeFileSync(`${dir}/frames/f${String(i).padStart(4, '0')}.png`, Buffer.from(data, 'base64'));
  }
  await b.close();
})();
