export default class Vector {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly z: number = 0
  ) {}

  public get coordinates(): [number, number, number] {
    return [this.x, this.y, this.z];
  }

  public minus(otherVector: Vector): Vector {
    return new Vector(
      this.x - otherVector.x,
      this.y - otherVector.y,
      this.z - otherVector.z
    );
  }

  public plus(otherVector: Vector): Vector {
    return new Vector(
      this.x + otherVector.x,
      this.y + otherVector.y,
      this.z + otherVector.z
    );
  }

  public times(scalar: number): Vector {
    return new Vector(this.x * scalar, this.y * scalar, this.z * scalar);
  }

  public magnitudeSquared(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  public unit(): Vector {
    const magnitude = Math.sqrt(this.magnitudeSquared());
    return new Vector(
      this.x / magnitude,
      this.y / magnitude,
      this.z / magnitude
    );
  }
}
