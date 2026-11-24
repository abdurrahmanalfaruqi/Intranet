# PRD Intranet Karyawan Orins

Status: Draft untuk penyelarasan kebutuhan bisnis dan IT. Dokumen ini menjelaskan produk akhir yang direncanakan; bagian "Kondisi saat ini" membedakan prototipe dari fitur yang belum dibangun.

Intranet Orins adalah satu tempat bagi karyawan untuk menemukan SOP, informasi HR, kabar kantor, informasi outlet, struktur organisasi, dan dokumen kerja. Pengguna seharusnya dapat menemukan informasi yang benar tanpa harus bertanya ke banyak orang. Dokumen ini menjadi acuan produk dan batas pekerjaan untuk pengembangan berikutnya; data contoh pada aplikasi saat ini bukan otomatis informasi resmi perusahaan.

## Pengguna dan masalah

Pengguna utama adalah karyawan kantor dan outlet yang perlu mencari informasi kerja. Pengelola konten adalah tim yang berwenang atas masing-masing topik, misalnya HR untuk kebijakan HR dan pemilik SOP untuk dokumen prosedur. Penetapan nama tim, hak akses, dan alur persetujuan final perlu diputuskan oleh perusahaan sebelum konten resmi diterbitkan.

Informasi yang tersebar di chat, file pribadi, dan pertanyaan berulang membuat karyawan sulit mengetahui versi yang berlaku. Intranet harus memberi alamat yang jelas untuk setiap halaman, pencarian lintas konten, serta penanda tanggal dan sumber agar informasi mudah ditemukan dan dicek.

## Tujuan produk

- Karyawan dapat menemukan SOP, info HR, berita, dan dokumen kerja dari satu portal.
- Setiap halaman mempunyai URL yang bisa dibuka langsung, dibagikan, di-refresh, dan digunakan dengan Back/Forward.
- Konten yang ditampilkan mempunyai sumber dan tanggal pembaruan yang jelas. Dokumen SOP juga menunjukkan versi yang berlaku.
- Tampilan dapat dipakai di desktop dan layar kecil tanpa mengubah alur utama.
- Struktur kode memudahkan perubahan satu fitur tanpa menumpuk data atau logika di `index.html`.

Keberhasilan awal dinilai melalui uji tugas pengguna: menemukan satu SOP yang berlaku, satu pengumuman HR, satu berita, dan satu outlet tanpa bantuan developer. Ukuran kuantitatif seperti target waktu pencarian dan jumlah pengguna aktif ditetapkan setelah tersedia baseline dan pemilik metrik.

## Ruang lingkup

| Area | Kebutuhan |
| --- | --- |
| Beranda | Ringkasan informasi penting dan pintu masuk ke halaman lain. |
| SOP departemen | Daftar dan pencarian berdasarkan divisi/departemen; tampilkan judul, versi, tanggal berlaku/pembaruan, pemilik, dan tautan dokumen yang benar. |
| Informasi HR | Kebijakan, jadwal, pengumuman, dan informasi HR yang telah disetujui; tampilkan tanggal berlaku bila relevan. |
| Berita kantor | Daftar per kategori, berita sorotan, detail artikel, tanggal publikasi, dan gambar opsional. |
| Outlet | Daftar outlet, status, alamat, jam operasional, dan kontak/penanggung jawab yang disetujui untuk ditampilkan; filter yang sesuai data. |
| Corporate Action | Agenda dan pengumuman perusahaan yang relevan untuk karyawan. |
| Struktur organisasi | Bagan dan daftar yang dapat dibaca di berbagai ukuran layar; gunakan data organisasi yang disetujui. |
| Dokumen dan form | Tautan ke file asli yang berlaku, bukan kartu unduhan yang hanya tampak bisa diklik. |
| Pencarian | Cari konten yang memang boleh dilihat pengguna; hasil menunjukkan jenis konten dan mengarah ke detail yang tepat. |

### Kondisi saat ini dan target

Saat ini aplikasi adalah prototipe statis: data berada di file JavaScript client, belum ada login, backend API konten, CMS, atau database. Beberapa teks ditandai sebagai contoh dan kartu dokumen belum menjadi sistem unduh yang terverifikasi. Target produk berikutnya mencakup login, hak akses, backend, penyimpanan data, dan panel pengelolaan konten. Seluruhnya masih rencana, bukan fitur yang sudah tersedia.

