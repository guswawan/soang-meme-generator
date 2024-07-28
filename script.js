const canvas = document.querySelector('#meme');
const topTextInput = document.querySelector('#topTextInput');
const bottomTextInput = document.querySelector('#bottomTextInput');
const memeImage = document.querySelector('#meme-image');
const downloadButton = document.querySelector('#downloadButton');
let image = new Image();

image.src = memeImage.src;
image.addEventListener('load', () => {
  updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
  updateMemeImage(canvas, memeImage);
});

topTextInput.addEventListener('input', () => {
  updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
  updateMemeImage(canvas, memeImage);
  checkInput();
});

bottomTextInput.addEventListener('input', () => {
  updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
  updateMemeImage(canvas, memeImage);
  checkInput();
});

downloadButton.addEventListener('click', () => {
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = 'meme.png';
  link.click();
});

// function updateMemeCanvas(canvas, image, topText, bottomText) {
//   const ctx = canvas.getContext('2d');
//   const width = image.width;
//   // const width = '100%';
//   const height = image.height;
//   const fontSize = Math.floor(width / 18);
//   const yOffset = height / 12;
//   const xOffset = width / 2;

//   // Update canvas background
//   canvas.width = width;
//   canvas.height = height;
//   ctx.drawImage(image, 0, 0);

//   // Prepare text
//   // ctx.strokeStyle = 'black';
//   ctx.lineWidth = Math.floor(fontSize / 8);
//   ctx.fillStyle = 'black';
//   ctx.textAlign = 'center';
//   ctx.lineJoin = 'round';
//   ctx.font = `${fontSize}px sans-serif`;

//   // Add top text
//   ctx.textBaseline = 'top';
//   // ctx.strokeText(topText, width / 2, yOffset);
//   ctx.fillText(topText, width / 3, yOffset, xOffset);
//   // Add bottom text
//   ctx.textBaseline = 'bottom';
//   // ctx.strokeText(bottomText, width / 2, height - yOffset);
//   ctx.fillText(bottomText, width / 2, height - yOffset);
// }
function checkInput() {
  if (topTextInput.value.trim() !== '' && bottomTextInput.value.trim() !== '') {
    downloadButton.disabled = false;
    downloadButton.classList.remove('disabled-button');
  } else {
    downloadButton.disabled = true;
    downloadButton.classList.add('disabled-button');
  }
}

function updateMemeCanvas(canvas, image, topText, bottomText) {
  const ctx = canvas.getContext('2d');
  const width = image.width;
  const height = image.height;
  const fontSize = Math.floor(width / 18);
  const yOffset = height / 12;
  const xOffset = width / 2;

  // Update canvas background
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);

  // Prepare text
  ctx.lineWidth = Math.floor(fontSize / 8);
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.lineJoin = 'round';
  ctx.font = `${fontSize}px sans-serif`;

  // Add top text
  ctx.textBaseline = 'top';
  wrapText(ctx, topText, width / 4, yOffset, width / 2.2, fontSize);

  // Add bottom text
  ctx.textBaseline = 'bottom';
  wrapText(ctx, bottomText, width / 1.6, height / 1.6, width / 2, fontSize);
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  const lines = [];

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      lines.push(line);
      line = words[n] + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  for (let k = 0; k < lines.length; k++) {
    ctx.fillText(lines[k], x, y + k * lineHeight);
  }
}

function updateMemeImage(canvas, memeImage) {
  const dataUrl = canvas.toDataURL('image/png');
  memeImage.src = dataUrl;
}
