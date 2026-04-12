import fs from "fs";
import { exec } from "child_process";

let timeout;

console.log("👀 Watching files...");

fs.watch("./", { recursive: true }, (eventType, filename) => {
  if (!filename) return;

  // only rebuild for relevant files
  if (!filename.endsWith(".html") && !filename.endsWith(".js")) return;

  clearTimeout(timeout);

  timeout = setTimeout(() => {
    console.log("🔄 Building CSS...");
    exec("node src/cli/build.js", (err, stdout) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("✅ CSS Updated");
    });
  }, 200);
});