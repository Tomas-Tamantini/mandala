import ColorSchema from "./colorSchema";

export default class RandomColorGenerator {
  public get currentColor(): ColorSchema {
    return {
      stroke: "#275579",
      fill: "#443838",
      background: "#59EFE502",
    };
  }
}
