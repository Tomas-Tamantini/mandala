export default class Vector {
  constructor(public readonly x: number, public readonly y: number) {}

  public get coordinates(): [number, number] {
    return [this.x, this.y];
  }

  public minus(otherVector: Vector): Vector {
    return new Vector(this.x - otherVector.x, this.y - otherVector.y);
  }

  public plus(otherVector: Vector): Vector {
    return new Vector(this.x + otherVector.x, this.y + otherVector.y);
  }

  public times(scalar: number): Vector {
    return new Vector(this.x * scalar, this.y * scalar);
  }

  public magnitudeSquared(): number {
    return this.x * this.x + this.y * this.y;
  }

  public unit(): Vector {
    const magnitude = Math.sqrt(this.magnitudeSquared());
    return new Vector(this.x / magnitude, this.y / magnitude);
  }
}
