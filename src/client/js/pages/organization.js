const esc = (t) => t.replace(/&/g, "&amp;");
function ocNode(x, l) {
  l = x.lv ?? l;
  const box = `<div class="ob l${l}"><b>${esc(x.n)}</b>${x.h ? `<span>${esc(x.h).replace(/\n/g, "<br>")}</span>` : ""}</div>`;
  let k = [];
  if (x.c) k = x.c.map((c) => `<div class="it">${ocNode(c, l + 1)}</div>`);
  if (x.s && !x.s.length)
    k = [`<div class="it"><div class="stf vac">Vacant</div></div>`];
  if (x.s && x.s.length)
    k = x.s.map(
      (q) =>
        `<div class="it"><div class="stf${q.includes("Team Leader") ? " tl" : ""}">${esc(q)}</div></div>`,
    );
  return `<div class="tn">${box}${k.length ? `<div class="kids">${k.join("")}</div>` : ""}</div>`;
}
function ocList(x, d) {
  const hd = x.h ? esc(x.h).replace(/\n/g, " · ") : "";
  if (x.s)
    return `<div class="ls"><b>${esc(x.n)}</b>${hd ? `<div class="mut">${hd}</div>` : ""}<div>${x.s.length ? x.s.map((q) => `<span class="pc">${esc(q)}</span>`).join("") : '<span class="pc v">Vacant</span>'}</div></div>`;
  return `<details class="od ${d == 0 ? "top" : ""}" ${d < 2 ? "open" : ""}><summary><b>${esc(x.n)}</b>${hd ? `<span class="mut"> · ${hd}</span>` : ""}</summary>${(x.c || []).map((c) => ocList(c, d + 1)).join("")}</details>`;
}
const PPL = [];
const seen = new Set();
function cl(t) {
  let role = "";
  t = t
    .replace(/^\*/, "")
    .replace(/^(Chief|Advisor):\s*/, "")
    .replace(/^Coord:\s*/, "");
  const m = t.match(/\s*\((.*?)\)\s*$/);
  if (m && /Leader/.test(m[1])) {
    role = m[1];
    t = t.replace(/\s*\(.*?\)\s*$/, "");
  }
  return [t.replace(/^\*/, "").trim(), role];
}
(function w(x, path) {
  const pt = [...path, x.n];
  if (x.h)
    x.h.split("\n").forEach((l) => {
      if (/Deputy/.test(l)) return;
      const [nm] = cl(l);
      if (nm && nm != "New") {
        const k = nm + "|" + x.n;
        if (!seen.has(k)) {
          seen.add(k);
          PPL.push({
            name: nm,
            role: /^Chief|Member|Committee/.test(x.n) ? x.n : "Kepala " + x.n,
            unit: pt.join(" › "),
          });
        }
      }
    });
  if (x.s)
    x.s.forEach((q) => {
      const [nm, rl] = cl(q);
      const k = nm + "|" + x.n + "|s";
      if (!seen.has(k)) {
        seen.add(k);
        PPL.push({ name: nm, role: rl || "Staf " + x.n, unit: pt.join(" › ") });
      }
    });
  if (x.c) x.c.forEach((c) => w(c, pt));
})(T, []);
