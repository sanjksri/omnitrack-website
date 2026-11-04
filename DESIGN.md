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
    rounded: "{rounded.r-s}"
    padding: "8px 12px"
  nav-link-hover:
    backgroundColor: "{colors.stone-100}"
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
- One focal animation (the hero trip); every other motion explains a change of state.
- Every simulated or sample visual says so on its face.

## Colors

A warm, low-chroma palette: stone neutrals and a green-black ink as the ground, deep forest green as the single brand voice, and muted amber as a reserved signal for live state.

### Primary
- **Deep Forest** (forest-800): the primary action colour. Fills every primary button ("Start free", "Launch app"), the selected filter chip, step numbers and the price figure. Hover deepens toward forest-700. Also the browser theme colour.
- **Ledger Green** (forest-700): link text, current nav item, active TOC entry, positive calculator hints, "50% off" text.
- **Field Green** (forest-600): icon tint on light grounds, the step-line draw, route plan dashes, check marks, timeline segments, consent tick fill, the soft second line of the hero headline.
- **Moss** (forest-500): small state dots (moving device, hero fact bullets, legal list markers).
- **Night Canopy** (forest-900): the consent band ground; also the inner cards of the phone mock.
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
- **Map set** (map-land, map-block, map-park, map-water, map-casing, map-label): the drawn city in the hero console. Land and blocks are warm stone, the park a pale sage, the river a grey-teal. Use this set for any future map illustration.

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
- **Display Figure** (700, clamp(3.5rem, 6vw, 4.75rem), 1, -0.04em): the headline price, in forest-800. The calculator total uses the same face at 2rem, -0.03em.
- **Headline** (700, clamp(2rem, 3.4vw, 2.875rem), 1.08, -0.032em): section heads and band heads. The closing band head scales up to clamp(2.25rem, 4.4vw, 3.5rem) in forest-800.
- **Title** (700, clamp(1.375rem, 2vw, 1.75rem), 1.08, -0.025em): feature panel heads; step heads (1.3125rem) and the calculator head (1.375rem) sit at the low end of this role.
- **Title Small** (600, 1.1875rem, 1.3, -0.015em): FAQ questions, set in the display face.
- **Lede** (400, 1.125rem, 1.6): the sentence under a section head, max 36em. The hero lede runs clamp(1.0625rem, 1.3vw, 1.1875rem), max 34em.
- **Body** (400, 1.0625rem, 1.6; 1rem under 640px): running copy. Legal text runs at line-height 1.75 within 70ch.
- **Body Small** (0.9375rem): nav, captions, terms, footer, metadata.
- **Label** (600, 0.75rem): status pills, table heads, vignette labels, panel micro-titles. Sentence case, never uppercase, never letterspaced.
- **Mono** (500, 0.9375rem, -0.01em, tabular figures): telemetry readouts, Tracking IDs, coordinates, stepper counts, calculator line items. **Mono Small** (0.6875rem) carries the ping log, timeline axis and retention bars.

### Named Rules
**The Mono Is Telemetry Rule.** JetBrains Mono appears only where a machine would print it: speeds, distances, coordinates, timestamps, Tracking IDs, passcodes, counts and line-item figures. Headings, prose, labels and buttons are never mono. Tabular report tables stay in Mukta with tabular numerals.

**The Tracking Floor Rule.** Display letter-spacing tightens with size, from -0.015em (FAQ question) to -0.038em (hero), and never goes past -0.04em, which only the price figure uses.

**The Sentence Case Rule.** No uppercase labels, no letterspaced eyebrows, no kickers above headings. A section head is a headline and one plain sentence.

## Layout

A single centred container (max 1220px, 24px gutter, 16px under 640px) holds asymmetric two-column grids built from fractional minmax tracks rather than a 12-column system: hero 5 : 6.6, comparison and console footer 5 : 7, consent band 7 : 5, FAQ 4 : 7, feature explorer 4 : 8. Sections breathe on a fluid vertical rhythm (clamp(80px, 10vw, 136px)); section heads hold to 640px with 40 to 64px below them. Internal spacing runs on a loose 4px step (4, 8, 12, 16, 24, 32, 48), with grid gaps expressed as clamps so density loosens on wide screens.

