---
name: easyomnitracker
description: Location tracking simplified. Phone-based vehicle and field-staff tracking, shown working.
colors:
  forest-950: "#0b1d15"
  forest-900: "#10291e"
  forest-800: "#163628"
  forest-700: "#1d4a36"
  forest-600: "#255f45"
  forest-500: "#2f7455"
  forest-300: "#8fb39d"
  forest-200: "#c4d8c9"
  forest-100: "#e1ebe2"
  forest-50: "#eef4ee"
  amber-800: "#774d12"
  amber-600: "#a8701e"
  amber-500: "#c48a2c"
  amber-400: "#d8a54f"
  amber-200: "#ecd3a1"
  amber-100: "#f6e8cb"
  amber-50: "#fbf4e5"
  ink: "#14211a"
  ink-2: "#3c4942"
  ink-3: "#5a665f"
  stone-0: "#fdfcf9"
  stone-50: "#f9f7f2"
  stone-100: "#f3f0e8"
  stone-200: "#e8e3d7"
  stone-300: "#d8d1c1"
  stone-400: "#b3ab99"
  white: "#ffffff"
  paused: "#8a8f8b"
  footer-text: "#b9c7bd"
  map-land: "#eceae1"
  map-block: "#e2dfd3"
  map-park: "#d3e2d4"
  map-water: "#c8d9d8"
  map-casing: "#d9d4c6"
  map-label: "#8c8778"
typography:
  display:
    fontFamily: "Schibsted Grotesk, Mukta, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 3.9vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.038em"
  display-figure:
    fontFamily: "Schibsted Grotesk, Mukta, system-ui, sans-serif"
    fontSize: "clamp(3.5rem, 6vw, 4.75rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Schibsted Grotesk, Mukta, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.4vw, 2.875rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.032em"
  title:
    fontFamily: "Schibsted Grotesk, Mukta, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 2vw, 1.75rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  title-sm:
    fontFamily: "Schibsted Grotesk, Mukta, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  lede:
    fontFamily: "Mukta, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Mukta, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Mukta, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  button:
    fontFamily: "Mukta, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.2
  label:
    fontFamily: "Mukta, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "-0.01em"
    fontFeature: "\"tnum\" 1"
  mono-sm:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.4
    fontFeature: "\"tnum\" 1"
rounded:
  r-xs: "4px"
  r-s: "6px"
  r: "10px"
  r-l: "14px"
  r-xl: "20px"
  pill: "999px"
spacing:
  gutter: "24px"
  gutter-mobile: "16px"
  section-y: "clamp(80px, 10vw, 136px)"
  header-h: "68px"
  header-h-mobile: "60px"
  container-max: "1220px"
components:
  button-primary:
    backgroundColor: "{colors.forest-800}"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.r-s}"
    padding: "10px 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.forest-700}"
    textColor: "{colors.white}"
  button-primary-lg:
    backgroundColor: "{colors.forest-800}"
    textColor: "{colors.white}"
    rounded: "{rounded.r-s}"
    padding: "14px 24px"
    height: "52px"
  button-primary-sm:
    backgroundColor: "{colors.forest-800}"
    textColor: "{colors.white}"
    rounded: "{rounded.r-s}"
    padding: "8px 16px"
    height: "38px"
  button-secondary:
    backgroundColor: "{colors.stone-0}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.r-s}"
    padding: "10px 20px"
    height: "44px"
  button-secondary-hover:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
  text-link:
    textColor: "{colors.forest-700}"
  nav-link:
    textColor: "{colors.ink-2}"
    height: "44px"
  nav-link-hover:
    textColor: "{colors.ink}"
  nav-link-current:
    textColor: "{colors.forest-700}"
  chip:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.pill}"
    padding: "5px 12px"
  chip-on:
    backgroundColor: "{colors.forest-800}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "5px 12px"
  sim-tag:
    backgroundColor: "{colors.amber-50}"
    textColor: "{colors.amber-800}"
    rounded: "{rounded.pill}"
    padding: "3px 8px"
  status-moving:
    backgroundColor: "{colors.forest-50}"
    textColor: "{colors.forest-700}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "2px 8px 2px 7px"
  status-idle:
    backgroundColor: "{colors.amber-100}"
    textColor: "{colors.amber-800}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "2px 8px 2px 7px"
  status-arrived:
    backgroundColor: "{colors.stone-100}"
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "2px 8px 2px 7px"
  card:
    backgroundColor: "{colors.stone-0}"
    textColor: "{colors.ink}"
    rounded: "{rounded.r-xl}"
    padding: "clamp(24px, 3.5vw, 40px)"
  card-tinted:
    backgroundColor: "{colors.forest-50}"
    textColor: "{colors.ink}"
    rounded: "{rounded.r-xl}"
    padding: "clamp(24px, 3.5vw, 40px)"
  inset-well:
    backgroundColor: "{colors.stone-100}"
    rounded: "{rounded.r-l}"
    padding: "18px"
  inner-sheet:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.r}"
    padding: "14px"
  field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.r-s}"
    padding: "8px 10px"
  stepper:
    backgroundColor: "{colors.white}"
    textColor: "{colors.forest-700}"
    typography: "{typography.mono}"
    rounded: "{rounded.r-s}"
    height: "44px"
  tab:
    textColor: "{colors.ink-2}"
    rounded: "{rounded.r}"
    padding: "16px 18px"
  tab-selected:
    backgroundColor: "{colors.stone-0}"
    textColor: "{colors.ink}"
    rounded: "{rounded.r}"
    padding: "16px 18px"
  console:
    backgroundColor: "{colors.stone-0}"
    textColor: "{colors.ink}"
    rounded: "{rounded.r-l}"
  notice:
    backgroundColor: "{colors.forest-50}"
    textColor: "{colors.ink}"
    rounded: "{rounded.r-l}"
    padding: "20px 22px"
  consent-band:
    backgroundColor: "{colors.forest-900}"
    textColor: "{colors.forest-200}"
    padding: "clamp(80px, 10vw, 136px) 0"
  footer:
    backgroundColor: "{colors.forest-950}"
    textColor: "{colors.footer-text}"
    padding: "56px 0 40px"
