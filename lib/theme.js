// Site-wide theme application + persistence.
//
// The hero cycles the wordmark through 9 typefaces, each paired with a
// background/foreground color theme (see components/hero/themes.js). Whichever
// font/theme is active must apply to EVERY route — about, work, contact,
// résumé — not just the home page, and must survive a reload or a direct deep
// link. This module is the single source of truth for doing that:
//   • applyTheme(font)  → write the color tokens onto <html> + persist the font
//   • readStoredFont()  → recover the last chosen font (client only)
//   • THEME_BOOT_SCRIPT → inline, render-blocking restore to avoid a FOUC

import {
  FONTS,
  FONT_FAMILY,
  THEMES,
  DEFAULT_INDEX,
  DEFAULT_THEME,
} from "@/components/hero/themes";

export const THEME_STORAGE_KEY = "ck:theme-font";

// #rgb / #rrggbb → "rgba(r, g, b, a)" — used to derive the hairline (--line).
export function hexToRgba(hex, a) {
  const h = hex.replace("#", "");
  const x =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const r = parseInt(x.slice(0, 2), 16);
  const g = parseInt(x.slice(2, 4), 16);
  const b = parseInt(x.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

// Apply a font's paired color theme AND its display typeface site-wide (writes
// CSS custom properties on the document root so every page picks them up) and,
// by default, persist the choice so it carries across navigations and reloads.
// --title-font (page headings) and --serif (secondary display elements:
// project titles, contact links, large serif blurbs) both live here, not just
// in the hero, so that every other route follows the home page's active font.
export function applyTheme(font, { persist = true } = {}) {
  const t = THEMES[font] || DEFAULT_THEME;
  const fam = FONT_FAMILY[font] || FONT_FAMILY[FONTS[DEFAULT_INDEX]];
  const stack = `${fam}, "Arial Black", serif`;
  document.documentElement.setAttribute("data-font", font);
  const root = document.documentElement.style;
  root.setProperty("--bg", t.bg);
  root.setProperty("--fg", t.fg);
  root.setProperty("--line", hexToRgba(t.fg, 0.16));
  root.setProperty("--title-font", stack);
  root.setProperty("--serif", stack);
  if (persist) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, font);
    } catch {
      /* storage unavailable (private mode / blocked) — ignore */
    }
  }
}

// The last font the visitor settled on, or the default if none/invalid.
export function readStoredFont() {
  try {
    const f = localStorage.getItem(THEME_STORAGE_KEY);
    if (f && THEMES[f]) return f;
  } catch {
    /* ignore */
  }
  return FONTS[DEFAULT_INDEX];
}

// Render-blocking script (injected at the top of <body>) that restores the
// saved theme — colors AND title font — before first paint, so a reload or
// deep link to any route doesn't flash the default cream/Rozha theme.
// Self-contained — no imports at runtime.
export const THEME_BOOT_SCRIPT = `(function(){try{
var T=${JSON.stringify(THEMES)};
var F=${JSON.stringify(FONT_FAMILY)};
var f=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
var t=(f&&T[f])?T[f]:null;
if(!t)return;
document.documentElement.setAttribute('data-font',f);
var r=document.documentElement.style;
r.setProperty('--bg',t.bg);r.setProperty('--fg',t.fg);
var h=t.fg.replace('#','');
if(h.length===3){h=h[0]+h[0]+h[1]+h[1]+h[2]+h[2];}
r.setProperty('--line','rgba('+parseInt(h.slice(0,2),16)+','+parseInt(h.slice(2,4),16)+','+parseInt(h.slice(4,6),16)+',0.16)');
var fam=F[f];
if(fam){var st=fam+', "Arial Black", serif';r.setProperty('--title-font',st);r.setProperty('--serif',st);}
}catch(e){}})();`;
