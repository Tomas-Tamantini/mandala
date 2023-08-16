import ColorSchema from "./colorSchema";
import Vector from "./vector";

export default class RandomColorGenerator {
  private color: Vector;
  private colorVelocity: Vector;

  constructor() {
    this.color = new Vector(68, 112, 112);
    this.colorVelocity = new Vector(-3, -2, 4);
  }

  private static colorToHex(color: Vector): string {
    const [r, g, b] = color.coordinates.map(Math.floor);
    return `rgb(${r}, ${g}, ${b})`;
  }

  private static darkerColor(color: Vector): Vector {
    return color.times(0.8);
  }

  public step(dt: number = 0.4): void {
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
      background: "#59EFE502",
    };
  }
}
