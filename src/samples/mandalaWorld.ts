import World from "../models/world";
import circularCreatures from "./circularCreatures";

export default function mandalaWorld(
  symmetry: number,
  pointMultiplicity: number,
  chaseStepMultiplicity: number = 1
): World {
  const numCreatures = symmetry * pointMultiplicity;
  const creatures = circularCreatures(numCreatures);
  const chaseStep = symmetry * chaseStepMultiplicity + 1;
  const chaseRelations = [];
  for (let i = 0; i < numCreatures; i++) {
    const chaseRelation = {
      chaser: creatures[i],
      chased: creatures[(i * chaseStep) % numCreatures],
    };
    chaseRelations.push(chaseRelation);
  }
  return new World(creatures, chaseRelations);
}
