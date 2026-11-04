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
