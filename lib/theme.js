// Site-wide theme application (session-scoped, NOT persisted across loads).
//
// The hero cycles the wordmark through 9 typefaces, each paired with a
// background/foreground color theme (see components/hero/themes.js). Whichever
// font/theme is active applies to EVERY route — about, work, contact, résumé —
// not just the home page, so it carries across in-app navigation.
//
// IMPORTANT — by design the active theme does NOT survive a full page load:
// every reload or freshly opened tab starts on the default cream theme. We
// achieve that by holding the active font in a module-scoped variable instead
// of localStorage. That variable persists across client-side (SPA) route
// changes — the module is evaluated once per page load — but is reset to the
// default whenever the browser re-executes the bundle (reload / new tab).
//   • applyTheme(font)  → write the color tokens onto <html> + remember it
//   • sessionFont()     → the font active this session (client only)

import {
  FONTS,
  FONT_FAMILY,
  THEMES,
  DEFAULT_INDEX,
  DEFAULT_THEME,
} from "@/components/hero/themes";

// Active font for THIS page load. Survives SPA navigation, resets on reload.
let activeFont = FONTS[DEFAULT_INDEX];

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
// CSS custom properties on the document root so every page picks them up) and
// remember it for the rest of this page load so it carries across in-app
// navigation. The choice is intentionally NOT written to localStorage, so a
// reload or new tab returns to the default cream theme.
// --title-font (page headings) and --serif (secondary display elements:
// project titles, contact links, large serif blurbs) both live here, not just
// in the hero, so that every other route follows the home page's active font.
export function applyTheme(font) {
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
  activeFont = font;
}

// The font active this page load. Defaults to cream/Courier on a fresh load
// (reload or new tab) and only changes once the visitor cycles the hero.
export function sessionFont() {
  return THEMES[activeFont] ? activeFont : FONTS[DEFAULT_INDEX];
}
