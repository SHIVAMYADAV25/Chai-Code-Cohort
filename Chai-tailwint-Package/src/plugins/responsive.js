import { breakpoints } from "../core/breakpoints.js";
import { generateCSS } from "../core/generator.js";

export default function responsivePlugin(cls) {

  // Match: chai-md-p-20
  const match = cls.match(/^chai-(sm|md|lg|xl)-(.+)$/);

  if (!match) return;

  const [, bp, rest] = match;

  const minWidth = breakpoints[bp];

  // Recreate normal class
  const normalClass = "chai-" + rest;

  // Generate base CSS using existing plugins
  const baseCSS = generateCSS(normalClass);

  if (!baseCSS) return;

  // Extract inner CSS (remove class selector)
  const inner = baseCSS.replace(`.${normalClass}`, `.${cls}`);

  return `
@media (min-width: ${minWidth}px) {
  ${inner}
}
`;
}