const port = Number(Bun.env.PORT ?? "3000");

if (!Number.isInteger(port) || port < 1 || port > 65_535) {
  throw new Error("PORT harus berupa angka antara 1 dan 65535.");
}

export const config = {
  host: Bun.env.HOST ?? "0.0.0.0",
  port,
};
