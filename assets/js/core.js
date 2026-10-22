/* ==========================================================================
   CORE — shared behaviour for every page.
   - ICONS: inline SVG strings used across pages
   - Reveal on scroll (.rv, .lines)
   - Top bar background after scrolling
   - Page-to-page "veil" transition (links with data-go="day" | "night")
   - Small helpers: el(), esc(), istTime()
   ========================================================================== */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ICONS = {
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>',
    github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.1 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"/></svg>',
    behance: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7.8 5.1c.8 0 1.5.1 2.1.2.6.1 1.1.3 1.5.6.4.3.8.7 1 1.1.2.5.3 1 .3 1.7 0 .7-.2 1.3-.5 1.8-.3.5-.8.9-1.5 1.2.9.3 1.6.7 2 1.3.4.6.7 1.4.7 2.2 0 .7-.1 1.3-.4 1.8-.3.5-.6.9-1.1 1.2-.5.3-1 .6-1.6.7-.6.2-1.2.2-1.8.2H0V5.1h7.8zm-.4 5.5c.6 0 1.1-.1 1.5-.4.4-.3.6-.8.6-1.4 0-.4-.1-.7-.2-.9-.1-.2-.3-.4-.5-.5-.2-.1-.5-.2-.8-.3-.3 0-.6-.1-.9-.1H3.4v3.6h4zm.2 5.8c.3 0 .7 0 1-.1.3-.1.6-.2.8-.3.2-.2.4-.4.6-.6.1-.3.2-.6.2-1 0-.8-.2-1.3-.7-1.7-.4-.3-1-.5-1.8-.5H3.4v4.2h4.2zm12.5-.1c.5.5 1.2.7 2.1.7.7 0 1.2-.2 1.7-.5.5-.3.8-.7.9-1h2.9c-.5 1.4-1.2 2.4-2.1 3-.9.6-2.1.9-3.4.9-.9 0-1.8-.1-2.5-.4-.8-.3-1.4-.7-1.9-1.3-.5-.5-.9-1.2-1.2-1.9-.3-.8-.4-1.6-.4-2.5 0-.9.1-1.7.4-2.4.3-.8.7-1.4 1.2-1.9.5-.5 1.2-1 1.9-1.3.7-.3 1.6-.5 2.4-.5 1 0 1.9.2 2.6.6.7.4 1.4.9 1.8 1.6.5.7.8 1.4 1 2.3.2.8.3 1.7.2 2.6h-8.6c.1 1 .4 1.8.9 2.3zm3.8-6.3c-.4-.4-1-.6-1.8-.6-.5 0-.9.1-1.3.3-.3.2-.6.4-.8.6-.2.3-.4.5-.4.8-.1.3-.1.5-.2.8h5.3c-.1-.8-.4-1.5-.8-1.9zm-5.2-6.2h6.7v1.6h-6.7V3.8z"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 20h14"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m0 0-6-6m6 6-6 6"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5m0 0 6-6m-6 6 6 6"/></svg>',
    out: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7m0 0H9m8 0v8"/></svg>'
  };

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const el = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };

  // Time in India, for the little live clocks
  // 12-hour format everywhere, e.g. "10:48 AM"
  const t12 = (H, M) => `${(H % 12) || 12}:${String(M).padStart(2, '0')} ${H < 12 ? 'AM' : 'PM'}`;
  function istParts(d = new Date()) {
    const p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false }).formatToParts(d);
    const g = t => +p.find(x => x.type === t).value;
    return { H: g('hour') % 24, M: g('minute'), S: g('second') };
  }
  function istTime(d = new Date()) { const { H, M } = istParts(d); return t12(H, M); }

  // Split an element's text into masked lines for the line reveal.
  function splitLines(node) {
    if (node.dataset.split) return;
    const text = node.textContent.trim().replace(/\s+/g, ' ');
    const words = text.split(' ');
    node.textContent = '';
    const spans = words.map(w => { const s = document.createElement('span'); s.textContent = w + ' '; s.style.display = 'inline'; node.appendChild(s); return s; });
    const lines = []; let top = null;
    spans.forEach(s => { const t = s.offsetTop; if (t !== top) { lines.push([]); top = t; } lines[lines.length - 1].push(s.textContent); });
    node.textContent = '';
    lines.forEach((l, i) => { const ln = document.createElement('span'); ln.className = 'ln'; const inner = document.createElement('span'); inner.textContent = l.join('').trimEnd(); inner.style.setProperty('--i', i); ln.appendChild(inner); node.appendChild(ln); });
    node.dataset.split = '1';
  }

  function initReveal(root = document) {
    const els = root.querySelectorAll('.rv, .lines');
    if (reduce || !('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
    root.querySelectorAll('.lines').forEach(splitLines);
    const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    els.forEach(e => io.observe(e));
    // Safety net for big jumps (anchor links, fast flings): anything already passed is shown
    let q = 0; addEventListener('scroll', () => { if (q) return; q = requestAnimationFrame(() => { q = 0; root.querySelectorAll('.rv:not(.in), .lines:not(.in)').forEach(e => { if (e.getBoundingClientRect().top < innerHeight) e.classList.add('in'); }); }); }, { passive: true });
  }

  function initTopbar() {
    const bar = document.querySelector('.topbar'); if (!bar) return;
    bar.insertAdjacentHTML('afterbegin', '<div class="tb-bg" aria-hidden="true"><div class="tb-drop"></div></div>');
    liquid(bar);
    const on = () => bar.classList.toggle('scrolled', scrollY > 24);
    addEventListener('scroll', on, { passive: true }); on();
    // When scrolling stops, the main button gives one soft "island" stretch (at most every 5 s)
    const cta = bar.querySelector('.btn.solid'); if (!cta || reduce) return;
    let tm, last = 0;
    addEventListener('scroll', () => { clearTimeout(tm); tm = setTimeout(() => {
      const now = Date.now(); if (now - last < 5000 || scrollY < 40) return; last = now;
      cta.classList.remove('pulse'); void cta.offsetWidth; cta.classList.add('pulse');
    }, 220); }, { passive: true });
    cta.addEventListener('animationend', e => { if (e.animationName === 'island-pulse') cta.classList.remove('pulse'); });
  }

  // ---- Liquid bar: a damped spring fed by scroll velocity ----
  function liquid(bar) {
    const bg = bar.querySelector('.tb-bg'), drop = bar.querySelector('.tb-drop');
    const kids = [...bar.children].filter(n => n !== bg);
    if (reduce) return;
    let y = -64, v = 0, lastY = scrollY, lastT = performance.now(), running = false, wasTop = scrollY <= 24;
    const K = 210, C = 15;                       // stiffness, damping: one soft overshoot, then still
    function frame(now) {
      const dt = Math.min(.033, (now - lastT) / 1000); lastT = now;
      const d = scrollY - lastY; lastY = scrollY;
      v += Math.max(-60, Math.min(60, d)) * 18;                                // scroll speed pushes the surface (down = drip, up = lift)
      const top = scrollY <= 24;
      if (top && !wasTop) v -= 520;              // reaching the top: the bar lifts, then lands like a drop
      wasTop = top;
      v += (-K * y - C * v) * dt; y += v * dt;
      y = Math.max(-90, Math.min(70, y));
      // content: only the gentle fall / lift, never stretched
      const lift = y < 0 ? y * .5 : y * .08;
      kids.forEach(n => n.style.transform = `translate3d(0,${lift.toFixed(2)}px,0)`);
      // surface: squash and stretch
      const s = Math.abs(y) / 100;
      bg.style.transform = `translate3d(0,${(y < 0 ? y * .5 : 0).toFixed(2)}px,0) scale(${(1 + s * .015).toFixed(4)}, ${(1 + (y > 0 ? s * .25 : -s * .12)).toFixed(4)})`;
      drop.style.transform = `scaleY(${y > 0 ? Math.min(1.1, y / 26).toFixed(3) : 0})`;
      if (Math.abs(y) < .05 && Math.abs(v) < .5 && d === 0) { y = 0; v = 0; running = false; kids.forEach(n => n.style.transform = ''); bg.style.transform = ''; drop.style.transform = 'scaleY(0)'; return; }
      requestAnimationFrame(frame);
    }
    const wake = () => { if (!running) { running = true; lastT = performance.now(); requestAnimationFrame(frame); } };
    const size = () => bar.style.setProperty('--dw', Math.round(Math.min(620, innerWidth * .62)) + 'px');
    size(); addEventListener('resize', size);
    addEventListener('scroll', wake, { passive: true });
    wake();                                       // on arrival the bar falls in from above
  }

  // ---- 9–5 / 5–9 switch: a small sun/moon disc, bottom right ----
  function initSwitch() {
    const b = document.body; let href, to, label, side;
    if (b.classList.contains('work')) { href = '../after-hours/'; to = 'night'; label = 'After hours'; side = '5 to 9'; }
    else if (b.classList.contains('after')) { href = '../work/'; to = 'day'; label = 'The day job'; side = '9 to 5'; }
    else if (b.classList.contains('project')) { href = '../../work/'; to = 'day'; label = 'The day job'; side = '9 to 5'; }
    else return;
    const a = el(`<a class="switch to-${to}" href="${href}" data-go="${to}" aria-label="Switch to ${label} (${side})">
      <span class="sw-disc" aria-hidden="true"><i class="sw-sun"></i><i class="sw-moon"></i></span>
      <span class="sw-text"><b>${side}</b><span>${label}</span></span></a>`);
    document.body.appendChild(a);
    const show = () => a.classList.toggle('on', scrollY > innerHeight * .35 && (document.documentElement.scrollHeight - innerHeight - scrollY) > 160);
    addEventListener('scroll', show, { passive: true }); show();
  }

  // Veil transition between the two sides: a circle of the destination colour grows from the click.
  function initVeil() {
    if (sessionStorage.getItem('hv-enter')) { document.body.classList.add('entering'); sessionStorage.removeItem('hv-enter'); }
    document.addEventListener('click', e => {
      const a = e.target.closest('a[data-go]'); if (!a || e.metaKey || e.ctrlKey || e.shiftKey || reduce) return;
      e.preventDefault();
      const v = document.createElement('div'); v.className = 'veil ' + a.dataset.go;
      v.style.setProperty('--vx', e.clientX + 'px'); v.style.setProperty('--vy', e.clientY + 'px');
      document.body.appendChild(v); requestAnimationFrame(() => requestAnimationFrame(() => v.classList.add('go')));
      sessionStorage.setItem('hv-enter', '1');
      setTimeout(() => { location.href = a.href; }, 640);
    });
    // Back/forward cache: remove stale veils
    addEventListener('pageshow', ev => { if (ev.persisted) document.querySelectorAll('.veil').forEach(v => v.remove()); });
  }

  // Fill any [data-icon="name"] with the matching SVG
  function initIcons(root = document) { root.querySelectorAll('[data-icon]').forEach(n => { if (!n.firstElementChild) n.insertAdjacentHTML('afterbegin', ICONS[n.dataset.icon] || ''); }); }

  window.HV = { ICONS, esc, el, istTime, istParts, t12, initReveal, initIcons, reduce };
  document.addEventListener('DOMContentLoaded', () => { initIcons(); initTopbar(); initSwitch(); initVeil(); });
  // Reveal after fonts load so line splitting measures real line breaks
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => initReveal());
})();
