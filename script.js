(() => {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
    const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN');

    /* ---------- Header: scrolled state + mobile menu ---------- */
    const header = $('[data-header]');
    if (header) {
        const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    const toggle = $('[data-menu-toggle]');
    const menu = $('#nav-menu');
    const scrim = $('[data-nav-scrim]');
    if (toggle && menu) {
        const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';
        const setOpen = (open) => {
            toggle.setAttribute('aria-expanded', String(open));
            menu.classList.toggle('is-open', open);
            if (header) header.classList.toggle('menu-open', open);
            if (scrim) scrim.classList.toggle('is-on', open);
            document.documentElement.classList.toggle('menu-locked', open);
        };
        toggle.addEventListener('click', () => setOpen(!isOpen()));
        menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
        if (scrim) scrim.addEventListener('click', () => setOpen(false));
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isOpen()) { setOpen(false); toggle.focus(); }
        });
        document.addEventListener('click', (e) => {
            if (isOpen() && !e.target.closest('.site-header')) setOpen(false);
        });
        // Tabbing past the last item in the sheet closes it rather than leaving it open behind focus.
        if (header) {
            header.addEventListener('focusout', (e) => {
                if (isOpen() && e.relatedTarget && !header.contains(e.relatedTarget)) setOpen(false);
            });
        }
        window.matchMedia('(min-width: 861px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
    }

    /* ---------- Active section in nav ---------- */
    const navLinks = $$('.nav-links a[href^="#"]');
    if (navLinks.length && 'IntersectionObserver' in window) {
        const byId = new Map(navLinks.map((a) => [a.getAttribute('href').slice(1), a]));
        const spy = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const link = byId.get(entry.target.id);
                if (!link) return;
                if (entry.isIntersecting) {
                    navLinks.forEach((a) => a.removeAttribute('aria-current'));
                    link.setAttribute('aria-current', 'true');
                } else if (link.getAttribute('aria-current')) {
                    link.removeAttribute('aria-current');
                }
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        byId.forEach((_, id) => { const el = document.getElementById(id); if (el) spy.observe(el); });
    }

    /* ---------- Sign-up bonus (depends on today's date) ---------- */
    const day = new Date().getDate();
    const bonusShort = $('[data-bonus-short]');
    const bonusLong = $('[data-bonus-long]');
    if (day !== 15) {
        const before = day < 15;
        if (bonusShort) bonusShort.textContent = before ? '1 free month' : '2 free months';
        if (bonusLong) {
            bonusLong.innerHTML = before
                ? 'Sign up today and get <strong>1 free Tracking-Month</strong>. Accounts created after the 15th get 2.'
                : 'Sign up today and get <strong>2 free Tracking-Months</strong>, because it’s after the 15th.';
        }
    }

    /* ---------- Scroll reveals ---------- */
    const fadeTargets = $$('.table-wrap, .price-card, .calc, .terms, .apk, .phone, .faq-list');
    fadeTargets.forEach((el) => el.setAttribute('data-fade', ''));
    $$('.price-grid > *').forEach((el, i) => el.style.setProperty('--d', `${i * 0.08}s`));

    const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-in');
            entry.target.dispatchEvent(new CustomEvent('reveal'));
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }) : null;

    const reveal = (el) => { if (io) io.observe(el); else el.classList.add('is-in'); };
    fadeTargets.forEach(reveal);

    /* ---------- How it works: three stops on one route ---------- */
    const journey = $('[data-journey]');
    if (journey) initJourney(journey);

    function initJourney(root) {
        const steps = $$('[data-jr-step]', root);
        const nodes = steps.map((s) => $('[data-jr-node]', s));
        const track = $('.jr-track', root);
        const fill = $('[data-jr-fill]', root);
        const mark = $('[data-jr-mark]', root);
        const last = steps.length - 1;
        const still = () => reduceMotion.matches;
        let geo = null, reached = -1, current = -1, started = false, inView = false;
        const seqTimers = [];
        const played = new Set();

        // Before the route reaches stop 1, the device name field is still empty
        const typed = $('.vg-typed', root);
        const word = typed ? (typed.dataset.type || typed.textContent) : '';
        if (typed && !still()) typed.textContent = '';

        const later = (fn, ms) => (still() ? fn() : setTimeout(fn, ms));
        const press = (el, ms) => {
            if (!el || still()) return;
            setTimeout(() => { el.classList.add('is-pressed'); setTimeout(() => el.classList.remove('is-pressed'), 180); }, ms);
        };

        // What happens inside each illustration when the route reaches it (once)
        const play = (i) => {
            if (played.has(i)) return;
            played.add(i);
            const step = steps[i];
            step.classList.add('is-played');
            const btn = $('[data-jr-press]', step);
            if (i === 0 && typed) {
                if (still()) { typed.textContent = word; return; }
                const field = typed.closest('.jr-field');
                field.classList.add('is-focused');
                typed.classList.add('is-typing');
                let n = 0;
                const tick = () => {
                    typed.textContent = word.slice(0, ++n);
                    if (n < word.length) setTimeout(tick, 110);
                    else setTimeout(() => { typed.classList.remove('is-typing'); field.classList.remove('is-focused'); }, 150);
                };
                setTimeout(tick, 300);
                press(btn, 1100);
            } else if (i === 1) {
                press(btn, 250);
            } else if (i === 2) {
                later(() => step.classList.add('is-checked'), 500);
                press(btn, 1000);
                later(() => root.classList.add('is-live'), 1450);
            }
        };

        const offset = (k) => (k < 0 || !geo ? 0 : geo.horiz ? geo.c[k].x - geo.c[0].x : geo.c[k].y - geo.c[0].y);
        const paint = () => {
            if (!geo) return;
            const p = geo.len ? offset(reached) / geo.len : 0;
            fill.style.transform = geo.horiz ? `scaleX(${p})` : `scaleY(${p})`;
            const m = offset(Math.max(current, 0));
            mark.style.transform = geo.horiz ? `translate(${m}px, 0)` : `translate(0, ${m}px)`;
            track.classList.toggle('is-moving', reached >= 0);
            track.classList.toggle('at-end', current === last);
        };

        const setState = (r, cur) => {
            reached = Math.max(reached, r);
            current = cur;
            steps.forEach((s, i) => {
                s.classList.toggle('is-reached', i <= reached);
                s.classList.toggle('is-current', i === current);
            });
            for (let i = 0; i <= reached; i++) play(i);
            paint();
        };

        // Lay the route through the centres of the three stops (horizontal on desktop, vertical below)
        const layout = () => {
            const r = root.getBoundingClientRect();
            const c = nodes.map((n) => { const b = n.getBoundingClientRect(); return { x: b.left + b.width / 2 - r.left, y: b.top + b.height / 2 - r.top }; });
            const horiz = Math.abs(c[0].y - c[last].y) < 4;
            const len = horiz ? c[last].x - c[0].x : c[last].y - c[0].y;
            geo = { horiz, c, len };
            track.dataset.axis = horiz ? 'x' : 'y';
            track.classList.add('is-instant');
            Object.assign(track.style, horiz
                ? { left: `${c[0].x}px`, top: `${c[0].y - 1}px`, width: `${len}px`, height: '2px' }
                : { left: `${c[0].x - 1}px`, top: `${c[0].y}px`, width: '2px', height: `${len}px` });
            track.classList.add('is-ready');
            paint();
            void track.offsetWidth;
            track.classList.remove('is-instant');
            if (inView && horiz) runSequence();
        };

        // Desktop: the stops play in order once the section is in view.
        const runSequence = () => {
            if (started) return;
            started = true;
            if (still()) { setState(last, last); return; }
            steps.forEach((_, i) => seqTimers.push(setTimeout(() => setState(i, i), 250 + i * 1800)));
        };
        // Vertical layouts: a stop becomes current as it scrolls past 60% of the viewport.
        let ticking = false;
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                ticking = false;
                if (!geo || geo.horiz) return;
                const line = window.innerHeight * 0.6;
                let cur = -1;
                nodes.forEach((n, i) => { if (n.getBoundingClientRect().top < line) cur = i; });
                if (cur < 0 && reached < 0) return;
                setState(Math.max(cur, 0), Math.max(cur, 0));
            });
        };

        layout();
        if ('ResizeObserver' in window) new ResizeObserver(() => layout()).observe(root);
        if (still() || !('IntersectionObserver' in window)) { started = true; setState(last, last); return; }
        new IntersectionObserver(([entry]) => {
            inView = entry.isIntersecting;
            window.removeEventListener('scroll', onScroll);
            if (!inView) return;
            if (geo.horiz) runSequence();
            else { window.addEventListener('scroll', onScroll, { passive: true }); onScroll(); }
        }, { threshold: 0.2 }).observe(root);
        if (reduceMotion.addEventListener) reduceMotion.addEventListener('change', () => {
            if (!still()) return;
            seqTimers.forEach(clearTimeout);
            if (typed) { typed.textContent = word; typed.classList.remove('is-typing'); }
            setState(last, last);
            root.classList.add('is-live');
            steps[last].classList.add('is-checked');
        });
    }

    /* ---------- Count-up numbers ---------- */
    const countUp = (root) => {
        $$('[data-count]', root).forEach((el) => {
            const target = parseFloat(el.dataset.count);
            const dec = parseInt(el.dataset.dec || '0', 10);
            if (reduceMotion.matches) { el.textContent = target.toFixed(dec); return; }
            const start = performance.now();
            const dur = 900;
            const step = (now) => {
                const t = Math.min(1, (now - start) / dur);
                const e = 1 - Math.pow(2, -10 * t);
                el.textContent = (target * (t === 1 ? 1 : e)).toFixed(dec);
                if (t < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        });
    };

    /* ---------- Feature tabs ---------- */
    const tabsRoot = $('[data-tabs]');
    if (tabsRoot) {
        const tabs = $$('[role="tab"]', tabsRoot);
        const select = (tab, focus = false) => {
            tabs.forEach((t) => {
                const on = t === tab;
                t.setAttribute('aria-selected', String(on));
                t.tabIndex = on ? 0 : -1;
                const panel = document.getElementById(t.getAttribute('aria-controls'));
                if (!panel) return;
                panel.hidden = !on;
                if (on) {
                    panel.classList.remove('is-entering');
                    void panel.offsetWidth;
                    panel.classList.add('is-entering');
                    countUp(panel);
                }
            });
            if (focus) tab.focus();
            tabsRoot.dispatchEvent(new CustomEvent('tabchange', { detail: { tab } }));
        };
        tabs.forEach((tab, i) => {
            tab.addEventListener('click', () => select(tab));
            tab.addEventListener('keydown', (e) => {
                const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
                let next = null;
                if (e.key in keys) next = tabs[(i + keys[e.key] + tabs.length) % tabs.length];
                if (e.key === 'Home') next = tabs[0];
                if (e.key === 'End') next = tabs[tabs.length - 1];
                if (next) { e.preventDefault(); select(next, true); }
            });
        });
        $$('.panel', tabsRoot).forEach((p) => p.addEventListener('animationend', (e) => {
            if (e.target === p) p.classList.remove('is-entering');
        }));

        const openFromHash = () => {
            if (location.hash === '#analytics') {
                const reportsTab = $('#tab-reports');
                if (reportsTab) select(reportsTab);
                const section = $('#features');
                if (section) section.scrollIntoView();
            }
        };
        openFromHash();
        window.addEventListener('hashchange', openFromHash);
    }

    /* ---------- Product showcase: console views driven by the feature tabs ---------- */
    const showcase = $('[data-showcase]');
    if (showcase) initShowcase(showcase);

    function initShowcase(root) {
        const tablist = $('.sc-tabs', root);
        const ind = $('[data-tab-ind]', root);
        const motionBtn = $('[data-sc-motion]', root);
        const motionLabel = $('[data-sc-motion-label]', root);
        const state = { visible: false, paused: false, view: 'tab-live' };

        // Sliding sheet behind the selected tab
        const placeInd = (instant) => {
            const sel = $('[aria-selected="true"]', tablist);
            if (!sel || !ind) return;
            if (instant) ind.style.transition = 'none';
            ind.style.width = sel.offsetWidth + 'px';
            ind.style.height = sel.offsetHeight + 'px';
            ind.style.transform = `translate(${sel.offsetLeft}px, ${sel.offsetTop}px)`;
            if (instant) { void ind.offsetWidth; ind.style.transition = ''; }
        };
        if (ind) {
            placeInd(true);
            tablist.classList.add('has-ind');
            if ('ResizeObserver' in window) new ResizeObserver(() => placeInd(true)).observe(tablist);
        }

        // The window's own view switcher mirrors the tabs (pointer convenience; the tabs stay the keyboard path)
        $$('[data-crumb]', root).forEach((c) => c.addEventListener('click', () => {
            const t = document.getElementById(c.dataset.crumb);
            if (t) t.click();
        }));

        const live = createLiveMap($('[data-live]', root));
        const hist = createHistory($('[data-history]', root));

        const sync = () => {
            const run = state.visible && !state.paused && !document.hidden && !reduceMotion.matches && state.view === 'tab-live';
            if (live) live.run(run);
        };

        const applyView = (id, animate) => {
            state.view = id;
            placeInd(!animate);
            $$('[data-copy-for]', root).forEach((c) => {
                const on = c.dataset.copyFor === id;
                c.hidden = !on;
                if (on && animate) { c.classList.remove('is-entering'); void c.offsetWidth; c.classList.add('is-entering'); }
            });
            $$('[data-crumb]', root).forEach((c) => c.classList.toggle('is-on', c.dataset.crumb === id));
            if (id === 'tab-history' && hist) hist.enter();
            sync();
        };
        root.addEventListener('tabchange', (e) => applyView(e.detail.tab.id, true));
        $$('[data-copy-for]', root).forEach((c) => c.addEventListener('animationend', () => c.classList.remove('is-entering')));

        if (motionBtn) {
            motionBtn.addEventListener('click', () => {
                state.paused = !state.paused;
                motionBtn.setAttribute('aria-pressed', String(state.paused));
                motionLabel.textContent = state.paused ? 'Play the demo' : 'Pause the demo';
                sync();
            });
        }
        document.addEventListener('visibilitychange', sync);
        if (reduceMotion.addEventListener) reduceMotion.addEventListener('change', sync);
        if ('IntersectionObserver' in window) {
            new IntersectionObserver(([entry]) => { state.visible = entry.isIntersecting; sync(); }, { threshold: 0.15 }).observe($('.sc-window', root));
        } else {
            state.visible = true;
        }
        // The tabs may already have switched (the #analytics link) before this ran
        const current = $('[role="tab"][aria-selected="true"]', root);
        applyView(current ? current.id : 'tab-live', false);
    }

    // Sample live map: two vehicles report a position every 2.4 s and glide to it; the selected one drops pings.
    function createLiveMap(panel) {
        if (!panel) return null;
        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = $('[data-map]', panel);
        const pingLayer = $('[data-pings]', svg);
        const fitBtn = $('[data-fit]', panel);
        const followBtn = $('[data-follow]', panel);
        const followName = $('[data-follow-name]', panel);
        const dock = $('[data-dock]', panel);
        const field = (k) => $(`[data-v="${k}"]`, dock);
        const FULL = { x: 0, y: 0, w: 640, h: 400 };
        const TICK = 1200; // ms; vehicles alternate, so each one reports every 2.4 s

        const D = {
            van04: { name: 'Van 04', state: 'moving', label: 'Moving', id: '100015', today: 21.4, kmh: 42, s: 120, step: 26, km: 0.028, trail: 180, loop: true },
            truck01: { name: 'Truck 01', state: 'moving', label: 'Moving', id: '100016', today: 64.8, kmh: 58, s: 200, step: 38, km: 0.039, trail: 150, loop: false },
            bike02: { name: 'Bike 02', state: 'idle', label: 'Idle', id: '100017', today: 9.6, kmh: 0, fixed: [300, 268] },
            phoneA: { name: 'Sales phone A', state: 'paused', label: 'Paused', id: '100018', today: 3.2, kmh: null, seen: 'at 09:42', fixed: [520, 150] },
        };
        Object.keys(D).forEach((k) => {
            const d = D[k];
            d.marker = $(`[data-marker="${k}"]`, svg);
            d.dir = d.marker ? $('.mk-dir', d.marker) : null;
            d.path = $(`[data-path="${k}"]`, svg);
            d.trailEl = $(`[data-trail="${k}"]`, svg);
            d.meta = $(`[data-meta="${k}"]`, panel);
            d.len = d.path ? d.path.getTotalLength() : 0;
            d.lastAt = performance.now();
            d.n = 0;
        });

        const S = { sel: 'van04', follow: false, vb: { ...FULL }, running: false, timer: 0, seenTimer: 0, raf: 0, glides: [], flip: false };

        const pos = (d) => {
            if (d.fixed) return { x: d.fixed[0], y: d.fixed[1], a: 0 };
            const at = (v) => d.path.getPointAtLength(d.loop ? ((v % d.len) + d.len) % d.len : Math.max(0, Math.min(d.len, v)));
            const p = at(d.s), a = at(d.s - 1.5), b = at(d.s + 1.5);
            return { x: p.x, y: p.y, a: Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI + 90 };
        };
        const trailD = (d) => {
            const pts = [];
            const from = d.loop ? d.s - d.trail : Math.max(0, d.s - d.trail);
            for (let v = from; v < d.s; v += 6) pts.push(d.path.getPointAtLength(d.loop ? ((v % d.len) + d.len) % d.len : v));
            pts.push(d.path.getPointAtLength(d.loop ? ((d.s % d.len) + d.len) % d.len : d.s));
            return 'M' + pts.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L');
        };

        const zoom = () => FULL.w / S.vb.w;
        // On a narrow map the drawing shrinks; markers grow back so they stay legible and tappable
        let unit = 1;
        const measure = () => { unit = Math.max(1, 520 / (svg.clientWidth || 520)); };
        measure();
        if ('ResizeObserver' in window) new ResizeObserver(() => { measure(); placeAll(); }).observe(svg);
        const placeMarker = (d) => {
            if (!d.marker) return;
            const p = pos(d);
            d.marker.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) scale(${(unit / zoom()).toFixed(3)})`);
            if (d.dir) d.dir.setAttribute('transform', `rotate(${p.a.toFixed(1)})`);
            if (d.trailEl) d.trailEl.setAttribute('d', trailD(d));
        };
        const placeAll = () => Object.values(D).forEach(placeMarker);

        // View box: whole town, or a closer window that keeps the selected device centred
        const followBox = () => {
            const p = pos(D[S.sel]);
            const w = 360, h = 225;
            return { x: Math.max(0, Math.min(FULL.w - w, p.x - w / 2)), y: Math.max(0, Math.min(FULL.h - h, p.y - h / 2)), w, h };
        };
        const setVB = (b) => { S.vb = b; svg.setAttribute('viewBox', `${b.x.toFixed(1)} ${b.y.toFixed(1)} ${b.w.toFixed(1)} ${b.h.toFixed(1)}`); placeAll(); };
        let vbAnim = 0;
        const tweenVB = (to) => {
            cancelAnimationFrame(vbAnim);
            if (reduceMotion.matches) { setVB(to); return; }
            const from = { ...S.vb }, t0 = performance.now(), dur = 700;
            const step = (now) => {
                const t = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - t, 3);
                setVB({ x: from.x + (to.x - from.x) * e, y: from.y + (to.y - from.y) * e, w: from.w + (to.w - from.w) * e, h: from.h + (to.h - from.h) * e });
                vbAnim = t < 1 ? requestAnimationFrame(step) : 0;
            };
            vbAnim = requestAnimationFrame(step);
        };
        const setFollow = (on) => {
            S.follow = on;
            followBtn.setAttribute('aria-pressed', String(on));
            fitBtn.setAttribute('aria-pressed', String(!on));
            tweenVB(on ? followBox() : { ...FULL });
        };
        fitBtn.addEventListener('click', () => setFollow(false));
        followBtn.addEventListener('click', () => setFollow(!S.follow));

        const ago = (d) => {
            if (d.seen) return d.seen;
            const sec = Math.round((performance.now() - d.lastAt) / 1000);
            return sec < 1 ? 'now' : `${sec}s ago`;
        };
        const renderDock = () => {
            const d = D[S.sel];
            field('name').textContent = d.name;
            const st = field('status');
            st.dataset.state = d.state;
            st.textContent = d.label;
            field('speed').textContent = d.kmh == null ? '–' : `${d.kmh} km/h`;
            field('today').textContent = `${d.today.toFixed(2)} km`;
            field('seen').textContent = ago(d);
            field('id').textContent = d.id;
        };

        const select = (key) => {
            S.sel = key;
            $$('[data-select]', panel).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.select === key)));
            Object.keys(D).forEach((k) => { if (D[k].marker) D[k].marker.classList.toggle('is-selected', k === key); });
            const m = D[key].marker;
            if (m) m.parentNode.appendChild(m);
            followName.textContent = D[key].name;
            pingLayer.textContent = '';
            renderDock();
            if (S.follow) tweenVB(followBox());
        };
        $$('[data-select]', panel).forEach((b) => b.addEventListener('click', () => select(b.dataset.select)));
        Object.keys(D).forEach((k) => { if (D[k].marker) D[k].marker.addEventListener('click', () => select(k)); });

        const dropPing = (d) => {
            const p = pos(d);
            const ring = document.createElementNS(svgNS, 'circle');
            ring.setAttribute('class', 'ping-ring');
            ring.setAttribute('cx', p.x); ring.setAttribute('cy', p.y); ring.setAttribute('r', 5);
            const dot = document.createElementNS(svgNS, 'circle');
            dot.setAttribute('class', 'ping');
            dot.setAttribute('cx', p.x); dot.setAttribute('cy', p.y); dot.setAttribute('r', 3.4);
            pingLayer.append(ring, dot);
            if (ring.animate) {
                ring.animate([{ r: 5, opacity: 0.9 }, { r: 18, opacity: 0 }], { duration: 1200, easing: 'cubic-bezier(.16,1,.3,1)' })
                    .finished.then(() => ring.parentNode && ring.parentNode.removeChild(ring), () => {});
            }
            const dots = $$('.ping', pingLayer);
            dots.forEach((el, i) => { el.style.opacity = String(Math.max(0.2, 1 - (dots.length - 1 - i) * 0.2)); });
            if (dots.length > 5) dots[0].parentNode.removeChild(dots[0]);
            if (d.marker && d.marker.animate) {
                d.marker.querySelector('.mk-halo').animate([{ transform: 'scale(.6)', opacity: 0.45 }, { transform: 'scale(1.6)', opacity: 0 }], { duration: 1200, easing: 'cubic-bezier(.16,1,.3,1)' });
            }
        };

        // One position report: the marker glides to its new fix, and the readouts update when it lands
        const report = (key) => {
            const d = D[key];
            d.n += 1;
            let to = d.s + d.step;
            if (!d.loop && to > d.len) { d.s = 0; placeMarker(d); return; } // left the map: re-enter from the far edge, unseen
            if (d.loop && to > d.len) { d.s -= d.len; to -= d.len; }
            S.glides.push({ d, from: d.s, to, t0: performance.now(), dur: 900, key });
            if (!S.raf) S.raf = requestAnimationFrame(frame);
        };
        const land = (g) => {
            const d = g.d;
            d.lastAt = performance.now();
            d.today += d.km;
            d.kmh = Math.round((g.key === 'van04' ? 42 : 58) + Math.sin(d.n * 0.9) * (g.key === 'van04' ? 4 : 3));
            if (d.meta) d.meta.textContent = `Moving · ${d.kmh} km/h`;
            if (g.key === S.sel) { dropPing(d); renderDock(); }
        };
        const frame = (now) => {
            S.glides = S.glides.filter((g) => {
                const t = Math.min(1, (now - g.t0) / g.dur), e = 1 - Math.pow(1 - t, 3);
                g.d.s = g.from + (g.to - g.from) * e;
                placeMarker(g.d);
                if (t === 1) { land(g); return false; }
                return true;
            });
            if (S.follow && !vbAnim) setVB(followBox());
            S.raf = S.glides.length ? requestAnimationFrame(frame) : 0;
        };

        const tick = () => { S.flip = !S.flip; report(S.flip ? 'van04' : 'truck01'); };
        const run = (on) => {
            if (on === S.running) return;
            S.running = on;
            clearInterval(S.timer); clearInterval(S.seenTimer);
            if (on) {
                const now = performance.now();
                Object.values(D).forEach((d) => { d.lastAt = now; });
                S.timer = setInterval(tick, TICK);
                S.seenTimer = setInterval(() => { field('seen').textContent = ago(D[S.sel]); }, 1000);
            }
        };

        placeAll();
        select('van04');
        return { run };
    }

    // Sample route history: picking a trip highlights it, redraws it and replays the van along it once
    function createHistory(panel) {
        if (!panel) return null;
        const svg = $('[data-hist-map]', panel);
        const lines = $$('[data-tripline]', svg);
        const firstStop = $('.stop-end', svg);
        const play = $('[data-play]', svg);
        const controls = $$('[data-trip]', panel).filter((el) => el.tagName === 'BUTTON');
        const facts = $('[data-trip-facts]', panel);
        const T = [
            { dist: '38.2 km', moving: '1h 34m', idle: '18m', speed: '24 / 58 km/h' },
            { dist: '24.6 km', moving: '1h 22m', idle: '48m', speed: '18 / 46 km/h' },
            { dist: '17.9 km', moving: '1h 05m', idle: '27m', speed: '17 / 41 km/h' },
        ];
        let cur = 0, raf = 0;

        const show = (i, animate) => {
            cur = i;
            controls.forEach((c) => c.setAttribute('aria-pressed', String(+c.dataset.trip === i)));
            lines.forEach((l, k) => l.classList.toggle('is-on', k === i));
            const line = lines[i];
            svg.insertBefore(line, firstStop);
            Object.keys(T[i]).forEach((k) => { $(`[data-t="${k}"]`, facts).textContent = T[i][k]; });
            const len = line.getTotalLength();
            cancelAnimationFrame(raf);
            const at = (v) => { const p = line.getPointAtLength(v); play.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`); };
            if (!animate || reduceMotion.matches || !line.animate) { at(len); return; }
            line.animate([{ strokeDasharray: `${len}`, strokeDashoffset: len }, { strokeDasharray: `${len}`, strokeDashoffset: 0 }], { duration: 1100, easing: 'cubic-bezier(.65,0,.35,1)' });
            const t0 = performance.now();
            const step = (now) => {
                const t = Math.min(1, (now - t0) / 1100), e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                at(len * e);
                if (t < 1) raf = requestAnimationFrame(step);
            };
            raf = requestAnimationFrame(step);
        };
        controls.forEach((c) => c.addEventListener('click', () => show(+c.dataset.trip, true)));
        return { enter: () => requestAnimationFrame(() => show(cur, true)) };
    }

    /* ---------- Pricing calculator ---------- */
    const calc = $('[data-calc]');
    if (calc) {
        const PRICE = 50;
        const state = { ids: 3, months: 3 };
        const limits = { ids: [1, 100], months: [1, 12] };
        const out = (k) => $(`[data-out="${k}"]`, calc);
        const disc = $('[data-disc]', calc);
        const hint = $('[data-hint]', calc);
        let shownTotal = null;

        const tweenTotal = (to) => {
            const el = out('total');
            const from = shownTotal == null ? to : shownTotal;
            shownTotal = to;
            if (reduceMotion.matches || from === to) { el.textContent = inr(to); return; }
            const start = performance.now();
            const step = (now) => {
                const t = Math.min(1, (now - start) / 320);
                const e = 1 - Math.pow(1 - t, 3);
                el.textContent = inr(from + (to - from) * e);
                if (t < 1 && shownTotal === to) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        };

        const render = () => {
            const tm = state.ids * state.months;
            const sub = tm * PRICE;
            const off = tm >= 10 ? Math.round(sub * 0.1) : 0;
            out('ids').textContent = state.ids;
            out('months').textContent = state.months;
            out('tm').textContent = tm;
            out('sub').textContent = inr(sub);
            out('disc').textContent = off ? '−' + inr(off) : '−₹0';
            disc.classList.toggle('is-on', off > 0);
            disc.classList.toggle('is-off', off === 0);
            hint.classList.toggle('is-good', off > 0);
            hint.textContent = off > 0
                ? `10% bulk discount applied: ${tm} Tracking-Months in one purchase.`
                : `Add ${10 - tm} more Tracking-Month${10 - tm === 1 ? '' : 's'} to this purchase to get 10% off.`;
            tweenTotal(sub - off);
            $$('[data-step]', calc).forEach((b) => {
                const k = b.dataset.step;
                const dir = +b.dataset.dir;
                b.disabled = dir < 0 ? state[k] <= limits[k][0] : state[k] >= limits[k][1];
            });
        };

        calc.addEventListener('click', (e) => {
            const b = e.target.closest('[data-step]');
            if (!b || b.disabled) return;
            const k = b.dataset.step;
            state[k] = Math.min(limits[k][1], Math.max(limits[k][0], state[k] + +b.dataset.dir));
            render();
        });
        render();
    }

    /* ---------- Driver phone toggle ---------- */
    const phone = $('[data-phone]');
    if (phone) {
        const btn = $('[data-phone-toggle]', phone);
        const status = $('[data-phone-status]', phone);
        const note = $('[data-phone-note]', phone);
        btn.addEventListener('click', () => {
            const running = phone.dataset.running !== 'true';
            phone.dataset.running = String(running);
            btn.setAttribute('aria-pressed', String(!running));
            btn.textContent = running ? 'Pause tracking' : 'Start tracking';
            status.textContent = running ? 'Status: Running' : 'Status: Paused';
            note.textContent = running
                ? 'Your location is shared while tracking is on. A notification stays visible the whole time.'
                : 'Tracking is paused. Your location is not being shared.';
        });
    }

    /* ---------- Privacy page: table of contents spy ---------- */
    const toc = $('[data-toc]');
    if (toc && 'IntersectionObserver' in window) {
        const links = $$('a', toc);
        const map = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
        const tocSpy = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                links.forEach((a) => a.removeAttribute('aria-current'));
                map.get(entry.target.id)?.setAttribute('aria-current', 'true');
            });
        }, { rootMargin: '-20% 0px -70% 0px' });
        map.forEach((_, id) => { const el = document.getElementById(id); if (el) tocSpy.observe(el); });
    }

    /* ---------- Hero: film + phone simulation, one motion control ---------- */
    const hero = $('[data-hero]');
    if (hero) initHero(hero);

    function initHero(stage) {
        const video = $('[data-hero-video]', stage);
        const toggleBtn = $('[data-motion-toggle]', stage);
        const toggleLabel = $('[data-motion-label]', stage);
        const phone = $('[data-sim]', stage);
        const clockEl = $('[data-clock]', stage);
        const saveData = !!(navigator.connection && navigator.connection.saveData);
        const state = { visible: true, paused: false, filmOk: !!video && !saveData };

        // Poster fallback: any load or playback failure leaves the still frame in place.
        const usePoster = () => {
            state.filmOk = false;
            stage.classList.add('is-poster');
            if (video) { video.pause(); video.removeAttribute('autoplay'); }
        };
        if (video) {
            if (saveData) { video.preload = 'none'; usePoster(); }
            const sources = $$('source', video);
            if (sources.length) sources[sources.length - 1].addEventListener('error', usePoster);
            video.addEventListener('error', usePoster);
            if (reduceMotion.matches) { video.removeAttribute('autoplay'); video.pause(); }
        }

        // The phone's trip runs on the film's own timeline, so the marker moves only while
        // the van in the film is moving (and stalls with it if the video buffers).
        const filmClock = () => (state.filmOk && !reduceMotion.matches ? video : null);
        const sim = phone ? createSim(phone, filmClock) : null;

        const tickClock = () => {
            if (clockEl) clockEl.textContent = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
        };
        tickClock();
        setInterval(tickClock, 15000);

        const sync = () => {
            const run = state.visible && !state.paused && !document.hidden;
            if (video && state.filmOk && !reduceMotion.matches) {
                if (run) {
                    const p = video.play();
                    if (p && p.catch) p.catch(usePoster);
                } else {
                    video.pause();
                }
            }
            if (sim) (run ? sim.start : sim.stop)();
        };

        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                state.paused = !state.paused;
                toggleBtn.setAttribute('aria-pressed', String(state.paused));
                toggleLabel.textContent = state.paused ? 'Play animations' : 'Pause animations';
                sync();
            });
        }
        document.addEventListener('visibilitychange', sync);
        if (reduceMotion.addEventListener) reduceMotion.addEventListener('change', () => { if (sim) sim.stop(); sync(); });
        if ('IntersectionObserver' in window) {
            new IntersectionObserver(([entry]) => { state.visible = entry.isIntersecting; sync(); }, { threshold: 0.05 }).observe(stage);
        }
        sync();
    }

    function createSim(root, getFilm) {
        const svgNS = 'http://www.w3.org/2000/svg';
        const world = $('[data-world]', root);
        const tiles = $$('[data-tile]', root);
        const trail = $('[data-trail]', root);
        const plan = $('[data-plan]', root);
        const van = $('[data-van]', root);
        const pingLayer = $('[data-pings]', root);
        const speedEl = $('[data-speed]', root);
        const distEl = $('[data-dist]', root);
        const lastEl = $('[data-last]', root);
        const gpsDot = $('.gps-dot', root);
        const halo = $('.van-halo', root);

        // The corridor matches the film: the road meanders on the same 8 s rhythm
        // (one bend per 96 m at the film's 12 m/s), and the map pans 1 unit per metre.
        const SPEED = parseFloat(root.dataset.mps || '12');   // mean metres per second (the film's road speed)
        const SURGE = parseFloat(root.dataset.surge || '1.6'); // the film van accelerates and eases off by this much
        const LOOP = parseFloat(root.dataset.loop || '8');     // film loop, seconds
        const BEND = parseFloat(root.dataset.bend || '96');     // metres per bend cycle
        const K = SURGE * LOOP / (2 * Math.PI);
        // Exactly the film's motion model: distance and speed of the van at film time ft.
        const vanDist = (ft) => {
            const n = Math.floor(ft / LOOP), tt = ft - n * LOOP;
            return n * SPEED * LOOP + SPEED * tt + K * (1 - Math.cos(2 * Math.PI * tt / LOOP));
        };
        const vanSpeed = (ft) => SPEED + SURGE * Math.sin(2 * Math.PI * (ft % LOOP) / LOOP);
        const AMP = 3.2, CX = 120, TILE = 480, VAN_Y = 210;
        const PING_EVERY = 1.6;
        const roadX = (s) => CX + AMP * Math.sin(2 * Math.PI * s / BEND);
        const headingAt = (s) => -90 + Math.atan((AMP * 2 * Math.PI / BEND) * Math.cos(2 * Math.PI * s / BEND)) * 180 / Math.PI;

        const S = { s: 0, lastPingT: 0, t: 0, lastPingAt: performance.now(), tileK: null, lastVT: null, running: false };

        const linePts = (from, to) => {
            const out = [];
            for (let s = from; s <= to; s += 4) out.push(`${roadX(s).toFixed(1)} ${(-s).toFixed(1)}`);
            out.push(`${roadX(to).toFixed(1)} ${(-to).toFixed(1)}`);
            return 'M' + out.join(' L');
        };

        // One GPS fix = one beat: the status-bar dot blinks, the marker's halo rings out
        // and a ping lands on the trail, all on the same film frame.
        const pulse = () => {
            if (reduceMotion.matches || !S.running) return;
            if (gpsDot && gpsDot.animate) {
                gpsDot.animate([
                    { opacity: 1, boxShadow: '0 0 0 0 rgba(196, 138, 44, .5)' },
                    { opacity: 0.45, boxShadow: '0 0 0 .34em rgba(196, 138, 44, 0)', offset: 0.45 },
                    { opacity: 1, boxShadow: '0 0 0 0 rgba(196, 138, 44, 0)' },
                ], { duration: 1100, easing: 'ease-out' });
            }
            if (halo && halo.animate) {
                halo.animate([{ transform: 'scale(.6)', opacity: 0.5 }, { transform: 'scale(1.5)', opacity: 0 }],
                    { duration: 1300, easing: 'cubic-bezier(.16,1,.3,1)' });
            }
        };

        const dropPing = (s) => {
            const x = roadX(s), y = -s;
            const ring = document.createElementNS(svgNS, 'circle');
            ring.setAttribute('class', 'ping-ring');
            ring.setAttribute('cx', x); ring.setAttribute('cy', y); ring.setAttribute('r', 4);
            const dot = document.createElementNS(svgNS, 'circle');
            dot.setAttribute('class', 'ping');
            dot.setAttribute('cx', x); dot.setAttribute('cy', y); dot.setAttribute('r', 3.2);
            dot.dataset.s = String(s);
            pingLayer.append(ring, dot);
            const drop = (el) => el.parentNode && el.parentNode.removeChild(el);
            if (!reduceMotion.matches && ring.animate) {
                ring.animate([{ r: 4, opacity: 0.9 }, { r: 14, opacity: 0 }], { duration: 1100, easing: 'cubic-bezier(.16,1,.3,1)' })
                    .finished.then(() => drop(ring), () => drop(ring));
            } else {
                drop(ring);
            }
            $$('.ping', pingLayer).forEach((p) => {
                const age = s - parseFloat(p.dataset.s);
                if (age > 320) drop(p);
                else p.style.opacity = String(Math.max(0.25, 1 - age / 260));
            });
            S.lastPingAt = performance.now();
            pulse();
        };

        // Advance by the film's playhead when it is playing; by wall time otherwise.
        const advance = (dt) => {
            const film = getFilm();
            if (!film) { S.lastVT = null; return dt; }
            const vt = film.currentTime;
            if (S.lastVT == null) { S.lastVT = vt; if (!S.synced) { S.synced = true; S.t = vt; S.lastPingT = vt; } return 0; }
            let dv = vt - S.lastVT;
            if (dv < -2) dv += film.duration || 8;   // the loop wrapped
            S.lastVT = vt;
            return Math.max(0, Math.min(dv, 0.25));
        };

        const draw = () => {
            const k = Math.floor(S.s / TILE);
            if (k !== S.tileK) {
                S.tileK = k;
                tiles.forEach((t, i) => t.setAttribute('transform', `translate(0 ${-(k + i - 1) * TILE})`));
            }
            world.setAttribute('transform', `translate(0 ${(VAN_Y + S.s).toFixed(2)})`);
            trail.setAttribute('d', linePts(Math.max(0, S.s - 260), S.s));
            plan.setAttribute('d', linePts(S.s, S.s + 240));
            van.setAttribute('transform', `translate(${roadX(S.s).toFixed(2)} ${VAN_Y}) rotate(${headingAt(S.s).toFixed(1)})`);
            speedEl.textContent = String(Math.round(vanSpeed(S.t) * 3.6));
            const km = S.s / 1000;
            distEl.textContent = km < 10 ? km.toFixed(2) : km.toFixed(1);
            const ago = Math.max(0, Math.round((performance.now() - S.lastPingAt) / 1000));
            lastEl.textContent = ago < 1 ? 'now' : `${ago}s ago`;
        };

        const update = (dt) => {
            S.t += dt;
            S.s = vanDist(S.t);
            if (S.t - S.lastPingT >= PING_EVERY) { S.lastPingT = S.t; dropPing(S.s); }
            draw();
        };

        let raf = 0, last = 0, interval = 0, stoppedAt = 0;
        const frame = (now) => {
            const dt = Math.min(0.05, (now - last) / 1000);
            last = now;
            update(advance(dt));
            raf = requestAnimationFrame(frame);
        };
        const start = () => {
            if (S.running) return;
            S.running = true;
            if (stoppedAt) S.lastPingAt += performance.now() - stoppedAt;
            root.classList.add('is-running');
            if (reduceMotion.matches) interval = setInterval(() => update(PING_EVERY), 1600);
            else { last = performance.now(); raf = requestAnimationFrame(frame); }
        };
        const stop = () => {
            if (S.running) stoppedAt = performance.now();
            S.running = false;
            root.classList.remove('is-running');
            cancelAnimationFrame(raf);
            clearInterval(interval);
        };

        dropPing(0);
        draw();
        return { start, stop };
    }
})();