Di luar ruang lingkup awal: transaksi POS, purchasing, payroll, persetujuan cuti, dan penyimpanan data pribadi sensitif. Intranet boleh menautkan sistem tersebut jika ada URL resmi dan izin yang sesuai, tetapi tidak menyalin proses bisnisnya tanpa kebutuhan terpisah.

## Login dan hak akses yang direncanakan

Karyawan harus login sebelum membuka konten internal. Sistem mengenali identitas karyawan, status aktif, serta peran/lingkup aksesnya. Setelah logout atau sesi kedaluwarsa, halaman dan file yang dilindungi tidak boleh lagi dapat diakses. Tautan langsung ke halaman yang tidak berhak dibuka menampilkan pesan akses ditolak, bukan isi kontennya. Akses diperiksa oleh backend pada setiap permintaan data dan unduhan; menyembunyikan tombol di browser saja tidak cukup.

Matriks berikut adalah usulan awal untuk diskusi, bukan keputusan final perusahaan:

| Peran usulan | Kewenangan |
| --- | --- |
| Karyawan | Membaca konten umum yang sudah terbit dan dokumen yang diizinkan. |
| Editor departemen | Membuat/mengubah draft konten pada area yang ditugaskan, tanpa otomatis menerbitkannya. |
| Approver/pemilik konten | Meninjau dan menyetujui publikasi atau revisi pada area yang menjadi tanggung jawabnya. |
| Admin aplikasi | Mengelola akun, peran, konfigurasi akses, dan pemetaan pemilik konten; tidak otomatis menjadi pemilik keputusan isi kebijakan. |

Hak akses perlu dapat dibatasi per jenis konten dan lingkup organisasi, misalnya HR, departemen, kantor pusat, atau outlet. Satu orang dapat memiliki lebih dari satu peran. Status karyawan nonaktif harus segera mencabut akses. Sebelum implementasi, IT dan pemilik proses perlu memutuskan apakah login memakai akun perusahaan/SSO atau akun lokal, bagaimana akun dibuat dan dinonaktifkan, cara reset kredensial, dan siapa yang menyetujui perubahan peran.

## Backend dan pengelolaan konten yang direncanakan

Backend menjadi sumber data resmi untuk berita, SOP, informasi HR, outlet, struktur organisasi, dan dokumen. Frontend meminta data melalui API; konten yang memerlukan pembatasan akses tidak boleh dikemas ke file JavaScript publik. Pilihan framework backend, database, layanan file, dan hosting ditentukan saat desain teknis, berdasarkan server kantor, kemampuan tim, dan kebutuhan operasi. PRD ini tidak memaksa Next.js atau menyalin stack Demand Forecast.

Kemampuan minimum backend:

- API baca untuk konten terbit, dengan filter, pencarian, pagination, dan pemeriksaan hak akses.
- API administrasi untuk membuat draft, memperbarui, meninjau, menerbitkan, menarik, dan mengarsipkan konten sesuai peran.
- Penyimpanan metadata: ID stabil, judul, kategori/area, isi atau referensi file, status publikasi, versi, tanggal berlaku, pemilik, pembuat, pembaruan, serta lingkup akses.
- Penyimpanan file yang aman: upload divalidasi, jenis/ukuran file dibatasi, unduhan melalui pemeriksaan akses backend, dan file lama/versi sebelumnya dapat ditelusuri sesuai kebijakan retensi.
- Audit log untuk login, perubahan peran, publikasi, revisi, penghapusan/arsip, serta akses dokumen sensitif bila diwajibkan kebijakan kantor.
- Mekanisme backup dan pemulihan data. Jadwal, retensi, dan penanggung jawab ditetapkan bersama IT.

Panel admin/editor menggunakan API yang sama dan menampilkan hanya fungsi yang boleh dilakukan pengguna. Alur publikasi yang dituju: draft → ditinjau → terbit; revisi tidak boleh diam-diam menimpa versi yang sedang berlaku. Kebijakan HR dan SOP tetap memerlukan persetujuan pemilik proses, bukan hanya admin teknis.

Migrasi dari prototipe dilakukan bertahap: verifikasi data contoh, tetapkan skema dan pemilik konten, bangun login dan API, pindahkan satu jenis konten terlebih dahulu, lalu perluas setelah diuji. URL publik internal yang sudah digunakan seperti `/outlet` dan `/sop` dipertahankan sejauh mungkin. Data contoh tidak boleh otomatis diimpor sebagai data resmi.

