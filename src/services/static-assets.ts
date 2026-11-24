import { extname, resolve, sep } from "node:path";

const assetsDirectory = resolve(import.meta.dir, "../../public/assets");
const contentTypes: Record<string, string> = {
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

export async function staticAsset(pathname: string): Promise<Response> {
  let relativePath: string;
  try {
    relativePath = decodeURIComponent(pathname.slice("/assets/".length));
  } catch {
    return new Response("Bad Request", { status: 400 });
  }

  const filePath = resolve(assetsDirectory, relativePath);
  if (!filePath.startsWith(`${assetsDirectory}${sep}`)) {
    return new Response("Forbidden", { status: 403 });
  }

  const extension = extname(filePath).toLowerCase();
  const contentType = contentTypes[extension];
  if (!contentType) {
    return new Response("Not Found", { status: 404 });
  }

  const file = Bun.file(filePath);
  if (!(await file.exists())) {
    return new Response("Not Found", { status: 404 });
  }

  return new Response(file, {
    headers: {
      "content-type": contentType,
      "x-content-type-options": "nosniff",
      "cache-control": "public, max-age=3600",
    },
  });
}
