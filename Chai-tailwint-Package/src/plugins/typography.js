export default function typographyPlugin(cls) {

  // ---------------------
  // FONT SIZE
  // ---------------------
  let match = cls.match(/^chai-fs-(\d+)$/);

  if (match) {
    return `.${cls} { font-size: ${match[1]}px; }\n`;
  }

  // ---------------------
  // FONT WEIGHT
  // ---------------------
  match = cls.match(/^chai-fw-(\w+)$/);

  if (match) {
    const map = {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800
    };

    return `.${cls} { font-weight: ${map[match[1]] || 400}; }\n`;
  }

  // ---------------------
  // TEXT ALIGN
  // ---------------------
  match = cls.match(/^chai-text-(left|center|right|justify)$/);

  if (match) {
    return `.${cls} { text-align: ${match[1]}; }\n`;
  }

  // ---------------------
  // LINE HEIGHT
  // ---------------------
  match = cls.match(/^chai-lh-(\d+)$/);

  if (match) {
    return `.${cls} { line-height: ${match[1]}px; }\n`;
  }

  // ---------------------
  // LETTER SPACING
  // ---------------------
  match = cls.match(/^chai-ls-(\d+)$/);

  if (match) {
    return `.${cls} { letter-spacing: ${match[1]}px; }\n`;
  }

  return;
}