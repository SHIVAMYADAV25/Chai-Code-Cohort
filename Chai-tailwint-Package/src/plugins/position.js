export default function position(cls) {

  if (cls === "chai-relative") {
    return `.chai-relative { position: relative; }\n`;
  }

  if (cls === "chai-absolute") {
    return `.chai-absolute { position: absolute; }\n`;
  }

  if (cls === "chai-fixed") {
    return `.chai-fixed { position: fixed; }\n`;
  }

  if (cls === "chai-sticky") {
    return `.chai-sticky { position: sticky; }\n`;
  }

  // ---------------------
  // OFFSETS
  // ---------------------
  let match = cls.match(/^chai-(top|left|right|bottom)-(\d+)$/);

  if (match) {
    const [, dir, value] = match;
    return `.${cls} { ${dir}: ${value}px; }\n`;
  }

  // ---------------------
  // Z-INDEX
  // ---------------------
  match = cls.match(/^chai-z-(\d+)$/);

  if (match) {
    return `.${cls} { z-index: ${match[1]}; }\n`;
  }

  return null;
}