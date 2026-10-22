/* Case study: renders the five findings and their charts from window.RLA */
(function () {
  const D = window.RLA, C = window.CH;
  const wf = y => D.wf.filter(r => r[0] === y).map(r => ({ label: r[1], value: r[2], type: r[3] === 'total' ? 'total' : r[2] >= 0 ? 'gain' : 'leak', pct: r[4] }));
  const pvm = D.pvm.map(r => ({ label: r[0].replace('SKUs', 'products'), value: r[1], type: r[2] }));
  const seg = D.seg, tc = seg.reduce((a, s) => a + s[1], 0);

  const F = [
    { n: '01', big: '12p', h: 'of every £1 at full price never reached the bank.',
      p: 'In Year 2, £10.23M of sales at full price became £8.99M that the store kept. Volume discounts took 5p in the pound, deep deals 3p, returns 2p, and marketplace and payment fees another 2p.',
      do: 'Fees rose from under 1p to 2p in the pound in one year. That is the cheapest leak to fix: renegotiate or reroute.',
      viz: 'wf', title: 'From full price to money kept' },
    { n: '02', big: '+1.4%', ink: true, h: 'Headline growth hid a shrinking core.',
      p: 'Revenue grew £0.13M. Underneath, products sold in both years lost £1.44M of volume, and new products added £1.98M to cover the gap.',
      do: 'Find out why the core range is selling less before adding more new products.',
      viz: 'pvm', title: 'Year 1 to Year 2 revenue, by driver' },
    { n: '03', big: '£4.19', h: 'back for every £1 of discount at 10–20% off. At 60% off, 29p.',
      p: 'Small deals paid for themselves several times over. Past 40% off, deals barely broke even, and the deepest ones lost money on every pound given away.',
      do: 'Cap routine deals at around 30% off, and keep deeper cuts for clearing stock.',
      viz: 'deal', title: 'Extra sales per £1 of discount' },
    { n: '04', big: '39%', h: 'of revenue came from customers who mostly buy on discount.',
      p: `They were ${Math.round(seg[0][1] / tc * 100)}% of customers and paid ${Math.round(seg[0][3])}p in the pound. The next year they kept spending no better than full-price customers did (${Math.round(seg[0][5])}% of revenue kept against ${Math.round(seg[1][5])}%).`,
      do: 'Discounts are not buying loyalty here. Tighten who gets them and when.',
      viz: 'seg', title: 'Each customer group’s share' },
    { n: '05', big: '53%', ink: true, h: 'of products earned just 5% of revenue.',
      p: `${D.pareto[2][1].toLocaleString('en-GB')} products sat in the long tail, while ${D.pareto[0][1].toLocaleString('en-GB')} products made 80% of sales.`,
      do: 'Review the tail for removal or bundling. It adds stock, listing and handling cost for very little revenue.',
      viz: 'pareto', title: 'Products against revenue' }
  ];

  const host = document.getElementById('findings');
  host.innerHTML = F.map(f => `<article class="find">
    <div class="rv"><span class="mono n">Finding ${f.n}</span><div class="big ${f.ink ? 'ink' : ''}">${f.big}</div><h3>${f.h}</h3><p>${f.p}</p><p class="do"><b>What to do</b>${f.do}</p></div>
    <div class="viz grow rv" style="--d:.12s"><div class="viz-h"><span class="mono">${f.title}</span>${f.viz === 'wf' ? '<span class="seg-t" role="group" aria-label="Year"><button type="button" data-y="Y1" aria-pressed="false">Year 1</button><button type="button" data-y="Y2" aria-pressed="true">Year 2</button></span>' : ''}</div><div data-viz="${f.viz}"></div>${f.viz === 'deal' ? '<p class="viz-note">Deals are inferred from price drops; see the note below.</p>' : f.viz === 'wf' ? '<p class="viz-note">Pence in the pound shown beside each step.</p>' : ''}</div>
  </article>`).join('');

  const draw = {
    wf: (el, y = 'Y2') => C.waterfall(el, wf(y), { pct: true }),
    pvm: el => C.waterfall(el, pvm),
    deal: el => C.columns(el, D.deal.map(d => ({ label: d[0].replace('-', '–') + ' off', value: +(d[3] / d[4]).toFixed(2) })), { ref: 1, refLabel: 'Break-even', fmt: v => '£' + v.toFixed(2) }),
    seg: el => C.pairs(el, seg.map(s => ({ label: s[0], note: `pays ${Math.round(s[3])}p in the £`, a: s[1] / tc * 100, b: s[4] })), { a: 'Share of customers', b: 'Share of revenue' }),
    pareto: el => C.stack(el, [{ label: 'Products', parts: D.pareto.map(p => p[3]) }, { label: 'Revenue', parts: D.pareto.map(p => p[4]) }], ['Top sellers', 'Middle', 'Long tail'])
  };
  host.querySelectorAll('[data-viz]').forEach(el => draw[el.dataset.viz](el));

  // Year switch on the waterfall
  const t = host.querySelector('.seg-t'), wfEl = host.querySelector('[data-viz="wf"]');
  t.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    t.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b));
    draw.wf(wfEl, b.dataset.y);
  });

  // Grow bars when each chart scrolls into view
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .3 });
  document.querySelectorAll('.grow').forEach(el => io.observe(el));

  // Lightbox for dashboard images
  const lb = document.getElementById('lightbox'), li = lb.querySelector('img');
  document.querySelectorAll('img[data-zoom]').forEach(im => im.addEventListener('click', () => { if (innerWidth < 700) return; li.src = im.src; li.alt = im.alt; lb.hidden = false; }));
  lb.addEventListener('click', () => { lb.hidden = true; });
  addEventListener('keydown', e => { if (e.key === 'Escape') lb.hidden = true; });
  const yr = document.getElementById('yr'); if (yr) yr.textContent = new Date().getFullYear();
})();
