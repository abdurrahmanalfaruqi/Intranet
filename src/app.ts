import { healthCheck } from "./services/health";
import { staticAsset } from "./services/static-assets";
import { homePage } from "./pages/home";
import { config } from "./utils/config";

export function startApp(): void {
  const server = Bun.serve({
    hostname: config.host,
    port: config.port,
    async fetch(request) {
      const { pathname } = new URL(request.url);

      if (request.method !== "GET") {
        return new Response("Method Not Allowed", {
          status: 405,
          headers: { allow: "GET" },
        });
      }

      if (pathname === "/" || pathname === "/index.html") {
        return homePage();
      }

      if (pathname === "/health") {
        return healthCheck();
      }

      if (pathname.startsWith("/assets/")) {
        return staticAsset(pathname);
      }

      return new Response("Not Found", { status: 404 });
    },
  });

  console.log(`Orins Intranet berjalan di http://${server.hostname}:${server.port}`);
}
