import Creature from "../src/models/creature";
import Vector2D from "../src/models/vector2d";

describe("Creature", () => {
  it("should create a Creature instance with the given position", () => {
    const initialPosition = new Vector2D(1, 2);
    const creature = new Creature(initialPosition);
    expect(creature.position).toBe(initialPosition);
  });

  it("should pursue another creature with correct displacement", () => {
    const creature = new Creature(new Vector2D(1, 1));
    const otherCreature = new Creature(new Vector2D(5, 4));
    const timeInterval = 0.1;
    const velocity = 10;

    creature.pursue(otherCreature, timeInterval, velocity);

    expect(creature.position.coordinates[0]).toBeCloseTo(1.8);
    expect(creature.position.coordinates[1]).toBeCloseTo(1.6);
  });

  it("should not move if the distance to the other creature is less than 1", () => {
    const initialPosition = new Vector2D(1, 1);
    const otherCreaturePosition = new Vector2D(1.5, 1.5);
    const creature = new Creature(initialPosition);
    const otherCreature = new Creature(otherCreaturePosition);

    const timeInterval = 0.1;
    const velocity = 10;

    creature.pursue(otherCreature, timeInterval, velocity);

    expect(creature.position.coordinates).toEqual(initialPosition.coordinates);
  });
});
