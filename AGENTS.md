# Aturan kerja coding agent — Orins Intranet

Baca `README.md`, `docs/PRD.md`, dan `docs/PROJECT_CODE_GUIDE.md` sebelum mengubah aplikasi. `demand-forecast-system` adalah acuan pemisahan tanggung jawab, bukan sumber fitur atau alasan mengganti stack Intranet.

## Penempatan kode

- Pertahankan stack saat ini: server Node.js + TypeScript, client JavaScript vanilla, satu aplikasi. Perubahan framework, database, atau sistem autentikasi memerlukan kebutuhan dan persetujuan tersendiri.
- `index.html` hanya untuk kerangka dan urutan script; jangan masukkan CSS, data, template halaman, atau logika bisnis ke situ.
- `src/client/js/app.js` hanya untuk bootstrap, routing, dan koordinasi lintas fitur. Renderer serta state khusus halaman masuk ke `src/client/js/pages/` atau `features/<fitur>/` bila sudah kompleks.
- Data contoh/static dipisah per domain di `src/client/js/data/`; UI umum di `src/client/js/ui/`; style di `src/client/css/`; asset gambar di `public/assets/images/`.
- `src/server/main.ts` hanya menangani HTTP, asset, health-check, dan fallback route. Jangan campur logika halaman atau data bisnis ke server entry point.
- Jangan mengedit `dist/`, `node_modules/`, atau file rahasia. `dist/` dibuat ulang lewat build.
- Jangan buat folder kosong atau abstraksi baru tanpa kebutuhan nyata. Bila file membesar, pecah menurut fitur dan peran sambil mempertahankan perilaku yang sudah ada.

## Route dan konten

- Route baru perlu URL browser di `src/client/js/app.js`, fallback server di `src/server/main.ts`, navigasi bila perlu, dan uji direct URL, refresh, Back/Forward.
- Gunakan URL asset `/assets/...`, bukan path disk lokal. Gambar berita ada di `public/assets/images/news/` dan dipanggil dari data berita.
- Jangan mengarang kebijakan HR, SOP, nama/posisi karyawan, data outlet, tanggal, file unduhan, atau berita resmi. Tandai data contoh; minta sumber dan persetujuan sebelum mengubahnya menjadi informasi resmi.
- Jangan memasukkan data rahasia, data pribadi sensitif, token, atau kredensial ke repository atau JavaScript client. Escape/sanitasi input tak tepercaya sebelum dirender.

## Verifikasi dan dokumentasi

- Setelah perubahan kode, jalankan `npm run format:check`, `npm run typecheck`, dan `npm run build`; uji route/asset yang berubah lewat server hasil build.
- Perbarui README dan panduan kode ketika struktur, URL, perintah menjalankan, atau proses deploy berubah.
- Pertahankan perubahan pengguna yang sudah ada; jangan reset, force push, atau deploy tanpa diminta.
