/* ==========================================================================
   LANDING — drives the day/night sky and the 9 ⇄ 5 swap.
   t = 0 is noon (9 to 5), t = 1 is night (5 to 9).
   Desktop: pointer position sets t. Touch or idle: it cycles by itself.
   To change sky colours, edit the three palettes below.
   ========================================================================== */
(function () {
  const body = document.body, root = body.style;
  const reduce = HV.reduce;

  // ---- Palettes: day → dusk → night ----
  const DAY   = { top: '#ECE9E1', hz: '#F2E1C8', water: '#E2DDD2', ink: '#16181B', ink2: '#56585B', line: [22, 24, 27, .22] };
  const DUSK  = { top: '#4A3C5E', hz: '#F0905E', water: '#2E2738' };
  const NIGHT = { top: '#0D0C11', hz: '#271D38', water: '#110F17', ink: '#ECE8F1', ink2: '#A29CB0', line: [236, 232, 241, .18] };

  const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const mix = (a, b, k) => { const A = hex(a), B = hex(b); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * k)).join(',')})`; };
  const mix3 = (a, b, c, t) => t < .5 ? mix(a, b, t * 2) : mix(b, c, (t - .5) * 2);
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const smooth = (a, b, v) => { const x = clamp((v - a) / (b - a)); return x * x * (3 - 2 * x); };
  const eio = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

  const TO = [...document.querySelectorAll('.digits .to')], A = [...document.querySelectorAll('.dg.a')], B = [...document.querySelectorAll('.dg.b')];
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  let dx = 0, ds = 0, hz = 0;
  function measure() {
    const a = document.querySelector('.digits:not(.mirror) .dg.a').getBoundingClientRect();
    const b = document.querySelector('.digits:not(.mirror) .dg.b').getBoundingClientRect();
    dx = (b.left + b.width / 2) - (a.left + a.width / 2);
    ds = parseFloat(getComputedStyle(document.querySelector('.digits')).fontSize);
    hz = parseFloat(getComputedStyle(body).getPropertyValue('--hzY')) / 100 * innerHeight || innerHeight * .63;
  }

  let t = 0, target = 0, last = performance.now(), lastInput = -1e9, auto = 0;

  function paint(t) {
    const k = smooth(.28, .5, t);
    root.setProperty('--t', t.toFixed(4));
    root.setProperty('--top', mix3(DAY.top, DUSK.top, NIGHT.top, t));
    root.setProperty('--hz', mix3(DAY.hz, DUSK.hz, NIGHT.hz, t));
    root.setProperty('--water', mix3(DAY.water, DUSK.water, NIGHT.water, t));
    root.setProperty('--ink', mix(DAY.ink, NIGHT.ink, k));
    root.setProperty('--ink2', mix(DAY.ink2, NIGHT.ink2, k));
    const L = DAY.line.map((v, i) => v + (NIGHT.line[i] - v) * k);
    root.setProperty('--line', `rgba(${L[0] | 0},${L[1] | 0},${L[2] | 0},${L[3].toFixed(3)})`);

    // Sun: travels left → right and sets below the horizon
    const e = eio(t);
    root.setProperty('--sx', (24 + 52 * e).toFixed(2) + '%');
    const sy = hz * (.36 + .86 * Math.pow(t, 1.25));
    root.setProperty('--sy', sy.toFixed(1) + 'px');
    root.setProperty('--glow', Math.pow(Math.sin(Math.PI * clamp(t * 1.1)), 1.4).toFixed(3));
    root.setProperty('--ro', (t < .62 ? .28 + .5 * Math.sin(Math.PI * t) : Math.max(0, .78 - (t - .62) * 3)).toFixed(3));
    // Moon: rises once the sun is gone
    const mo = smooth(.62, 1, t);
    root.setProperty('--mo', mo.toFixed(3));
    root.setProperty('--my', (hz * (1.02 - .66 * mo)).toFixed(1) + 'px');

    // Digits: the 9 arcs over the top, the 5 dips under — they trade places
    const s = Math.sin(Math.PI * t);
    A.forEach(n => n.style.transform = `translate(${(dx * e).toFixed(1)}px, ${(-ds * .34 * s).toFixed(1)}px) rotate(${(-14 * s).toFixed(2)}deg) scale(${(1 - .18 * s).toFixed(3)})`);
    B.forEach(n => n.style.transform = `translate(${(-dx * e).toFixed(1)}px, ${(ds * .06 * s).toFixed(1)}px) rotate(${(10 * s).toFixed(2)}deg) scale(${(1 - .42 * s).toFixed(3)})`);

    TO.forEach(n => n.style.opacity = (1 - .92 * s).toFixed(3));
    const side = t < .5 ? '0' : '1';
    if (body.dataset.side !== side) {
      body.dataset.side = side;
      body.classList.toggle('day', side === '0'); body.classList.toggle('night', side === '1');
      metaTheme && metaTheme.setAttribute('content', side === '0' ? '#ECE9E1' : '#0D0C11');
    }
  }

  function frame(now) {
    const dt = Math.min(64, now - last); last = now;
    // Idle or touch: cycle on its own, pausing at each end
    if (now - lastInput > 4200 && !reduce) {
      auto += dt;
      const period = 7600, ph = (auto % period) / period;
      target = ph < .42 ? 0 : ph < .5 ? (ph - .42) / .08 : ph < .92 ? 1 : 1 - (ph - .92) / .08;
    }
    const k = 1 - Math.pow(1 - .085, dt / 16.7);
    t += (target - t) * k;
    if (Math.abs(target - t) < .0005) t = target;
    paint(t);
    requestAnimationFrame(frame);
  }

  // Pointer: the further right, the later in the day
  addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    lastInput = performance.now(); auto = 0;
    target = smooth(.28, .72, e.clientX / innerWidth);
  }, { passive: true });
  document.querySelectorAll('.door').forEach(d => {
    const go = () => { lastInput = performance.now() + 2e3; target = +d.dataset.side; };
    d.addEventListener('pointerenter', go); d.addEventListener('focus', go);
  });

  // Live clock (India time)
  const ist = document.getElementById('ist');
  const tick = () => { ist.textContent = HV.istTime(); };
  tick(); setInterval(tick, 15000);

  addEventListener('resize', () => { measure(); paint(t); });
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
    measure(); paint(0);
    if (reduce) { body.dataset.side = '0'; return; }
    // Opening move: hold on day, then let the cycle run
    lastInput = performance.now() - 2600;
    requestAnimationFrame(frame);
  });
})();
