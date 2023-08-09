import ChaseRelation from "./chaseRelation";
import Creature from "./creature";

export default class World {
  constructor(
    private _creatures: Creature[] = [],
    private chaseRelations: ChaseRelation[] = []
  ) {}

  step(): void {
    for (let chaseRelation of this.chaseRelations) {
      const stepSize = 1; // TODO: Make this configurable
      chaseRelation.chaser.pursue(chaseRelation.chased, stepSize);
    }
  }

  public get creatures(): Creature[] {
    return this._creatures;
  }

  public get minXCoord(): number {
    return Math.min(...this._creatures.map((creature) => creature.position.x));
  }

  public get maxXCoord(): number {
    return Math.max(...this._creatures.map((creature) => creature.position.x));
  }

  public get minYCoord(): number {
    return Math.min(...this._creatures.map((creature) => creature.position.y));
  }

  public get maxYCoord(): number {
    return Math.max(...this._creatures.map((creature) => creature.position.y));
  }

  public get width(): number {
    return this.maxXCoord - this.minXCoord;
  }

  public get height(): number {
    return this.maxYCoord - this.minYCoord;
  }
}
