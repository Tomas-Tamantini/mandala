import draw from "./drawMethods";
import { cameraForWorld } from "./models/camera";

import { randomMandalaWorld } from "./samples/mandalaWorld";

const canvas = document.getElementById("animation-canvas") as HTMLCanvasElement;
const framerateSlider = document.getElementById(
  "framerate-slider"
) as HTMLInputElement;
const randomizeButton = document.getElementById(
  "random-mandala-btn"
) as HTMLButtonElement;

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
let frameRate = parseInt(framerateSlider.value);

randomizeButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  world = randomMandalaWorld();
});

framerateSlider.addEventListener("input", () => {
  frameRate = parseInt(framerateSlider.value);
});

let world = randomMandalaWorld();
const camera = cameraForWorld(canvas.width, canvas.height, world);

function animate() {
  draw(ctx, world, camera, canvas.width, canvas.height);
  const timeInterval = 1000 / frameRate;
  setTimeout(() => requestAnimationFrame(animate), timeInterval);
}

animate();
