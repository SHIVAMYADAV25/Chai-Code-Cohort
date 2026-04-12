import { colors } from "../core/colors.js";

export default function shadowPlugin(cls) {

  // Pattern: chai-shadow-0px-4px-10px-gray
  const match = cls.match(/^chai-shadow-(.+)$/);

  if (!match) return;

  const value = match[1];

  // Split parts → ["0px", "4px", "10px", "gray"]
  const parts = value.split("-");

  if (parts.length < 4) return;

  const [x, y, blur, colorName] = parts;

  let color = colorName;

  // If color exists in palette, use shade 500
  if (colors[colorName]) {
    if (typeof colors[colorName] === "object") {
      color = colors[colorName][500];
    } else {
      color = colors[colorName];
    }
  }

  return `.${cls} { box-shadow: ${x} ${y} ${blur} ${color}; }\n`;
}