let cloudImages = [];
let dinoImages = [];

async function setup() {
  createCanvas(800, 500);

  // load cloud frames: cloud1.JPG, cloud2.JPG
  const cloudPromises = [];
  for (let i = 1; i <= 2; i++) {
    cloudPromises.push(loadImage("assets/cloud" + i + ".JPG"));
  }
  cloudImages = await Promise.all(cloudPromises);

  // load dino frames: partydino1.JPG to partydino3.JPG
  const dinoPromises = [];
  for (let i = 1; i <= 3; i++) {
    dinoPromises.push(loadImage("assets/partydino" + i + ".JPG"));
  }
  dinoImages = await Promise.all(dinoPromises);

  // remove white backgrounds
  eraseBackground(cloudImages, 30);
  eraseBackground(dinoImages, 30);
}

function draw() {
  background(255);

  // pick which frame to show (changes every 15 draws)
  let cloudIndex = floor(frameCount / 15) % cloudImages.length;
  let dinoIndex = 0;

  // ...unless the cloud is above it
  if (mouseX > 450 && mouseX < 750 && mouseY < 300) {
    dinoIndex = floor(frameCount / 15) % dinoImages.length;
  }

  image(dinoImages[dinoIndex], 400, 100, 400, 400);
  image(cloudImages[cloudIndex], mouseX - 150, mouseY - 50, 300, 300);
}

// IMAGE PROCESSING FUNCTIONS
// You shouldn't need to modify these helper functions:
function crop(images, x, y, width, height) {
  const croppedImages = [];

  for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
    croppedImages.push(images[imageIndex].get(x, y, width, height));
  }

  return croppedImages;
}

function eraseBackground(images, threshold = 10) {
  for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
    const currentImage = images[imageIndex];
    currentImage.loadPixels();

    for (let pixelIndex = 0; pixelIndex < currentImage.pixels.length; pixelIndex += 4) {
      let distanceFromWhite = 255 - currentImage.pixels[pixelIndex];
      distanceFromWhite += 255 - currentImage.pixels[pixelIndex + 1];
      distanceFromWhite += 255 - currentImage.pixels[pixelIndex + 2];

      if (distanceFromWhite < threshold) {
        currentImage.pixels[pixelIndex + 3] = 0;
      }
    }

    currentImage.updatePixels();
  }
  // this function uses the pixels array
  // we will cover this later in the semester - stay tuned :D
}
