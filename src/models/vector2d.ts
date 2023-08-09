export default class Vector2D {
  constructor(private _x: number, private _y: number) {}

  public get coordinates(): [number, number] {
    return [this._x, this._y];
  }

  public minus(otherVector: Vector2D): Vector2D {
    return new Vector2D(this._x - otherVector._x, this._y - otherVector._y);
  }

  public plus(otherVector: Vector2D): Vector2D {
    return new Vector2D(this._x + otherVector._x, this._y + otherVector._y);
  }

  public times(scalar: number): Vector2D {
    return new Vector2D(this._x * scalar, this._y * scalar);
  }

  public magnitudeSquared(): number {
    return this._x * this._x + this._y * this._y;
  }

  public unit(): Vector2D {
    const magnitude = Math.sqrt(this.magnitudeSquared());
    return new Vector2D(this._x / magnitude, this._y / magnitude);
  }
}
