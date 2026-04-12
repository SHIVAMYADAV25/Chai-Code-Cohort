import { colors } from "../core/colors.js";
import { hexToRgba } from "../core/utils.js";

export default function colorPlugin(cls) {
  const match = cls.match(
    /^chai-(dark-)?(bg|text)-([a-z]+)(?:-(\d+))?(?:\/(\d+))?$/
  );

  if (!match) return;

  const [, isDark, type, colorName, shade, opacity] = match;

  const property = type === "bg" ? "background-color" : "color";

  let value;

if (colors[colorName]) {
  if (typeof colors[colorName] === "string") {
    value = colors[colorName];
  } else {
    value = colors[colorName][shade || 500];
  }
} else {
  return; // 🚨 prevent invalid css
}

  if (opacity) {
    value = hexToRgba(value, opacity / 100);
  }

  if (isDark && type === "bg" && colorName === "gray" && shade === "200") {
  value = colors.gray[800];
}

  // 🔥 DARK MODE HANDLING
  if (isDark) {
    return `.dark.${cls}, .dark .${cls} { ${property}: ${value}; }\n`;
  }

  return `.${cls} { ${property}: ${value}; }\n`;
}