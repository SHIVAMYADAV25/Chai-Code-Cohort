export default function layout(cls) {

  if (cls === "chai-block") {
    return `.chai-block { display: block; }\n`;
  }

  if (cls === "chai-inline") {
    return `.chai-inline { display: inline; }\n`;
  }

  if (cls === "chai-hidden") {
    return `.chai-hidden { display: none; }\n`;
  }
}