/* ==========================================================================
   WORK — renders /content/resume.js into /work/index.html
   and runs the workday dial + number count-ups.
   ========================================================================== */
(function () {
  const R = window.RESUME, { esc } = HV, $ = id => document.getElementById(id);

  // ---- Text ----
  $('name').textContent = R.name;
  $('intro').textContent = R.intro;
  $('summary').textContent = R.summary;
  const cur = R.experience[0];
  $('meta').innerHTML = [
    ['Now', `${esc(cur.role)}, ${esc(cur.company)}`],
    ['Focus', esc(R.headline)],
    ['Based', esc(R.location)]
  ].map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');

  // ---- Links ----
  ['li-top', 'li-cta'].forEach(id => $(id).href = R.linkedin);
  ['pdf-top', 'pdf-cta'].forEach(id => $(id).href = R.pdf);

  // ---- Facts (numbers count up when they enter the screen) ----
  $('facts').innerHTML = R.facts.map((f, i) => {
    const m = String(f.value).match(/^(\d+)(.*)$/);
    const num = m ? m[1] : f.value, suf = m ? m[2] : '';
    return `<div class="fact rv" style="--d:${i * .08}s"><span class="v"><span class="cnt" data-to="${num}">${num}</span>${suf ? `<sup>${esc(suf)}</sup>` : ''}</span><span class="l">${esc(f.label)}</span></div>`;
  }).join('');

  // ---- Experience ----
  // Bold the numbers inside bullets (e.g. "30+", "~80%", "40%") so they scan quickly
  const em = s => esc(s).replace(/(~?\d+\+?%?)/g, '<b>$1</b>');
  $('jobs').innerHTML = R.experience.map((j, i) => `
    <li class="job rv" style="--d:${i * .05}s">
      <div class="when">
        <span class="co">${esc(j.company)}</span>
        <span class="mono d">${esc(j.start)} – ${j.end === 'Present' ? '<span class="now">Present</span>' : esc(j.end)}</span>
      </div>
      <div>
        <h3 class="role">${esc(j.role)}</h3>
        <ul>${j.bullets.map(b => `<li>${em(b)}</li>`).join('')}</ul>
      </div>
    </li>`).join('');

  // ---- Skills ----
  $('skills').innerHTML = R.skills.map((g, i) => `
    <div class="skill rv" style="--d:${i * .06}s">
      <h3>${esc(g.group)} <span class="n">${String(g.items.length).padStart(2, '0')}</span></h3>
      <div class="chips">${g.items.map(s => `<span class="chip">${esc(s)}</span>`).join('')}</div>
    </div>`).join('');

  // ---- Education ----
  const E = R.education;
  $('edu').innerHTML = `<div class="rv"><p class="deg">${esc(E.degree)}</p><p class="school">${esc(E.school)} · ${esc(E.place)}</p><p class="edu-note">${esc(E.note)}</p></div>` +
    ((R.learning || []).length ? `<div class="learn rv" style="--d:.1s"><h3 class="mono">Continued learning · LinkedIn Learning</h3><ul>${R.learning.map(c => `<li><span>${esc(c.title)}${c.note ? ` <em>${esc(c.note)}</em>` : ''}</span><span class="mono">${esc(c.year)}</span></li>`).join('')}</ul></div>` : '');

  $('yr').textContent = new Date().getFullYear();
  const ist = $('ist'); const tick = () => ist.textContent = HV.istTime(); tick(); setInterval(tick, 15000);

  // ---- Live dial in the hero: real India time, with the 09:00–17:00 shift marked ----
  (function bigDial() {
    const svg = $('big-dial'), C = 100;
    const P = (a, r) => [C + r * Math.sin(a * Math.PI / 180), C - r * Math.cos(a * Math.PI / 180)];
    let h = `<circle class="face" cx="100" cy="100" r="96"/>`;
    const [sx, sy] = P(270, 80), [ex, ey] = P(150, 80);
    h += `<path class="shift" d="M${sx} ${sy} A80 80 0 1 1 ${ex} ${ey}"/>`;
    for (let i = 0; i < 60; i++) { const maj = i % 5 === 0, [a, b] = P(i * 6, 92), [c, d] = P(i * 6, maj ? 84 : 88); h += `<line class="tk${maj ? ' major' : ''}" x1="${a}" y1="${b}" x2="${c}" y2="${d}"/>`; }
    [12, 3, 6, 9].forEach(n => { const [x, y] = P(n * 30, 70); h += `<text class="num" x="${x}" y="${y}">${n === 12 ? '12' : String(n).padStart(2, '0')}</text>`; });
    h += `<g class="hand-g" id="hg"><line class="hh" x1="100" y1="100" x2="100" y2="54"/></g><g class="hand-g" id="mg"><line class="mh" x1="100" y1="108" x2="100" y2="26"/></g><g class="hand-g" id="sg"><line class="sh" x1="100" y1="112" x2="100" y2="22"/></g><circle cx="100" cy="100" r="4" fill="var(--day-ink)"/><circle cx="100" cy="100" r="1.6" fill="var(--sun)"/>`;
    svg.innerHTML = h;
    const hg = $('hg'), mg = $('mg'), sg = $('sg');
    function set() {
      const { H, M, S } = HV.istParts();
      hg.style.transform = `rotate(${(H % 12) * 30 + M * .5}deg)`; mg.style.transform = `rotate(${M * 6 + S * .1}deg)`; sg.style.transform = `rotate(${S * 6}deg)`;
      $('dial-time').textContent = HV.t12(H, M);
      $('dial-state').textContent = H >= 9 && H < 17 ? 'On the clock' : 'After hours';
    }
    set(); setInterval(set, 1000);
  })();

  // ---- Count-up ----
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; io.unobserve(e.target);
    const n = e.target, to = +n.dataset.to; if (HV.reduce || !to) return;
    const t0 = performance.now(), dur = 1400;
    const step = now => { const k = Math.min(1, (now - t0) / dur); n.textContent = Math.round(to * (1 - Math.pow(1 - k, 4))); if (k < 1) requestAnimationFrame(step); };
    n.textContent = '0'; requestAnimationFrame(step);
  }), { threshold: .6 });
  document.querySelectorAll('.cnt').forEach(n => io.observe(n));

  // ---- Workday dial: 09:00 at the top of the page, 17:00 at the bottom ----
  const dial = $('dial'), hand = dial.querySelector('.hand'), read = $('dial-read');
  const ang = h => (h % 12) / 12 * 360;                       // clock angle for an hour
  const pt = (a, r) => [32 + r * Math.sin(a * Math.PI / 180), 32 - r * Math.cos(a * Math.PI / 180)];
  const [x1, y1] = pt(ang(9), 24), [x2, y2] = pt(ang(17), 24);
  dial.querySelector('.shift').setAttribute('d', `M${x1} ${y1} A24 24 0 1 1 ${x2} ${y2}`);
  dial.querySelector('.ticks').innerHTML = Array.from({ length: 12 }, (_, i) => { const [a, b] = pt(i * 30, 27), [c, d] = pt(i * 30, i % 3 ? 25.5 : 23.5); return `<line x1="${a}" y1="${b}" x2="${c}" y2="${d}"/>`; }).join('');
  let ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
      const h = 9 + 8 * p;
      hand.setAttribute('transform', `rotate(${ang(h)} 32 32)`);
      const hh = Math.floor(h), mm = Math.floor((h - hh) * 60 / 5) * 5;
      read.textContent = HV.t12(hh, mm);
      dial.classList.toggle('show', scrollY > innerHeight * .5 && max - scrollY > 140);   // hide over the footer
      ticking = false;
    });
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  dial.addEventListener('click', () => scrollTo({ top: 0, behavior: HV.reduce ? 'auto' : 'smooth' }));
})();
