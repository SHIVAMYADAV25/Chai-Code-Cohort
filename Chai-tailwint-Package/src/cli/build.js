import { scanFiles } from "../core/scanner.js";
import { generateCSS } from "../core/generator.js";
import fs from "fs";

// register plugins
import { registerPlugin } from "../core/context.js";
import spacingPlugin from "../plugins/spacing.js";
import colorPlugin from "../plugins/colors.js";
import flexPlugin from "../plugins/flex.js";
import typographyPlugin from "../plugins/typography.js";
import borderPlugin from "../plugins/border.js";
import layout from "../plugins/layout.js";
import size from "../plugins/size.js";
import  hoverPlugin from "../plugins/hover.js"
import interaction from "../plugins/interaction.js"
import responsivePlugin from "../plugins/responsive.js"
import shadowPlugin from "../plugins/shadow.js";
import position from "../plugins/position.js";
import backgroundPlugin from "../plugins/background.js"

registerPlugin(typographyPlugin);
registerPlugin(borderPlugin);
registerPlugin(layout);
registerPlugin(size);
registerPlugin(shadowPlugin);
registerPlugin(spacingPlugin);
registerPlugin(colorPlugin);
registerPlugin(flexPlugin);
registerPlugin(hoverPlugin);
registerPlugin(interaction);
registerPlugin(position);
registerPlugin(backgroundPlugin);
registerPlugin(responsivePlugin);



const classes = scanFiles("./");

let css = "";

classes.forEach(cls => {
  css += generateCSS(cls);
});

fs.writeFileSync("dist/chai.css", css);

console.log("✅ CSS Generated");