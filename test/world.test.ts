import ChaseRelation from "../src/models/chaseRelation";
import World from "../src/models/world";

jest.mock("../src/models/creature", () => {
  return {
    __esModule: true,
    default: class MockCreature {
      constructor(private x: number = 0, private y: number = 0) {}

      pursue = jest.fn();

      get position() {
        return { x: this.x, y: this.y };
      }
    },
  };
});

const MockedCreature = require("../src/models/creature").default;

function createChaseRelation(): ChaseRelation {
  const chaserCreatureMock = new MockedCreature();
  const chasedCreatureMock = new MockedCreature();

  const chaseRelation = {
    chaser: chaserCreatureMock,
    chased: chasedCreatureMock,
  };

  return chaseRelation;
}

describe("World", () => {
  it("should make creatures chase their target a single step", () => {
    const chaseRelation = createChaseRelation();

    const world = new World([], [chaseRelation]);

    const stepSize = 0.1;

    world.step();

    expect(chaseRelation.chaser.pursue).toHaveBeenCalledWith(
      chaseRelation.chased,
      stepSize
    );

    expect(chaseRelation.chased.pursue).not.toHaveBeenCalled();
  });

  it("should make creatures chase their target multiple steps", () => {
    const chaseRelation = createChaseRelation();
    const world = new World([], [chaseRelation]);
    const numSteps = 3;
    world.multiStep(numSteps);
    expect(chaseRelation.chaser.pursue).toHaveBeenCalledTimes(numSteps);
  });

  it("returns the list of its creatures", () => {
    const creatures = [new MockedCreature(), new MockedCreature()];
    const world = new World(creatures);
    expect(world.creatures).toBe(creatures);
  });

  it("returns the minimum and maximum x and y coordinates of its creatures", () => {
    const creatures = [
      new MockedCreature(123, 987),
      new MockedCreature(321, 789),
    ];
    const world = new World(creatures);
    expect(world.minXCoord).toBe(123);
    expect(world.maxXCoord).toBe(321);
    expect(world.minYCoord).toBe(789);
    expect(world.maxYCoord).toBe(987);
  });

  it("returns its width and height", () => {
    const creatures = [new MockedCreature(50, 20), new MockedCreature(10, 90)];
    const world = new World(creatures);
    expect(world.width).toBe(40);
    expect(world.height).toBe(70);
  });

  it("returns its width, height, mininum and maximum coordinates as 0 if it has no creatures", () => {
    const world = new World();
    expect(world.minXCoord).toBe(0);
    expect(world.maxXCoord).toBe(0);
    expect(world.minYCoord).toBe(0);
    expect(world.maxYCoord).toBe(0);
    expect(world.width).toBe(0);
    expect(world.height).toBe(0);
  });
});
