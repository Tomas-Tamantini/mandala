import World from "../models/world";
import circularCreatures from "./circularCreatures";

export function mandalaWorld(
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

export function randomMandalaWorld(): World {
  const symmetry = randInt(2, 30);
  let pointMultiplicity = -1;
  while (true) {
    pointMultiplicity = randInt(2, 50);
    let numPoints = pointMultiplicity * symmetry;
    if (10 <= numPoints && numPoints <= 200) break;
  }
  let chaseStepMultiplicity = -1;
  while (true) {
    chaseStepMultiplicity = randInt(1, pointMultiplicity - 1);
    if (isCoprime(chaseStepMultiplicity, pointMultiplicity)) break;
  }
  return mandalaWorld(symmetry, pointMultiplicity, chaseStepMultiplicity);
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isCoprime(a: number, b: number): boolean {
  return gcd(a, b) === 1;
}

function gcd(a: number, b: number): number {
  if (b > a) return gcd(b, a);
  if (b === 0) return a;
  return gcd(b, a % b);
}
