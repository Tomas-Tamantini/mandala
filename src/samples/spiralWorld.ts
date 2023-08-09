import World from "../models/world";
import circularCreatures from "./circularCreatures";

export default function spiralWorld(
  numCreatures: number,
  chaseStep: number = 1
): World {
  const creatures = circularCreatures(numCreatures);
  const chaseRelations = [];
  for (let i = 0; i < numCreatures; i++) {
    const chaseRelation = {
      chaser: creatures[i],
      chased: creatures[(i + chaseStep) % numCreatures],
    };
    chaseRelations.push(chaseRelation);
  }
  return new World(creatures, chaseRelations);
}
