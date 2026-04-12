import { colors } from "../core/colors.js";

export default function borderPlugin(cls) {

  // ---------------------
  // BASIC BORDER
  // ---------------------
  if (cls === "chai-border") {
    return `.chai-border { border: 1px solid black; }\n`;
  }

  // ---------------------
  // BORDER WIDTH
  // ---------------------
  let match = cls.match(/^chai-bw-(\d+)$/);

  if (match) {
    return `.${cls} { border-width: ${match[1]}px; border-style: solid; }\n`;
  }

  // ---------------------
  // BORDER COLOR
  // ---------------------
  match = cls.match(/^chai-bc-([a-z]+)-(\d+)$/);

  if (match) {
    const [, color, shade] = match;

    if (colors[color] && colors[color][shade]) {
      return `.${cls} { border-color: ${colors[color][shade]}; }\n`;
    }
  }

  // ---------------------
  // BORDER RADIUS
  // ---------------------
  match = cls.match(/^chai-rounded-(\d+)$/);

  if (match) {
    return `.${cls} { border-radius: ${match[1]}px; }\n`;
  }

  // ---------------------
  // FULL RADIUS (CIRCLE)
  // ---------------------
  if (cls === "chai-rounded-full") {
    return `.chai-rounded-full { border-radius: 9999px; }\n`;
  }

  return;
}