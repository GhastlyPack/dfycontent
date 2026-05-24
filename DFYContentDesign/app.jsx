// app.jsx — main App: state, routing, tweaks
const { useState: useStateApp, useEffect: useEffectApp, useMemo: useMemoApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "direction": "operator",
  "heroLayout": "split",
  "paletteIdx": 0,
  "fontIdx": 0,
  "headlineIdx": 0
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [screen, setScreen] = useStateApp('hero');
  const [state, setState] = useStateApp({
    contact: {},
    answers: {},
    booking: null,
  });

  const mergeState = (patch) => setState(s => ({ ...s, ...patch }));

  // Resolve theme based on current tweaks
  const theme = useMemoApp(() => {
    const direction = t.direction === 'studio' ? 'studio' : 'operator';
    const resolved = resolveTheme(direction, t.paletteIdx, t.fontIdx);
    const headline = HEADLINES[Math.min(t.headlineIdx, HEADLINES.length - 1)];
    return {
      ...resolved,
      direction,
      heroLayout: t.heroLayout || 'split',
      headline,
    };
  }, [t.direction, t.paletteIdx, t.fontIdx, t.headlineIdx, t.heroLayout]);

  // When direction changes, reset palette/font idx to 0 if out of bounds
  useEffectApp(() => {
    const pals = theme.direction === 'studio' ? THEME.STUDIO_PALETTES : THEME.OPERATOR_PALETTES;
    const fnts = theme.direction === 'studio' ? THEME.STUDIO_FONTS    : THEME.OPERATOR_FONTS;
    if (t.paletteIdx >= pals.length) setTweak('paletteIdx', 0);
    if (t.fontIdx    >= fnts.length) setTweak('fontIdx', 0);
  }, [theme.direction]);

  // Apply CSS variables to <body> for global theming
  useEffectApp(() => {
    const root = document.body;
    root.style.setProperty('--bg', theme.palette.bg);
    root.style.setProperty('--fg', theme.palette.fg);
    root.style.setProperty('--accent', theme.palette.accent);
    root.style.fontFamily = theme.fonts.body;
  }, [theme]);

  // Screen routing
  const go = (s) => {
    setScreen(s);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const screenMap = {
    hero:      HeroScreen,
    q1:        Q1,
    q2:        Q2,
    q3:        Q3,
    q4:        Q4,
    dnq:       DNQScreen,
    qualified: QualifiedScreen,
    booked:    BookedScreen,
  };
  const ScreenC = screenMap[screen] || HeroScreen;

  // Available palettes/fonts for current direction (for tweak swatches)
  const palettes = theme.direction === 'studio' ? THEME.STUDIO_PALETTES : THEME.OPERATOR_PALETTES;
  const fonts    = theme.direction === 'studio' ? THEME.STUDIO_FONTS    : THEME.OPERATOR_FONTS;

  // For the color swatches, build [accent, bg, fg] arrays
  const paletteSwatches = palettes.map(p => [p.accent, p.bg, p.fg]);

  return (
    <div data-screen-label={
      screen === 'hero' ? '01 Lander' :
      screen === 'q1' ? '02 Question 1' :
      screen === 'q2' ? '03 Question 2' :
      screen === 'q3' ? '04 Question 3' :
      screen === 'q4' ? '05 Question 4' :
      screen === 'dnq' ? '06 Disqualified' :
      screen === 'qualified' ? '07 Book a call' :
      screen === 'booked' ? '08 Confirmed' : screen
    }>
      <ScreenC theme={theme} state={state} setState={mergeState} go={go} />

      {/* Floating screen jumper (always-on, dev aid + demo nav) */}
      <ScreenJumper theme={theme} current={screen} go={go} />

      <TweaksPanel>
        <TweakSection label="Direction" />
        <TweakRadio
          label="Aesthetic"
          value={theme.direction}
          options={[
            { value: 'operator', label: 'Operator' },
            { value: 'studio',   label: 'Studio'   },
          ]}
          onChange={v => setTweak({ direction: v, paletteIdx: 0, fontIdx: 0 })}
        />
        <TweakRadio
          label="Hero layout"
          value={theme.heroLayout}
          options={[
            { value: 'split',   label: 'Split'   },
            { value: 'stacked', label: 'Stacked' },
          ]}
          onChange={v => setTweak('heroLayout', v)}
        />

        <TweakSection label="Color" />
        <TweakColor
          label="Palette"
          value={paletteSwatches[t.paletteIdx]}
          options={paletteSwatches}
          onChange={v => {
            const idx = paletteSwatches.findIndex(p => p[0] === v[0] && p[1] === v[1]);
            setTweak('paletteIdx', idx < 0 ? 0 : idx);
          }}
        />

        <TweakSection label="Type" />
        <TweakSelect
          label="Font pair"
          value={String(t.fontIdx)}
          options={fonts.map((f, i) => ({ value: String(i), label: f.name }))}
          onChange={v => setTweak('fontIdx', Number(v))}
        />

        <TweakSection label="Headline" />
        <TweakSelect
          label="Variant"
          value={String(t.headlineIdx)}
          options={HEADLINES.map((h, i) => ({ value: String(i), label: `${i + 1}. ${h.big} ${h.accent}` }))}
          onChange={v => setTweak('headlineIdx', Number(v))}
        />

        <TweakSection label="Flow" />
        <TweakButton label="↺ Restart flow" onClick={() => go('hero')} />
      </TweaksPanel>
    </div>
  );
}

// Tiny floating screen jumper for demo / review purposes
function ScreenJumper({ theme, current, go }) {
  const [open, setOpen] = useStateApp(false);
  const screens = [
    { k: 'hero',      l: '1. Lander' },
    { k: 'q1',        l: '2. Q1' },
    { k: 'q2',        l: '3. Q2' },
    { k: 'q3',        l: '4. Q3' },
    { k: 'q4',        l: '5. Q4' },
    { k: 'dnq',       l: '6. DNQ' },
    { k: 'qualified', l: '7. Book' },
    { k: 'booked',    l: '8. Confirmed' },
  ];
  return (
    <div style={{
      position: 'fixed', left: 16, bottom: 16, zIndex: 2147483645,
      display: 'flex', flexDirection: 'column', gap: 6,
      fontFamily: theme.fonts.mono,
    }}>
      {open && (
        <div style={{
          background: theme.palette.surface,
          border: `1px solid ${theme.palette.border}`,
          borderRadius: theme.direction === 'studio' ? 12 : 6,
          padding: 6,
          display: 'flex', flexDirection: 'column', gap: 2,
          minWidth: 160,
          boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
        }}>
          {screens.map(s => (
            <button key={s.k}
              onClick={() => { go(s.k); setOpen(false); }}
              style={{
                appearance: 'none', cursor: 'pointer', textAlign: 'left',
                background: current === s.k ? theme.palette.accent : 'transparent',
                color: current === s.k ? theme.palette.onAccent : theme.palette.fg,
                border: 'none', padding: '8px 10px',
                fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
                fontFamily: theme.fonts.mono,
                borderRadius: theme.direction === 'studio' ? 8 : 3,
              }}
              onMouseEnter={e => { if (current !== s.k) e.currentTarget.style.background = theme.palette.border; }}
              onMouseLeave={e => { if (current !== s.k) e.currentTarget.style.background = 'transparent'; }}
            >{s.l}</button>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          appearance: 'none', cursor: 'pointer',
          background: theme.palette.surface,
          color: theme.palette.fg,
          border: `1px solid ${theme.palette.border}`,
          padding: '8px 12px',
          fontFamily: theme.fonts.mono, fontSize: 11, letterSpacing: '0.12em',
          textTransform: 'uppercase', fontWeight: 500,
          borderRadius: theme.direction === 'studio' ? 99 : 4,
          display: 'inline-flex', alignItems: 'center', gap: 8,
          alignSelf: 'flex-start',
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        }}>
        <span style={{ width: 6, height: 6, borderRadius: 99, background: theme.palette.accent }}></span>
        Screens
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
