import Vector2D from "../src/models/vector2d";

describe("Vector2D", () => {
  const epsilon = 1e-6;

  it("should create a Vector2D instance", () => {
    const vector = new Vector2D(3, 4);
    expect(vector.coordinates).toEqual([3, 4]);
  });

  it("should calculate the correct magnitude squared", () => {
    const vector = new Vector2D(3, 4);
    expect(vector.magnitudeSquared()).toBeCloseTo(25, epsilon);
  });

  it("should calculate the correct unit vector", () => {
    const vector = new Vector2D(3, 4);
    const unitVector = vector.unit();
    expect(unitVector.coordinates).toEqual([0.6, 0.8]);
  });

  it("should calculate the correct sum of two vectors", () => {
    const vector1 = new Vector2D(3, 4);
    const vector2 = new Vector2D(1, 2);
    const sumVector = vector1.plus(vector2);
    expect(sumVector.coordinates).toEqual([4, 6]);
  });

  it("should calculate the correct difference between two vectors", () => {
    const vector1 = new Vector2D(3, 4);
    const vector2 = new Vector2D(1, 2);
    const diffVector = vector1.minus(vector2);
    expect(diffVector.coordinates).toEqual([2, 2]);
  });

  it("should calculate the correct product of vector and scalar", () => {
    const vector = new Vector2D(3, 4);
    const scalar = 2;
    const productVector = vector.times(scalar);
    expect(productVector.coordinates).toEqual([6, 8]);
  });
});