### Tahap implementasi usulan

1. **Fondasi:** putuskan sumber identitas, matriks akses, pemilik konten, skema data, dan lokasi penyimpanan. Siapkan backend, database, migrasi, backup, serta lingkungan development/staging/production.
2. **Akses:** terapkan login, logout, sesi, deaktivasi akun, dan pemeriksaan izin di API serta unduhan. Uji akun karyawan, editor, approver, dan admin.
3. **Konten pertama:** pindahkan satu area yang datanya sudah disetujui (misalnya berita) ke API dan panel editor. Pastikan alur draft, persetujuan, publikasi, revisi, dan audit berjalan.
4. **Perluasan:** pindahkan SOP, HR, outlet, dokumen, dan area lain secara bertahap. Aktifkan pencarian yang menghormati hak akses, lalu pantau penggunaan dan perbaiki kualitas data.

Urutan area konten dapat berubah menurut kesiapan pemilik data. Tidak ada target tanggal atau janji integrasi sistem lain sebelum ketergantungannya disepakati.

### Kriteria penerimaan fase login dan backend

- Akun aktif dengan izin yang sesuai dapat login, melihat konten yang berhak dibaca, dan logout; akun nonaktif atau sesi kedaluwarsa tidak dapat mengambil data melalui URL langsung maupun API.
- Karyawan biasa tidak dapat mengakses fungsi editor/admin, termasuk dengan memanggil API secara langsung. Editor hanya bisa mengubah draft dalam lingkupnya; publikasi memerlukan approver yang berwenang.
- Konten draft, ditarik, atau dibatasi tidak muncul di daftar, detail, pencarian, ataupun file unduhan bagi pengguna yang tidak berhak.
- Publikasi/revisi menyimpan siapa, kapan, perubahan apa, dan versi yang berlaku. File unduhan yang dilindungi tidak dapat diambil hanya dengan menebak URL.
- Backup dapat dipulihkan dalam uji staging; prosedur rilis dan rollback terdokumentasi. Pengujian otomatis mencakup izin positif dan negatif untuk route/API penting.

## Alur pengguna

1. Karyawan membuka beranda atau URL langsung seperti `/outlet` dan melihat halaman yang benar setelah refresh.
2. Karyawan memilih menu atau mencari kata kunci. Hasil pencarian dapat dibedakan antara berita, SOP, outlet, dan informasi lain.
3. Karyawan membuka detail, memeriksa tanggal/versi/sumber, lalu membaca atau mengunduh dokumen yang benar-benar tersedia.
4. Saat berpindah halaman, alamat browser berubah dan tombol Back/Forward kembali ke halaman sebelumnya.

URL saat ini: `/`, `/berita`, `/berita/ID`, `/outlet`, `/sop`, `/informasi-hr`, `/corporate-action`, `/struktur-organisasi`, dan `/dokumen-form`. Detail section SOP memakai `/sop/nama-section`. Penambahan route harus berlaku baik pada navigasi client maupun fallback server.

## Aturan konten

Konten resmi tidak boleh dibuat dari tebakan. Sebelum mengganti data contoh, pastikan sumber, pemilik konten, tanggal berlaku/publikasi, dan persetujuan publikasi tersedia. Jika informasi belum lengkap, tampilkan status yang jujur seperti “Belum tersedia”, bukan tanggal, nama, versi, atau tautan unduh rekaan.

Data berita minimal memuat ID stabil, judul, kategori, ringkasan, isi, tanggal publikasi, dan status publikasi. Gambar dan label sorotan bersifat opsional. Data SOP minimal memuat judul, divisi/departemen, nomor atau versi, tanggal berlaku/pembaruan, pemilik, dan lokasi dokumen. Data outlet minimal memuat kode, nama, status, kota, alamat, jam operasional, dan tanggal verifikasi data; nama personel hanya ditampilkan jika disetujui. Model tersebut adalah kontrak konten yang dituju, bukan klaim bahwa semua field sudah tersedia di prototipe.

Gambar berita ditempatkan di `public/assets/images/news/`. Di `src/client/js/data/news.js`, properti `image` berisi URL seperti `/assets/images/news/town-hall.jpg`. Kartu, sorotan, dan detail menggunakan gambar yang sama; jika kosong, tetap gunakan gradasi bawaan. Jangan memakai path Windows sebagai URL browser.

## Kualitas dan keamanan

