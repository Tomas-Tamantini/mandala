import Vector2D from "./vector2d";

export default class Creature {
  constructor(private _position: Vector2D) {}

  public get position(): Vector2D {
    return this._position;
  }

  public pursue(
    otherCreature: Creature,
    stepSize: number,
    distanceThreshold: number = 1
  ): void {
    const difference = otherCreature.position.minus(this.position);
    if (difference.magnitudeSquared() < distanceThreshold * distanceThreshold)
      return;
    const direction = difference.unit();
    const displacement = direction.times(stepSize);
    this._position = this.position.plus(displacement);
  }
}
