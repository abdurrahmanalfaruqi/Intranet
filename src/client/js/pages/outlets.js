let ofil = { st: "Aktif", k: "Semua", sa: "Semua" };
const fh = (x) => {
  const h = Math.floor(x),
    m = Math.round((x - h) * 60);
  return String(h).padStart(2, "0") + "." + String(m).padStart(2, "0");
};
const isWe = () => [0, 6].includes(new Date().getDay());
function isOpen(o) {
  if (o.st != "Aktif") return null;
  const t = isWe() ? o.we : o.wd;
  if (!t) return null;
  if (t == "24") return true;
  const d = new Date(),
    h = d.getHours() + d.getMinutes() / 60,
    a = t[0],
    b = t[1];
  return b <= a ? h >= a || h < b : h >= a && h < b;
}
function hrs(o) {
  if (!o.wd) return "Belum ada data";
  if (o.wd == "24") return "Buka 24 jam";
  const f = (t) => fh(t[0]) + " – " + fh(t[1]) + " WIB";
  if (o.we[0] == o.wd[0] && o.we[1] == o.wd[1])
    return "Setiap hari, " + f(o.wd);
  return "Senin–Jumat, " + f(o.wd) + "<br>Sabtu–Minggu, " + f(o.we);
}
const KI = {
  t: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  u: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  a: '<svg viewBox="0 0 24 24"><path d="M12 3 3 8l9 5 9-5zM3 13l9 5 9-5"/></svg>',
  m: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
};
function badge(o) {
  if (o.st == "On Progress") return '<span class="st p">On Progress</span>';
  if (o.st == "Non Aktif") return '<span class="st n">Non Aktif</span>';
  const b = isOpen(o);
  return b === null
    ? '<span class="st n">Aktif</span>'
    : b
      ? '<span class="st o">Buka</span>'
      : '<span class="st c">Tutup</span>';
}
const nd = (v) => v || "Belum ada data";
function outCards(l) {
  return l.length
    ? `<div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(310px,1fr))">${l.map((o) => `<div class="card ocard"><div class="oh"><div><h3>${o.n}</h3><div class="mut">${o.c} · ${o.k}</div></div>${badge(o)}</div><div class="kv">${KI.t}<div><small>Jam operasional</small>${hrs(o)}</div>${KI.u}<div><small>Supervisor outlet</small>${nd(o.so)}</div>${KI.a}<div><small>Supervisor area</small>${nd(o.sa)}</div>${KI.m}<div><small>Alamat</small>${o.a}</div></div></div>`).join("")}</div>`
    : `<p class="mut">Belum ketemu. Coba ubah filternya.</p>`;
}
const sel = (id, arr, v, lbl) =>
  `<select onchange="ofil.${id}=this.value;render()" aria-label="${lbl}">${arr.map((x) => `<option value="${x}" ${x == v ? "selected" : ""}>${x == "Semua" ? lbl + ": Semua" : x}</option>`).join("")}</select>`;
