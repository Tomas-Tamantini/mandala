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
}