The header is sticky at 68px (60px on mobile) on a translucent stone glass that gains a hairline once the page scrolls. Anchor jumps are offset by the header height.

Responsive behaviour collapses in four steps: at 1080px the nav tightens and the header APK link hides; at 960px every two-column grid stacks to one column, steps stack, feature tabs become a 2-column grid of compact tabs, and sticky side columns (FAQ head, legal TOC) release; at 860px the nav becomes a menu toggle with a drop-down sheet; at 640px buttons in the hero go full width, the console footer stacks and the map's minor labels hide. Text never scrolls horizontally; wide tables (comparison, report) scroll inside their own frame.

The privacy page is a reading layout: a 240px sticky table of contents beside a 70ch body column.

## Elevation & Depth

Depth is mostly tonal and drawn: stone-50 page, stone-0 paper panels, stone-100 inset wells, white sheets nested inside wells, each edge marked by a 1px warm hairline. Shadows are a supporting layer, always tinted with the ink green (rgba(20, 33, 26, …)) rather than black, and soft enough that the hairline still does the separating. Elevation rises with importance: inline UI is nearly flat, cards lift gently, and only the hero console floats.

### Shadow Vocabulary
- **Rest** (`box-shadow: 0 1px 2px rgba(20,33,26,.06), 0 1px 1px rgba(20,33,26,.03)`): secondary buttons, selected tab, comparison table frame, APK card, chat bubble.
- **Lift** (`box-shadow: 0 1px 2px rgba(20,33,26,.05), 0 10px 28px -10px rgba(20,33,26,.16)`): the feature panel frame and the price card.
- **Float** (`box-shadow: 0 2px 6px rgba(20,33,26,.06), 0 28px 60px -20px rgba(20,33,26,.28)`): the hero console only.
- **Primary press** (`box-shadow: 0 1px 0 rgba(255,255,255,.08) inset, 0 1px 2px rgba(11,29,21,.25)`; hover `0 8px 20px -8px rgba(11,29,21,.5)`): primary buttons, giving them a pressed-ink edge that grows into a soft drop on hover.

### Named Rules
**The Hairline First Rule.** Separate with a 1px stone-200 border before reaching for a shadow; a shadow never stands in for a missing border.

**The One Float Rule.** The Float shadow belongs to the hero console, the page's focal object. Nothing else is lifted that far.

## Shapes

Gently rounded, never pillowy. Radii step from 4px (checkboxes, inline code, timeline bars) to 6px (buttons, fields, stepper, nav hovers), 10px (tabs, nested lists and tables, mobile console), 14px (console, wells, notices) and 20px (cards and the feature frame). Pills (999px) are reserved for status and filter chips. The phone mock is the one exception, with device-true 40px and 30px corners. The chat bubble in the setup steps carries a single 4px tail corner (14px 14px 14px 4px). Borders are always 1px solid hairlines; the only dashed line is the empty, already-flushed month in the retention strip, and dotted strokes appear only as the planned route on the map.

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
- **Corner Style:** 20px for cards (price card, calculator, APK block, feature frame); 14px for the console, wells and notices.
- **Background:** paper (stone-0) for raised cards; forest-50 with a forest-100 border for the calculator and the privacy notice; stone-100 for inset wells that hold product UI; white for sheets nested inside a well.
- **Shadow Strategy:** Rest for inline cards, Lift for the price card and feature frame, Float for the console only (see Elevation & Depth).
- **Border:** 1px stone-200 on every container.
- **Internal Padding:** fluid clamp(24px, 3.5vw, 40px) for cards; 18px for wells; 14px for nested sheets.

