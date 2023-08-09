import World from "../src/models/world";
import Creature from "../src/models/creature";
import Vector2D from "../src/models/vector2d";

jest.mock("../src/models/creature", () => {
  return {
    __esModule: true,
    default: class MockCreature {
      pursue = jest.fn();
    },
  };
});

describe("World", () => {
  it("should make creatures chase their target", () => {
    const MockedCreature = require("../src/models/creature").default;
    const chaserCreatureMock = new MockedCreature();
    const chasedCreatureMock = new MockedCreature();

    const chaseRelation = {
      chaser: chaserCreatureMock,
      chased: chasedCreatureMock,
    };

    const world = new World([], [chaseRelation]);

    const stepSize = 1;

    world.step();

    expect(chaserCreatureMock.pursue).toHaveBeenCalledWith(
      chasedCreatureMock,
      stepSize
    );

    expect(chasedCreatureMock.pursue).not.toHaveBeenCalled();
  });
});
