/* ==========================================================================
   Small HTML chart kit for the case study and its dashboard views.
   HTML (not SVG) so labels stay readable at every screen size.
   ========================================================================== */
(function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const gbp = (v, d = 2) => (v < 0 ? '−' : '') + '£' + (Math.abs(v) >= 1e6 ? (Math.abs(v) / 1e6).toFixed(d) + 'M' : Math.round(Math.abs(v) / 1e3).toLocaleString('en-GB') + 'k');

  // Waterfall as diverging bars: totals are plain rows; each step grows left (loss)
  // or right (gain) from a zero line, on a scale fitted to the steps themselves.
  function waterfall(el, steps, o = {}) {
    const mv = steps.filter(s => s.type !== 'total');
    const neg = Math.max(0, ...mv.map(s => -s.value)), pos = Math.max(0, ...mv.map(s => s.value));
    const span = (neg + pos) || 1, z = neg / span * 100;
    const pp = r => o.pct && r.pct != null ? `<em>${r.type === 'total' ? Math.round(r.pct) + 'p' : (r.pct > 0 ? '+' : '−') + Math.abs(r.pct).toFixed(1) + 'p'}</em>` : '';
    el.classList.add('ch', 'ch-wf');
    el.style.setProperty('--z', z + '%');
    el.innerHTML = steps.map((r, i) => {
      if (r.type === 'total') return `<div class="ch-row tot" style="--i:${i}"><span class="ch-l">${esc(r.label)}</span><span class="ch-v">${gbp(r.value)}${pp(r)}</span></div>`;
      const w = Math.max(.8, Math.abs(r.value) / span * 100), up = r.value >= 0;
      return `<div class="ch-row ${up ? 'gain' : 'leak'}" style="--i:${i}"><span class="ch-l">${esc(r.label)}</span><span class="ch-track"><i class="${up ? 'r' : 'l'}" style="${up ? `left:${z}%` : `right:${100 - z}%`};width:${w}%"></i></span><span class="ch-v">${up ? '+' : ''}${gbp(r.value)}${pp(r)}</span></div>`;
    }).join('');
  }

  // Vertical columns with an optional reference line (e.g. break-even at 1.0)
  function columns(el, rows, o = {}) {
    const max = Math.max(...rows.map(r => r.value), o.ref || 0) * 1.08;
    el.classList.add('ch', 'ch-col');
    el.innerHTML = `<div class="ch-plot">${o.ref != null ? `<span class="ch-ref" style="bottom:${o.ref / max * 100}%"><b>${esc(o.refLabel || '')}</b></span>` : ''}
      ${rows.map((r, i) => `<div class="ch-c ${r.value < (o.ref ?? -1) ? 'leak' : 'tot'}" style="--i:${i}"><span class="ch-v">${esc(o.fmt ? o.fmt(r.value) : r.value)}</span><i style="height:${r.value / max * 100}%"></i></div>`).join('')}</div>
      <div class="ch-x">${rows.map(r => `<span>${esc(r.label)}</span>`).join('')}</div>`;
  }

  // Paired shares: for each group, two bars (share A vs share B)
  function pairs(el, rows, o = {}) {
    el.classList.add('ch', 'ch-pair');
    el.innerHTML = `<div class="ch-key"><span class="ka">${esc(o.a)}</span><span class="kb">${esc(o.b)}</span></div>` +
      rows.map((r, i) => `<div class="ch-g" style="--i:${i}"><span class="ch-l">${esc(r.label)}${r.note ? `<em>${esc(r.note)}</em>` : ''}</span>
        <span class="ch-bar a"><i style="width:${r.a}%"></i><b>${Math.round(r.a)}%</b></span>
        <span class="ch-bar b"><i style="width:${r.b}%"></i><b>${Math.round(r.b)}%</b></span></div>`).join('');
  }

  // Two 100% stacked strips (e.g. share of products vs share of revenue)
  function stack(el, strips, labels) {
    el.classList.add('ch', 'ch-stack');
    el.innerHTML = strips.map((s, i) => `<div class="ch-strip" style="--i:${i}"><span class="ch-l">${esc(s.label)}</span><span class="ch-seg">${s.parts.map((p, j) => `<i class="s${j}" style="width:${p}%">${p >= 8 ? `<b>${Math.round(p)}%</b>` : ""}</i>`).join('')}</span></div>`).join('') +
      `<div class="ch-key">${labels.map((l, j) => `<span class="s${j}">${esc(l)}</span>`).join('')}</div>`;
  }

  // Line chart (SVG) for the dashboard: two series on one axis
  function line(el, xs, series, o = {}) {
    const W = 1000, H = 300, P = 34, all = series.flatMap(s => s.values);
    const lo = o.min ?? Math.min(...all) * .95, hi = o.max ?? Math.max(...all) * 1.03;
    const X = i => P + i * (W - P * 2) / (xs.length - 1), Y = v => H - P - (v - lo) / (hi - lo) * (H - P * 2);
    const grid = [0, .25, .5, .75, 1].map(t => { const v = lo + (hi - lo) * t; return `<line x1="${P}" x2="${W - P}" y1="${Y(v)}" y2="${Y(v)}"/><text x="0" y="${Y(v) + 4}">${esc(o.fmt ? o.fmt(v) : v)}</text>`; }).join('');
    el.classList.add('ch', 'ch-line');
    el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true"><g class="gr">${grid}</g>
      ${series.map((s, k) => `<path class="ln l${k}" d="${s.values.map((v, i) => (i ? 'L' : 'M') + X(i).toFixed(1) + ' ' + Y(v).toFixed(1)).join('')}"/>`).join('')}
      <g class="xl">${xs.map((x, i) => i % 3 === 0 ? `<text x="${X(i)}" y="${H - 6}">${esc(x)}</text>` : '').join('')}</g></svg>`;
  }

  window.CH = { waterfall, columns, pairs, stack, line, gbp };
})();