---

# Design System: easyomnitracker

## Overview

**Creative North Star: "The Trip, Not the Tracker"**

The system exists to show a vehicle moving, not to sell the idea of tracking. Every surface is a calm, warm workspace (stone paper, white sheets, hairline borders) on which one thing is allowed to be alive: the trip. A van crosses a drawn city map, amber pings fall behind it, a log fills with timestamped coordinates, and a status pill turns amber when it stops. Everything else stays still, legible and plainly typed, so that the live state reads instantly against it.

The mood is grounded, practical and trustworthy rather than technical. Deep forest green carries authority (type, primary actions, the consent band) without the cold blue of fleet-software dashboards; warm stone neutrals keep it approachable for a non-technical owner; muted amber is a signal colour, not a brand colour. Density is moderate: generous section rhythm, but product panels are real, compact UI with real-looking figures, each labelled as simulated or sample. The site rejects the dark neon-map SaaS hero and the grid of icon cards; proof is working UI, never decoration.

The build is static HTML, CSS and JS with no build step and no dependencies beyond three Google Fonts. Tokens live as CSS custom properties on `:root` in `styles.css`; icons live in an inline SVG sprite at the top of each page.

**Key Characteristics:**
- Warm stone ground, white panels, 1px warm hairlines; shadows are soft and green-tinted.
- Forest green for type emphasis, primary actions and the one full-bleed consent field.
- Amber appears only where something is live or idle (plus focus and selection). Paused is neutral grey.
- Grotesk display, humanist body, monospace only for telemetry and figures.
- One focal sequence (the hero film and the phone trip it drives); every other motion explains a change of state.
- Every simulated or sample visual says so on its face.

## Colors

A warm, low-chroma palette: stone neutrals and a green-black ink as the ground, deep forest green as the single brand voice, and muted amber as a reserved signal for live state.

