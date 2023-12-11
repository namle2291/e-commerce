import { bgColors } from "./contants";

export function randomColor() {
  return bgColors[Math.floor(Math.random() * bgColors.length)];
}
