/* ==========================================================================
   PROJECT — renders one project from /content/projects.js
   URL: /after-hours/project/?p=<id>
   Block types are documented at the top of /content/projects.js.
   ========================================================================== */
(function () {
  const { esc } = HV;
  const ALL = window.PROJECTS;
  const id = new URLSearchParams(location.search).get('p');
  const idx = Math.max(0, ALL.findIndex(p => p.id === id));
  const P = ALL[idx], next = ALL[(idx + 1) % ALL.length];
  const M = f => `../../assets/projects/${P.id}/${f}`;
  const main = document.getElementById('main');

  document.title = `${P.title} · Harshad Vaghasiya`;
  document.querySelector('meta[name="description"]').setAttribute('content', `${P.title}: ${P.summary}`);
  if (!ALL.some(p => p.id === id)) history.replaceState(null, '', `?p=${P.id}`);

  const kindClass = P.kind === 'Live' ? 'live' : P.kind === 'Open brief' ? 'brief' : '';
  const browser = inner => `<div class="frame-browser"><div class="bar"><i></i><i></i><i></i></div>${inner}</div>`;
  const img = (src, alt, extra = '') => `<img src="${M(src)}" alt="${esc(alt || '')}" loading="lazy" decoding="async" ${extra}>`;

  const blocks = {
    text: b => `<section class="b b-text wrap"><h2 class="display rv">${esc(b.h)}</h2><div class="rv" style="--d:.1s">${(b.p || []).map(t => `<p>${esc(t)}</p>`).join('')}</div></section>`,
    list: b => `<section class="b b-text wrap"><h2 class="display rv">${esc(b.h)}</h2><div class="rv" style="--d:.1s">${b.p ? `<p>${esc(b.p)}</p>` : ''}<ol class="b-list">${b.items.map((t, i) => `<li><span class="mono">${String(i + 1).padStart(2, '0')}</span><span>${esc(t)}</span></li>`).join('')}</ol></div></section>`,
    img: b => {
      const inner = img(b.src, b.alt, 'data-zoom');
      const body = b.frame === 'browser' ? browser(inner) : inner;
      return `<figure class="b b-img fit-${b.fit || 'mid'} ${b.pad ? 'pad' : ''} rv" ${b.bg ? `style="--pad-bg:${esc(b.bg)}"` : ''}><div class="${b.fit === 'full' ? '' : 'wrap'}"><div class="shot">${body}</div>${b.cap ? `<figcaption class="mono">${esc(b.cap)}</figcaption>` : ''}</div></figure>`;
    },
    video: b => {
      const v = `<video muted loop playsinline preload="none" poster="${M(b.poster)}" data-src="${M(b.src)}"></video>`;
      return `<figure class="b b-img fit-wide rv"><div class="wrap"><div class="shot vid">${b.frame === 'browser' ? browser(v) : v}<button class="mono vbtn" type="button" aria-label="Pause video">Pause</button></div>${b.cap ? `<figcaption class="mono">${esc(b.cap)}</figcaption>` : ''}</div></figure>`;
    },
    grid: b => `<section class="b b-grid wrap cols-${b.cols || 2}">${b.items.map((it, i) => `<figure class="rv" style="--d:${(i % (b.cols || 2)) * .08}s"><div class="shot">${b.frame === 'browser' ? browser(img(it.src, it.alt, 'data-zoom')) : img(it.src, it.alt, 'data-zoom')}</div>${it.cap ? `<figcaption class="mono">${esc(it.cap)}</figcaption>` : ''}</figure>`).join('')}</section>`,
    compare: b => `<section class="b b-compare wrap"><div class="cmp-head"><h2 class="display rv">${esc(b.h)}</h2>${b.p ? `<p class="rv" style="--d:.1s">${esc(b.p)}</p>` : ''}</div>
      <div class="cmp rv" style="--d:.15s"><div class="cmp-row cmp-labels mono"><span>${esc(b.left || 'Before')}</span><span>${esc(b.right || 'After')}</span></div>
      ${b.rows.map(([l, r], i) => `<div class="cmp-row"><div class="cmp-l"><span class="mono n">${String(i + 1).padStart(2, '0')}</span><p>${esc(l)}</p></div><div class="cmp-r"><p>${esc(r)}</p></div></div>`).join('')}</div></section>`,
    phones: b => `<section class="b b-phones">${b.h ? `<div class="wrap"><h2 class="mono ph-h rv">${esc(b.h)} <span>${String(b.items.length).padStart(2, '0')} screens · drag</span></h2></div>` : ''}<div class="rail rv" tabindex="0" aria-label="${esc(b.h || 'Screens')}, scroll sideways"><div class="rail-in">${b.items.map(it => `<figure class="phone-f"><div class="phone">${img(it.src, it.cap)}</div><figcaption class="mono">${esc(it.cap)}</figcaption></figure>`).join('')}</div></div></section>`
  };

  main.innerHTML = `
  <section class="p-hero tone-${P.tone || 'dark'}" style="--bg:${esc(P.bg)};--accent:${esc(P.accent)}">
    <div class="wrap p-head">
      <p class="mono p-eye rv"><span>No. ${String(idx + 1).padStart(2, '0')} / ${String(ALL.length).padStart(2, '0')}</span><span class="tag ${kindClass}">${esc(P.kind)}</span></p>
      <h1 class="display p-title lines">${esc(P.title)}</h1>
      <p class="p-sub rv" style="--d:.2s">${esc(P.sub)}</p>
    </div>
    <div class="wrap"><div class="p-cover rv" style="--d:.25s"><img src="${M('hero.webp')}" alt="${esc(P.title)}" fetchpriority="high"></div></div>
  </section>

  <section class="p-intro wrap">
    <p class="lead rv">${esc(P.intro)}</p>
    <div class="side rv" style="--d:.12s">
      <dl class="p-facts">${(P.facts || []).map(([k, v]) => `<div><dt class="mono">${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
      ${(P.links || []).length ? `<div class="p-links">${P.links.map((l, i) => `<a class="btn ${i ? 'line' : 'solid'}" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}<span data-icon="out"></span></a>`).join('')}</div>` : ''}
    </div>
  </section>

  ${P.blocks.map(b => (blocks[b.t] || (() => ''))(b)).join('')}

  ${P.note ? `<p class="p-note wrap mono rv">${esc(P.note)}</p>` : ''}

  <a class="p-next" href="?p=${encodeURIComponent(next.id)}" style="--bg:${esc(next.bg)}">
    <div class="wrap p-next-in">
      <span class="mono">Next project</span>
      <span class="display p-next-t">${esc(next.title)} <i data-icon="arrow"></i></span>
      <span class="p-next-s">${esc(next.summary)}</span>
    </div>
    <div class="p-next-img"><img src="../../assets/projects/${next.id}/${esc(next.cover)}" alt="" loading="lazy"></div>
  </a>`;

  main.style.setProperty('--accent', P.accent || 'var(--moon)');
  HV.initIcons(main);
  document.getElementById('yr').textContent = new Date().getFullYear();

  // ---- Videos: load when near the screen, play only while visible ----
  const vio = new IntersectionObserver(es => es.forEach(e => {
    const v = e.target;
    if (e.isIntersecting) { if (!v.src) v.src = v.dataset.src; if (!v.dataset.user && !HV.reduce) v.play().catch(() => {}); }
    else v.pause();
  }), { rootMargin: '200px 0px', threshold: .25 });
  main.querySelectorAll('video').forEach(v => { vio.observe(v); v.addEventListener('canplay', () => v.closest('.vid').classList.add('ready'), { once: true }); });
  main.querySelectorAll('.vbtn').forEach(b => b.addEventListener('click', () => {
    const v = b.parentElement.querySelector('video');
    if (v.paused) { v.play(); delete v.dataset.user; b.textContent = 'Pause'; } else { v.pause(); v.dataset.user = '1'; b.textContent = 'Play'; }
  }));
  if (HV.reduce) main.querySelectorAll('.vbtn').forEach(b => b.textContent = 'Play');

  // ---- Phone rails: drag with a mouse, swipe on touch ----
  main.querySelectorAll('.rail').forEach(r => {
    let down = false, sx = 0, sl = 0, moved = false;
    r.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = r.scrollLeft; r.classList.add('drag'); });
    addEventListener('pointermove', e => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 3) moved = true; r.scrollLeft = sl - dx; });
    addEventListener('pointerup', () => { down = false; r.classList.remove('drag'); });
    r.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
  });

  // ---- Top bar colour over a light hero band ----
  const hero = main.querySelector('.p-hero');
  const tone = () => document.body.classList.toggle('on-light', P.tone === 'light' && scrollY < hero.offsetHeight * .45);
  addEventListener('scroll', tone, { passive: true }); tone();

  // ---- Hero cover: gentle parallax ----
  const cover = main.querySelector('.p-cover img');
  // starts slightly zoomed so the drift never uncovers an edge
  const drift = () => { const room = cover.offsetHeight * .04, y = Math.min(scrollY * .05, room); cover.style.transform = `translateY(${(y - room / 2).toFixed(1)}px) scale(1.09)`; };
  if (!HV.reduce) { addEventListener('scroll', drift, { passive: true }); drift(); }

  // ---- Lightbox for any zoomable image ----
  const lb = document.getElementById('lightbox'), lbImg = lb.querySelector('img');
  main.addEventListener('click', e => {
    const im = e.target.closest('img[data-zoom]'); if (!im || innerWidth < 700) return;
    lbImg.src = im.currentSrc || im.src; lbImg.alt = im.alt; lb.hidden = false; requestAnimationFrame(() => lb.classList.add('on'));
    document.documentElement.style.overflow = 'hidden';
  });
  const close = () => { lb.classList.remove('on'); document.documentElement.style.overflow = ''; setTimeout(() => lb.hidden = true, 350); };
  lb.addEventListener('click', close); addEventListener('keydown', e => { if (e.key === 'Escape' && !lb.hidden) close(); });
})();
