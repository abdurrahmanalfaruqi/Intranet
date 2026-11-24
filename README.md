# Orins Intranet

Aplikasi monolitik Node.js + TypeScript tanpa Bun atau Docker. Source yang diedit berada di `src/`; `dist/` adalah hasil build dan tidak disimpan di Git.

Untuk pengembangan fitur, baca [PRD](docs/PRD.md) dan [panduan struktur kode](docs/PROJECT_CODE_GUIDE.md). Aturan kerja coding agent ada di `AGENTS.md` (juga dirujuk oleh `CLAUDE.md`). Struktur ini mengikuti prinsip pemisahan tanggung jawab pada Demand Forecast System, tanpa mengganti stack Intranet.

## Struktur project

```text
Intranet/
├── index.html                    # Kerangka HTML dan urutan script
├── public/assets/images/         # Logo, favicon, gambar berita
├── src/
│   ├── client/
│   │   ├── css/main.css          # Styling
│   │   └── js/
│   │       ├── data/             # Data berita, outlet, SOP, organisasi
│   │       ├── pages/            # Logika per halaman
│   │       ├── ui/               # Navigasi
│   │       └── app.js            # Route, pencarian, inisialisasi
│   └── server/main.ts            # HTTP server dan fallback URL
├── scripts/build-client.mjs      # Salin client ke dist/public
├── dist/                         # Output build; jangan diedit langsung
├── package.json
└── tsconfig.json
```

`index.html` tidak menyimpan CSS atau logic. JavaScript client masih vanilla JS agar tampilan dan perilaku awal tetap sama; file dipisah berdasarkan fungsi dan dieksekusi sesuai urutan `<script defer>` di `index.html`.

## Jalankan di PowerShell

```powershell
cd C:\Intranet
npm install
npm run build
npm start
```

Server default di port 3001. Buka `http://localhost:3001` di server atau `http://NAMA-ATAU-IP-SERVER:3001` dari perangkat lain jika firewall mengizinkan. `/health` untuk pemeriksaan server.

Setelah mengubah file di `src/client/`, `public/assets/images/`, atau `index.html`, jalankan `npm run build` dan refresh browser. Setelah mengubah `src/server/`, jalankan build lalu restart proses Node. `npm run dev` melakukan build lalu start, tetapi belum auto-reload. `npm run format` merapikan source; `npm run format:check` hanya memeriksa.

GitHub tidak memuat `dist/` karena folder itu di-ignore. Di server hasil `git clone`/`git pull`, jalankan `npm install` dan `npm run build` sebelum `npm start`. ZIP rilis siap jalan sudah menyertakan `dist/`.

## URL halaman

| Menu | URL |
| --- | --- |
| Beranda | `/` |
| Berita | `/berita` |
| Detail berita | `/berita/ID` |
| Outlet | `/outlet` |
| SOP | `/sop` |
| Informasi HR | `/informasi-hr` |
| Corporate Action | `/corporate-action` |
| Struktur Organisasi | `/struktur-organisasi` |
| Dokumen & Form | `/dokumen-form` |

URL bisa dibuka langsung, di-refresh, dan dipakai dengan tombol Back/Forward. Saat menambah halaman, sesuaikan `ROUTES` dan view di `src/client/js/app.js`, serta daftar `pageRoutes` di `src/server/main.ts`. Gunakan slug huruf kecil dengan tanda hubung.

## Menambahkan gambar berita

1. Simpan gambar, misalnya `town-hall.jpg`, di `public/assets/images/news/`.
2. Di `src/client/js/data/news.js`, tambahkan properti `image` pada berita terkait:

   ```js
   { id: 1, cat: "Perusahaan", image: "/assets/images/news/town-hall.jpg", /* properti lain */ }
   ```

3. Jalankan `npm run build`, lalu refresh browser. Gambar otomatis muncul pada kartu, sorotan, dan detail berita. Jika `image` kosong/tidak ada, gradasi lama tetap digunakan.

Gunakan URL `/assets/images/news/nama-file.jpg`, bukan path Windows `C:\...`. Server mendukung `.jpg`, `.jpeg`, `.png`, dan `.webp`.
