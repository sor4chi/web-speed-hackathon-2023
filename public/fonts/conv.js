const fs = require('fs');

const subsetFont = require('subset-font');

(async () => {
  // Read the font file into a buffer:
  let mySfntFontBuffer = fs.readFileSync('./NotoSerifJP-Bold.otf');

  let subsetBuffer = await subsetFont(mySfntFontBuffer, 'ページが存在しません', {
    targetFormat: 'woff2',
  });

  // Write the subsetted font to a file:
  fs.writeFileSync('./NotoSerifJP-Bold.woff2', subsetBuffer);

  // Read the font file into a buffer:
  mySfntFontBuffer = fs.readFileSync('./NotoSerifJP-Regular.otf');

  subsetBuffer = await subsetFont(
    mySfntFontBuffer,
    'Not Found このサイトは架空のサイトであり、商品が発送されることはありません',
    {
      targetFormat: 'woff2',
    },
  );

  // Write the subsetted font to a file:
  fs.writeFileSync('./NotoSerifJP-Regular.woff2', subsetBuffer);
})();
