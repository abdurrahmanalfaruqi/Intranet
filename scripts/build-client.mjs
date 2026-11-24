import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = resolve(projectRoot, "dist");
const siteRoot = resolve(distRoot, "public");
if (!siteRoot.startsWith(`${distRoot}${sep}`)) {
  throw new Error("Build output must stay inside dist/");
}

// Rebuild only generated client output; leave compiled server files intact.
await rm(siteRoot, { recursive: true, force: true });
await mkdir(siteRoot, { recursive: true });
await cp(resolve(projectRoot, "index.html"), resolve(siteRoot, "index.html"));
await cp(
  resolve(projectRoot, "public", "assets", "images"),
  resolve(siteRoot, "assets", "images"),
  { recursive: true },
);
await cp(
  resolve(projectRoot, "src", "client", "css"),
  resolve(siteRoot, "assets", "css"),
  { recursive: true },
);
await cp(
  resolve(projectRoot, "src", "client", "js"),
  resolve(siteRoot, "assets", "js"),
  { recursive: true },
);
console.log("Client assets built in dist/public");
