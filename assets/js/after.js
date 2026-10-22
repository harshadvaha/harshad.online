/* ==========================================================================
   AFTER HOURS — renders /content/projects.js into a justified grid.
   - Filters (state kept in the URL hash, e.g. /after-hours/#brand)
   - Rows of 2 or 3 tiles; tiles in a row share one height (see after.css)
   - Hover (or scroll into view on touch) plays a short muted clip when a project has one
   - A "View" cursor follows the pointer over tiles
   ========================================================================== */
(function () {
  const { esc } = HV, $ = id => document.getElementById(id);
  const ALL = window.PROJECTS;
  const AR = { wide: 1.6, '': 1.2, tall: .8 };                     // tile shape → aspect ratio
  const CATS = [['all', 'All', null], ['interface', 'Interfaces', 'Interface'], ['web', 'Web apps', 'Web app'], ['brand', 'Brand & print', 'Brand']];
  const media = id => `../assets/projects/${id}/`;
  const touch = matchMedia('(hover: none), (pointer: coarse)').matches;

  // ---- Filters ----
  const fbar = $('filters');
  fbar.innerHTML = CATS.map(([k, label, c]) => `<button type="button" data-k="${k}" aria-pressed="false">${label} <span class="n">${String(c ? ALL.filter(p => p.cat === c).length : ALL.length).padStart(2, '0')}</span></button>`).join('');
  let current = (location.hash.slice(1) || 'all'); if (!CATS.some(c => c[0] === current)) current = 'all';

  // Split n tiles into rows of 2 and 3, never leaving a single tile alone
  function rows(n) {
    if (n <= 3) return [n];
    const out = []; let rem = n, k = 2;
    while (rem > 0) { let take = Math.min(k, rem); if (rem - take === 1) take = take === 2 ? 3 : 2; if (take > rem) take = rem; out.push(take); rem -= take; k = k === 2 ? 3 : 2; }
    return out;
  }

  function tile(p, i) {
    const ar = AR[p.size || ''] ?? 1.2;
    const kindClass = p.kind === 'Live' ? 'live' : p.kind === 'Open brief' ? 'brief' : '';
    return `<a class="tile rv" href="project/?p=${encodeURIComponent(p.id)}" style="--ar:${ar};--bg:${esc(p.bg)};--d:${(i % 3) * .08}s" data-id="${esc(p.id)}" aria-label="${esc(p.title)}, ${esc(p.sub)}">
      <div class="media">
        <span class="idx">${String(ALL.indexOf(p) + 1).padStart(2, '0')} / ${String(ALL.length).padStart(2, '0')}</span>
        <img src="${media(p.id)}${esc(p.cover)}" alt="" loading="${i < 2 ? 'eager' : 'lazy'}" decoding="async">
        ${p.tile ? `<video muted loop playsinline preload="none" data-src="${media(p.id)}${esc(p.tile)}"></video>` : ''}
      </div>
      <div class="cap">
        <span class="yr">${esc(p.sub)}</span>
        <span class="tag ${kindClass}">${esc(p.kind)}</span>
        <span class="t">${esc(p.title)}</span>
        <span class="s">${esc(p.summary)}</span>
      </div>
    </a>`;
  }

  const grid = $('grid');
  function render() {
    const cat = CATS.find(c => c[0] === current)[2];
    const list = cat ? ALL.filter(p => p.cat === cat) : ALL;
    let i = 0;
    grid.innerHTML = rows(list.length).map(n => `<div class="grow-row">${list.slice(i, i += n).map((p, j) => tile(p, i - n + j)).join('')}</div>`).join('');
    fbar.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.k === current)));
    HV.initReveal(grid);
    wireTiles();
  }

  fbar.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b || b.dataset.k === current) return;
    current = b.dataset.k; history.replaceState(null, '', current === 'all' ? location.pathname : '#' + current);
    grid.classList.add('swap'); setTimeout(() => { render(); grid.classList.remove('swap'); }, 260);
  });

  // ---- Tile video ----
  function play(t, on) {
    const v = t.querySelector('video'); if (!v || HV.reduce) return;
    if (on) {
      if (!v.src) v.src = v.dataset.src;
      const show = () => t.classList.add('playing');
      // reveal only once a real frame is painted, so the cover never blinks to black
      v.play().then(() => { 'requestVideoFrameCallback' in v ? v.requestVideoFrameCallback(show) : setTimeout(show, 120); }).catch(() => {});
    }
    else { t.classList.remove('playing'); setTimeout(() => v.pause(), 500); }
  }
  let vio;
  function wireTiles() {
    const tiles = grid.querySelectorAll('.tile');
    if (touch) {
      vio && vio.disconnect();
      vio = new IntersectionObserver(es => es.forEach(e => play(e.target, e.isIntersecting)), { threshold: .65 });
      tiles.forEach(t => t.querySelector('video') && vio.observe(t));
    } else {
      tiles.forEach(t => { t.addEventListener('mouseenter', () => { play(t, true); cur(true); }); t.addEventListener('mouseleave', () => { play(t, false); cur(false); }); });
    }
  }

  // ---- "View" cursor ----
  const cursor = $('cursor'); let cx = -200, cy = -200;
  function cur(on) { cursor.style.setProperty('--cs', on ? 1 : 0); }
  if (!touch && !HV.reduce) {
    document.body.classList.add('has-cursor');
    addEventListener('pointermove', e => { cx = e.clientX; cy = e.clientY; cursor.style.setProperty('--cx', cx + 'px'); cursor.style.setProperty('--cy', cy + 'px'); }, { passive: true });
  }

  // ---- Night dial: real India time with 5 PM – 9 PM marked ----
  (function nightDial() {
    const svg = $('night-dial'), C = 100;
    const P = (a, r) => [C + r * Math.sin(a * Math.PI / 180), C - r * Math.cos(a * Math.PI / 180)];
    let h = `<circle class="face" cx="100" cy="100" r="96"/>`;
    const [sx, sy] = P(150, 80), [ex, ey] = P(270, 80);
    h += `<path class="shift" d="M${sx} ${sy} A80 80 0 0 1 ${ex} ${ey}"/>`;
    for (let i = 0; i < 60; i++) { const maj = i % 5 === 0, [a, b] = P(i * 6, 92), [c, d] = P(i * 6, maj ? 84 : 88); h += `<line class="tk${maj ? ' major' : ''}" x1="${a}" y1="${b}" x2="${c}" y2="${d}"/>`; }
    [12, 3, 6, 9].forEach(n => { const [x, y] = P(n * 30, 70); h += `<text class="num" x="${x}" y="${y}">${n === 12 ? '12' : String(n).padStart(2, '0')}</text>`; });
    h += `<g class="hand-g" id="nh"><line class="hh" x1="100" y1="100" x2="100" y2="54"/></g><g class="hand-g" id="nm"><line class="mh" x1="100" y1="108" x2="100" y2="26"/></g><circle cx="100" cy="100" r="4" fill="var(--night-ink)"/>`;
    svg.innerHTML = h;
    const nh = $('nh'), nm = $('nm'), cap = $('night-cap');
    function set() {
      const { H, M } = HV.istParts();
      nh.style.transform = `rotate(${(H % 12) * 30 + M * .5}deg)`; nm.style.transform = `rotate(${M * 6}deg)`;
      const tt = `${HV.t12(H, M)} IST`;
      if (H >= 17 && H < 21) cap.textContent = `After hours · ${tt}`;
      else if (H >= 9 && H < 17) { const left = (17 * 60) - (H * 60 + M); cap.textContent = `${tt} · after hours in ${Math.floor(left / 60)}h ${String(left % 60).padStart(2, '0')}m`; }
      else cap.textContent = `${tt} · resting`;
    }
    set(); setInterval(set, 20000);
  })();

  // ---- Design groundwork (courses), placed after the projects ----
  const L = window.DESIGN_LEARNING, gw = $('groundwork');
  if (L && gw) gw.innerHTML = `<div class="gw-head rv"><p class="mono">Groundwork · LinkedIn Learning</p><h2 class="display" id="gw-h">Where it started</h2><p class="gw-intro">${esc(L.intro)}</p></div>
    <ol class="gw-list rv" style="--d:.1s">${L.items.map(c => `<li><span class="gw-t">${esc(c.title)}${c.note ? `<span class="gw-n">${esc(c.note)}</span>` : ''}</span><span class="mono">${esc(c.year)}</span></li>`).join('')}</ol>`;

  $('yr').textContent = new Date().getFullYear();
  render();
})();
