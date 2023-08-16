import { Camera, cameraForWorld } from "../src/models/camera";
import Vector2D from "../src/models/vector2d";

jest.mock("../src/models/world", () => {
  return {
    __esModule: true,
    default: class MockWorld {
      constructor(
        public width: number,
        public height: number,
        public minXCoord: number,
        public minYCoord: number
      ) {}

      public get center(): Vector2D {
        return new Vector2D(
          this.width / 2 + this.minXCoord,
          this.height / 2 + this.minYCoord
        );
      }

      public get minEdge(): Vector2D {
        return new Vector2D(this.minXCoord, this.minYCoord);
      }
    },
  };
});

describe("Camera", () => {
  it("should convert world coordinates to canvas coordinates correctly", () => {
    const scaleFactor = 2;
    const translationOffset = new Vector2D(10, 5);
    const camera = new Camera(scaleFactor, translationOffset);

    const worldCoordinates = new Vector2D(5, 7);

    const canvasCoordinates =
      camera.convertToCanvasCoordinates(worldCoordinates);

    expect(canvasCoordinates.x).toEqual(20);
    expect(canvasCoordinates.y).toEqual(19);
  });
});

describe("cameraForWorld", () => {
  const MockedWorld = require("../src/models/world").default;
  const world = new MockedWorld(200, 90, 30, -60);

  it("should place the center of the world in the center of the canvas", () => {
    const canvas = { width: 800, height: 600 };
    const camera = cameraForWorld(canvas.width, canvas.height, world);
    const convertedCoordinates = camera.convertToCanvasCoordinates(
      world.center
    );
    expect(convertedCoordinates.x).toBeCloseTo(canvas.width / 2);
    expect(convertedCoordinates.y).toBeCloseTo(canvas.height / 2);
  });

  it(
    "should place the minimum x coordinate of the world in the " +
      "leftmost part of the canvas, with padding, if height fits",
    () => {
      const canvas = { width: 800, height: 600 };
      const paddingFactor = 0.01;
      const camera = cameraForWorld(
        canvas.width,
        canvas.height,
        world,
        paddingFactor
      );

      const convertedCoordinates = camera.convertToCanvasCoordinates(
        world.minEdge
      );

      expect(convertedCoordinates.x).toBeCloseTo(canvas.width * paddingFactor);
    }
  );

  it(
    "should place the minimum y coordinate of the world in the " +
      "topmost part of the canvas, with padding, if width fits",
    () => {
      const canvas = { width: 800, height: 100 };
      const paddingFactor = 0.02;
      const camera = cameraForWorld(
        canvas.width,
        canvas.height,
        world,
        paddingFactor
      );
      const convertedCoordinates = camera.convertToCanvasCoordinates(
        world.minEdge
      );
      expect(convertedCoordinates.y).toBeCloseTo(canvas.height * paddingFactor);
    }
  );
});
