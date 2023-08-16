import ColorSchema from "./colorSchema";
import Vector from "./vector";

export default class RandomColorGenerator {
  private color: Vector;
  private colorVelocity: Vector;

  constructor() {
    this.color = RandomColorGenerator.randomColor();
    this.colorVelocity = RandomColorGenerator.randomUnitVector();
  }

  private static randomColor(): Vector {
    const r = Math.random() * 255;
    const g = Math.random() * 255;
    const b = Math.random() * 255;
    return new Vector(r, g, b);
  }

  private static randomUnitVector(): Vector {
    let v = new Vector(0, 0, 0);
    while (v.magnitudeSquared() < 1e-6) {
      const vr = Math.random() - 0.5;
      const vg = Math.random() - 0.5;
      const vb = Math.random() - 0.5;
      v = new Vector(vr, vg, vb);
    }
    return v.unit();
  }

  private static colorToHex(color: Vector): string {
    const [r, g, b] = color.coordinates.map(Math.floor);
    return `rgb(${r}, ${g}, ${b})`;
  }

  private static darkerColor(color: Vector): Vector {
    return color.times(0.8);
  }

  public step(dt: number = 1): void {
    const newColor = this.color.plus(this.colorVelocity.times(dt));
    let newColorCoords = newColor.coordinates;
    for (let i = 0; i < 3; i++) {
      let colorCoord = newColorCoords[i];
      if (colorCoord < 0) {
        newColorCoords[i] = 0;
        this.colorVelocity = this.colorVelocity.reflect(i);
      } else if (colorCoord > 255) {
        newColorCoords[i] = 255;
        this.colorVelocity = this.colorVelocity.reflect(i);
      }
    }
    this.color = new Vector(...newColorCoords);
  }

  public get currentColor(): ColorSchema {
    return {
      stroke: RandomColorGenerator.colorToHex(
        RandomColorGenerator.darkerColor(this.color)
      ),
      fill: RandomColorGenerator.colorToHex(this.color),
      background: "#FFFFFF02",
    };
  }
}
