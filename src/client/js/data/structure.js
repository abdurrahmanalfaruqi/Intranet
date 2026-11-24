const TREE = `Finance|Finance|C/F & Payment
Finance|Finance|Finance
Finance|Accounting MPO & Tax|Accounting
Finance|Accounting MPO & Tax|Tax
Finance|Non MPO Accounting|Accounting Logistic
Finance|Non MPO Accounting|Accounting others
Finance|Legal|External Affair
Finance|Legal|Legal
HR & Ops. Support|HR|Planning & Development
HR & Ops. Support|HR|Operations
HR & Ops. Support|IT|IT Ops. & Maintenance
HR & Ops. Support|IT|IT Development
HR & Ops. Support|Facilities Management|Dev. & Maintenance
HR & Ops. Support|Facilities Management|Building Management
Sales & Marketing|Marketing|MPO
Sales & Marketing|Marketing|Non MPO
Sales & Marketing|Sales|Online
Sales & Marketing|Sales|Offline
Supply Chain Management|Production & Logistic|Inventory & Distribution
Supply Chain Management|Production & Logistic|Logistic Planning & Control
Supply Chain Management|Production & Logistic|Production & Quality
Supply Chain Management|Procurement|Procurement Planning Control
Supply Chain Management|Procurement|Strategic & Core Procurement
Supply Chain Management|Procurement|Indirect & General Procurement
Operation|Technical|R & D
Operation|Technical|Quality & Standardization
Operation|Outlet Ops|Area Operations
Operation|Outlet Ops|Planning, Aset & Improvement`
  .split("\n")
  .map((l) => l.split("|"));
const DIVS = [...new Set(TREE.map((r) => r[0]))];
const ST = [
  "SOP Utama",
  "Panduan Kerja Harian",
  "Form & Template",
  "Checklist Bulanan",
];
const sops = TREE.flatMap((r, i) =>
  ST.slice(0, 2 + (i % 3)).map((t, j) => ({
    div: r[0],
    dep: r[1],
    sec: r[2],
    title: `${t} – ${r[2]}`,
    ver: `v${1 + ((i + j) % 3)}.${j}`,
    upd: `${10 + ((i * 3 + j) % 18)} Nov 2026`,
  })),
);
const HOL = [
  ["1 Jan 2027", "Tahun Baru Masehi", "Libur Nasional"],
  ["6 Feb 2027", "Tahun Baru Imlek", "Libur Nasional"],
  ["9 Mar 2027", "Hari Raya Nyepi", "Libur Nasional"],
  ["10 Mar 2027", "Idul Fitri 1448 H (perkiraan)", "Libur Nasional"],
  ["26 Mar 2027", "Cuti Bersama", "Cuti Bersama"],
  ["1 Mei 2027", "Hari Buruh", "Libur Nasional"],
  ["17 Ags 2027", "HUT RI", "Libur Nasional"],
  ["25 Des 2027", "Hari Natal", "Libur Nasional"],
];
const CORP = [
  ["Town Hall Q4 2026", "28 Nov 2026", "Ruang Rapat Utama / Zoom"],
  [
    "Pembukaan Outlet Baru, Area Tangerang",
    "5 Des 2026",
    "Tim Operation diundang semua",
  ],
  [
    "Pembaruan Kebijakan Reimbursement",
    "1 Jan 2027",
    "Berlaku untuk semua karyawan",
  ],
];
