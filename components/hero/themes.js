// Hero font rotation + paired full-page color themes (PRD §4.2).
// The order of FONTS defines the cycle sequence; index 8 (Courier New) is the
// default settle state. Each font maps to a CSS font-family token and a
// background/foreground theme applied site-wide on the home page once settled.

export const FONTS = [
  "Aston",
  "Dotfont",
  "SuperCowboy",
  "Permanent Marker",
  "Bangers",
  "Bagel Fat One",
  "Rye",
  "Rozha One",
  "Courier New",
];

export const DEFAULT_INDEX = 8; // Courier New — cream / black typewriter

// Font token → CSS font-family. Loaded faces resolve to next/font variables;
// Courier New is a system monospace.
export const FONT_FAMILY = {
  Aston: "var(--font-aston)",
  Dotfont: "var(--font-dotfont)",
  SuperCowboy: "var(--font-supercowboy)",
  "Permanent Marker": "var(--font-permanent-marker)",
  Bangers: "var(--font-bangers)",
  "Bagel Fat One": "var(--font-bagel)",
  Rye: "var(--font-rye)",
  "Rozha One": "var(--font-rozha)",
  "Courier New": "'Courier New', ui-monospace, monospace",
};

// Per-font themes: { bg, fg }. --line is derived from fg at 16% opacity.
export const THEMES = {
  Aston: { bg: "#141B33", fg: "#EDE3CE" }, // ink navy / warm cream
  Dotfont: { bg: "#0C120D", fg: "#86F08A" }, // terminal green on black
  SuperCowboy: { bg: "#3A1E10", fg: "#F2D199" }, // saddle brown / tan
  "Permanent Marker": { bg: "#FBFBF7", fg: "#15151A" }, // marker on paper
  Bangers: { bg: "#FFD400", fg: "#1A1A1A" }, // comic pop yellow / black
  "Bagel Fat One": { bg: "#FFDCEB", fg: "#7A2E63" }, // bubblegum pink
  Rye: { bg: "#241309", fg: "#E4BE82" }, // dark wood / gold
  "Rozha One": { bg: "#10271F", fg: "#F0E7D6" }, // deep editorial green
  "Courier New": { bg: "#F1EAD8", fg: "#161310" }, // DEFAULT cream / black
};

// Default tokens (the cream/ink typewriter theme) — used to reset the document
// when leaving the home page so other routes always render in the base theme.
export const DEFAULT_THEME = THEMES["Courier New"];
