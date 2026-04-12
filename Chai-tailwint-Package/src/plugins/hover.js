import { colors } from "../core/colors.js";
import { hexToRgba } from "../core/utils.js";

export default function hoverPlugin(cls) {

  // Detect hover classes
  if (!cls.startsWith("chai-hover-")) return;

  // Remove prefix
  const baseClass = cls.replace("chai-hover-", "");

  let property, value;

  // ---------------------
  // BG COLOR
  // ---------------------
  let match = baseClass.match(/^bg-([a-z]+)-(\d+)(?:\/(\d+))?$/);

  if (match) {
    const [, color, shade, opacity] = match;

    property = "background-color";

    value = colors[color]?.[shade] || color;

    if (opacity) {
      value = hexToRgba(value, opacity / 100);
    }
  }

  // ---------------------
  // TEXT COLOR
  // ---------------------
  match = baseClass.match(/^text-([a-z]+)-(\d+)?$/);

  if (match) {
    const [, color, shade] = match;

    property = "color";

    value = shade
      ? colors[color]?.[shade]
      : color;
  }

  // ---------------------
  // SHADOW
  // ---------------------
  match = baseClass.match(/^shadow-(.+)$/);

  if (match) {
    const parts = match[1].split("-");

    if (parts.length >= 4) {
      const [x, y, blur, colorName] = parts;

      property = "box-shadow";

      value = `${x} ${y} ${blur} ${
        colors[colorName]?.[500] || colorName
      }`;
    }
  }

  // If nothing matched → skip
  if (!property) return;

  return `.${cls}:hover { ${property}: ${value}; }\n`;
}