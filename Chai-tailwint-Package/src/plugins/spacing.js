export default function spacingPlugin(cls) {
  // chai-p-10 / chai-m-20
  let match = cls.match(/^chai-(p|m)-(\d+)$/);

  if (match) {
    const [, type, value] = match;

    const property = type === "p" ? "padding" : "margin";

    return `.${cls} { ${property}: ${value}px; }\n`;
  }

  // chai-pt-10 / chai-mb-20 etc
  match = cls.match(/^chai-(p|m)(t|b|l|r)-(\d+)$/);

  if (match) {
    const [, type, direction, value] = match;

    const base = type === "p" ? "padding" : "margin";

    const dirMap = {
      t: "top",
      b: "bottom",
      l: "left",
      r: "right"
    };

    return `.${cls} { ${base}-${dirMap[direction]}: ${value}px; }\n`;
  }

  // chai-px-10 / chai-py-10 / chai-mx-10 / chai-my-10
  match = cls.match(/^chai-(p|m)(x|y)-(\d+)$/);

  if (match) {
    const [, type, axis, value] = match;

    const base = type === "p" ? "padding" : "margin";

    if (axis === "x") {
      return `
.${cls} {
  ${base}-left: ${value}px;
  ${base}-right: ${value}px;
}
`;
    }

    if (axis === "y") {
      return `
.${cls} {
  ${base}-top: ${value}px;
  ${base}-bottom: ${value}px;
}
`;
    }
  }

  // If no match → ignore
  return;
}