import { Camera } from "./models/camera";
import Vector2D from "./models/vector2d";
import World from "./models/world";

const twoPi = 2 * Math.PI;

export default function draw(
  ctx: CanvasRenderingContext2D,
  world: World,
  camera: Camera,
  canvasWidth: number,
  canvasHeight: number
) {
  ctx.fillStyle = "#59EFE502";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  for (let creature of world.creatures) {
    const canvasPosition = camera.convertToCanvasCoordinates(creature.position);
    drawCircle(ctx, canvasPosition, "#275579", "#443838");
  }
}

function drawCircle(
  ctx: CanvasRenderingContext2D,
  centerCoords: Vector2D,
  strokeColor: string,
  fillColor: string
) {
  ctx.beginPath();
  ctx.arc(centerCoords.x, centerCoords.y, 1, 0, twoPi);
  ctx.strokeStyle = strokeColor;
  ctx.stroke();
  ctx.fillStyle = fillColor;
  ctx.fill();
  ctx.closePath();
}