### Inputs / Fields
- **Stepper:** the one real input. White, 1px stone-300 border, 6px radius, two 44px square forest-700 icon buttons around a mono count divided by stone-200 hairlines. Hover fills forest-50; disabled drops to stone-400 with no fill.
- **Field (illustrative):** white, 1px stone-300, 6px radius, 8px 10px, a 0.6875rem ink-3 label above Mukta 600 value; a 1.5px forest-600 caret blinks while text types in.
- **Checkbox (illustrative):** 18px, 4px radius, 1.5px stone-400 border; checked fills forest-600 with a white tick that scales in.
- **Focus:** the global amber-600 outline.

### Navigation
- **Header:** brand mark plus the lowercase wordmark in Schibsted Grotesk 700 (1.1875rem, -0.03em), then nav links in Mukta 500 ink-2, padding 8px 12px, 6px radius. Hover fills stone-100 and darkens text to ink; the section in view (scroll-spy) or current page turns forest-700. The right side holds a quiet "Driver app" download link and a small primary "Launch app" button.
- **Mobile (860px and below):** a 44px menu toggle swaps menu and close icons; the menu drops as a stone-50 sheet with full-width, hairline-divided links (1.0625rem) and stacked 48px actions, fading and sliding 8px into place.
- **Legal TOC:** a 1px stone-200 left rule; the active entry gains a 2px forest-600 bar and forest-700 text.

### Feature Tabs
A vertical tab list beside one framed panel. Tabs are 10px-radius rows with a 22px icon, a Mukta 600 title and an ink-3 one-liner; the selected tab becomes a paper sheet with a hairline and Rest shadow, and its icon turns forest-600. Panels enter with a 10px rise and fade (0.5s), staggering copy and visual by 60ms; rows and bars inside stagger by 50 to 80ms. Below 960px tabs become a 2-column grid with titles only.

### Live Console (signature)
The hero's console window: a paper frame (14px radius, Float shadow) with a bar holding the map icon, "Live map", the "Simulated trip" tag and a 34px pause/play icon button. Below it, the drawn SVG city map in the map set; the planned route is a dotted forest-600 line, the driven trail a 5px amber-500 stroke, stops are white dots ringed in forest-700, and the van is forest-800 with a pulsing amber-400 halo. The footer splits 5 : 7 into a telemetry card (name, status pill, three mono readouts with small units) and a ping log of mono rows (time, coordinates, speed) where event rows switch to amber-800 Mukta 600 and new rows drop in over an amber-50 flash.

Motion: a requestAnimationFrame loop drives the van along the route, eases into corners and stops, drops a ping every 1.4s of driving, idles about 3s at the stop (status turns amber "Idle · 0:0n"), then resumes and loops on arrival. It stops when the console is offscreen, when the tab is hidden, and when the pause button is pressed. Under reduced motion it advances in discrete 1.4s steps with no continuous travel, no ping ring and no heading interpolation.

### Consent Phone
A device mock inside the consent band: forest-950 body (40px radius), forest-800 screen, forest-900 cards with forest-700 hairlines, mono Tracking ID and coordinates. A real button toggles between running (sage dot, light stone button reading "Pause tracking") and paused (stone-400 dot, forest-500 button). It is the only interactive object on a dark ground.

### Setup Vignettes
Three stone-100 wells (14px, 212px tall) that act out the setup: a device name being typed into a field, then the issued Tracking ID and passcode in forest-800 tiles; a white chat bubble with the link and a sent tick; a consent checkbox that ticks itself, a "Start tracking" button and a live "Status: Running" line. A 2px forest-600 line draws across the top of each step (0.9s, staggered 0.25s). Content is fully visible without JavaScript.

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
- **Don't** add a second focal animation; the hero trip is the only continuous motion on a page.
- **Don't** use mono for headings, prose, labels or buttons.
- **Don't** track display type tighter than -0.04em.
- **Don't** use uppercase or letterspaced labels, eyebrows or kickers above headings.
- **Don't** use pure black, cold greys or blue-tinted shadows; ink is green-black (#14211a) and neutrals are warm stone.
- **Don't** use an icon font, raster icons, or mixed stroke styles.
- **Don't** give the Float shadow to anything other than the hero console.
- **Don't** introduce a build step, a framework or a script dependency; the site is static HTML, CSS and JS on GitHub Pages with Google Fonts as its only external asset.
