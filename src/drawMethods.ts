import { Camera } from "./models/camera";
import ColorSchema from "./models/colorSchema";
import Vector from "./models/vector";
import World from "./models/world";

const twoPi = 2 * Math.PI;

export default function draw(
  ctx: CanvasRenderingContext2D,
  world: World,
  camera: Camera,
  canvasWidth: number,
  canvasHeight: number,
  colorSchema: ColorSchema
) {
  ctx.fillStyle = colorSchema.background;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  for (let creature of world.creatures) {
    const canvasPosition = camera.convertToCanvasCoordinates(creature.position);
    drawCircle(ctx, canvasPosition, colorSchema.stroke, colorSchema.fill);
  }
}

function drawCircle(
  ctx: CanvasRenderingContext2D,
  centerCoords: Vector,
  strokeColor: string,
  fillColor: string
) {
  ctx.beginPath();
  ctx.arc(centerCoords.x, centerCoords.y, 0.75, 0, twoPi);
  ctx.strokeStyle = strokeColor;
  ctx.stroke();
  ctx.fillStyle = fillColor;
  ctx.fill();
  ctx.closePath();
}
