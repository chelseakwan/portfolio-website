// Centralized font loading via next/font.
//
// Self-hosted display faces are loaded with next/font/local from public/fonts.
// Google display faces are loaded with the next/font/google module.
// Each exposes a CSS variable so components can reference a font by token
// (e.g. var(--font-rozha)) instead of a raw family string. Courier New is a
// system monospace and intentionally not loaded here.

import localFont from "next/font/local";
import {
  Rozha_One,
  Permanent_Marker,
  Bangers,
  Bagel_Fat_One,
  Rye,
} from "next/font/google";

// ---- Self-hosted (Section 3.2 / 7.3) ----
export const aston = localFont({
  src: "../public/fonts/AstonScript.ttf",
  variable: "--font-aston",
  display: "swap",
  weight: "400",
});

export const dotfont = localFont({
  src: "../public/fonts/Dotfont-Regular.otf",
  variable: "--font-dotfont",
  display: "swap",
  weight: "400",
});

export const superCowboy = localFont({
  src: "../public/fonts/SuperCowboy.ttf",
  variable: "--font-supercowboy",
  display: "swap",
  weight: "400",
});

// ---- Google Fonts ----
export const rozha = Rozha_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rozha",
  display: "swap",
});

export const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-permanent-marker",
  display: "swap",
});

export const bangers = Bangers({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bangers",
  display: "swap",
});

export const bagelFatOne = Bagel_Fat_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bagel",
  display: "swap",
});

export const rye = Rye({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rye",
  display: "swap",
});

// Convenience: all variable classes for the <body> wrapper.
export const fontVariables = [
  aston.variable,
  dotfont.variable,
  superCowboy.variable,
  rozha.variable,
  permanentMarker.variable,
  bangers.variable,
  bagelFatOne.variable,
  rye.variable,
].join(" ");
