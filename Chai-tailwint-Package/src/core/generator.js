import { context } from "./context.js";

export function generateCSS(className) {
  for (const plugin of context.plugins) {
    const result = plugin(className);
    if (result) return result;
  }
  return "";
}