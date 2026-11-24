# Orins Intranet — Bun + TypeScript

Aplikasi monolitik sederhana: satu project dan satu proses Bun untuk menyajikan halaman intranet serta endpoint health-check. HTML sumber dipertahankan agar tampilan dan interaksi yang sudah ada tidak berubah. File sumber saat ini belum memakai database atau API eksternal.

## Struktur project

```text
intranet-orins-bun-ts/
├── public/
│   └── assets/          # Gambar, ikon, dan font publik
├── src/
│   ├── assets/           # Source asset/CSS (bila nanti dipisahkan dari HTML)
│   ├── components/      # Komponen UI reusable
│   ├── pages/
│   │   └── home.ts      # Menyajikan halaman intranet
│   ├── services/
│   │   ├── health.ts    # Health-check aplikasi
│   │   └── static-assets.ts # Aset statis
│   ├── utils/
│   │   └── config.ts    # Konfigurasi HOST dan PORT
│   ├── app.ts           # Route aplikasi
│   └── main.ts          # Entry point
├── index.html           # Halaman utama dari file sumber
├── .env.example         # Contoh konfigurasi lingkungan
├── .gitignore
├── bun.lock             # Lockfile dependency Bun
├── package.json
├── tsconfig.json
└── README.md
```

Folder `src/components/` disiapkan untuk komponen UI reusable; karena halaman sumber masih satu HTML utuh, belum ada logika tampilan yang dipindahkan ke file komponen. Ini tetap satu aplikasi monolitik, bukan beberapa service.

## Menjalankan di komputer

1. Pasang Bun dari situs resminya.
2. Buka terminal di folder project.
3. Jalankan `bun install`.
4. Salin `.env.example` menjadi `.env` bila ingin mengubah host atau port.
5. Jalankan `bun run dev`.
6. Buka `http://localhost:3000`.

Untuk menjalankan tanpa mode watch, gunakan `bun run start`. Endpoint `GET /health` mengembalikan status aplikasi.

## Menjalankan di server

Pasang Bun di satu server, salin folder project, lalu jalankan `bun install --production`. Atur `HOST` dan `PORT` di environment server, kemudian jalankan `bun run start`. Untuk akses publik, arahkan reverse proxy perusahaan ke port aplikasi dan aktifkan HTTPS di reverse proxy tersebut. Tidak ada Docker atau service terpisah.
