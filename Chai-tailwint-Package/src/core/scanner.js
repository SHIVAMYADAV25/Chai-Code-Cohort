import fs from "fs";
import path from "path";

export function scanFiles(dir) {
  const files = fs.readdirSync(dir);
  let classes = new Set();

  files.forEach(file => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      const nested = scanFiles(fullPath);
      nested.forEach(c => classes.add(c));
    } else {
      const content = fs.readFileSync(fullPath, "utf-8");

      const matches = content.match(/class="([^"]+)"/g) || [];

      matches.forEach(match => {
        match.replace(/class="([^"]+)"/, (_, cls) => {
          cls.split(" ").forEach(c => {
            if (c.startsWith("chai-")) classes.add(c);
          });
        });
      });
    }
  });

  return classes;
}