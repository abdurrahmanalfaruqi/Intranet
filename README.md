# Orins Intranet — Node.js + TypeScript

Satu aplikasi monolitik tanpa Bun atau Docker. HTML asli tetap menjadi halaman utama di `index.html`; server TypeScript ada di `src/main.ts`. Aset publik ditempatkan di `public/assets/`.

## Jalankan di Windows PowerShell

Pastikan `node --version` dan `npm --version` menampilkan versi. Di server kantor, setelah project versi Node disalin ke `C:\Intranet`:

```powershell
cd C:\Intranet
npm install
npm run build
npm start
```

Buka `http://localhost:3001` dari server. Untuk komputer lain gunakan IP/nama server dan pastikan akses port diizinkan tim IT. `HOST` dan `PORT` dapat diatur melalui `.env` atau environment PowerShell. Endpoint kesehatan: `/health`.

Perintah `npm run dev` juga membangun lalu menjalankan aplikasi, tetapi tidak melakukan auto-reload. Terminal harus tetap terbuka selama server berjalan; untuk layanan 24 jam perlu Windows Service atau pengaturan startup oleh tim IT.

`dist/` adalah hasil kompilasi TypeScript. Runtime hasil build hanya memerlukan Node.js, sedangkan `npm install` diperlukan saat ingin membangun ulang source.
