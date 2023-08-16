import Vector from "./vector";
import World from "./world";

export class Camera {
  constructor(private scaleFactor: number, private translationOffset: Vector) {}

  public convertToCanvasCoordinates(worldCoordinates: Vector): Vector {
    return worldCoordinates
      .times(this.scaleFactor)
      .plus(this.translationOffset);
  }
}

export function cameraForWorld(
  canvasWidth: number,
  canvasHeight: number,
  world: World,
  paddingFactor: number = 0.05
): Camera {
  const scaleFactor = Math.min(
    (canvasWidth * (1 - 2 * paddingFactor)) / (world.width + 1e-6),
    (canvasHeight * (1 - 2 * paddingFactor)) / (world.height + 1e-6)
  );
  const xOffset =
    canvasWidth / 2 - scaleFactor * (world.minXCoord + world.width / 2);

  const yOffset =
    canvasHeight / 2 - scaleFactor * (world.minYCoord + world.height / 2);

  const offset = new Vector(xOffset, yOffset);

  return new Camera(scaleFactor, offset);
}
