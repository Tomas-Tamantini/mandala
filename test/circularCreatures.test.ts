import Vector from "../src/models/vector";
import circularCreatures from "../src/samples/circularCreatures";

describe("circularCreatures function", () => {
  it("should return the correct number of creatures", () => {
    const numCreatures = 5;
    const creatures = circularCreatures(numCreatures);
    expect(creatures).toHaveLength(numCreatures);
  });

  it("should place creatures in a circle with the given radius and center", () => {
    const numCreatures = 8;
    const radius = 100;
    const center = new Vector(50, 50);
    const creatures = circularCreatures(numCreatures, radius, center);

    creatures.forEach((creature) => {
      const dx = creature.position.x - center.x;
      const dy = creature.position.y - center.y;
      expect(dx * dx + dy * dy).toBeCloseTo(radius * radius);
    });
  });
});
