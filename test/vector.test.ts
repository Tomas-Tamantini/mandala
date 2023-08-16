import Vector from "../src/models/vector";

describe("Vector", () => {
  it("should create a Vector with zero as default z coordinate", () => {
    const vector = new Vector(3, 4);
    expect(vector.z).toEqual(0);
  });

  it("should calculate the correct magnitude squared", () => {
    const vector = new Vector(2, 10, 11);
    expect(vector.magnitudeSquared()).toBeCloseTo(225);
  });

  it("should calculate the correct unit vector", () => {
    const vector = new Vector(9, 12, 20);
    const unitVector = vector.unit();
    expect(unitVector.coordinates).toEqual([0.36, 0.48, 0.8]);
  });

  it("should calculate the correct sum of two vectors", () => {
    const vector1 = new Vector(3, 4);
    const vector2 = new Vector(1, 2, 7);
    const sumVector = vector1.plus(vector2);
    expect(sumVector.coordinates).toEqual([4, 6, 7]);
  });

  it("should calculate the correct difference between two vectors", () => {
    const vector1 = new Vector(3, 4);
    const vector2 = new Vector(1, 2, 11);
    const diffVector = vector1.minus(vector2);
    expect(diffVector.coordinates).toEqual([2, 2, -11]);
  });

  it("should calculate the correct product of vector and scalar", () => {
    const vector = new Vector(3, 4, 5);
    const scalar = 2;
    const productVector = vector.times(scalar);
    expect(productVector.coordinates).toEqual([6, 8, 10]);
  });
});
