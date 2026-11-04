# Hero highway video

`assets/hero-highway.{mp4,webm}` and `assets/hero-highway-poster.jpg` are rendered from `road.html` (a canvas scene, 8 s seamless loop at 24 fps, 1200×1080).

To re-render after editing the scene:

```bash
node render.js 192
ffmpeg -framerate 24 -i frames/f%04d.png -c:v libx264 -preset slow -crf 23 -tune animation -pix_fmt yuv420p -movflags +faststart -an ../../assets/hero-highway.mp4
ffmpeg -framerate 24 -i frames/f%04d.png -c:v libvpx-vp9 -crf 32 -b:v 0 -row-mt 1 -pix_fmt yuv420p -an ../../assets/hero-highway.webm
ffmpeg -i frames/f0000.png -q:v 4 ../../assets/hero-highway-poster.jpg
```

To use real footage instead, replace the three files in `assets/` with the same names; the page needs no other change.
