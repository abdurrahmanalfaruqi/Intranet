const I = (p) => `<svg viewBox="0 0 24 24">${p}</svg>`;
const PAGES = {
  home: [
    "Beranda",
    I('<path d="M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>'),
  ],
  news: [
    "Berita",
    I(
      '<path d="M4 5h13v14H6a2 2 0 0 1-2-2zM17 9h3v8a2 2 0 0 1-2 2M8 9h5M8 13h5"/>',
    ),
  ],
  outlet: [
    "Outlet",
    I(
      '<path d="M3 9l1.5-5h15L21 9M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M5 12v8h14v-8"/>',
    ),
  ],
  sop: [
    "SOP Departemen",
    I(
      '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    ),
  ],
  hr: [
    "Informasi HR",
    I(
      '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    ),
  ],
  corp: [
    "Corporate Action",
    I(
      '<path d="M3 11v2a1 1 0 0 0 1 1h3l6 4V6L7 10H4a1 1 0 0 0-1 1zM17 9a4 4 0 0 1 0 6"/>',
    ),
  ],
  org: [
    "Struktur Organisasi",
    I(
      '<rect x="9" y="3" width="6" height="5" rx="1"/><rect x="3" y="16" width="6" height="5" rx="1"/><rect x="15" y="16" width="6" height="5" rx="1"/><path d="M12 8v4M6 16v-4h12v4"/>',
    ),
  ],
  dl: [
    "Dokumen & Form",
    I(
      '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    ),
  ],
};
const CC = {
  Perusahaan: "linear-gradient(135deg,#5B338A,#9556d6)",
  HR: "linear-gradient(135deg,#FF009C,#5B338A)",
  Operasional: "linear-gradient(135deg,#3c1d60,#5B338A)",
  Outlet: "linear-gradient(135deg,#FFCE00,#FF009C)",
  Pencapaian: "linear-gradient(135deg,#FFCE00,#5B338A)",
};
