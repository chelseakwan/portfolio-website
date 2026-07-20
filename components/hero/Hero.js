"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import profile from "@/content/profile";
import { FONTS, FONT_FAMILY, DEFAULT_INDEX } from "@/components/hero/themes";
import { applyTheme, sessionFont } from "@/lib/theme";

const NAME = "Chelsea Kwan";
const TICK_MS = 77; // advance one font roughly every 77ms (PRD §4.1)
const ENTRANCE_CYCLES = 3; // full loops on entrance / replay
const SHUFFLE_CYCLES = 2; // loops on double-click shuffle
const CLICK_DELAY_MS = 220; // single- vs double-click disambiguation
// Session flag: the entrance reel plays only on the visitor's FIRST landing on
// the home page this session. Returning home (CK. logo, in-session reloads)
// lands statically so the wordmark doesn't reshuffle every time.
const INTRO_KEY = "ck:hero-intro-played";

const mod = (n, m) => ((n % m) + m) % m;

// Signature animated hero (PRD §4). Cycles the wordmark through 9 typefaces,
// each paired with a full-page theme applied site-wide once the cycle settles.
export default function Hero() {
  // step indexes an infinite cycle; the displayed font is FONTS[step mod 9].
  const [step, setStep] = useState(DEFAULT_INDEX);
  const [running, setRunning] = useState(false);
  // True once the mount effect has read the visitor's stored font into `step`.
  // The theme effect must not touch the page theme before this — see below.
  const [synced, setSynced] = useState(false);

  const reducedRef = useRef(false);
  const intervalRef = useRef(null);
  const clickTimerRef = useRef(null);
  const runningRef = useRef(false);

  const setRunningSafe = useCallback((v) => {
    runningRef.current = v;
    setRunning(v);
  }, []);

  const clearInterval_ = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Track the hero-specific vertical gap every step (the wordmark itself uses
  // inline font styles, so the live flip needs no global var). Recolor + restyle
  // the page only once settled, never mid-flip (PRD §4.1). Driven off
  // [step, running] so it fires exactly when an animation ends or a manual
  // change lands; applyTheme writes the color tokens AND --title-font onto
  // <html> so both the theme and its paired title font carry to every route.
  useEffect(() => {
    const font = FONTS[mod(step, FONTS.length)];
    document.documentElement.style.setProperty(
      "--title-gap",
      font === "Aston" ? "0.85em" : "0"
    );
    // Do nothing to the page theme until the mount effect has synced `step` to
    // the font active this session. Until then `step` is still DEFAULT_INDEX
    // (Courier); on a fresh load that's already the cream default, but after
    // in-app navigation the session may hold a different font, so we wait to
    // avoid flashing cream before re-applying the active theme.
    //
    // This guard is intentionally driven by STATE (`synced`), not a ref. React
    // StrictMode double-invokes effects on mount (setup → cleanup → setup), and
    // a ref's mutation persists across that double-invoke — so a ref-based
    // "first run" guard lets the second setup fall through and apply the default
    // theme (which then gets read back as the active font, settling the whole
    // site on cream/black for good). `synced` only flips true on a committed
    // render, so every StrictMode re-run before the sync correctly skips, and
    // applyTheme never fires for the transient default step.
    if (!synced) return;
    if (!running) {
      applyTheme(font);
    }
  }, [step, running, synced]);

  // Spin the reel, landing on targetIdx after `cycles` full loops.
  const startAnim = useCallback(
    (targetIdx = DEFAULT_INDEX, cycles = ENTRANCE_CYCLES) => {
      clearInterval_();

      // Honor reduced motion: jump straight to the target, no spin (PRD §4.4).
      if (reducedRef.current) {
        setRunningSafe(false);
        setStep(targetIdx);
        return;
      }

      const n = FONTS.length;
      const MAX = n * cycles + mod(targetIdx, n);
      setRunningSafe(true);
      let s = 0;
      setStep(0);
      intervalRef.current = setInterval(() => {
        if (s >= MAX) {
          clearInterval_();
          setRunningSafe(false); // settle → recolor effect runs at step = target
          return;
        }
        s += 1;
        setStep(s);
      }, TICK_MS);
    },
    [clearInterval_, setRunningSafe]
  );

  // Single click → advance one font; deferred so a double-click can cancel it.
  const onNameClick = useCallback(() => {
    if (clickTimerRef.current) return;
    clickTimerRef.current = setTimeout(() => {
      clickTimerRef.current = null;
      clearInterval_();
      setRunningSafe(false);
      setStep((s) => s + 1);
    }, CLICK_DELAY_MS);
  }, [clearInterval_, setRunningSafe]);

  // Double click → a short random shuffle (PRD §4.1).
  const onNameDblClick = useCallback(() => {
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
      clickTimerRef.current = null;
    }
    startAnim(Math.floor(Math.random() * FONTS.length), SHUFFLE_CYCLES);
  }, [startAnim]);

  const onNameKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onNameClick();
      }
    },
    [onNameClick]
  );

  // Mount: detect reduced motion, then either play the entrance reel (first
  // landing this session) or land STATICALLY on the font active this session.
  // On a fresh load that's the cream default; after in-app navigation it's
  // whatever the visitor last cycled to, so the active theme is preserved.
  // Returning home via the "CK." logo no longer reshuffles the wordmark once
  // the intro has played.
  // Manual controls still animate on demand: click advances a font,
  // double-click shuffles, and Replay re-spins.
  // On unmount, clear timers and reset only the hero-specific vertical gap.
  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const activeIdx = FONTS.indexOf(sessionFont());
    const target = activeIdx === -1 ? DEFAULT_INDEX : activeIdx;

    let introPlayed = true;
    try {
      introPlayed = sessionStorage.getItem(INTRO_KEY) === "1";
    } catch {
      /* storage blocked — treat as already played, land static */
    }

    // Unlock the theme effect only now, so the first applyTheme it runs (once
    // the reel settles, or immediately if static) paints the active theme —
    // never the transient default while spinning.
    setSynced(true);

    if (!introPlayed) {
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {
        /* ignore */
      }
      // Spin the reel 3× and settle on the stored font (PRD §4.1). Honors
      // reduced motion internally by jumping straight to the target.
      startAnim(target, ENTRANCE_CYCLES);
    } else {
      setStep(target);
    }

    return () => {
      clearInterval_();
      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
        clickTimerRef.current = null;
      }
      // Leave the active color theme AND --title-font in place — both must
      // persist across routes so every other page's heading follows the home
      // page's chosen font. Only reset the hero-specific vertical gap, which no
      // other route consumes.
      document.documentElement.style.setProperty("--title-gap", "0");
    };
  }, [clearInterval_, startAnim]);

  const currentFont = FONTS[mod(step, FONTS.length)];
  const fontFamily = `${FONT_FAMILY[currentFont]}, "Arial Black", sans-serif`;
  const fontWeight = currentFont === "Courier New" ? 700 : 400;

  return (
    <header className="hero">
      <div className="hero__name">
        <div
          className="hero__wordmark"
          role="button"
          tabIndex={0}
          aria-label={NAME}
          title="Click to change font · double-click to shuffle"
          onClick={onNameClick}
          onDoubleClick={onNameDblClick}
          onKeyDown={onNameKeyDown}
        >
          {NAME.split("").map((ch, i) =>
            ch === " " ? (
              <span key={i} className="spc" aria-hidden="true">
                &nbsp;
              </span>
            ) : (
              <span key={i} className="ltr" style={{ fontFamily, fontWeight }}>
                {ch}
              </span>
            )
          )}
        </div>
      </div>

      <p className="hero__subtitle">{profile.tagline}</p>

      <p className="hero__hint">
        one click to switch theme. two clicks to randomize.
      </p>

      <div className="hero__cta">
        <button
          type="button"
          className="btn btn--solid"
          onClick={() => startAnim(DEFAULT_INDEX, ENTRANCE_CYCLES)}
          disabled={running}
          aria-label="Replay name animation"
        >
          <span aria-hidden="true" style={{ fontSize: "9px" }}>
            ▶
          </span>
          <span>Replay</span>
        </button>
        <Link href="/about" className="btn btn--ghost">
          <span>Learn more</span>
        </Link>
      </div>
    </header>
  );
}