### Primary
- **Deep Forest** (forest-800): the primary action colour. Fills every primary button ("Start free", "Launch app"), the selected filter chip, step numbers and the price figure. Hover deepens toward forest-700. Also the browser theme colour.
- **Ledger Green** (forest-700): link text, current nav item, active TOC entry, positive calculator hints, "50% off" text.
- **Field Green** (forest-600): icon tint on light grounds, the step-line draw, route plan dashes, check marks, timeline segments, consent tick fill, the soft second line of the hero headline.
- **Moss** (forest-500): small state dots (moving device, hero fact bullets, legal list markers).
- **Night Canopy** (forest-900): the consent band ground; the step numbers there invert to ivory (#e9efe9) when selected.
- **Deep Night** (forest-950): the footer ground and the phone body.
- **Sage tints** (forest-300, forest-200, forest-100, forest-50): text and icons on forest grounds (300/200), hairlines inside tinted cards (100), and the tinted surfaces themselves: calculator card, privacy notice, the comparison table's "us" column (50).

### Secondary
- **Signal Amber** (amber-500): the driven route trail, GPS ping dots and their expanding rings, the idle device dot.
- **Halo Amber** (amber-400): the pulsing halo under the moving van.
- **Focus Amber** (amber-600): the 2px keyboard focus outline everywhere (3.9:1 on stone-50).
- **Amber Ink** (amber-800): text on amber grounds: the "Simulated trip" chip, the Idle status pill, event lines in the ping log.
- **Amber washes** (amber-200, amber-100, amber-50): chip border and text selection (200), Idle pill ground (100), chip ground and the flash behind a new log row (50).

### Neutral
- **Green-Black Ink** (ink): headings and primary text. Never pure black.
- **Slate Moss** (ink-2): body copy, ledes, secondary UI text.
- **Lichen Grey** (ink-3): captions, metadata, table heads, timestamps, "Sample data" notes (5.3:1 on stone-100 or lighter).
- **Page Stone** (stone-50): the page background and the header glass.
- **Paper** (stone-0): raised panels: console, cards, tabs, FAQ and how-it-works section grounds.
- **Linen** (stone-100): inset wells (vignettes, panel visuals), hover fills, the closing band, inline code.
- **Hairline** (stone-200): the default 1px border and divider.
- **Rule** (stone-300): stronger borders on fields, chips, secondary buttons, the terms rule.
- **Pebble** (stone-400): disabled stepper icons, unchecked boxes, the "no" marks in the comparison table, scrollbar thumb.
- **Sheet White** (white): fields, chat bubble, lists and tables nested inside a well, and text on forest.
- **Paused Grey** (paused, with stone-400 on dark grounds): every paused state, in the console device list and on the driver phone.
- **Footer Mist** (footer-text): body text on the forest-950 footer.
- **Map set** (map-land, map-block, map-park, map-water, map-casing, map-label): the drawn city on the hero phone's map. Land and blocks are warm stone, the park a pale sage, the river a grey-teal. Use this set for any future map illustration.

### Named Rules
**The Amber Means Live Rule.** Amber marks something happening now: the route trail, the van halo, GPS pings, the Idle status, the "Simulated trip" chip and new-log flashes. Its only other uses are the keyboard focus ring and text selection. It never fills a button, colours a link or heading, or decorates a section.

**The One Forest Field Rule.** The consent band (forest-900) is the page's single full-bleed dark field, and it sits directly above the forest-950 footer. Every other section is stone or paper; alternate grounds with stone-0 sections bounded by stone-200 hairlines, not with more dark bands.

**The Forest Acts Rule.** Every primary action is forest-800 with white text. There is no second accent for CTAs.

## Typography

**Display Font:** Schibsted Grotesk 600/700 (with Mukta, system-ui)
**Body Font:** Mukta 400/500/600 (with system-ui, -apple-system, Segoe UI)
**Label/Mono Font:** JetBrains Mono 500 (with ui-monospace, SFMono-Regular, Menlo)

**Character:** A compact, newsy grotesk set tight for headlines against a warm humanist sans whose Devanagari heritage suits an Indian audience; the mono appears only where the product itself would print a number.

### Hierarchy
- **Display** (700, clamp(2.5rem, 3.9vw, 3.5rem), 1.02, -0.038em): the hero headline only. Its second sentence may drop to forest-600 as a softer line.
- **Display Figure** (700, clamp(4.5rem, 8vw, 6rem), 0.84, -0.05em, tabular figures): the headline price, in forest-800, with the rupee sign at half size in forest-600 riding the cap height. The calculator total uses the same face at clamp(2.25rem, 3.4vw, 2.75rem), -0.035em.
- **Headline** (700, clamp(2rem, 3.4vw, 2.875rem), 1.08, -0.032em): section heads and band heads. The closing band head scales up to clamp(2.25rem, 4.4vw, 3.5rem) in forest-800.
- **Title** (700, clamp(1.375rem, 2vw, 1.75rem), 1.08, -0.025em): feature panel heads; step heads (1.3125rem) and the calculator head (1.375rem) sit at the low end of this role.
- **Title Small** (600, 1.1875rem, 1.3, -0.015em): FAQ questions, set in the display face.
- **Lede** (400, 1.125rem, 1.6): the sentence under a section head, max 36em. The hero lede runs clamp(1.0625rem, 1.3vw, 1.1875rem), max 34em.
- **Body** (400, 1.0625rem, 1.6; 1rem under 640px): running copy. Legal text runs at line-height 1.75 within 70ch.
- **Body Small** (0.9375rem): nav, captions, terms, footer, metadata.
- **UI** (0.875rem) and **UI Small** (0.8125rem): text inside drawn product UI only (the console showcase's lists, docks, tables and chips, step vignettes), where real dashboards run denser than the page. Never for page prose.
- **Label** (600, 0.75rem): status pills, table heads, vignette labels, panel micro-titles. Sentence case, never uppercase, never letterspaced.
- **Mono** (500, 0.9375rem, -0.01em, tabular figures): telemetry readouts, Tracking IDs, coordinates, stepper counts, calculator line items. **Mono Small** (0.6875rem) carries the ping log, timeline axis and retention bars.

### Named Rules
**The Mono Is Telemetry Rule.** JetBrains Mono appears only where a machine would print it: speeds, distances, coordinates, timestamps, Tracking IDs, passcodes, counts and line-item figures. Headings, prose, labels and buttons are never mono. Tabular report tables stay in Mukta with tabular numerals.

**The Tracking Floor Rule.** Display letter-spacing tightens with size, from -0.015em (FAQ question) to -0.038em (hero), and never goes past -0.04em, which only the price figure uses.

**The Sentence Case Rule.** No uppercase labels, no letterspaced eyebrows, no kickers above headings. A section head is a headline and one plain sentence.

## Layout

A single centred container (max 1220px, 24px gutter, 16px under 640px) holds asymmetric two-column grids built from fractional minmax tracks rather than a 12-column system: hero 5 : 6.6, comparison and console footer 5 : 7, consent band 5 : 6.4, FAQ 4 : 7, feature explorer 4 : 8. Sections breathe on a fluid vertical rhythm (clamp(80px, 10vw, 136px)); section heads hold to 640px with 40 to 64px below them. Internal spacing runs on a loose 4px step (4, 8, 12, 16, 24, 32, 48), with grid gaps expressed as clamps so density loosens on wide screens.

The header is sticky at 68px (60px on mobile). At the top of the page it is clear over the stone ground; once the page scrolls, an ivory (stone-0) glass at 80% with a 14px blur, a stone-200 hairline and a soft green-tinted drop ease in over 0.35s. The height never changes, so nothing below it moves. The glass is drawn on a pseudo-element, so the mobile sheet and scrim position against the viewport. Anchor jumps are offset by the header height.

Responsive behaviour collapses in four steps: at 1080px the nav tightens and the header APK link hides; at 960px every two-column grid stacks to one column, steps stack, feature tabs become a 2-column grid of compact tabs, and sticky side columns (FAQ head, legal TOC) release; at 860px the nav becomes a menu toggle with a drop-down sheet; at 640px buttons in the hero go full width, the console footer stacks and the map's minor labels hide. Text never scrolls horizontally; wide tables (comparison, report) scroll inside their own frame.

The privacy page is a reading layout: a 240px sticky table of contents beside a 70ch body column.

## Elevation & Depth

Depth is mostly tonal and drawn: stone-50 page, stone-0 paper panels, stone-100 inset wells, white sheets nested inside wells, each edge marked by a 1px warm hairline. Shadows are a supporting layer, always tinted with the ink green (rgba(20, 33, 26, …)) rather than black, and soft enough that the hairline still does the separating. Elevation rises with importance: inline UI is nearly flat, cards lift gently, and only the hero stage floats (the film frame and, above it, the phone).

### Shadow Vocabulary
- **Rest** (`box-shadow: 0 1px 2px rgba(20,33,26,.06), 0 1px 1px rgba(20,33,26,.03)`): secondary buttons, selected tab, comparison table frame, APK card, chat bubble.
- **Lift** (`box-shadow: 0 1px 2px rgba(20,33,26,.05), 0 10px 28px -10px rgba(20,33,26,.16)`): the feature panel frame and the price card.
- **Float** (`box-shadow: 0 2px 6px rgba(20,33,26,.06), 0 28px 60px -20px rgba(20,33,26,.28)`): reserved; currently unused.
- **Film** (`box-shadow: 0 1px 2px rgba(20,33,26,.08), 0 18px 40px -22px rgba(20,33,26,.38), 0 48px 90px -48px rgba(29,74,54,.5)`): the hero film frame only; a forest-tinted long drop that seats the frame in the sage atmosphere.
- **Phone** (`--shadow-phone: 0 0 0 1px rgba(253,252,249,.16), 0 2px 4px rgba(20,33,26,.18), 0 30px 60px -20px rgba(20,33,26,.5)`): the hero phone only. The light hairline holds its edge where it crosses the dark film.
- **Primary press** (`box-shadow: 0 1px 0 rgba(255,255,255,.08) inset, 0 1px 2px rgba(11,29,21,.25)`; hover `0 8px 20px -8px rgba(11,29,21,.5)`): primary buttons, giving them a pressed-ink edge that grows into a soft drop on hover.

### Named Rules
**The Hairline First Rule.** Separate with a 1px stone-200 border before reaching for a shadow; a shadow never stands in for a missing border.

**The One Float Rule.** Only the hero stage is lifted that far: the film takes the Film shadow, the phone the Phone shadow. Nothing else floats.

## Shapes

Gently rounded, never pillowy. Radii step from 4px (checkboxes, inline code, timeline bars) to 6px (buttons, fields, stepper, nav hovers), 10px (tabs, nested lists and tables), 14px (wells, notices, the film on phones) and 20px (cards and the feature frame). Pills (999px) are reserved for status and filter chips. Device mocks are the one exception: the consent phone uses 46px and 37px corners (16px for its notification card), the hero phone 2.6em and 2.05em (about 36px and 29px at desktop size), and phone-only literals (the opaque near-black notch #070a08, the GPS pulse in amber-500 alpha) live only inside them. The chat bubble in the setup journey carries a single 4px tail corner (12px 12px 4px 12px), and its phone uses 30px and 24px corners. Borders are always 1px solid hairlines; the only dashed line is the empty, already-flushed month in the retention strip, and dotted strokes appear only as a planned route (on the map, and the setup journey's route line).

Icons come from one authored inline SVG sprite: 24px viewBox, stroke-only, 1.75 stroke width (2 to 3 at small sizes and in buttons), round caps and joins, drawn in currentColor. There is no icon font and no raster icon.

## Components

### Buttons
Confident, compact, ink-heavy: a dark green slab with white type.
- **Shape:** gently rounded (6px), 44px tall by default; small 38px, large 52px. Icons sit 0.55em from the label.
- **Primary:** forest-800 with white Mukta 600, 10px 20px padding (14px 24px large), the Primary press shadow.
- **Hover / Focus:** background eases to forest-700 and the drop shadow grows; a trailing arrow nudges 2px right, a download icon nudges 2px down. Press scales to 0.985 and drops 1px. Focus is the global 2px amber-600 outline at 3px offset.
- **Secondary:** paper (stone-0) with ink text and a stone-300 border plus Rest shadow; hover turns the border forest-300 and the fill white. Used for the APK download beside a primary.
- **Text link:** forest-700 Mukta 600 with a 1.5px forest-200 underline at 4px offset that darkens to currentColor on hover; an arrow slides 3px. A light variant (white on forest) is used inside the consent band.

### Chips
- **Filter chip:** white pill, stone-300 border, ink-2 Mukta 500 at 0.8125rem, 5px 12px. Selected chip fills forest-800 with white text.
- **Simulated tag:** amber-50 pill with amber-200 border and amber-800 Mukta 600 text. Sits in the console bar; its job is honesty, so it never hides.
- **Status pill:** label type with a 6px leading dot in currentColor. Moving is forest-700 on forest-50 (the dot blinks gently); Idle is amber-800 on amber-100 and counts seconds; Arrived is ink-2 on stone-100. Colour transitions over 0.3s.

### Cards / Containers
- **Corner Style:** 20px for cards (price sheet, APK block, feature frame); 14px for the console, wells and notices.
- **Background:** paper (stone-0) for raised cards; forest-50 with a forest-100 border for the calculator (docked inside the price sheet) and the privacy notice; stone-100 for inset wells that hold product UI; white for sheets nested inside a well.
- **Shadow Strategy:** Rest for inline cards, Lift for the price card and feature frame, Phone for the hero phone only (see Elevation & Depth).
- **Border:** 1px stone-200 on every container.
- **Internal Padding:** fluid clamp(24px, 3.5vw, 40px) for cards; 18px for wells; 14px for nested sheets.

### Inputs / Fields
- **Stepper:** the one real input. White, 1px stone-300 border, 6px radius, two 44px square forest-700 icon buttons around a mono count divided by stone-200 hairlines. Hover fills forest-50; disabled drops to stone-400 with no fill.
- **Field (illustrative):** white, 1px stone-300, 6px radius, 8px 10px, a 0.6875rem ink-3 label above Mukta 600 value; a 1.5px forest-600 caret blinks while text types in.
- **Checkbox (illustrative):** 18px, 4px radius, 1.5px stone-400 border; checked fills forest-600 with a white tick that scales in.
- **Focus:** the global amber-600 outline.

### Pricing
One price sheet (stone-0, 20px radius, stone-200 hairline, Lift shadow) split into the price and a docked estimate; below 960px the estimate stacks under the price.

- **Price:** ₹50 is the section's single focal point (Display Figure), "per Tracking-Month" in ink 600 with "Inclusive of GST. No hidden fees." beneath, then the struck ₹100 (with a screen-reader "Regular price") and a forest-50 "50% off, limited time" pill. A hairline separates the three inclusions (forest check icons), then the full-width primary "Start free".
- **Sign-up bonus:** a quiet ticket under the button: stone-50 ground, stone-200 hairline, 10px radius, a gift icon in a forest-50 circle, and the date-aware bonus sentence (1 free Tracking-Month before the 15th, 2 after) written by script.js.
- **Estimate:** the forest-50 panel with forest-100 hairlines. Two rows (vehicles or phones 1 to 100, months in one purchase 1 to 12) each with a label, a range hint and a stepper whose middle is a typeable mono field: digits only, out-of-range values settle to the nearest limit, arrow keys step, buttons disable at the limits. A white bulk card shows ten 6px segments filling forest-300 as Tracking-Months approach 10 (22ms stagger) and the hint sentence; at 10 or more the segments and the percent badge turn forest-600 and the hint reads that 10% is applied. The summary lists the Tracking-Months × ₹50 with the "IDs × months" working beneath, the bulk discount (muted until it applies), and the total in the display face with "works out to ₹50 (or ₹45) per Tracking-Month". Every figure eases to its new value (0.36s ease-out, integer steps, exact on landing); screen readers hear one settled summary instead. The arithmetic is the original: ₹50 × IDs × months, 10% off (rounded) at 10 or more Tracking-Months in one purchase.
- **Terms:** a 4 : 8 block, "Pricing terms" with a one-line promise on the left and a hairline accordion on the right (bulk discount, when a month counts, refunds, refer and earn). Each closed row shows the rule's name and a one-line summary so nothing is hidden behind a click; the full wording opens below with the FAQ's plus-to-cross icon.

### Navigation
- **Header:** a two-line brand lockup: the mark beside the lowercase wordmark in Schibsted Grotesk 700 (1.1875rem, -0.03em) over the tagline "Location tracking simplified" in Mukta 500 ink-3 (0.75rem); the mark lifts 2px on hover. Nav links are Mukta 500 ink-2 on 44px-tall targets, 26px apart (20px under 1080px). The indicator is a 2px forest-600 underline with round ends that draws in from the left on hover (0.4s ease-out) and leaves to the right; the section in view (scroll-spy) or current page keeps it and turns forest-700. Text weight never changes between states, so nothing shifts. A 20px stone-300 hairline separates the links from the actions: a quiet "Driver app" download link (its underline in stone-400, icon nudging down on hover; hidden under 1080px, where the hero carries the same download) and the forest-800 "Launch app" primary with an external-link arrow that nudges up-right on hover and a screen-reader note that it opens a new tab.
- **Mobile (860px and below):** a 44px toggle whose two 2px bars rotate into a cross (0.4s ease-out). It sits before the menu in the source, so Tab goes straight from the toggle into the sheet. The sheet is solid stone-0, revealed top-down with a clip-path wipe (0.45s ease-out in, 0.32s ease-in-out out) while its rows settle 6px in a 30ms stagger. Links are Schibsted Grotesk 600 at 1.25rem in 56px hairline-divided rows; the section in view shows a 7px forest dot at the row end. Below them the actions stack at 50px: "Driver app (Android)" as a secondary button, then "Launch app". A forest-tinted scrim (rgba(11,29,21,.32)) dims the page and closes the sheet on tap, the page behind stops scrolling, and Escape, a link tap, or tabbing out of the header closes it. Reduced motion drops the wipe and stagger.
- **Legal TOC:** a 1px stone-200 left rule; the active entry gains a 2px forest-600 bar and forest-700 text.

### Product Showcase (console)
The features section demonstrates the console instead of describing it. The section head spans the top; below it a 4 : 8 split puts the feature navigation and explanation on the left and one large console window on the right.

- **Feature navigation:** four ARIA tabs (Live map, Route history, Trip reports, Account and data), each a 10px-radius row with a 22px icon, a Mukta 600 title and an ink-3 one-liner. One paper sheet (stone-0, hairline, Rest shadow) slides behind the selected tab (0.5s ease-out on position and size); the selected icon turns forest-600, and unselected rows tint stone on hover with the icon nudging 1px. Under the tabs, a hairline-topped block holds the selected feature's h3 and paragraph, which settles 6px in on change. Arrow keys, Home and End move between tabs; `#analytics` opens Trip reports. Below 960px the tabs become a 4-across row (2 by 2 under 640px) with titles only, above the explanation and the window.
- **Window:** white, 14px radius, a stone-200 hairline and the Lift shadow. A 48px stone-50 bar carries the mark and "Console", a view switcher that mirrors the tabs (the selected view is a white chip; it is a pointer convenience and hidden from assistive tech, since the tabs are the real control), the amber "Sample data" tag and a pause control. The body is a fixed 468px on desktop and tablet so switching views never moves the page; each view settles 6px in (0.45s).
- **Live map view:** a 212px stone-50 device list (status dot, name, status and speed) beside the map and a docked vehicle panel. The map is the shared `#town-map` symbol in the map set: a street grid, a park, a river and a highway with a dashed centre line. Markers are 6.5px status dots with a white ring (moving forest-500 with a forest-700 heading notch, idle amber-500, paused grey) and Mukta 600 labels on a stone halo; the selected marker gains a soft halo and bolder label. Selecting from the list or the map updates the dock: name, status pill (Moving, Idle, Paused), speed, today's distance, last update and Tracking ID. "Fit all" and "Follow" are working map controls that ease the view box (0.7s). Motion is report-driven, not continuous: the two moving vehicles each report every 2.4 s, glide to the new fix (0.9s ease-out) and draw an amber trail; the selected one drops a ping with an expanding ring and its halo rings once; distance and "last update" advance with each report. The demo runs only while the window is on screen, the Live map view is selected, the tab is visible and motion is allowed; the bar's pause control stops it. Reduced motion shows a still map whose controls move the view instantly. On narrow maps markers scale up so they stay legible.
- **Route history view:** the list holds Van 04's sample day (date chips shown, not interactive) and three trips; the map draws all three routes in forest-300 with the selected one in forest-600, white stop dots with "Idle 44 min" and "Idle 1h 24m" tags, and the dock holds a 06:00 to 22:00 timeline whose segments are the same three trips, plus the selected trip's distance, moving, idle and average and top speed. Choosing a trip in the list or on the timeline redraws its route (1.1s) and replays a marker along it once.
- **Trip reports view:** the report table (trip, time, distance with a thin forest bar scaled to the longest trip, moving, idle, average, top) with a stone-50 "Day" total row, an "Export CSV" chip and the 5-minute split rule as a footnote.
- **Account view:** the Gmail sign-in row and the retention strip side by side, then the Tracking ID list (masked passcodes, "Change passcode" chips) with the revoke rule underneath.
- **Sample data:** every figure is one consistent sample: Van 04 is Tracking ID 100015 as in the setup steps; trip times, moving and idle add up; day totals are the sums. The bar's "Sample data" tag and a caption under the window ("Interactive illustration with sample data, not a live feed") say so; chips that would be real actions in the console (Export CSV, Change passcode, date range) are drawn, not wired.
- **Detector exceptions:** the map, report table and window bar are flush-by-design containers (a map fills its frame, a table fills its border), like the hero film.

### Live Console (signature)
The hero's visual stage, to the right of the copy on desktop and stacked below it on tablet and phone. It has two layers. The stage sits in a restrained sage atmosphere: two soft closest-side radial washes (forest-300 at 36% behind the film, forest-200 at 55% low under the phone) that fade out before any edge and never reach the copy column. On desktop the phone's overhang hangs into the hero's bottom padding, so the film itself centres on the copy. The film is one large rounded frame (20px radius, Film shadow, a 1px ivory inner rim and a low inner vignette, 10:9 on wide desktop, square from 961 to 1180px with the van framed right and a 176px phone, 16:10 on tablet, 4:5 on phones) playing a rendered golden-hour highway loop (assets/hero-highway.webm/.mp4, 8 s, about 455 KB each, poster jpg as the CSS background and the fallback). It carries no text, only a stone pause/play chip in its top-right corner that pauses the film and the phone together. The phone is a satin forest device (radius 2.6em around a 2.05em screen): a frame gradient lit from the upper left (#34483e to #0b1812 and back up to #2a3d33 at the lower right), a 1px ivory rim and a dark #08110c bezel ring drawn as inset shadows, the Phone shadow, side buttons with the same gradient (#2c4036 to #0b1812), and one faint diagonal cover-glass reflection over the screen that never touches legibility. These literals are phone-only. It overlaps the film's lower-left corner on desktop and tablet and its lower-right on phones, about three quarters of the film's height. Its stone-0 screen holds a status bar (clock, blinking amber GPS dot), "Van 04" with a Moving pill, the drawn SVG map in the map set (a highway corridor in follow mode: dotted forest-600 road ahead, 4.5px amber-500 trail behind, the van marker in forest-800 with a pulsing amber-400 halo, amber pings), a "Simulated trip" tag and mono readouts (speed, trip; last ping above phone width). The marker runs on the film's playhead: it moves only while the film plays, stalls with it, and one trip spans three film loops. The van in the film carries the fleet number 04 so the two layers read as one vehicle. Text sizes inside the phone never drop below about 10.5px.

Motion: the phone's map is in follow mode. Van 04 stays in place on the screen while an out-of-town highway corridor (fields, a village, a side-road junction, a river crossing; one 480 m tile repeated) pans beneath it at 1 map unit per metre. The trip runs on the film's playhead and uses the film's own motion model: the van averages 12 m/s and surges 1.6 m/s above and below that once per 8 s loop (accelerating, then easing off with brighter brake lights), so the phone's speed moves between about 38 and 49 km/h in step with the film and Trip accumulates exactly the van's travelled distance (96 m per loop). The film itself is rendered from a 3D scene at 30 fps and graded for golden hour: a low sun right of the vanishing point (warm horizon, bloom, a glint on the asphalt), high cirrus lit from below, hills fading into haze with distance, then a soft-light split tone (warm highlights, cool forest shadows) and a vignette. The van is a projected box in the road's perspective in the left lane (rear face backlit by the sun with a warm rim light, sunlit side panel with turning wheels, roll on bends, suspension bump, a tight contact shadow plus a long soft shadow), and the camera car follows with a lag, so the gap to the van grows and shrinks naturally. The vanishing point sits right of centre so the van stays clear of the phone. The road bends once per 96 m, the same 8 s rhythm as the film's road, and the marker's heading follows it. An amber trail draws the last 260 m behind the van, a dotted forest line shows the road ahead, and an amber ping drops every 1.6 s with a short expanding ring; older pings fade. Each ping is one beat: on the same frame the ping lands on the trail, the status-bar GPS dot blinks with a small amber ring and the marker's halo rings out once, so the pulse is locked to the film's playhead rather than free-running. Nothing pulses while paused. One stone pause chip stops the film and the phone together; both also pause when the stage is offscreen or the tab is hidden. With reduced motion, a failed or blocked video, or Save-Data, the film shows its poster and the marker steps once per ping on wall-clock time.

### Consent Band (driver phone)
The consent band shows the driver's side on the driver's phone. Left: the heading, the lede and four trust rows (no personal details, revoke in one step, HTTPS and never sold, kept for 6 months then cleared), each with its icon in a 40px tile of ivory at 4% with a sage hairline, then the policy link. Right: a four-step rail beside the phone (consent, location shared, driver pauses, you change the passcode); a step is a button, the selected one gets an ivory-at-7% ground, a sage hairline and an inverted ivory number. Behind the phone, faint concentric location rings and a forest-500 glow, masked so they fade out before any edge.

The phone is the hero phone's satin frame at 288px with an ivory screen and a status bar (time, a location arrow shown only while sharing, battery). While sharing, a white notification card sits under the status bar ("Sharing your location · Tracking ID 100015"); it collapses away (0.45s) whenever location is not being shared. The app header carries the mark and wordmark and a status pill (Not started, Running in forest-50, Paused, Access ended; screen readers hear "Status: ..."). Four states: consent (ID and masked passcode, a real checkbox, "Start tracking" disabled until ticked); running (a crop of the town map with the driver's own forest-600 dot, an accuracy halo and one ring that pulses every 2.4s only while sharing, the Tracking ID and last location, the original note and a quiet "Pause tracking"); paused (map greyed, dot grey, the original paused note, the button turns forest "Start tracking"); access ended (a lock, "This passcode no longer works", why, and the passcode field marked "Not accepted"). Views cross in with a 0.45s rise. The rail, the checkbox and the phone's own buttons all work and stay in step. On arrival the phone plays once: the box ticks, Start presses, sharing begins; any interaction first cancels it, and reduced motion (or no JavaScript) opens on Running. A caption says it is an illustration. From 961 to 1180px the rail sits under the phone as a 2-by-2 grid; below 960px the band stacks with the rail beside the phone; below 640px the phone comes first and the rail is a 2-by-2 grid under it.

### Setup Journey (How it works)
Three stops on one route line, the product workflow in order: register the device, share the tracking link, the driver consents and tracking starts. Each stop has a sage stage (20px radius, a forest-50 radial ground with a forest-100 hairline, 288px tall on desktop) holding a miniature UI, then a stop on the route, then the title (numeral in forest-500 on the same line as the Schibsted 1.3125rem title, never an eyebrow above it) and the original explanation.

- **Route:** a 2px dashed stone-300 plan line through the three stops, a forest-600 line that draws from stop to stop (1s ease-in-out), and an 8px forest-800 marker that travels it and sits inside the current stop. On the horizontal (desktop) layout the route carries on past stop 3 to the right edge of that step's column: the same 2px line, dashed plan first, and once tracking is live the forest line draws through to the end with the same 1s ease-in-out. The vertical layouts end at stop 3. Stops are 16px rings: stone-300 before the route reaches them, forest-600 once reached, with a forest-100 halo on the current one. The last stop is where tracking goes live: when the driver's phone shows Running it turns amber with an amber-100 halo and rings out three times (no loop), and the marker turns amber while it sits there.
- **Stages:** (1) a console window (white Lift card with a 32px stone-50 bar, "Signed in with Gmail") with an "Add a device" form: the name types itself into a focused field, "Add device" presses, then the Tracking ID and passcode tiles appear in forest-800; (2) a message thread: the send button presses, an outgoing forest-50 bubble (12px corners, 4px tail) rises with the ID, passcode and driver link, then "Sent"; channel chips (WhatsApp, SMS, Any app) sit under it; (3) the driver's phone (the hero phone's satin frame at 200px, 30px and 24px corners, rising out of the stage): Tracking ID and masked passcode filled, the consent box ticks, "Start tracking" presses, "Status: Running" appears. These device and bubble radii are mock-only literals.
- **Highlight:** stages the route has not reached sit at 60% opacity, desaturated; the current stage lifts 4px with a soft forest-tinted drop. Text never dims.
- **Motion:** desktop plays the stops in order once the section is in view (1.8s apart); each stage's micro-sequence runs once. Below 1080px the route turns vertical down a left rail (text beside the stage on tablet, stage under the text under 640px) and a stop becomes current as it scrolls past 60% of the viewport; the line never undraws. Nothing loops except the typing caret while it types. Reduced motion shows the finished journey at once; without JavaScript every stage shows its final state and the stops are drawn without the line.

### FAQ
Native details elements divided by stone-200 hairlines. Questions use Title Small; a forest-600 plus icon rotates 45 degrees to a cross on open (0.3s) and the answer fades down 4px (0.35s).

## Do's and Don'ts

### Do:
- **Do** fill every primary action with forest-800 and white Mukta 600 text; hover to forest-700.
- **Do** keep amber for live and idle state only (route trail, van halo, GPS pings, Idle status, the "Simulated trip" chip); paused is grey, plus the amber-600 focus ring and amber-200 selection.
- **Do** label every simulated or sample visual on its face: "Simulated trip", "Sample data", "Sample report".
- **Do** set telemetry, coordinates, IDs, counts and line-item figures in JetBrains Mono 500 with tabular numerals, and everything else in Mukta or Schibsted Grotesk.
- **Do** separate surfaces with 1px stone-200 hairlines first, and tint any shadow with the ink green rgba(20, 33, 26, …).
- **Do** draw icons from the inline SVG sprite: 24px viewBox, 1.75 stroke, round caps and joins, currentColor.
- **Do** ease motion with cubic-bezier(.16, 1, .3, 1) and keep supporting motion to explaining a change of state: a line drawing in, a value counting or tweening, a panel entering, an accordion opening.
- **Do** pause continuous animation when it is offscreen, when the tab is hidden and from its own visible control, and step it discretely under prefers-reduced-motion.
- **Do** keep the consent band as the page's single full-bleed forest-900 field, directly above the forest-950 footer.
- **Do** ship content that is complete without JavaScript; motion only decorates an already-visible state.

### Don't:
- **Don't** use amber on buttons, links, headings, icons at rest, or as a decorative accent.
- **Don't** add continuous motion outside the hero; the film loop and the phone trip it drives are the only things that keep moving, and they share one pause control.
- **Don't** use mono for headings, prose, labels or buttons.
- **Don't** track display type tighter than -0.04em.
- **Don't** use uppercase or letterspaced labels, eyebrows or kickers above headings.
- **Don't** use pure black, cold greys or blue-tinted shadows; ink is green-black (#14211a) and neutrals are warm stone.
- **Don't** use an icon font, raster icons, or mixed stroke styles.
- **Don't** give the Phone or Float shadow to anything other than the hero phone.
- **Don't** introduce a build step, a framework or a script dependency; the site is static HTML, CSS and JS on GitHub Pages with Google Fonts as its only external asset.
