import { spawn } from "node:child_process";
import { watch } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const serverPath = resolve(projectRoot, "dist", "server", "main.js");
const tscPath = resolve(
  projectRoot,
  "node_modules",
  "typescript",
  "bin",
  "tsc",
);
const buildClientPath = resolve(projectRoot, "scripts", "build-client.mjs");

let server;
let building = false;
let buildQueued = false;
let timer;
let stopping = false;

function runNode(script) {
  return new Promise((done) => {
    const child = spawn(process.execPath, [script], {
      cwd: projectRoot,
      env: process.env,
      stdio: "inherit",
    });
    child.once("error", (error) => {
      console.error(error);
      done(1);
    });
    child.once("exit", (code) => done(code ?? 1));
  });
}

async function stopServer() {
  const old = server;
  if (!old) return;
  server = undefined;
  if (old.exitCode !== null) return;
  await new Promise((done) => {
    old.once("exit", done);
    old.kill();
  });
}

async function startServer() {
  await stopServer();
  if (stopping) return;
  const child = spawn(process.execPath, [serverPath], {
    cwd: projectRoot,
    env: process.env,
    stdio: "inherit",
  });
  server = child;
  child.once("exit", (code) => {
    if (server === child) {
      server = undefined;
      if (!stopping) console.error(`Server berhenti (kode ${code}).`);
    }
  });
}

async function rebuild() {
  if (building) {
    buildQueued = true;
    return;
  }
  building = true;
  do {
    buildQueued = false;
    console.log("\nMembangun ulang Intranet...");
    const typeScriptResult = await runNode(tscPath);
    const result = typeScriptResult || (await runNode(buildClientPath));
    if (result === 0) {
      console.log("Build selesai. Refresh browser untuk melihat perubahan.");
      await startServer();
    } else {
      console.error(
        "Build gagal. Server lama tetap berjalan; perbaiki error lalu simpan lagi.",
      );
    }
  } while (buildQueued && !stopping);
  building = false;
}

function scheduleBuild() {
  clearTimeout(timer);
  timer = setTimeout(() => void rebuild(), 300);
}

const watchers = [
  watch(resolve(projectRoot, "src"), { recursive: true }, scheduleBuild),
  watch(resolve(projectRoot, "public"), { recursive: true }, scheduleBuild),
  watch(projectRoot, (_event, filename) => {
    if (filename === "index.html" || filename === "tsconfig.json")
      scheduleBuild();
  }),
];

function shutdown() {
  if (stopping) return;
  stopping = true;
  clearTimeout(timer);
  watchers.forEach((watcher) => watcher.close());
  if (server) server.kill();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

console.log(
  "Mode development aktif. Simpan file untuk build otomatis; Ctrl+C untuk berhenti.",
);
void rebuild();
