export default function interaction(cls) {

  if (cls === "chai-cursor-pointer") {
    return `.chai-cursor-pointer { cursor: pointer; }\n`;
  }

  if (cls === "chai-select-none") {
    return `.chai-select-none { user-select: none; }\n`;
  }

  return null;
}