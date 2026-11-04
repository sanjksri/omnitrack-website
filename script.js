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
    if (toggle && menu) {
        const setOpen = (open) => {
            toggle.setAttribute('aria-expanded', String(open));
            menu.classList.toggle('is-open', open);
        };
        toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
        menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
        });
        document.addEventListener('click', (e) => {
            if (toggle.getAttribute('aria-expanded') === 'true' && !e.target.closest('.site-header')) setOpen(false);
        });
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
    const fadeTargets = $$('.explorer, .table-wrap, .price-card, .calc, .terms, .apk, .phone, .faq-list');
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

    /* ---------- How it works: step vignettes ---------- */
    $$('[data-steps] .step').forEach((step, i) => {
        step.style.setProperty('--d', `${i * 0.25}s`);
        step.addEventListener('reveal', () => {
            const typed = $('.vg-typed', step);
            if (typed && !reduceMotion.matches) {
                const word = typed.dataset.type || typed.textContent;
                typed.textContent = '';
                typed.classList.add('is-typing');
                let n = 0;
                const tick = () => {
                    typed.textContent = word.slice(0, ++n);
                    if (n < word.length) setTimeout(tick, 110);
                    else setTimeout(() => typed.classList.remove('is-typing'), 600);
                };
                setTimeout(tick, 350);
            }
            if (step.querySelector('.vg-consent')) {
                setTimeout(() => step.classList.add('is-checked'), reduceMotion.matches ? 0 : 800);
            }
        }, { once: true });
        reveal(step);
    });

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
            tab.scrollIntoView({ block: 'nearest', inline: 'nearest' });
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
            if (e.target === p.querySelector('.panel-copy')) p.classList.remove('is-entering');
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
        const sim = phone ? createSim(phone) : null;
        const state = { visible: true, paused: false };

        const tickClock = () => {
            if (clockEl) clockEl.textContent = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
        };
        tickClock();
        setInterval(tickClock, 15000);

        const sync = () => {
            const run = state.visible && !state.paused && !document.hidden;
            if (sim) (run ? sim.start : sim.stop)();
            if (video) {
                if (run && !reduceMotion.matches) {
                    const p = video.play();
                    if (p && p.catch) p.catch(() => {});
                } else {
                    video.pause();
                }
            }
        };

        if (video && reduceMotion.matches) { video.removeAttribute('autoplay'); video.pause(); }

        toggleBtn?.addEventListener('click', () => {
            state.paused = !state.paused;
            toggleBtn.setAttribute('aria-pressed', String(state.paused));
            toggleLabel.textContent = state.paused ? 'Play animations' : 'Pause animations';
            sync();
        });
        document.addEventListener('visibilitychange', sync);
        reduceMotion.addEventListener?.('change', () => { sim?.stop(); sync(); });
        if ('IntersectionObserver' in window) {
            new IntersectionObserver(([entry]) => { state.visible = entry.isIntersecting; sync(); }, { threshold: 0.05 }).observe(stage);
        }
        sync();
    }

    function createSim(root) {
        const svgNS = 'http://www.w3.org/2000/svg';
        const route = $('[data-route-line]', root);
        const van = $('[data-van]', root);
        const pingLayer = $('[data-pings]', root);
        const statusEl = $('[data-status]', root);
        const speedEl = $('[data-speed]', root);
        const distEl = $('[data-dist]', root);
        const lastEl = $('[data-last]', root);

        const pts = root.dataset.route.split(',').map((p) => p.trim().split(/\s+/).map(Number));
        const segs = [];
        let total = 0;
        for (let i = 1; i < pts.length; i++) {
            const [x0, y0] = pts[i - 1];
            const [x1, y1] = pts[i];
            const len = Math.hypot(x1 - x0, y1 - y0);
            segs.push({ x0, y0, x1, y1, len, start: total, angle: Math.atan2(y1 - y0, x1 - x0) * 180 / Math.PI });
            total += len;
        }
        const corners = segs.slice(1).map((g) => g.start);
        const stopIdx = parseInt(root.dataset.stop || '0', 10);
        const STOP_AT = stopIdx > 0 ? segs[stopIdx].start : -1;
        const TRIP_KM = parseFloat(root.dataset.km || '5');
        const MAX_SPEED = total / 7.5;
        const PING_EVERY = 1.4;

        route.style.strokeDasharray = `${total} ${total}`;

        const S = { d: 0, phase: 'drive', phaseT: 0, sincePing: 0, lastPingAt: performance.now(), heading: segs[0].angle, kmh: 0, running: false };

        const posAt = (d) => {
            const g = segs.find((s) => d <= s.start + s.len) || segs[segs.length - 1];
            const t = Math.max(0, Math.min(1, (d - g.start) / g.len));
            return { x: g.x0 + (g.x1 - g.x0) * t, y: g.y0 + (g.y1 - g.y0) * t, angle: g.angle };
        };
        const setStatus = (st, text) => { statusEl.dataset.state = st; statusEl.textContent = text; };

        const dropPing = (x, y) => {
            const ring = document.createElementNS(svgNS, 'circle');
            ring.setAttribute('class', 'ping-ring');
            ring.setAttribute('cx', x); ring.setAttribute('cy', y); ring.setAttribute('r', 4);
            const dot = document.createElementNS(svgNS, 'circle');
            dot.setAttribute('class', 'ping');
            dot.setAttribute('cx', x); dot.setAttribute('cy', y); dot.setAttribute('r', 3.2);
            pingLayer.append(ring, dot);
            if (!reduceMotion.matches && ring.animate) {
                ring.animate([{ r: 4, opacity: 0.9 }, { r: 14, opacity: 0 }], { duration: 1100, easing: 'cubic-bezier(.16,1,.3,1)' })
                    .finished.then(() => ring.remove()).catch(() => ring.remove());
            } else {
                ring.remove();
            }
            const dots = pingLayer.querySelectorAll('.ping');
            dots.forEach((p, i) => { p.style.opacity = String(Math.max(0.25, 1 - (dots.length - 1 - i) * 0.08)); });
            S.lastPingAt = performance.now();
        };

        const resetTrip = () => {
            Object.assign(S, { d: 0, phase: 'drive', phaseT: 0, sincePing: 0, heading: segs[0].angle });
            pingLayer.replaceChildren();
            setStatus('moving', 'Moving');
            dropPing(pts[0][0], pts[0][1]);
        };

        const draw = () => {
            const p = posAt(S.d);
            van.setAttribute('transform', `translate(${p.x.toFixed(2)} ${p.y.toFixed(2)}) rotate(${S.heading.toFixed(1)})`);
            route.style.strokeDashoffset = String(total - S.d);
            speedEl.textContent = String(Math.round(S.kmh));
            distEl.textContent = (S.d / total * TRIP_KM).toFixed(1);
            const ago = Math.max(0, Math.round((performance.now() - S.lastPingAt) / 1000));
            lastEl.textContent = ago < 1 ? 'now' : `${ago}s ago`;
        };

        const step = (dt) => {
            S.phaseT += dt;
            if (S.phase === 'drive') {
                const next = corners.find((c) => c > S.d);
                const toCorner = next != null ? next - S.d : Infinity;
                const fromCorner = S.d - (corners.filter((c) => c <= S.d).pop() ?? -Infinity);
                const toStop = (S.d < STOP_AT ? STOP_AT : total) - S.d;
                const near = Math.min(toCorner, fromCorner, toStop * 0.8);
                const factor = Math.max(0.3, Math.min(1, near / (total / 18)));
                const accel = Math.min(1, S.phaseT / 1.2);
                S.kmh = 14 + 34 * factor * accel + Math.sin(S.d / 9) * 2;
                const before = S.d;
                S.d = Math.min(total, S.d + MAX_SPEED * factor * (0.35 + 0.65 * accel) * dt);
                if (STOP_AT > 0 && before < STOP_AT && S.d >= STOP_AT) {
                    Object.assign(S, { d: STOP_AT, phase: 'idle', phaseT: 0, kmh: 0 });
                    setStatus('idle', 'Idle');
                    dropPing(pts[stopIdx][0], pts[stopIdx][1]);
                } else if (S.d >= total) {
                    Object.assign(S, { phase: 'arrived', phaseT: 0, kmh: 0 });
                    setStatus('arrived', 'Arrived');
                    dropPing(pts[pts.length - 1][0], pts[pts.length - 1][1]);
                } else if ((S.sincePing += dt) >= PING_EVERY) {
                    S.sincePing = 0;
                    const p = posAt(S.d);
                    dropPing(p.x, p.y);
                }
            } else if (S.phase === 'idle') {
                statusEl.textContent = `Idle · 0:${String(Math.floor(S.phaseT)).padStart(2, '0')}`;
                if (S.phaseT > 3.2) {
                    Object.assign(S, { phase: 'drive', phaseT: 0, sincePing: 0 });
                    setStatus('moving', 'Moving');
                }
            } else if (S.phase === 'arrived' && S.phaseT > 3.5) {
                resetTrip();
            }
            const target = posAt(Math.min(total - 0.01, S.d + 0.01)).angle;
            const diff = ((target - S.heading + 540) % 360) - 180;
            S.heading += reduceMotion.matches ? diff : diff * Math.min(1, dt * 9);
        };

        let raf = 0, last = 0, interval = 0, stoppedAt = 0;
        const frame = (now) => {
            const dt = Math.min(0.05, (now - last) / 1000);
            last = now;
            step(dt); draw();
            raf = requestAnimationFrame(frame);
        };
        const start = () => {
            if (S.running) return;
            S.running = true;
            if (stoppedAt) S.lastPingAt += performance.now() - stoppedAt;
            root.classList.add('is-running');
            if (reduceMotion.matches) interval = setInterval(() => { step(PING_EVERY); draw(); }, 1400);
            else { last = performance.now(); raf = requestAnimationFrame(frame); }
        };
        const stop = () => {
            if (S.running) stoppedAt = performance.now();
            S.running = false;
            root.classList.remove('is-running');
            cancelAnimationFrame(raf);
            clearInterval(interval);
        };

        resetTrip();
        draw();
        return { start, stop };
    }
})();
