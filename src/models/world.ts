import ChaseRelation from "./chaseRelation";
import Creature from "./creature";

export default class World {
  isDead: boolean = false;

  constructor(
    private _creatures: Creature[] = [],
    private chaseRelations: ChaseRelation[] = []
  ) {}

  step(): void {
    let someCreatureMoved: boolean = false;
    for (let chaseRelation of this.chaseRelations) {
      const stepSize = 0.1;
      const positionBefore = chaseRelation.chaser.position;
      chaseRelation.chaser.pursue(chaseRelation.chased, stepSize);
      const positionAfter = chaseRelation.chaser.position;
      if (positionBefore !== positionAfter) someCreatureMoved = true;
    }
    if (!someCreatureMoved) this.isDead = true;
  }

  multiStep(numSteps: number): void {
    for (let i = 0; i < numSteps; i++) this.step();
  }

  public get creatures(): Creature[] {
    return this._creatures;
  }

  public get minXCoord(): number {
    if (this._creatures.length === 0) return 0;
    return Math.min(...this._creatures.map((creature) => creature.position.x));
  }

  public get maxXCoord(): number {
    if (this._creatures.length === 0) return 0;
    return Math.max(...this._creatures.map((creature) => creature.position.x));
  }

  public get minYCoord(): number {
    if (this._creatures.length === 0) return 0;
    return Math.min(...this._creatures.map((creature) => creature.position.y));
  }

  public get maxYCoord(): number {
    if (this._creatures.length === 0) return 0;
    return Math.max(...this._creatures.map((creature) => creature.position.y));
  }

  public get width(): number {
    return this.maxXCoord - this.minXCoord;
  }

  public get height(): number {
    return this.maxYCoord - this.minYCoord;
  }
}