- Navigasi harus dapat diakses lewat keyboard, mempunyai teks yang jelas, dan mempertahankan URL saat refresh.
- Halaman harus responsif. Gambar diberi teks alternatif bila mengandung informasi; gambar dekoratif boleh memakai alt kosong.
- Tautan yang gagal atau dokumen yang tidak tersedia harus menampilkan kondisi yang jelas, bukan tombol palsu.
- Jangan memasukkan password, token, data HR pribadi, atau dokumen rahasia ke repository maupun file client. Sebelum konten internal nyata dipublikasikan, visibilitas repository, akses aplikasi, serta hak baca dokumen harus ditinjau bersama IT.
- Setelah login tersedia, gunakan sesi/cookie yang aman, pembatasan percobaan login, pencatatan kejadian keamanan, dan pemeriksaan izin pada backend. Detail teknisnya diputuskan dalam desain keamanan sebelum rilis.
- Konten yang berasal dari input atau sistem lain harus di-escape atau disanitasi sebelum dimasukkan ke HTML. Hindari membangun HTML langsung dari data yang tidak tepercaya.
- Tanggal, status outlet, versi SOP, dan kontak harus mempunyai proses pembaruan; data lama tidak boleh tampak seolah masih diverifikasi.

## Arsitektur dan batas file

Ikuti prinsip pembagian tanggung jawab yang dipakai di Demand Forecast System: route tipis, kode per fitur, komponen umum terpisah dari aturan bisnis, dan dokumentasi di `docs/`. Jangan menyalin Next.js, Prisma, database, worker, atau sistem auth dari Forecast ke Intranet hanya demi menyamakan nama folder. Stack prototipe saat ini tetap Node.js + TypeScript untuk server dan JavaScript vanilla untuk client. Backend yang sesungguhnya, database, dan login adalah pekerjaan fase berikutnya dengan desain teknis tersendiri.

| Lokasi saat ini | Tanggung jawab |
| --- | --- |
| `index.html` | Kerangka HTML dan urutan pemuatan script; tanpa data, CSS, atau logika bisnis. |
| `src/client/js/data/` | Data statis per domain. |
| `src/client/js/pages/` | Perilaku dan renderer khusus halaman. |
| `src/client/js/ui/` | Navigasi atau UI yang dipakai lebih dari satu halaman. |
| `src/client/js/app.js` | Daftar route, state navigasi, pencarian lintas halaman, dan bootstrap; jangan jadikan tempat semua fitur baru. |
| `src/client/css/` | Styling client. |
| `src/server/main.ts` | HTTP server, health-check, static asset, dan fallback halaman. |
| `public/assets/images/` | Gambar sumber statis. |
| `scripts/` | Proses build dan pekerjaan developer. |
| `dist/` | Hasil build; jangan diedit atau di-commit. |
| `docs/` | PRD, peta kode, dan keputusan teknis. |

Jika suatu modul membesar, arahkan ke pola `src/features/<nama-fitur>/` seperti Forecast: renderer, data adapter, tipe/kontrak, dan aturan fitur berada bersama. Migrasi bertahap itu harus menjaga URL dan perilaku yang sudah dipakai. Jangan membuat folder kosong hanya untuk terlihat mirip Forecast.

## Kriteria selesai untuk perubahan fitur

- Source ditempatkan sesuai tanggung jawab, bukan ditambahkan sebagai script/style/data inline di `index.html`.
- Route baru bisa diklik, dibuka langsung, di-refresh, dan dinavigasi dengan Back/Forward.
- Data dan gambar mempunyai sumber/lokasi yang jelas; konten contoh tidak disajikan sebagai kebijakan resmi.
- `npm run format:check`, `npm run typecheck`, dan `npm run build` berhasil. Perubahan route/asset juga diperiksa melalui HTTP pada hasil build.
- README dan peta kode diperbarui bila lokasi file, perintah build, atau cara deploy berubah.

## Keputusan yang masih diperlukan

Sebelum fase konten resmi atau panel admin, perusahaan perlu menetapkan pemilik konten tiap area, sumber data utama, aturan persetujuan/revisi, siapa yang boleh melihat konten tertentu, masa simpan dokumen, sumber identitas/SSO, proses deaktivasi akun, pilihan backend dan database, lokasi penyimpanan file, kebijakan backup/retensi, serta siapa yang mengoperasikan server. Sampai keputusan itu ada, pertahankan prototipe sebagai portal informasi non-rahasia.
