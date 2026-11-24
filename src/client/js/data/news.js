// Contoh gambar opsional: image: "/assets/images/news/town-hall.jpg"
const NEWS = [
  {
    id: 1,
    cat: "Perusahaan",
    pin: 1,
    date: "24 Nov 2026",
    title: "Town Hall Q4 2026: Arah Bisnis dan Target Orins di 2027",
    sum: "Manajemen akan membahas capaian tahun ini dan rencana ekspansi tahun depan. Semua karyawan diundang hadir.",
    body: [
      "Town Hall Q4 2026 akan diadakan pada 28 November 2026 di Ruang Rapat Utama, dan bisa diikuti lewat Zoom untuk tim outlet dan area.",
      "Agenda meliputi capaian penjualan tahun berjalan, rencana pembukaan outlet baru, dan sesi tanya jawab langsung dengan manajemen. Pertanyaan bisa dikirim lebih dulu lewat HR.",
    ],
  },
  {
    id: 2,
    cat: "Outlet",
    pin: 1,
    date: "22 Nov 2026",
    title: "Outlet Baru di Tangerang Siap Dibuka 5 Desember",
    sum: "Tim Operation dan Marketing sudah menyiapkan hari pembukaan. Cek jadwal dan pembagian tugasnya di sini.",
    body: [
      "Pembukaan outlet baru Area Tangerang dijadwalkan 5 Desember 2026. Persiapan stok, pelatihan crew, dan instalasi sistem kasir sudah berjalan.",
      "Tim Area Operations akan membagikan jadwal piket pembukaan minggu ini. Hubungi koordinator area untuk detailnya.",
    ],
  },
  {
    id: 3,
    cat: "HR",
    pin: 1,
    date: "20 Nov 2026",
    title: "Kebijakan Reimbursement Baru Berlaku 1 Januari 2027",
    sum: "Ada perubahan batas pengajuan dan kelengkapan bukti. Baca ringkasannya sebelum mengajukan klaim berikutnya.",
    body: [
      "Mulai 1 Januari 2027, pengajuan reimbursement harus dilakukan maksimal 14 hari setelah tanggal transaksi, lengkap dengan bukti asli atau foto yang jelas.",
      "Form terbaru sudah tersedia di menu Dokumen & Form. Kalau ada yang kurang jelas, tanyakan ke tim Finance atau HR.",
    ],
  },
  {
    id: 4,
    cat: "Pencapaian",
    date: "18 Nov 2026",
    title: "Outlet Bintaro Raih Skor Kualitas Tertinggi Bulan Ini",
    sum: "Selamat untuk seluruh crew Bintaro atas konsistensi rasa dan pelayanan.",
  },
  {
    id: 5,
    cat: "Operasional",
    date: "15 Nov 2026",
    title: "Jadwal Pemeliharaan Sistem Kasir Akhir Pekan Ini",
    sum: "Akan ada pembaruan sistem pada Sabtu malam. Outlet diminta menyiapkan pencatatan manual sementara.",
  },
  {
    id: 6,
    cat: "HR",
    date: "12 Nov 2026",
    title: "Pendaftaran Pelatihan Kepemimpinan Dibuka sampai 30 November",
    sum: "Terbuka untuk supervisor dan calon supervisor dari semua divisi.",
  },
];
NEWS.forEach((n) => {
  if (!n.body)
    n.body = [
      n.sum,
      "Informasi lengkap akan dibagikan oleh tim terkait. Silakan hubungi departemen yang bersangkutan jika ada pertanyaan.",
    ];
});
const NCAT = ["Semua", ...new Set(NEWS.map((n) => n.cat))];
