import { colors } from "../core/colors.js";

// -------------------------
// IMAGE MAP (SAFE SYSTEM)
// -------------------------
const bgImages = {
  hero: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  night: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d",
  gradient: "https://images.unsplash.com/photo-1557683316-973673baf926"
};

// -------------------------
// GRADIENT PRESETS
// -------------------------
const gradientMap = {
  "blue-purple": "linear-gradient(135deg, #3b82f6, #9333ea)",
  "green-blue": "linear-gradient(135deg, #10b981, #3b82f6)",
  "red-yellow": "linear-gradient(135deg, #ef4444, #f59e0b)"
};

export default function backgroundPlugin(cls) {

  let match;

  // -------------------------
  // GRADIENT PRESET
  // -------------------------
  match = cls.match(/^chai-bg-gradient-(.+)$/);

  if (match && gradientMap[match[1]]) {
    return `.${cls} {
      background: ${gradientMap[match[1]]};
    }\n`;
  }

  // -------------------------
  // CUSTOM GRADIENT
  // chai-bg-gradient-red-500-blue-500
  // -------------------------
  match = cls.match(/^chai-bg-gradient-([a-z]+)-(\d+)-([a-z]+)-(\d+)$/);

  if (match) {
    const [, c1, s1, c2, s2] = match;

    const col1 = colors[c1]?.[s1];
    const col2 = colors[c2]?.[s2];

    if (!col1 || !col2) return null;

    return `.${cls} {
      background: linear-gradient(135deg, ${col1}, ${col2});
    }\n`;
  }

  // -------------------------
  // BACKGROUND IMAGE (SAFE)
  // chai-bg-img-hero
  // -------------------------
  match = cls.match(/^chai-bg-img-(\w+)$/);

  if (match) {
    const key = match[1];
    const url = bgImages[key];

    if (!url) return null;

    return `.${cls} {
      background-image: url("${url}");
    }\n`;
  }

  // -------------------------
  // BACKGROUND SIZE
  // -------------------------
  if (cls === "chai-bg-cover") {
  return `.chai-bg-cover { background-size: cover; }\n`;
}

  if (cls === "chai-bg-contain") {
    return `.chai-bg-contain { background-size: contain; }\n`;
  }

  // -------------------------
  // BACKGROUND POSITION (simple)
  // -------------------------
  match = cls.match(/^chai-bg-(center|top|bottom|left|right)$/);

  if (match) {
    return `.${cls} {
      background-position: ${match[1]};
    }\n`;
  }

  // -------------------------
  // BACKGROUND POSITION (advanced)
  // chai-bg-top-left
  // -------------------------
  match = cls.match(/^chai-bg-(top|bottom|center)-(left|right|center)$/);

  if (match) {
    return `.${cls} {
      background-position: ${match[1]} ${match[2]};
    }\n`;
  }

  // -------------------------
  // BACKGROUND REPEAT
  // -------------------------
  if (cls === "chai-bg-no-repeat") {
    return `.chai-bg-no-repeat { background-repeat: no-repeat; }\n`;
  }

  if (cls === "chai-bg-repeat") {
    return `.chai-bg-repeat { background-repeat: repeat; }\n`;
  }

  // -------------------------
  // BACKGROUND ATTACHMENT
  // -------------------------
  if (cls === "chai-bg-fixed") {
    return `.chai-bg-fixed { background-attachment: fixed; }\n`;
  }

  // -------------------------
  // BACKGROUND BLEND (optional)
  // -------------------------
  if (cls === "chai-bg-overlay") {
    return `.chai-bg-overlay { background-blend-mode: overlay; }\n`;
  }

  // -------------------------
  // SHORTCUT (VERY USEFUL)
  // chai-bg-full
  // -------------------------
  if (cls === "chai-bg-full") {
    return `.chai-bg-full {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }\n`;
  }

  return null;
}