const htmlFile = Bun.file(new URL("../../index.html", import.meta.url));

export async function homePage(): Promise<Response> {
  if (!(await htmlFile.exists())) {
    return new Response("Halaman intranet belum ditemukan.", { status: 500 });
  }

  return new Response(htmlFile, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-cache",
      "x-content-type-options": "nosniff",
    },
  });
}
