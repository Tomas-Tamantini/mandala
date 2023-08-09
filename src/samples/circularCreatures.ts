import Creature from "../models/creature";
import Vector2D from "../models/vector2d";

export default function circularCreatures(
  numCreatures: number,
  radius: number = 200,
  center: Vector2D = new Vector2D(0, 0)
): Creature[] {
  const creatures: Creature[] = [];
  const angleStep = (2 * Math.PI) / numCreatures;
  for (let i = 0; i < numCreatures; i++) {
    const angle = i * angleStep;
    const x = center.x + radius * Math.cos(angle);
    const y = center.y + radius * Math.sin(angle);
    creatures.push(new Creature(new Vector2D(x, y)));
  }
  return creatures;
}
