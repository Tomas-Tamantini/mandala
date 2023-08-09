import Creature from "./creature";

interface ChaseRelation {
  readonly chaser: Creature;
  readonly chased: Creature;
}

export default ChaseRelation;
