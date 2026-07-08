CHELSEA KWAN — PORTFOLIO · DESIGN SPEC
======================================

Contents
--------
  copy.txt            All site copy, section by section.
  screenshots/        Rendered frames.
     01-hero.png          Hero at rest (default cream/black theme).
     02-coffee-corner.png Coffee Corner easter-egg with the swinging sign.
     open-soon-sign.png   The hand-drawn "Open Soon!" sign (transparent PNG).
  fonts/              Display fonts used by the name flip-book.
     Aston Script.ttf, Dotfont-Regular.otf, Super Cowboy.ttf, GROSTE.ttf
     (Also loaded from Google Fonts: Permanent Marker, Bangers, Bagel Fat One,
      Rye, Rozha One. Body copy is Courier New.)


CONCEPT
-------
A single-page portfolio whose signature interaction is the hero name
"Chelsea Kwan" cycling through a deck of display fonts like a flip-book.
Each font carries its own color theme, so the whole page recolors wherever
the flip lands. The Coffee Corner tab is a playful easter-egg room — a
hand-drawn "Open Soon!" sign that swings on a string like a shop door.


COLOR (default / resting palette)
---------------------------------
  Background   --bg    #F1EAD8   warm cream
  Foreground   --fg    #161310   near-black ink
  Hairlines    --line  fg @ 16% opacity

Font-driven themes (applied only when a flip settles, 0.45s ease):
  Aston            ink navy   #141B33 / cream  #EDE3CE
  Dotfont          black      #0C120D / green  #86F08A
  Super Cowboy     brown      #3A1E10 / tan    #F2D199
  Permanent Marker paper      #FBFBF7 / ink    #15151A
  Bangers          yellow     #FFD400 / black  #1A1A1A
  Bagel Fat One    pink       #FFDCEB / plum   #7A2E63
  Rye              wood       #241309 / gold   #E4BE82
  Rozha One        green      #10271F / cream  #F0E7D6
  Courier New      cream      #F1EAD8 / black  #161310  (DEFAULT)


TYPOGRAPHY
----------
  Name / display  rotating set (see fonts)     clamp(48px, 8.1vw, 128px)
  Section H2      Rozha One serif              clamp(40px, 6vw, 82px), lh .98
  Labels          Courier New, uppercase       12px / letter-spacing .32em
  Body            Courier New                  clamp(16px, 1.9vw, 21px), lh 1.65


LAYOUT & SPACING
----------------
  Fixed top nav        62px tall, CK. monogram left, tabs right w/ dividers.
  Hero                 100vh, name at padding-top 34vh, CTAs pinned 38px bottom.
  Content sections     padding 120px 7vw; max-width 1060px; 1px hairline rules.
  Section grid         290px label column + flexible content column, 48px gap.
  List items           10px apart, em-dash marker at 0.4 opacity.
  Résumé section        inverted (dark bg / cream text).
  Coffee Corner        fixed overlay below nav (top 62px), flex-centered sign.


MOTION
------
  Name flip-book   77ms/frame; auto-plays 4 loops on load. Single-click =
                   +1 font; double-click = shuffle 2 loops; Replay button.
  Nav tabs         label slides up to a duplicate while a fill panel rises
                   (0.46s cubic-bezier(.76,0,.24,1)).
  Coffee sign      pendulum swing on entry — pivot at the string ring
                   (transform-origin 50% 8%), 11 equal-period passes,
                   amplitude decaying 13deg -> 0deg, ease-in-out per pass,
                   3.91s total, starting at full displacement (reads as
                   already in motion, with weight).
