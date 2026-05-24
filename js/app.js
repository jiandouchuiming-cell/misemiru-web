/* ===== Duplicate marquee cards for seamless RTL loop ===== */
(function setupMarquee() {
  const track = document.querySelector('.samples-track');
  if (!track) return;
  const original = Array.from(track.children);
  original.forEach(card => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });
})();

/* ===== Duplicate voice cards for seamless marquee loops ===== */
(function setupVoiceMarquees() {
  const CARD_W = 320;   // .voice-row .voice-card { flex: 0 0 320px }
  const GAP    = 22;    // .voice-row { gap: 22px }

  document.querySelectorAll('.voice-row').forEach(row => {
    const originals = Array.from(row.children);
    const N    = originals.length;
    const setW = N * (CARD_W + GAP); // 1セット分の幅（カード＋gap込み）

    /* 画面幅の 3 倍以上になるまでコピーを追加
       → どんな横幅でもアニメーション端点で空白が出ない */
    const needed = Math.ceil(window.innerWidth * 3 / setW) + 1;
    for (let i = 0; i < needed; i++) {
      originals.forEach(card => {
        const clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        row.appendChild(clone);
      });
    }

    /* ピクセル精度のキーフレームを動的生成（calc で生じる端数ズレを排除） */
    const isReverse = row.classList.contains('voice-row--reverse');
    const animName  = `vcScroll_${isReverse ? 'R' : 'L'}_${N}`;
    if (!document.getElementById(animName)) {
      const s = document.createElement('style');
      s.id = animName;
      s.textContent = isReverse
        ? `@keyframes ${animName}{from{transform:translateX(-${setW}px)}to{transform:translateX(0)}}`
        : `@keyframes ${animName}{from{transform:translateX(0)}to{transform:translateX(-${setW}px)}}`;
      document.head.appendChild(s);
    }

    const dur = isReverse ? '55s' : '50s';
    row.style.animation = `${animName} ${dur} linear infinite`;
  });
})();

/* ===== FAQ toggles ===== */
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  q.addEventListener('click', () => item.classList.toggle('open'));
});

/* ===== Parallax-ish micro motion on hover for sections =====
   Subtle: decorations near the cursor drift toward it.
*/
document.querySelectorAll('section, header.hero').forEach(sec => {
  const decos = sec.querySelectorAll('.deco');
  if (!decos.length) return;
  let raf = null;
  sec.addEventListener('mousemove', (e) => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      const rect = sec.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5..0.5
      const my = (e.clientY - rect.top)  / rect.height - 0.5;
      decos.forEach((d, i) => {
        const amp = (i % 3 === 0) ? 14 : (i % 3 === 1) ? 9 : 6;
        d.style.translate = `${mx * amp}px ${my * amp}px`;
      });
      raf = null;
    });
  });
  sec.addEventListener('mouseleave', () => {
    decos.forEach(d => d.style.translate = '');
  });
});

/* ===== About-vis blob: cursor-reactive organic motion ===== */
const aboutVis = document.getElementById('aboutVis');
if (aboutVis) {
  const lumps = aboutVis.querySelectorAll('.lump');
  let raf2 = null;
  aboutVis.addEventListener('mousemove', (e) => {
    if (raf2) return;
    raf2 = requestAnimationFrame(() => {
      const r = aboutVis.getBoundingClientRect();
      const mx = (e.clientX - r.left) / r.width - 0.5;
      const my = (e.clientY - r.top) / r.height - 0.5;
      lumps.forEach((l, i) => {
        const dir = (i % 2 === 0) ? 1 : -1;     // alternate: some toward, some away
        const amp = 24 + i * 4;
        l.style.translate = `${mx * amp * dir}px ${my * amp * dir}px`;
      });
      raf2 = null;
    });
  });
  aboutVis.addEventListener('mouseleave', () => {
    lumps.forEach(l => l.style.translate = '');
  });
}

/* ===== Smooth scroll for nav ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const t = document.querySelector(id);
    if (!t) return;
    e.preventDefault();
    window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 60, behavior: 'smooth' });
  });
});
