# Panduan Struktur Kode Intranet

Dokumen ini adalah peta kerja developer dan coding agent. Acuannya ialah prinsip pada `demand-forecast-system`: file entry point tipis, pekerjaan dikelompokkan menurut fitur, komponen umum dipakai ulang, dan dokumentasi punya lokasi tetap. Intranet saat ini bukan Next.js; jangan memindahkan stack hanya agar nama folder sama.

## Peta source saat ini

| Lokasi | Isi yang boleh ditempatkan |
| --- | --- |
| `index.html` | Kerangka halaman, elemen mount, dan pemuatan asset. Tidak berisi data, template halaman, style, atau aturan bisnis. |
| `src/client/js/app.js` | Bootstrap, pemetaan URL, navigasi browser, dan koordinasi pencarian lintas fitur. Jangan tambah renderer halaman di sini. |
| `src/client/js/pages/` | Renderer dan interaksi khusus masing-masing halaman. Satu fitur tidak mengubah state internal fitur lain. |
| `src/client/js/data/` | Data sementara per domain selama belum ada CMS/API; jangan campur berita, outlet, dan SOP di satu file. |
| `src/client/js/ui/` | UI umum yang dipakai beberapa halaman, misalnya navigasi. |
| `src/client/css/` | Style. Pisahkan per fitur ketika `main.css` sudah menyulitkan perubahan terlokalisasi. |
| `src/server/main.ts` | HTTP server, `/health`, file statis, dan fallback route. Jangan letakkan data konten atau HTML halaman di sini. |
| `public/assets/images/` | Gambar asli yang disajikan ke browser. Gunakan URL `/assets/images/...`. |
| `scripts/` | Proses build dan pemeriksaan operasional. |
| `docs/` | PRD, panduan struktur, dan keputusan arsitektur. |
| `dist/` | Hasil build; jangan diedit atau di-commit. |

Jika ukuran fitur membesar, bentuk `src/client/js/features/<fitur>/` untuk data adapter, renderer, event, dan kontrak fitur tersebut. Pindahkan bertahap sambil menjaga URL dan perilaku. Jangan membuat folder kosong hanya untuk menyerupai referensi.

## Padanan dengan Demand Forecast

| Demand Forecast | Fungsi di Intranet saat ini |
| --- | --- |
| `src/app/` | `src/server/main.ts` + router browser di `src/client/js/app.js`. |
| `src/features/` | Modul per fitur di `src/client/js/pages/` dan `data/`; boleh menjadi folder `features/` saat kompleks. |
| `src/components/ui/` | `src/client/js/ui/`. |
| `src/lib/` | Utilitas lintas fitur yang benar-benar diperlukan; belum perlu folder khusus bila belum ada. |
| `public/`, `docs/`, `scripts/` | Peran sama; isi berbeda sesuai aplikasi. |

## Cara menambah atau mengubah halaman

1. Tentukan dulu apakah ini fitur baru atau bagian dari fitur yang ada; lihat [PRD](./PRD.md) untuk batas produk dan aturan konten.
2. Simpan data statis sementara di `src/client/js/data/<fitur>.js`. Jangan mengarang data perusahaan yang belum diverifikasi.
3. Simpan renderer dan event fitur di `src/client/js/pages/<fitur>.js`. Bila ada UI yang dipakai beberapa fitur, pindahkan ke `src/client/js/ui/`.
4. Daftarkan file client baru pada `index.html` sebelum `app.js` sesuai dependensinya. Client memakai script biasa, belum memakai import/bundler; nama global harus jelas dan tidak bertabrakan.
5. Tambahkan URL di `ROUTES` dan pemilihan view di `src/client/js/app.js`. Tambahkan fallback URL yang sama pada `pageRoutes` atau aturan dynamic route di `src/server/main.ts`. Pakai slug huruf kecil dan tanda hubung.
6. Uji klik menu, direct URL, refresh, Back/Forward, pencarian, dan tampilan mobile. Perbarui README bila daftar URL berubah.

Halaman saat ini: `/`, `/berita`, `/berita/ID`, `/outlet`, `/sop`, `/sop/nama-section`, `/informasi-hr`, `/corporate-action`, `/struktur-organisasi`, dan `/dokumen-form`.

## Cara menambah berita dan gambar

Berita contoh saat ini berada di `src/client/js/data/news.js`. Taruh gambar di `public/assets/images/news/nama-file.jpg`, lalu isi properti `image` dengan `/assets/images/news/nama-file.jpg`. Lakukan build agar gambar ikut tersalin ke `dist/public/assets/images/`. Jangan tulis path lokal Windows ke data browser. Sebelum dipublikasikan sebagai kabar resmi, pastikan judul, isi, tanggal, dan sumber disetujui pemilik konten.

## Pemeriksaan sebelum selesai

Jalankan `npm run format:check`, `npm run typecheck`, dan `npm run build`. Untuk route atau asset, jalankan server hasil build dan periksa URL melalui browser atau HTTP. `npm run dev` saat ini melakukan build lalu start, belum auto-reload. Jangan menyatakan fitur selesai hanya karena file berhasil disimpan.
