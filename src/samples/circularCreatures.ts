import Creature from "../models/creature";
import Vector from "../models/vector";

export default function circularCreatures(
  numCreatures: number,
  radius: number = 200,
  center: Vector = new Vector(0, 0)
): Creature[] {
  const creatures: Creature[] = [];
  const angleStep = (2 * Math.PI) / numCreatures;
  for (let i = 0; i < numCreatures; i++) {
    const angle = i * angleStep;
    const x = center.x + radius * Math.cos(angle);
    const y = center.y + radius * Math.sin(angle);
    creatures.push(new Creature(new Vector(x, y)));
  }
  return creatures;
}
