import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { createServer, type ServerResponse } from "node:http";
import { extname, resolve, sep } from "node:path";

const root = resolve(__dirname, "..");
const assetsRoot = resolve(root, "public", "assets");
const envPath = resolve(root, ".env");

// Keep the simple HOST/PORT .env file usable without a runtime dependency.
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const value = line.trim();
    if (!value || value.startsWith("#")) continue;
    const separator = value.indexOf("=");
    if (separator < 1) continue;
    const key = value.slice(0, separator).trim();
    if (process.env[key] === undefined) process.env[key] = value.slice(separator + 1).trim();
  }
}

const host = process.env.HOST ?? "0.0.0.0";
const port = Number(process.env.PORT ?? "3001");
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT harus angka antara 1 dan 65535.");
}

const mimeTypes: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function reply(response: ServerResponse, status: number, body: string): void {
  response.writeHead(status, { "content-type": "text/plain; charset=utf-8", "x-content-type-options": "nosniff" });
  response.end(body);
}

function serveFile(response: ServerResponse, filePath: string, contentType: string, method: string): void {
  try {
    const info = statSync(filePath);
    if (!info.isFile()) return reply(response, 404, "Not Found");
    response.writeHead(200, {
      "content-type": contentType,
      "content-length": info.size,
      "cache-control": "no-cache",
      "x-content-type-options": "nosniff",
    });
    if (method === "HEAD") {
      response.end();
      return;
    }
    createReadStream(filePath).on("error", () => response.destroy()).pipe(response);
  } catch {
    reply(response, 404, "Not Found");
  }
}

const server = createServer((request, response) => {
  const method = request.method ?? "GET";
  if (method !== "GET" && method !== "HEAD") {
    response.writeHead(405, { allow: "GET, HEAD" });
    return response.end("Method Not Allowed");
  }

  let pathname: string;
  try {
    pathname = new URL(request.url ?? "/", "http://localhost").pathname;
  } catch {
    return reply(response, 400, "Bad Request");
  }

  if (pathname === "/" || pathname === "/index.html") {
    return serveFile(response, resolve(root, "index.html"), "text/html; charset=utf-8", method);
  }

  if (pathname === "/health") {
    const body = JSON.stringify({ status: "ok", service: "intranet-orins" });
    response.writeHead(200, { "content-type": "application/json; charset=utf-8", "content-length": Buffer.byteLength(body) });
    return response.end(method === "HEAD" ? undefined : body);
  }

  if (pathname.startsWith("/assets/")) {
    let relativePath: string;
    try {
      relativePath = decodeURIComponent(pathname.slice("/assets/".length));
    } catch {
      return reply(response, 400, "Bad Request");
    }
    const filePath = resolve(assetsRoot, relativePath);
    if (!filePath.startsWith(`${assetsRoot}${sep}`)) return reply(response, 403, "Forbidden");
    const contentType = mimeTypes[extname(filePath).toLowerCase()];
    if (!contentType) return reply(response, 404, "Not Found");
    return serveFile(response, filePath, contentType, method);
  }

  reply(response, 404, "Not Found");
});

server.on("error", (error: NodeJS.ErrnoException) => {
  console.error(error.code === "EADDRINUSE" ? `Port ${port} sudah dipakai.` : error.message);
  process.exitCode = 1;
});
server.listen(port, host, () => console.log(`Orins Intranet siap: http://localhost:${port} (bind ${host}:${port})`));
