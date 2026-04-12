export default function flexPlugin(cls) {

  // ---------------------
  // FLEX DISPLAY
  // ---------------------
  if (cls === "chai-flex") {
    return `.chai-flex { display: flex; }\n`;
  }

  // ---------------------
  // FLEX DIRECTION
  // ---------------------
  let match = cls.match(/^chai-flexdir-(row|column)$/);

  if (match) {
    const direction = match[1];
    return `.${cls} { flex-direction: ${direction}; }\n`;
  }

  // ---------------------
  // JUSTIFY CONTENT
  // ---------------------
  match = cls.match(/^chai-justify-(center|between|around|start|end)$/);

  if (match) {
    const map = {
      center: "center",
      between: "space-between",
      around: "space-around",
      start: "flex-start",
      end: "flex-end"
    };

    return `.${cls} { justify-content: ${map[match[1]]}; }\n`;
  }

  // ---------------------
  // ALIGN ITEMS
  // ---------------------
  match = cls.match(/^chai-items-(center|start|end)$/);

  if (match) {
    const map = {
      center: "center",
      start: "flex-start",
      end: "flex-end"
    };

    return `.${cls} { align-items: ${map[match[1]]}; }\n`;
  }

  // ---------------------
  // GAP
  // ---------------------
  match = cls.match(/^chai-gap-(\d+)$/);

  if (match) {
    return `.${cls} { gap: ${match[1]}px; }\n`;
  }

  return;
}