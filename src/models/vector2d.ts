export default class Vector2D {
  constructor(public readonly x: number, public readonly y: number) {}

  public get coordinates(): [number, number] {
    return [this.x, this.y];
  }

  public minus(otherVector: Vector2D): Vector2D {
    return new Vector2D(this.x - otherVector.x, this.y - otherVector.y);
  }

  public plus(otherVector: Vector2D): Vector2D {
    return new Vector2D(this.x + otherVector.x, this.y + otherVector.y);
  }

  public times(scalar: number): Vector2D {
    return new Vector2D(this.x * scalar, this.y * scalar);
  }

  public magnitudeSquared(): number {
    return this.x * this.x + this.y * this.y;
  }

  public unit(): Vector2D {
    const magnitude = Math.sqrt(this.magnitudeSquared());
    return new Vector2D(this.x / magnitude, this.y / magnitude);
  }
}
