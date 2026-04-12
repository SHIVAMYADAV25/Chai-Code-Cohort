import { exec } from "child_process";

export default function chaiPlugin() {
  return {
    name: "chai-tailwind",

    // Runs when Vite starts
    buildStart() {
      console.log("⚡ Chai build starting...");
      exec("node src/cli/build.js");
    },

    // Runs on file change (LIVE UPDATE)
    configureServer(server) {
      server.watcher.on("change", (file) => {
        if (file.endsWith(".html") || file.endsWith(".js")) {
          console.log("🔄 Rebuilding Chai CSS...");
          exec("node src/cli/build.js");
        }
      });
    }
  };
}