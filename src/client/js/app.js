let ov = "bagan";
const nav = document.getElementById("nav"),
  view = document.getElementById("view");
let cur = "home",
  fdiv = "Semua";
const ROUTES = {
  home: "/",
  news: "/berita",
  outlet: "/outlet",
  sop: "/sop",
  hr: "/informasi-hr",
  corp: "/corporate-action",
  org: "/struktur-organisasi",
  dl: "/dokumen-form",
};
nav.innerHTML = Object.entries(PAGES)
  .map(([k, v]) => `<a href="${ROUTES[k]}" data-k="${k}">${v[1]}${v[0]}</a>`)
  .join("");
nav.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-k]");
  if (!link) return;
  event.preventDefault();
  go(link.dataset.k);
});
document.getElementById("today").textContent = new Date().toLocaleDateString(
  "id-ID",
  { weekday: "long", day: "numeric", month: "long", year: "numeric" },
);
function mark(k) {
  [...nav.children].forEach((link) => {
    const active = link.dataset.k === k;
    link.classList.toggle("on", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}
function go(k, fromHistory = false) {
  if (!ROUTES[k]) k = "home";
  cur = k;
  document.getElementById("q").value = "";
  mark(k);
  if (!fromHistory && location.pathname !== ROUTES[k]) {
    history.pushState(null, "", ROUTES[k]);
  }
  document.title = `${PAGES[k][0]} | Orins Intranet`;
  render();
}
function holRows(n) {
  return HOL.slice(0, n)
    .map((h) => {
      const p = h[0].split(" ");
      return `<div class="row"><div class="hol"><div class="date"><b>${p[0]}</b>${p[1]}</div><div>${h[1]}<div class="mut">${h[0]}</div></div></div><span class="tag ${h[2] == "Libur Nasional" ? "" : "g"}">${h[2]}</span></div>`;
    })
    .join("");
}
function sopList(l) {
  return l.length
    ? `<div class="card tw"><table><thead><tr><th>Dokumen</th><th>Departemen</th><th>Versi</th><th>Diperbarui</th></tr></thead><tbody>${l.map((s) => `<tr><td><b>${s.title}</b><div class="mut">${s.div}</div></td><td>${s.dep}</td><td><span class="tag">${s.ver}</span></td><td class="mut">${s.upd}</td></tr>`).join("")}</tbody></table></div>`
    : `<p class="mut">Belum ketemu. Coba pakai kata lain.</p>`;
}
const V = {
  home: () => `<div class="hero"><div class="eyebrow">Orins Intranet</div><h1>Halo, selamat datang</h1><p>SOP, info HR, dan kabar dari kantor ada di sini. Tinggal cari, tidak perlu tanya ke sana-sini.</p></div>
${headline()}<div class="stats"><div class="stat"><b>${sops.length}</b><span>Dokumen SOP</span></div><div class="stat"><b>${DIVS.length}</b><span>Divisi</span></div><div class="stat"><b>${TREE.length}</b><span>Section</span></div><div class="stat"><b>${OUT.filter((o) => o.st == "Aktif").length}</b><span>Outlet aktif</span></div><div class="stat"><b>${HOL.length}</b><span>Hari libur 2027</span></div></div>
<div class="two"><div class="card"><h2>Libur yang Akan Datang</h2>${holRows(4)}</div><div class="card"><h2>Kabar Terbaru</h2>${CORP.map((c) => `<div class="row"><div>${c[0]}<div class="mut">${c[1]} · ${c[2]}</div></div></div>`).join("")}</div></div>`,
  news: () =>
    `<div class="eyebrow">Kabar Kantor</div><h1>Berita</h1><p class="sub">Informasi terbaru dari perusahaan, HR, dan outlet. (Data contoh)</p><div class="chips">${NCAT.map((c) => `<button class="chip ${c == fcat ? "on" : ""}" onclick="fcat='${c}';render()">${c}</button>`).join("")}</div>${newsCards(NEWS.filter((n) => fcat == "Semua" || n.cat == fcat))}`,
  outlet: () => {
    const l = OUT.filter(
      (o) =>
        (ofil.st == "Semua" || o.st == ofil.st) &&
        (ofil.k == "Semua" || o.k == ofil.k) &&
        (ofil.sa == "Semua" || o.sa == ofil.sa),
    );
    return `<div class="eyebrow">Jaringan</div><h1>Outlet</h1><p class="sub">Jam buka, supervisor, dan alamat outlet. Data per ${OUPD}.</p><div class="fl">${sel("st", ["Semua", "Aktif", "On Progress", "Non Aktif"], ofil.st, "Status")}${sel("k", ["Semua", ...OKOTA], ofil.k, "Kota")}${sel("sa", ["Semua", ...OSA], ofil.sa, "Supervisor area")}</div><p class="mut" style="margin-bottom:14px">Menampilkan ${l.length} dari ${OUT.length} outlet</p>${outCards(l)}`;
  },
  sop: () =>
    `<div class="eyebrow">Dokumen</div><h1>SOP Departemen</h1><p class="sub">Pilih divisi di bawah, atau langsung cari lewat kolom di atas.</p><div class="chips">${["Semua", ...DIVS].map((d) => `<button class="chip ${d == fdiv ? "on" : ""}" onclick="fdiv='${d}';render()">${d}</button>`).join("")}</div>${sopList(sops.filter((s) => fdiv == "Semua" || s.div == fdiv))}`,
  hr: () =>
    `<div class="eyebrow">HR</div><h1>Informasi HR</h1><p class="sub">Tanggal merah dan cuti bersama, biar gampang atur jadwal. (Data contoh)</p><div class="card">${holRows(HOL.length)}</div>`,
  corp: () =>
    `<div class="eyebrow">Perusahaan</div><h1>Corporate Action</h1><p class="sub">Kabar dan agenda terbaru dari perusahaan.</p><div class="grid">${CORP.map((c) => `<div class="card"><span class="tag g">Aktif</span><h3 style="margin-top:12px">${c[0]}</h3><div class="mut">${c[1]}<br>${c[2]}</div></div>`).join("")}</div>`,
  org: () =>
    `<div class="eyebrow">Organisasi</div><h1>Struktur Organisasi</h1><p class="sub">Orins Corp, Rev. Oktober 2026 (SO 17 Nov 2026). Geser ke samping untuk melihat bagan lengkap.</p><div class="chips"><button class="chip ${ov == "bagan" ? "on" : ""}" onclick="ov='bagan';render()">Bagan</button><button class="chip ${ov == "daftar" ? "on" : ""}" onclick="ov='daftar';render()">Daftar</button></div>${ov == "bagan" ? `<div class="lg"><span><i style="background:#5B338A"></i>CEO / Divisi</span><span><i style="background:#FF009C"></i>Departemen</span><span><i style="background:#FFCE00"></i>Seksi</span><span><i style="border:1px solid var(--ln)"></i>Staf</span></div><div class="card oc"><div class="ot">${ocNode(T, 0)}</div></div><p class="mut" style="margin-top:12px">Tanda * berarti pejabat merangkap (nama sama dengan atasan di level di atasnya).</p>` : `<div class="card">${ocList(T, 0)}</div>`}`,
  dl: () =>
    `<div class="eyebrow">Unduhan</div><h1>Dokumen & Form</h1><p class="sub">Form yang paling sering dicari karyawan.</p><div class="grid">${["Form Cuti", "Form Reimbursement", "Form Permintaan IT", "Form Perjalanan Dinas", "Surat Keterangan Kerja", "Form Pengajuan Lembur"].map((f) => `<div class="card click"><span class="tag">PDF</span><h3 style="margin-top:12px">${f}</h3><div class="mut">120 KB</div></div>`).join("")}</div>`,
};
function openSec(s, fromHistory = false) {
  cur = "sop";
  fdiv = "Semua";
  mark("sop");
  if (!fromHistory)
    history.pushState(null, "", `/sop/${encodeURIComponent(s)}`);
  document.title = `${s} | Orins Intranet`;
  view.innerHTML =
    `<div class="eyebrow">SOP</div><h1>${s}</h1><p class="sub"><a class="back" href="#" onclick="go('org');return false">← Balik ke struktur</a></p>` +
    sopList(sops.filter((x) => x.sec == s));
}
function search(v) {
  v = v.trim().toLowerCase();
  if (!v) return render();
  const r = sops.filter((s) =>
      (s.title + s.dep + s.div + s.sec).toLowerCase().includes(v),
    ),
    nw = NEWS.filter((n) =>
      (n.title + n.sum + n.cat).toLowerCase().includes(v),
    ),
    ou = OUT.filter((o) =>
      (o.n + o.c + o.k + o.a + o.so + o.sa).toLowerCase().includes(v),
    ),
    pp = PPL.filter((q) =>
      (q.name + q.role + q.unit).toLowerCase().includes(v),
    );
  view.innerHTML =
    `<h1>Hasil pencarian</h1><p class="sub">${r.length} dokumen, ${nw.length} berita, ${ou.length} outlet, dan ${pp.length} karyawan cocok dengan “${v}”</p>` +
    (nw.length
      ? `<h3 style="margin-bottom:12px">Berita</h3>` +
        newsCards(nw) +
        `<div style="height:22px"></div>`
      : "") +
    (pp.length
      ? `<h3 style="margin-bottom:12px">Karyawan</h3><div class="card" style="margin-bottom:22px">${pp
          .slice(0, 10)
          .map(
            (q) =>
              `<div class="row"><div><b>${q.name}</b><div class="mut">${q.role}</div></div><span class="mut" style="text-align:right;max-width:55%">${q.unit}</span></div>`,
          )
          .join(
            "",
          )}${pp.length > 10 ? `<div class="mut" style="padding-top:12px">dan ${pp.length - 10} lainnya. Persempit kata kuncinya.</div>` : ""}</div>`
      : "") +
    (ou.length
      ? `<h3 style="margin-bottom:12px">Outlet</h3>` +
        outCards(ou.slice(0, 12)) +
        (ou.length > 12
          ? `<div class="mut" style="margin-top:10px">dan ${ou.length - 12} outlet lainnya. Persempit kata kuncinya.</div>`
          : "") +
        `<div style="height:22px"></div>`
      : "") +
    (r.length ? `<h3 style="margin-bottom:12px">SOP</h3>` : "") +
    (r.length || nw.length || ou.length || pp.length
      ? r.length
        ? sopList(r)
        : ""
      : sopList([]));
}
function render() {
  view.innerHTML = V[cur]();
  if (cur == "home") setFeat(0);
}
document
  .getElementById("q")
  .addEventListener("input", (event) => search(event.target.value));
function showLocation() {
  const path = location.pathname;
  const newsMatch = path.match(/^\/berita\/(\d+)$/);
  if (newsMatch) return openNews(Number(newsMatch[1]), true);
  if (path.startsWith("/sop/")) {
    try {
      return openSec(decodeURIComponent(path.slice("/sop/".length)), true);
    } catch {
      /* invalid URL falls back to SOP */
    }
  }
  const page = Object.keys(ROUTES).find((key) => ROUTES[key] === path);
  if (path === "/index.html") history.replaceState(null, "", "/");
  go(page ?? "home", true);
}
window.addEventListener("popstate", showLocation);
showLocation();
