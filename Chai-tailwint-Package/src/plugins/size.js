export default function size(cls) {

  // -------------------------
  // WIDTH (px)
  // -------------------------
  let match = cls.match(/^chai-w-(\d+)$/);
  if (match) {
    return `.${cls} { width: ${match[1]}px; }\n`;
  }

  // -------------------------
  // HEIGHT (px)
  // -------------------------
  match = cls.match(/^chai-h-(\d+)$/);
  if (match) {
    return `.${cls} { height: ${match[1]}px; }\n`;
  }

  // -------------------------
  // WIDTH (%)
  // chai-w-50p → 50%
  // -------------------------
  match = cls.match(/^chai-w-(\d+)p$/);
  if (match) {
    return `.${cls} { width: ${match[1]}%; }\n`;
  }

  // -------------------------
  // HEIGHT (%)
  // -------------------------
  match = cls.match(/^chai-h-(\d+)p$/);
  if (match) {
    return `.${cls} { height: ${match[1]}%; }\n`;
  }

  // -------------------------
  // PRESET WIDTHS
  // -------------------------
  const widthMap = {
    full: "100%",
    screen: "100vw",
    auto: "auto"
  };

  match = cls.match(/^chai-w-(full|screen|auto)$/);
  if (match) {
    return `.${cls} { width: ${widthMap[match[1]]}; }\n`;
  }

  // -------------------------
  // PRESET HEIGHTS
  // -------------------------
  const heightMap = {
    full: "100%",
    screen: "100vh",
    auto: "auto"
  };

  match = cls.match(/^chai-h-(full|screen|auto)$/);
  if (match) {
    return `.${cls} { height: ${heightMap[match[1]]}; }\n`;
  }

  // -------------------------
  // MIN WIDTH
  // -------------------------
  match = cls.match(/^chai-min-w-(\d+)$/);
  if (match) {
    return `.${cls} { min-width: ${match[1]}px; }\n`;
  }

  // -------------------------
  // MAX WIDTH
  // -------------------------
  match = cls.match(/^chai-max-w-(\d+)$/);
  if (match) {
    return `.${cls} { max-width: ${match[1]}px; }\n`;
  }

  // -------------------------
  // MIN HEIGHT
  // -------------------------
  match = cls.match(/^chai-min-h-(\d+)$/);
  if (match) {
    return `.${cls} { min-height: ${match[1]}px; }\n`;
  }

  // -------------------------
  // MAX HEIGHT
  // -------------------------
  match = cls.match(/^chai-max-h-(\d+)$/);
  if (match) {
    return `.${cls} { max-height: ${match[1]}px; }\n`;
  }

  return null;
}