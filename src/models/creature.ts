import Vector from "./vector";

export default class Creature {
  constructor(private _position: Vector) {}

  public get position(): Vector {
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
