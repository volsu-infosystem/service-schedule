import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import imageminZopfli from 'imagemin-zopfli';
import imageminMozjpeg from 'imagemin-mozjpeg';

import util from 'util';
import fs from 'fs';
import path from 'path';
import makeDir from 'make-dir';

const writeFile = util.promisify(fs.writeFile);

export default function optimizeImages({
  images = './src/images',
  staticFolder = './static/img/',
} = {}) {
  return {
    name: 'imagemin-plugin',
    async generateBundle() {
      const imageMins = [];

      imageMins.push(
        imagemin([`${images}/**/*.png`], {
          plugins: [imageminWebp({ quality: 90 })],
        }).then(files =>
          files.forEach(async v => {
            let source = path.parse(v.sourcePath);
            v.destinationPath = `${source.dir.replace(images, staticFolder)}/${
              source.name
            }.webp`;
            await makeDir(path.dirname(v.destinationPath));
            await writeFile(v.destinationPath, v.data);
          }),
        ),
      );
      imageMins.push(
        imagemin([`${images}/**/*.{jpg,png}`], {
          plugins: [
            imageminZopfli({
              more: true,
            }),
            imageminPngquant({
              speed: 1,
              quality: [0.95, 1],
            }),
            imageminJpegtran({
              progressive: true,
            }),
            imageminMozjpeg({
              quality: 90,
            }),
          ],
        }).then(files =>
          files.forEach(async v => {
            let source = path.parse(v.sourcePath);
            v.destinationPath = `${source.dir.replace(images, staticFolder)}/${
              source.name
            }${source.ext}`;
            await makeDir(path.dirname(v.destinationPath));
            await writeFile(v.destinationPath, v.data);
          }),
        ),
      );

      await Promise.all(imageMins);
    },
  };
}
