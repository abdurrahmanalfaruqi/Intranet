export function healthCheck(): Response {
  return Response.json(
    { status: "ok", service: "intranet-orins" },
    { headers: { "cache-control": "no-store" } },
  );
}
