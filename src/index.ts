import draw from "./drawMethods";
import { cameraForWorld } from "./models/camera";

import mandalaWorld from "./samples/mandalaWorld";

const canvas = document.getElementById("animation-canvas") as HTMLCanvasElement;
const framerateSlider = document.getElementById(
  "framerate-slider"
) as HTMLInputElement;

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
let frameRate = parseInt(framerateSlider.value);

framerateSlider.addEventListener("input", () => {
  frameRate = parseInt(framerateSlider.value);
});

let world = mandalaWorld(30, 7, 2);
const camera = cameraForWorld(canvas.width, canvas.height, world);

function animate() {
  draw(ctx, world, camera, canvas.width, canvas.height);
  const timeInterval = 1000 / frameRate;
  setTimeout(() => requestAnimationFrame(animate), timeInterval);
}

animate();
