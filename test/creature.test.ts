import Creature from "../src/models/creature";
import Vector from "../src/models/vector";

describe("Creature", () => {
  it("should create a Creature instance with the given position", () => {
    const initialPosition = new Vector(1, 2);
    const creature = new Creature(initialPosition);
    expect(creature.position).toBe(initialPosition);
  });

  it("should pursue another creature with correct displacement", () => {
    const creature = new Creature(new Vector(1, 1));
    const otherCreature = new Creature(new Vector(5, 4));

    const stepSize = 0.5;

    creature.pursue(otherCreature, stepSize);

    expect(creature.position.x).toBeCloseTo(1.4);
    expect(creature.position.y).toBeCloseTo(1.3);
  });

  it("should not move if the distance to the other creature is less than the distance threshold", () => {
    const creature = new Creature(new Vector(0, 0));
    const otherCreature = new Creature(new Vector(0, 9.9));

    const distanceThreshold = 10;
    const stepSize = 0.1;

    creature.pursue(otherCreature, stepSize, distanceThreshold);

    expect(creature.position.x).toEqual(0);
    expect(creature.position.y).toEqual(0);
  });
});
