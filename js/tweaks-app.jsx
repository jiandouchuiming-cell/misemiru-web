// tweaks-app.jsx — three expressive controls for the LP

const LP_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mood": "playful",
  "density": "festive",
  "shape": "organic"
}/*EDITMODE-END*/;

function applyTweaks(t) {
  const root = document.documentElement;
  const body = document.body;

  // ── Mood (palette feel) ─────────────────────────
  // playful: current (warm coral + yellow + teal)
  // calm:    desaturated pastel everything
  // bold:    strong navy + crimson, less yellow
  const moods = {
    playful: {
      '--navy': '#0b2c4d',
      '--coral': '#ff5a6e',
      '--coral-soft': '#ff8a98',
      '--yellow': '#ffd93b',
      '--yellow-soft': '#ffe97a',
      '--teal': '#5bc9ce',
      '--teal-soft': '#a9e3e6',
      '--cream': '#fff7ec',
      '--cream-deep': '#fdebd0',
      '--pink': '#fbd0d6',
      '--ink': '#0b2c4d',
      '--ink-mute': '#5a6b7d',
      '--bg': '#ffffff',
    },
    calm: {
      '--navy': '#3a4a5e',
      '--coral': '#e8a8a8',
      '--coral-soft': '#f0c2c2',
      '--yellow': '#eed9a1',
      '--yellow-soft': '#f3e3b8',
      '--teal': '#a5c8c4',
      '--teal-soft': '#cce0dd',
      '--cream': '#f7f2eb',
      '--cream-deep': '#ece3d3',
      '--pink': '#ecd5d7',
      '--ink': '#3a4a5e',
      '--ink-mute': '#7a8595',
      '--bg': '#faf8f4',
    },
    bold: {
      '--navy': '#0a0a0a',
      '--coral': '#e63946',
      '--coral-soft': '#ff6b78',
      '--yellow': '#ffcf00',
      '--yellow-soft': '#fde35e',
      '--teal': '#2a9d8f',
      '--teal-soft': '#7fc4ba',
      '--cream': '#f4f1ea',
      '--cream-deep': '#e7e1d2',
      '--pink': '#f5b9bf',
      '--ink': '#0a0a0a',
      '--ink-mute': '#444',
      '--bg': '#ffffff',
    },
  };
  const m = moods[t.mood] || moods.playful;
  for (const k in m) root.style.setProperty(k, m[k]);

  // ── Density (decoration count) ─────────────────
  body.classList.remove('twk-density-minimal', 'twk-density-standard', 'twk-density-festive');
  body.classList.add('twk-density-' + t.density);

  // ── Shape (organic vs geometric) ───────────────
  body.classList.remove('twk-shape-organic', 'twk-shape-geometric');
  body.classList.add('twk-shape-' + t.shape);
}

function App() {
  const [t, setTweak] = useTweaks(LP_TWEAK_DEFAULTS);
  React.useEffect(() => { applyTweaks(t); }, [t.mood, t.density, t.shape]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Mood" />
      <TweakRadio
        label="ムード"
        value={t.mood}
        options={['playful', 'calm', 'bold']}
        onChange={(v) => setTweak('mood', v)}
      />

      <TweakSection label="Decoration" />
      <TweakRadio
        label="装飾の密度"
        value={t.density}
        options={['minimal', 'standard', 'festive']}
        onChange={(v) => setTweak('density', v)}
      />

      <TweakSection label="Shape" />
      <TweakRadio
        label="形の言語"
        value={t.shape}
        options={['organic', 'geometric']}
        onChange={(v) => setTweak('shape', v)}
      />
    </TweaksPanel>
  );
}

const root = ReactDOM.createRoot(document.getElementById('tweaks-root'));
root.render(<App />);
