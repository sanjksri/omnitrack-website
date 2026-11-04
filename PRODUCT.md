# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Owners and managers of small and mid-size Indian businesses: delivery operators, transporters, field sales teams, security-guard agencies, and anyone who needs to know where their vehicles or staff are. They are non-technical, cost-sensitive, and comparing the product against free or consumer options (WhatsApp live location, AirTag, JioTag). Their job on the marketing site: understand what it does, trust it with their drivers' phones, see what it costs, and sign up. A second audience is the driver, who arrives to download the Android app or read the privacy policy.

## Product Purpose

easyomnitracker (also branded OmniTrack / Easy Omni Tracker) tracks vehicles, field staff and devices in real time using the phones people already carry. No hardware, no driver accounts. A manager registers a device, gets a Tracking ID and a 4-digit passcode, and shares them with the driver; the driver opens a link in a browser (or the Android app for background tracking) and the manager sees them on a live map. Success: a non-technical owner understands the setup in one read and starts a trial.

## Positioning

Phone-based tracking with no hardware, no app needed for the browser path, and no personal data collected from drivers: drivers authenticate with a Tracking ID and passcode only, and must give explicit consent. Pay per Tracking-Month instead of per seat or per device contract.

## Operating Context

- Manager console: https://app.easyomnitracker.in/ (separate app; this repo's site links to it). Sign-in with a single Gmail ID.
- Driver path: browser link + Tracking ID + passcode, or the native Android app (APK served from this site at `/device-tracking-app.apk?v=1.0.3-b6`, version 1.0.3 build 6) for background tracking with a persistent notification.
- Reports: trips segmented whenever a device is idle more than 5 minutes; per-segment distance, moving hours, idle time, average and top speed; CSV export; global date filters on history.
- Data retained 6 months, then flushed.
- Revoking access: change the passcode for that Tracking ID from the dashboard.

## Capabilities and Constraints

- Static marketing site on GitHub Pages (`CNAME` easyomnitracker.in): `index.html`, `privacy.html`, `styles.css`, `script.js`. No build step.
- Pricing: base ₹100 per Tracking-Month, currently a limited-time flat 50% discount (₹50 per Tracking-Month, GST inclusive). 1 Tracking-Month = 1 Tracking ID used in a calendar month; a single location received in a month counts that ID as used. No refunds; wrongly deducted months may be credited back.
- Sign-up bonus: 1 free Tracking-Month if joining before the 15th, 2 if joining after.
- Bulk: 10% off a single purchase of 10+ Tracking-Months; multiple smaller purchases don't qualify.
- Refer & Earn: 30% commission on referrals' payments, capped at ₹1,500 per referral, Gmail accounts only, paid by the 5th of the following month.
- Tracking cannot happen without the device owner's explicit consent; drivers can stop anytime.
- Contact: easyomnitracker@gmail.com.

## Brand Commitments

- Name in lowercase wordmark "easyomnitracker" with tagline "Location tracking simplified"; logo is a location pin with a swirl and a green dot (`logo.png`, raster on an off-white ground).
- Copy may be rewritten freely as long as every fact above stays accurate (user confirmed).

## Evidence on Hand

- Product facts only (pricing, retention, segmentation rule, passcode model, consent model).
- `logo.png`, `feature_graphic.jpg` (Play Store graphic).
- No customer counts, testimonials, client logos, or usage statistics exist. Do not invent any. Any live-tracking visual on the site is a simulation and must say so.

## Product Principles

1. Simple enough for a non-technical owner: every step is explained in plain words.
2. Consent and privacy are part of the product, not fine print.
3. Show the product working rather than claiming it.
4. Honest pricing: the Tracking-Month rules are stated in full, not hidden.
