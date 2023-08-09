import draw from "./drawMethods";
import { cameraForWorld } from "./models/camera";

import mandalaWorld from "./samples/mandalaWorld";

const canvas = document.getElementById("animation-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

let world = mandalaWorld(30, 7, 2);
const camera = cameraForWorld(canvas.width, canvas.height, world);

function animate() {
  draw(ctx, world, camera, canvas.width, canvas.height);
  requestAnimationFrame(animate);
}

animate();
