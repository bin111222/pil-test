const { spawn } = require("child_process");
const open = require("open");

const NEXT_DEV_URL = "http://localhost:3000";

const next = spawn("npx", ["next", "dev"], {
  stdio: "inherit",
  shell: true,
});

// Open browser once the dev server is ready
setTimeout(() => {
  open(NEXT_DEV_URL);
}, 2500);

next.on("close", (code) => process.exit(code ?? 0));
