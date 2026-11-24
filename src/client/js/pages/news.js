// Simpan gambar berita di public/assets/images/news/, lalu isi NEWS[].image.
function newsCover(n, overlay = false) {
  if (!n.image) return `background:${CC[n.cat]}`;
  const shade = overlay
    ? "linear-gradient(90deg,rgba(38,18,61,.88),rgba(38,18,61,.25)),"
    : "";
  return `background:${shade}url('${n.image}') center/cover`;
}
let fi = 0,
  fcat = "Semua";
function setFeat(i) {
  fi = i;
  const P = NEWS.filter((n) => n.pin),
    n = P[i],
    el = document.getElementById("feat");
  if (!el) return;
  el.innerHTML = `<div class="fcard" style="${newsCover(n, true)}" onclick="openNews(${n.id})"><div class="fin"><span class="tag y">${n.cat}</span><h2>${n.title}</h2><p>${n.sum}</p><div class="meta">${n.date}</div></div><div class="dots">${P.map((_, k) => `<i class="${k == i ? "on" : ""}" onclick="event.stopPropagation();setFeat(${k})"></i>`).join("")}</div></div>`;
}
function headline() {
  return `<div class="sech"><h2>Sorotan Berita</h2><a class="back" href="#" onclick="go('news');return false">Lihat semua →</a></div><div class="hlwrap"><div id="feat"></div><div class="card"><h2>Berita Lainnya</h2>${NEWS.filter(
    (n) => !n.pin,
  )
    .slice(0, 3)
    .map(
      (n) =>
        `<div class="row nr" onclick="openNews(${n.id})"><div><span class="tag">${n.cat}</span><div style="margin:7px 0 2px"><b>${n.title}</b></div><div class="mut">${n.date}</div></div></div>`,
    )
    .join("")}</div></div>`;
}
function newsCards(l) {
  return l.length
    ? `<div class="grid">${l.map((n) => `<div class="card click" onclick="openNews(${n.id})"><div class="cv" style="${newsCover(n)}"></div><span class="tag">${n.cat}</span><h3 style="margin-top:10px">${n.title}</h3><div class="mut">${n.sum}</div><div class="mut" style="margin-top:10px">${n.date}</div></div>`).join("")}</div>`
    : "";
}
function openNews(id, fromHistory = false) {
  const n = NEWS.find((x) => x.id == id);
  if (!n) {
    history.replaceState(null, "", "/berita");
    return go("news", true);
  }
  cur = "news";
  mark("news");
  if (!fromHistory) history.pushState(null, "", `/berita/${n.id}`);
  document.title = `${n.title} | Orins Intranet`;
  view.innerHTML = `<div class="art"><p><a class="back" href="#" onclick="go('news');return false">← Semua berita</a></p><span class="tag">${n.cat}</span><h1 style="margin-top:12px;font-size:28px;line-height:1.25">${n.title}</h1><div class="mut">${n.date} · Diposting oleh Corporate Communication</div><div class="cv" style="${newsCover(n)}"></div>${n.body.map((b) => `<p>${b}</p>`).join("")}</div>`;
  window.scrollTo(0, 0);
}
setInterval(() => {
  if (
    cur == "home" &&
    document.getElementById("feat") &&
    !document.getElementById("q").value
  )
    setFeat((fi + 1) % NEWS.filter((n) => n.pin).length);
}, 6000);
