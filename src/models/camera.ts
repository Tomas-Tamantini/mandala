import Vector2D from "./vector2d";
import World from "./world";

export class Camera {
  constructor(
    private scaleFactor: number,
    private translationOffset: Vector2D
  ) {}

  public convertToCanvasCoordinates(worldCoordinates: Vector2D): Vector2D {
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

  const offset = new Vector2D(xOffset, yOffset);

  return new Camera(scaleFactor, offset);
}
