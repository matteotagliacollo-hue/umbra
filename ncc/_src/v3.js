// Umbra NCC v3 — pagine lunghe, foto ovunque, animazioni allo scroll. Un tema per tipo di attività.
const { esc, pick, img, waText, ICON, stars, bookingForm, BOOK_JS, faq, badge, mobileBar, head, langToggle, LANG_JS, LANG_CSS, T, SOUTH_TYROL } = require('./lib');
const { GSAP, ENGINE, split, mani, BASE_CSS } = require('./motion');

// ---------- temi ----------
const THEMES = {
paese: { theme:'#F3EEE2', fonts:'family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Figtree:wght@400;500;600;700',
 css:`:root{--bg:#F3EEE2;--bg-2:#E9E2D2;--bg-3:#DDD4C0;--card:#FBF8F1;--fg:#1B1A17;--fg-2:#5B574D;--line:#D6CDB8;--acc:#F2B705;--acc-2:#9A7300;--on-acc:#1B1A17;
 --body:'Figtree',system-ui,-apple-system,sans-serif;--disp:'Bricolage Grotesque',system-ui,sans-serif;--r-btn:14px;--r-card:24px;--r-in:12px;
 --brand-font:800 18px/1 var(--disp);--h2-font:800 clamp(2.4rem,5.6vw,4.6rem)/.98 var(--disp);--h2-ls:-.035em;--h3-font:800 1.6rem/1.1 var(--disp);--num-font:800 1rem/1 var(--disp);
 --bignum-font:800 clamp(3.4rem,7vw,6rem) var(--disp);--faq-font:700 1.15rem/1.35 var(--disp);--final-font:800 clamp(3rem,9vw,8rem)/.92 var(--disp);
 --mani-font:700 clamp(2rem,4.6vw,3.9rem)/1.12 var(--disp);--tick-bg:#1B1A17;--tick-fg:#F3EEE2;--tick-font:700 clamp(1.1rem,2.2vw,1.6rem)/1 var(--disp);--tick-dot-r:3px;
 --hd-solid:rgba(243,238,226,.9);--route-bg:#1B1A17;--route-fg:#F3EEE2;--route-fg-2:#B5AE9F;--route-base:#4a463e;--route-line:#34312b;--mbar-bg:#1B1A17}
 .hero{min-height:100svh;padding-top:110px;display:grid;align-items:center}
 .hero .hw{display:grid;grid-template-columns:1.05fr .95fr;gap:50px;align-items:center;width:100%}
 .hero h1{font:800 clamp(3rem,7.4vw,6.6rem)/.92 var(--disp);letter-spacing:-.045em;margin:0 0 24px}
 .hero h1 em{font-style:normal;color:var(--acc-2)}
 .hero .lede{font-size:1.18rem;color:var(--fg-2);max-width:36ch;margin:0 0 30px}
 .hero .hcard{position:relative;aspect-ratio:4/5;border-radius:32px;overflow:hidden;box-shadow:0 40px 80px -40px rgba(27,26,23,.5)}
 .roof{position:absolute;top:22px;left:22px;z-index:2;background:var(--acc);color:#1B1A17;font:800 14px/1 var(--disp);letter-spacing:.2em;padding:10px 16px;border-radius:8px;box-shadow:0 0 0 6px rgba(242,183,5,.25);animation:glow 2.6s ease-in-out infinite}
 @keyframes glow{50%{box-shadow:0 0 0 14px rgba(242,183,5,0)}}
 .hrate{position:absolute;left:18px;right:18px;bottom:18px;z-index:2;display:flex;gap:14px;align-items:center;padding:16px 18px;border-radius:18px;background:rgba(251,248,241,.94)}
 .hrate b{font:800 2rem/1 var(--disp)}.hrate span{font-size:13px;color:var(--fg-2)}
 .hnum{display:block;margin-top:26px;text-decoration:none;font:800 clamp(1.6rem,3.2vw,2.4rem)/1 var(--disp);letter-spacing:-.02em}.hnum small{display:block;font:500 13px/1 var(--body);color:var(--fg-2);margin-bottom:8px}
 @media (max-width:980px){.hero .hw{grid-template-columns:1fr;gap:30px}.hero{padding-top:96px;padding-bottom:40px}.hero .hcard{aspect-ratio:4/3.4}}`},
executive: { theme:'#0E1012', fonts:'family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700',
 css:`:root{--bg:#0E1012;--bg-2:#14171A;--bg-3:#1C2024;--card:#15181B;--fg:#EDEAE3;--fg-2:#A29E95;--line:rgba(237,234,227,.12);--acc:#C6A56B;--on-acc:#14110B;
 --body:'Manrope',system-ui,-apple-system,sans-serif;--disp:'Instrument Serif',Georgia,serif;--r-btn:999px;--r-card:16px;--r-in:10px;
 --brand-font:400 1.5rem/1 var(--disp);--h2-font:400 clamp(2.8rem,6vw,5.2rem)/.95 var(--disp);--h2-ls:-.015em;--h3-font:400 2rem/1.05 var(--disp);--num-font:400 1.2rem/1 var(--disp);
 --bignum-font:400 clamp(3.8rem,8vw,7rem) var(--disp);--faq-font:400 1.5rem/1.25 var(--disp);--final-font:400 clamp(3.4rem,10vw,9rem)/.9 var(--disp);
 --mani-font:400 clamp(2.2rem,5vw,4.4rem)/1.08 var(--disp);--tick-bg:#C6A56B;--tick-fg:#14110B;--tick-font:400 clamp(1.4rem,2.6vw,2.1rem)/1 var(--disp);
 --hd-fg:#EDEAE3;--hd-solid:rgba(14,16,18,.86);--route-bg:#0A0B0D;--route-fg:#EDEAE3;--route-fg-2:#A29E95;--route-base:#2b2e33;--route-line:#22252a;--mbar-bg:#0E1012;--star:#C6A56B}
 .hero{min-height:100svh;display:flex;align-items:flex-end;color:#EDEAE3}
 .hero .hmedia img,.hero .hmedia .phx{filter:brightness(.55) saturate(.7)}
 .hero::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(14,16,18,.92),rgba(14,16,18,.45) 55%,rgba(14,16,18,.15)),linear-gradient(0deg,#0E1012,transparent 40%)}
 .hero .hw{position:relative;z-index:2;display:grid;grid-template-columns:1.15fr .85fr;gap:50px;align-items:end;width:100%;padding-block:140px 80px}
 .hero h1{font:400 clamp(3.4rem,8.4vw,7.6rem)/.9 var(--disp);letter-spacing:-.02em;margin:0 0 26px}.hero h1 em{color:var(--acc)}
 .hero .lede{font-size:1.12rem;color:#CFCBC2;max-width:42ch;margin:0 0 30px}
 .hero .bk{background:rgba(21,24,27,.82);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}
 .hero .bkh{font:400 1.8rem/1.1 var(--disp);margin:0 0 6px}
 @media (max-width:980px){.hero .hw{grid-template-columns:1fr;padding-block:120px 50px}}`},
transfer: { theme:'#0D141B', fonts:'family=Archivo:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600',
 css:`:root{--bg:#0D141B;--bg-2:#121B24;--bg-3:#1A2530;--card:#121B24;--fg:#EEF2F5;--fg-2:#93A3B1;--line:rgba(238,242,245,.1);--acc:#FFB21C;--on-acc:#0D141B;
 --body:'Archivo',system-ui,-apple-system,sans-serif;--mono:'JetBrains Mono',ui-monospace,monospace;--r-btn:10px;--r-card:16px;--r-in:8px;
 --brand-font:800 17px/1 var(--body);--h2-font:800 clamp(2.4rem,5.6vw,4.6rem)/.96 var(--body);--h2-ls:-.04em;--h3-font:700 1.5rem/1.15 var(--body);--num-font:600 .95rem/1 var(--mono);
 --bignum-font:600 clamp(3.2rem,7vw,6rem) var(--mono);--faq-font:600 1.15rem/1.35 var(--body);--final-font:800 clamp(3rem,9vw,8rem)/.9 var(--body);
 --mani-font:700 clamp(2rem,4.6vw,3.8rem)/1.1 var(--body);--tick-bg:#FFB21C;--tick-fg:#0D141B;--tick-font:600 clamp(1rem,1.9vw,1.4rem)/1 var(--mono);--tick-dot-r:0;
 --hd-solid:rgba(13,20,27,.88);--route-bg:#081016;--route-fg:#EEF2F5;--route-fg-2:#93A3B1;--route-base:#25323e;--route-line:#1b2630;--mbar-bg:#0D141B;--star:#FFB21C}
 .eye{font-family:var(--mono);letter-spacing:.12em}
 .hero{min-height:100svh;padding-top:100px;display:grid;align-items:center}
 .hero .hmedia{opacity:.22}.hero::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 70% 40%,transparent,#0D141B 70%)}
 .hero .hw{position:relative;z-index:2;display:grid;grid-template-columns:1fr 1.05fr;gap:50px;align-items:center;width:100%;padding-block:40px 70px}
 .hero h1{font:800 clamp(3rem,7vw,6.2rem)/.92 var(--body);letter-spacing:-.05em;margin:0 0 22px}.hero h1 em{font-style:normal;color:var(--acc)}
 .hero .lede{color:var(--fg-2);font-size:1.12rem;max-width:40ch;margin:0 0 28px}
 .board{background:#070C11;border:1px solid #1d2832;border-radius:16px;padding:20px;font:500 14px/1 var(--mono);box-shadow:0 50px 90px -40px rgba(0,0,0,.9)}
 .bh{display:flex;justify-content:space-between;padding:2px 6px 16px;color:var(--fg-2);font-size:11px;letter-spacing:.16em;text-transform:uppercase}.bh b{color:var(--acc)}
 .brow{display:grid;grid-template-columns:62px 1fr auto;gap:14px;align-items:center;padding:14px 8px;border-top:1px solid #16202a}
 .brow .h{color:var(--fg-2)}.brow .d{color:var(--acc);text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.brow .s{font-size:10.5px;letter-spacing:.1em;color:#38D27A;white-space:nowrap}
 .bf{padding:14px 8px 2px;color:var(--fg-2);font-size:11px}
 @media (max-width:980px){.hero .hw{grid-template-columns:1fr}.brow{grid-template-columns:52px 1fr}.brow .s{grid-column:2}}`},
alpino: { theme:'#F5F6F2', fonts:'family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600',
 css:`:root{--bg:#F5F6F2;--bg-2:#E9ECE5;--bg-3:#DCE1D7;--card:#FFFFFF;--fg:#15201A;--fg-2:#57635B;--line:#D7DDD3;--acc:#2E5A44;--on-acc:#fff;--acc-2:#2E5A44;
 --body:'Inter',system-ui,-apple-system,sans-serif;--disp:'Fraunces',Georgia,serif;--r-btn:12px;--r-card:22px;--r-in:10px;
 --brand-font:600 1.2rem/1.1 var(--disp);--h2-font:600 clamp(2.4rem,5.4vw,4.6rem)/1 var(--disp);--h3-font:600 1.7rem/1.1 var(--disp);--num-font:600 1rem/1 var(--disp);
 --bignum-font:600 clamp(3.4rem,7vw,6rem) var(--disp);--faq-font:600 1.2rem/1.35 var(--disp);--final-font:600 clamp(3rem,9vw,7.6rem)/.95 var(--disp);
 --mani-font:500 clamp(2rem,4.6vw,3.8rem)/1.15 var(--disp);--tick-bg:#1E2A24;--tick-fg:#EEF2EE;--tick-font:600 clamp(1.1rem,2.2vw,1.6rem)/1 var(--disp);
 --hd-fg:#fff;--hd-solid:rgba(245,246,242,.9);--route-bg:#1E2A24;--route-fg:#EEF2EE;--route-fg-2:#B5C5BB;--route-base:#3d5a4d;--route-line:#2c4a3d;--mbar-bg:#1C3A2E}
 .hero{min-height:100svh;display:flex;align-items:flex-end;color:#fff}
 .hero::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(12,24,19,.55),rgba(12,24,19,.05) 38%,rgba(12,24,19,.78))}
 .hero .hw{position:relative;z-index:2;width:100%;padding-block:140px 80px;display:flex;justify-content:space-between;align-items:flex-end;gap:30px;flex-wrap:wrap}
 .hero h1{font:600 clamp(3.2rem,8.6vw,7.6rem)/.92 var(--disp);letter-spacing:-.03em;margin:0 0 22px;max-width:12ch}
 .hero .lede{font-size:1.15rem;max-width:44ch;margin:0 0 30px;color:rgba(255,255,255,.9)}
 .snow{position:absolute;inset:0;z-index:1;pointer-events:none}
 .hrate{background:rgba(245,246,242,.95);color:#15201A;border-radius:16px;padding:16px 20px;display:flex;gap:14px;align-items:center}.hrate b{font:600 2rem/1 var(--disp)}.hrate span{font-size:13px;color:#57635B}
 .lang{display:inline-flex;border:1px solid currentColor;border-radius:999px;padding:3px}.lang button{border:0;background:none;color:inherit;font:600 12px/1 var(--body);padding:8px 11px;border-radius:999px;cursor:pointer}
 .lang button[aria-pressed=true]{background:var(--acc);color:#fff}`},
lago: { theme:'#F6F2EA', fonts:'family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Jost:wght@400;500;600',
 css:`:root{--bg:#F6F2EA;--bg-2:#EEE8DC;--bg-3:#E3DBCB;--card:#FFFDF8;--fg:#141B26;--fg-2:#5A6270;--line:#E1D9C9;--acc:#1F3A5F;--acc-2:#A8834A;--on-acc:#fff;
 --body:'Jost',system-ui,-apple-system,sans-serif;--disp:'Cormorant Garamond',Georgia,serif;--r-btn:999px;--r-card:22px;--r-in:12px;
 --brand-font:600 1.6rem/1 var(--disp);--h2-font:500 clamp(2.8rem,6vw,5.2rem)/.95 var(--disp);--h2-ls:-.01em;--h3-font:600 1.9rem/1.05 var(--disp);--num-font:500 1.1rem/1 var(--disp);
 --bignum-font:500 clamp(4rem,8vw,7rem) var(--disp);--faq-font:600 1.45rem/1.25 var(--disp);--final-font:500 clamp(3.4rem,10vw,9rem)/.88 var(--disp);
 --mani-font:500 clamp(2.3rem,5.2vw,4.6rem)/1.05 var(--disp);--tick-bg:#141B26;--tick-fg:#E9DCC4;--tick-font:500 italic clamp(1.5rem,2.8vw,2.2rem)/1 var(--disp);
 --hd-fg:#fff;--hd-solid:rgba(246,242,234,.92);--route-bg:#141B26;--route-fg:#EFEAE0;--route-fg-2:#A9B0BB;--route-base:#33405a;--route-line:#273247;--mbar-bg:#141B26;--star:#A8834A}
 .rpath{stroke:#C9A46A}.rdot{stroke:#C9A46A}.rlist a{color:#C9A46A}.veh rect:first-child{fill:#C9A46A}
 .hero{padding:12px}.frame{position:relative;min-height:calc(100svh - 24px);border-radius:30px;overflow:hidden;display:flex;align-items:flex-end;color:#fff}
 .frame::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,27,38,.35),rgba(20,27,38,0) 35%,rgba(20,27,38,.75))}
 .frame .hw{position:relative;z-index:2;width:100%;padding-block:120px 60px}
 .hero h1{font:500 clamp(3.6rem,10vw,9rem)/.86 var(--disp);letter-spacing:-.02em;margin:0 0 22px}.hero h1 em{color:#E9D3A8}
 .hero .lede{font-size:1.15rem;max-width:44ch;margin:0 0 30px;color:rgba(255,255,255,.9)}
 .strip{display:flex;gap:30px;flex-wrap:wrap;justify-content:space-between;padding:24px 8px 0;color:var(--fg-2);font-size:14px}.strip b{font:600 1.8rem/1 var(--disp);color:var(--fg);margin-right:8px}`},
nero: { theme:'#0A0A0B', fonts:'family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=Manrope:wght@400;500;600',
 css:`:root{--bg:#0A0A0B;--bg-2:#121212;--bg-3:#1A1A1A;--card:#121212;--fg:#F1ECE2;--fg-2:#A7A194;--line:rgba(241,236,226,.13);--acc:#CDB07A;--on-acc:#0A0A0B;
 --body:'Manrope',system-ui,-apple-system,sans-serif;--disp:'Bodoni Moda',Didot,Georgia,serif;--r-btn:999px;--r-card:6px;--r-in:0;
 --brand-font:400 1.5rem/1 var(--disp);--brand-ls:.08em;--h2-font:400 clamp(2.8rem,6.4vw,5.6rem)/.94 var(--disp);--h2-ls:-.01em;--h3-font:400 2rem/1.05 var(--disp);--num-font:400 1.2rem/1 var(--disp);
 --bignum-font:400 clamp(4rem,9vw,8rem) var(--disp);--faq-font:400 1.55rem/1.2 var(--disp);--final-font:400 clamp(3.4rem,10.5vw,9.6rem)/.88 var(--disp);
 --mani-font:400 clamp(2.3rem,5.4vw,4.6rem)/1.05 var(--disp);--tick-bg:#0A0A0B;--tick-fg:#CDB07A;--tick-font:400 italic clamp(1.6rem,3vw,2.4rem)/1 var(--disp);
 --hd-fg:#F1ECE2;--hd-solid:rgba(10,10,11,.86);--route-bg:#0A0A0B;--route-fg:#F1ECE2;--route-fg-2:#A7A194;--route-base:#2a2824;--route-line:#1f1e1b;--mbar-bg:#0A0A0B;--star:#CDB07A}
 .eye{letter-spacing:.42em;font-weight:500}.eye::before{width:40px;height:1px}
 .tick{border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
 .hero{min-height:100svh;display:grid;place-items:center;text-align:center;color:#F1ECE2}
 .hero .hmedia img,.hero .hmedia .phx{filter:brightness(.5) saturate(.8)}
 .hero::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(10,10,11,.1),rgba(10,10,11,.8))}
 .hero .hw{position:relative;z-index:2;padding-block:130px 90px;max-width:1100px}
 .hero .eye{justify-content:center}.hero .eye::before{display:none}
 .hero h1{font:400 clamp(3.6rem,11vw,10rem)/.86 var(--disp);margin:0 0 26px}.hero h1 em{color:var(--acc)}
 .hero .lede{font-size:1.1rem;max-width:46ch;margin:0 auto 34px;opacity:.9}.hero .acts{justify-content:center}
 .bk{background:transparent;border:0;padding:0}.bk input,.bk select{border:0;border-bottom:1px solid var(--line);background:transparent;padding:0 2px}.bk select{background:var(--bg)}
 .sc{border-radius:4px}.mono{font:400 2rem/1 var(--disp);letter-spacing:.08em}`},
};
THEMES.cerimonia = { theme:'#F7F2E9', fonts:'family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Manrope:wght@400;500;600',
 css: THEMES.nero.css.replace(/:root\{[^}]*\}/, `:root{--bg:#F7F2E9;--bg-2:#EFE7D8;--bg-3:#E5DBC8;--card:#FFFDF8;--fg:#2A2621;--fg-2:#6E665B;--line:rgba(42,38,33,.14);--acc:#8E7448;--on-acc:#fff;
 --body:'Manrope',system-ui,-apple-system,sans-serif;--disp:'Cormorant Garamond',Georgia,serif;--r-btn:999px;--r-card:6px;--r-in:0;
 --brand-font:500 1.6rem/1 var(--disp);--brand-ls:.08em;--h2-font:500 clamp(2.8rem,6.4vw,5.6rem)/.94 var(--disp);--h3-font:500 2.1rem/1.05 var(--disp);--num-font:500 1.2rem/1 var(--disp);
 --bignum-font:500 clamp(4rem,9vw,8rem) var(--disp);--faq-font:500 1.6rem/1.2 var(--disp);--final-font:500 clamp(3.4rem,10.5vw,9.6rem)/.88 var(--disp);
 --mani-font:500 clamp(2.4rem,5.4vw,4.8rem)/1.05 var(--disp);--tick-bg:#F7F2E9;--tick-fg:#8E7448;--tick-font:500 italic clamp(1.7rem,3vw,2.5rem)/1 var(--disp);
 --hd-fg:#fff;--hd-solid:rgba(247,242,233,.9);--route-bg:#2A2621;--route-fg:#F7F2E9;--route-fg-2:#BFB4A3;--route-base:#4a443b;--route-line:#3a352e;--mbar-bg:#2A2621;--star:#8E7448}`).replace('.hero h1 em{color:var(--acc)}','.hero h1 em{color:#F3E3C4}') };

// ---------- percorsi (forma diversa per ogni tipo) ----------
const PATHS = {
 paese:{d:'M40 430 H230 V320 H420 V210 H620 V300 H800 V110 H960',veh:'taxi'},
 executive:{d:'M30 380 C 250 380, 260 140, 470 150 S 700 380, 970 120',veh:'car'},
 transfer:{d:'M40 440 C 260 440, 360 70, 960 60',veh:'plane'},
 alpino:{d:'M90 470 L 860 430 Q 900 420 860 395 L 150 350 Q 110 340 150 315 L 860 265 Q 900 255 860 230 L 150 185 Q 110 175 150 150 L 760 100 Q 800 95 780 70 L 600 30',veh:'car'},
 lago:{d:'M20 330 C 140 200, 260 420, 400 300 S 640 170, 780 290 S 940 380, 985 230',veh:'car'},
 nero:{d:'M30 260 C 300 260, 300 90, 500 90 S 700 420, 970 250',veh:'car'},
};
PATHS.cerimonia = PATHS.nero;
const VEH = {
 car:'<g class="veh" data-rot><rect x="-22" y="-11" width="44" height="22" rx="8" fill="var(--acc)"/><rect x="-6" y="-8" width="14" height="16" rx="4" fill="rgba(0,0,0,.35)"/><circle cx="20" cy="-6" r="2.4" fill="#fff"/><circle cx="20" cy="6" r="2.4" fill="#fff"/></g>',
 taxi:'<g class="veh" data-rot><rect x="-22" y="-12" width="44" height="24" rx="8" fill="var(--acc)"/><rect x="-7" y="-6" width="12" height="12" rx="2" fill="#1B1A17"/><text x="-1" y="3.5" font-size="7" font-weight="800" text-anchor="middle" fill="var(--acc)" font-family="sans-serif">T</text><circle cx="20" cy="-7" r="2.4" fill="#fff"/><circle cx="20" cy="7" r="2.4" fill="#fff"/></g>',
 plane:'<g class="veh" data-rot><path d="M26 0 L-8 -6 L-14 -24 L-22 -24 L-16 -6 L-26 -5 L-30 -12 L-34 -12 L-31 0 L-34 12 L-30 12 L-26 5 L-16 6 L-22 24 L-14 24 L-8 6 Z" fill="var(--acc)"/></g>'
};
function routeSvg(a, f, city){
 const P = PATHS[a]; const stops=[city].concat(f.dests).slice(0,6); const n=stops.length;
 const st = stops.map((s,i)=>`<g class="rstop" data-at="${n>1?(i/(n-1)).toFixed(3):0}"><circle class="rdot" r="9"/><text class="rlab" x="0" y="-22" text-anchor="middle">${esc(s.replace(/^Aeroporto (di )?/,'✈ ').replace(/^Stazione /,'Staz. '))}</text></g>`).join('');
 return `<svg viewBox="0 0 1000 500" role="img" aria-label="Percorso da ${esc(city)}"><path class="rbase" d="${P.d}"/><path class="rpath" d="${P.d}"/>${st}${VEH[P.veh]}</svg>`;
}

// ---------- contenuti per tipo ----------
function copy(a, l, f, city){
 const mini = l.character==='minibus_gruppi' || /minibus|navetta|bus/i.test(f.name+' '+(l.category||''));
 const limo = l.character==='limousine_eventi', self = l.character==='noleggio_prestigio';
 const C = {
 paese:{ eye:'Taxi e NCC · '+city, h1:`Il taxi di <em>${esc(city)}</em>, a una chiamata.`, lede:'Aeroporti, stazioni, visite e serate. Il prezzo ve lo diciamo prima di partire, non alla fine.',
  tick:['Prezzo detto prima','Aeroporti e stazioni','Visite mediche','Serate e cene','Su prenotazione','Bagagli e passeggini'],
  mani:`A ${city} ci conoscono per una cosa semplice: arriviamo quando diciamo, e il prezzo lo sapete prima di salire.`,
  svcT:'Le corse di tutti i giorni.', svc:[['Aeroporti e stazioni','Vi prendiamo sotto casa e vi lasciamo al terminal. Al ritorno vi aspettiamo all’uscita.','aeroporto'],['Visite e ospedali','Andata e ritorno per visite, esami e dimissioni. Aspettiamo noi, voi non pensate al parcheggio.','citta'],['Serate e cene','Andate a cena tranquilli: vi riportiamo a casa noi, anche tardi.','notturno'],['Corse su prenotazione','Fissate giorno e ora anche con settimane di anticipo.','strada']],
  rT:`Da ${city} a dove serve.`, rS:'Scorrete: il percorso si disegna con le corse che ci chiedono più spesso.',
  gT:'Sulla strada, ogni giorno.', gal:[['berlina','In città'],['strada','Fuori porta'],['notturno','Di sera'],['autista','Alla porta'],['aeroporto','Al terminal'],['interni','A bordo']],
  fT:'Le auto.', fleet:[['Berlina','fino a 4 persone','Per le corse di tutti i giorni e gli aeroporti.','berlina'],['Station o SUV','bagagli grandi','Valigie, passeggini, attrezzatura.','berlina'],['Van','fino a 8 persone','Famiglie e piccoli gruppi.','van']],
  stT:'Tre passaggi, niente app.', steps:[['Chiamate o scrivete','Da dove, per dove, giorno e ora.'],['Vi diciamo il prezzo','Prima di partire, così sapete già quanto spendete.'],['Vi veniamo a prendere','All’ora fissata, sotto casa o dove ci dite.']],
  faq:[['Il prezzo è fisso?','Sì. Vi diciamo il prezzo prima della partenza e quello resta, anche con il traffico.'],['Con quanto anticipo prenoto?','Per gli aeroporti meglio il giorno prima. In città spesso basta una chiamata.'],['Posso pagare con carta?','Chiedetelo quando prenotate: vi diciamo subito i metodi di pagamento.'],['Portate bagagli grandi o passeggini?','Sì, diteci cosa portate così scegliamo l’auto giusta.']],
  fin:'Dove vi portiamo oggi?' },
 executive:{ eye:'Noleggio con conducente · '+city, h1:`Autista privato, <em>a ${esc(city)}.</em>`, lede:(f.ownCopy?esc(f.ownCopy)+'. ':'')+'Aeroporti, stazioni, appuntamenti di lavoro. Il prezzo è concordato prima della partenza e non cambia.',
  tick:['Aeroporti','Stazioni AV','Fiere e congressi','Ospiti e delegazioni','Lunghe tratte','Preventivo fisso'],
  mani:'Arrivare prima di voi. Fare la strada giusta. Lasciarvi lavorare, telefonare o riposare. Il resto è silenzio.',
  svcT:'Puntuali, discreti, chiari sul prezzo.', svc:[['Aeroporti','Andata e ritorno da '+city+'. Vi aspettiamo agli arrivi con il vostro nome.','aeroporto'],['Stazioni AV','Coincidenze strette, valigie pesanti: ci pensiamo noi.','citta'],['Appuntamenti di lavoro','Riunioni, fiere, visite in azienda. Autista a disposizione per la giornata.','interni'],['Lunghe tratte','Città, montagna, estero. Preventivo fisso concordato prima.','strada']],
  rT:`Da ${city}, le tratte più richieste.`, rS:'Il percorso si disegna mentre scorrete. Per ogni tratta, un preventivo fisso.',
  gT:'Il viaggio, visto da dentro.', gal:[['interni','A bordo'],['berlina','In arrivo'],['autista','Alla portiera'],['notturno','Di sera'],['strada','In autostrada'],['aeroporto','Al terminal']],
  fT:'L’auto giusta per il viaggio.', fleet:[['Berlina','1–3 passeggeri','Il lavoro e gli aeroporti.','berlina'],['Berlina di fascia alta','1–3 passeggeri','Quando l’auto fa parte dell’accoglienza.','interni'],['Van','fino a 7 passeggeri','Gruppi e bagagli voluminosi.','van']],
  stT:'Come lavoriamo.', steps:[['Scrivete la tratta','Da dove, per dove, giorno, ora, passeggeri.'],['Ricevete il preventivo','Fisso, scritto, prima del servizio.'],['L’auto è lì prima di voi','All’orario concordato, con il nome dell’ospite se serve.']],
  faq:[['Il prezzo può cambiare durante il viaggio?','No. Il preventivo è concordato prima della partenza.'],['Cosa succede se il volo è in ritardo?','Comunicateci il numero del volo: l’orario si regola sull’arrivo reale.'],['Emettete fattura?','Chiedetelo al momento della prenotazione insieme ai dati dell’azienda.'],['Con quanto anticipo prenotare?','Per aeroporti e lunghe tratte meglio il giorno prima.']],
  fin:'Diteci dove. Al resto pensiamo noi.' },
 transfer:{ eye:'Transfer'+(mini?' e gruppi':'')+' · '+city, h1:`Da ${esc(city)} al <em>gate</em>, senza pensieri.`, lede:'Aeroporti, stazioni e porti'+(mini?', anche per gruppi':'')+'. Prezzo fisso a tratta, deciso prima di partire.',
  tick:['Prezzo fisso a tratta','Arrivi e partenze','Porti e crociere','Bagagli inclusi nel preventivo',mini?'Gruppi e squadre':'Andata e ritorno','Su prenotazione'],
  mani:'Il volo lo controllate voi. Al resto pensiamo noi: orario di partenza, strada, bagagli, e qualcuno che vi aspetta all’uscita.',
  svcT:'Ogni tratta, un prezzo.', svc:[['Arrivi','Vi aspettiamo all’uscita con il vostro nome. Dateci il numero del volo o del treno.','aeroporto'],['Partenze','Calcoliamo l’orario in base al volo, così arrivate con il margine giusto.','strada'],['Porti e crociere','Transfer per terminal e imbarchi, con spazio per tutti i bagagli.','van'],[mini?'Gruppi ed eventi':'Lunghe tratte',mini?'Squadre, gite, matrimoni, aziende: un mezzo e un preventivo.':'Città, montagna, estero: preventivo fisso concordato prima.',mini?'van':'strada']],
  rT:`In volo da ${city}.`, rS:'Scorrete: l’aereo segue la rotta verso gli scali che serviamo più spesso.',
  gT:'Dal portone al terminal.', gal:[['van','Bagagli caricati'],['aeroporto','Al terminal'],['strada','In viaggio'],['berlina','In coppia'],['notturno','Partenze all’alba'],['interni','A bordo']],
  fT:'Il mezzo in base a voi e ai bagagli.', fleet:[['Berlina','1–3 persone','Coppie e viaggi di lavoro.','berlina'],['Van','fino a 8 persone','Famiglie, valigie grandi, sci e passeggini.','van'],mini?['Minibus','gruppi','Un solo mezzo, tutti insieme.','van']:['Più mezzi','oltre 8 persone','Più auto in partenza insieme.','berlina']],
  stT:'Tre passaggi.', steps:[['Scrivete la tratta','Da dove, per dove, giorno, ora, volo.'],['Ricevete il prezzo','Fisso, prima di partire.'],['Partite','Il mezzo è sotto casa all’ora concordata.']],
  faq:[['E se il volo arriva in ritardo?','Con il numero del volo seguiamo l’orario reale di arrivo.'],['Quanti bagagli posso portare?','Diteci quante valigie e se avete sci, bici o passeggini.'],['Il prezzo è a persona o a corsa?','A corsa, concordato prima della partenza.'],['Si può prenotare andata e ritorno?','Sì, anche nello stesso messaggio.']],
  fin:'Il prossimo volo, lo prendiamo insieme.' },
 alpino:{ eye:'Taxi e transfer · '+city, h1:'Dall’aeroporto alla porta della baita.', lede:'Transfer da aeroporti e stazioni, corse verso gli impianti e le escursioni. Il prezzo lo sapete prima di partire.',
  tick:['Transfer con sci e bagagli','Impianti di risalita','Partenze per i sentieri','Rientro la sera','Prezzo concordato prima'],
  mani:'Strade che conosciamo a memoria, anche con la neve. Voi pensate alla montagna: alla strada pensiamo noi.',
  svcT:'Inverno ed estate.', svc:[['Transfer con sci','Dall’aeroporto all’hotel con sci, scarponi e valigie.','neve'],['Impianti','Corse verso le piste al mattino e ritorno nel pomeriggio.','neve'],['Sentieri e passi','Vi lasciamo all’attacco del sentiero e vi recuperiamo a fine giro.','montagna'],['La sera','Cena in rifugio o in paese: il ritorno è nostro.','notturno']],
  rT:`Da ${city}, tornante dopo tornante.`, rS:'Scorrete: la strada sale e si accendono le tratte più richieste.',
  gT:'La valle, da vicino.', gal:[['montagna','Sulla strada dei passi'],['neve','D’inverno'],['montagna','In quota'],['van','Con sci e bagagli'],['neve','Nel bosco'],['montagna','Verso valle']],
  fT:'I mezzi.', fleet:[['Berlina o SUV','1–4 persone','Coppie e viaggi brevi.','berlina'],['Van','fino a 8 persone','Famiglie con sci e bagagli.','van'],['Su richiesta','gruppi','Più mezzi coordinati.','montagna']],
  stT:'Come si prenota.', steps:[['Scrivete','Arrivo, alloggio, persone, sci o bici.'],['Prezzo fisso','Concordato prima di partire.'],['Vi aspettiamo','All’arrivo o davanti all’hotel.']],
  faq:[['Portate sci e snowboard?','Sì, diteci quante attrezzature avete.'],['Andate anche d’inverno sui passi?','Diteci la meta: vi diciamo se e come si arriva.'],['Il prezzo è fisso?','Sì, concordato prima della partenza.'],['Si può prenotare l’andata e il ritorno?','Sì, nello stesso messaggio.']],
  fin:'Ci vediamo in valle.' },
 lago:{ eye:city+' · Transfer privati', h1:'Arrivate, <em>vi portiamo noi.</em>', lede:'Dall’aeroporto all’hotel, dall’hotel ai paesi intorno. Prezzo concordato prima di partire.',
  tick:['Transfer aeroporto','Hotel e ville','Paesi e cantine','Ristoranti la sera','Famiglie e gruppi'],
  mani:'La vacanza comincia quando smettete di guidare. Dal gate alla terrazza dell’hotel, il viaggio è nostro.',
  svcT:'Tre modi per non guidare in vacanza.', svc:[['Aeroporti','Vi aspettiamo agli arrivi con il vostro nome e vi portiamo in hotel.','aeroporto'],['Giri su richiesta','Paesi, cantine e ristoranti. Decidete voi le tappe.','lago'],['La sera','Cena fuori e ritorno in hotel, senza pensare a chi guida.','notturno'],['Famiglie e gruppi','Van con spazio per valigie, passeggini e attrezzatura.','van']],
  rT:`Da ${city}, lungo la riva.`, rS:'Scorrete: la strada segue la costa e accende le tratte più richieste.',
  gT:'Cartoline dalla strada.', gal:[['lago','Sulla riva'],['lago','Il paese'],['berlina','In arrivo'],['lago','Al tramonto'],['interni','A bordo'],['lago','Vista dall’alto']],
  fT:'Le auto.', fleet:[['Berlina','1–3 persone','Coppie e viaggi brevi.','berlina'],['Van','fino a 8 persone','Famiglie e gruppi.','van'],['Su richiesta','eventi','Matrimoni e ospiti in villa.','matrimonio']],
  stT:'Prenotate da casa.', steps:[['Scriveteci','Volo, hotel, persone e bagagli.'],['Prezzo fisso','Vi rispondiamo con il prezzo. Non cambia.'],['Vi aspettiamo','All’arrivo o davanti all’hotel.']],
  faq:[['Fate anche giri turistici?','Sì, su richiesta: diteci le tappe e la durata.'],['Il prezzo è fisso?','Sì, concordato prima della partenza.'],['Avete seggiolini per bambini?','Chiedetelo nel messaggio con l’età dei bambini.'],['Portate anche ospiti di un matrimonio?','Sì, anche più corse coordinate.']],
  fin:'Vi aspettiamo agli arrivi.' },
 nero: limo ? { eye:'Limousine e auto con autista · '+city, h1:'L’arrivo <em>che si ricorda.</em>', lede:'Limousine e auto di rappresentanza con autista per serate, compleanni, eventi e matrimoni.',
  tick:['Serate','Compleanni','Addii al celibato','Matrimoni','Eventi aziendali'],
  mani:'Una serata importante merita un arrivo all’altezza. Diteci l’occasione: orari e percorso li studiamo noi.',
  svcT:'Per le serate che contano.', svc:[['Serate ed eventi','Compleanni, addii al celibato e al nubilato, feste aziendali.','notturno'],['Matrimoni','L’auto degli sposi e le corse per gli ospiti.','matrimonio'],['A disposizione','Andata, attesa, ritorno: decidete voi le tappe.','interni'],['Su misura','Diteci l’occasione e il numero di persone.','autista']],
  rT:'La serata, tappa per tappa.', rS:'Scorrete: il percorso si disegna con le mete più richieste.',
  gT:'Dentro e fuori.', gal:[['notturno','La sera'],['interni','A bordo'],['autista','All’arrivo'],['berlina','In attesa'],['matrimonio','Il giorno del sì'],['notturno','In città']],
  fT:'Le auto.', fleet:[['Limousine','serate ed eventi','Per gruppi e grandi occasioni.','notturno'],['Berlina di rappresentanza','1–3 passeggeri','Per ospiti e cerimonie.','interni'],['Van','gruppi','Per gli invitati.','van']],
  stT:'Come si prenota.', steps:[['Raccontateci l’occasione','Data, persone, tappe.'],['Preventivo prima','Concordato prima del servizio.'],['Godetevi la serata','Al ritorno pensiamo noi.']],
  faq:[['Il prezzo è concordato prima?','Sì, sempre prima del servizio.'],['L’autista attende durante l’evento?','Sì, se lo prevedete nella prenotazione.'],['Fate servizi fuori città?','Sì, chiedete il preventivo.']], fin:'Diteci l’occasione.' }
  : self ? { eye:'Noleggio auto di prestigio · '+city, h1:'Guidatela <em>voi.</em>', lede:'Auto di prestigio a noleggio, a giornata o nel weekend. Condizioni chiare prima di firmare.',
  tick:['A giornata','Weekend','Eventi e shooting','Condizioni chiare','Consegna su richiesta'],
  mani:'Una giornata, un weekend, un evento. Vi diciamo subito disponibilità, cauzione e chilometri inclusi.',
  svcT:'Come si noleggia.', svc:[['A giornata','Ritiro al mattino, riconsegna la sera.','supercar'],['Weekend','Dal venerdì al lunedì, per un viaggio vero.','strada'],['Eventi e shooting','Per foto, video e presentazioni.','supercar'],['Consegna','Chiedetela con indirizzo e orario.','supercar']],
  rT:'Le strade da fare.', rS:'Scorrete: la strada si disegna verso le mete più belle intorno a '+city+'.',
  gT:'Dettagli.', gal:[['supercar','Profilo'],['supercar','Frontale'],['strada','Sulla strada'],['supercar','Dettagli'],['interni','Abitacolo'],['supercar','Di sera']],
  fT:'Le auto.', fleet:[['Sportive','disponibilità su richiesta','Chiedeteci il modello.','supercar'],['Gran turismo','per i viaggi','Comode anche per i weekend lunghi.','supercar'],['Cabrio','in stagione','Lago, costa e collina.','supercar']],
  stT:'Come si prenota.', steps:[['Scegliete auto e data','Diteci modello e giorni.'],['Condizioni chiare','Cauzione, chilometri e requisiti prima di firmare.'],['Ritiro','In sede o con consegna.']],
  faq:[['Che requisiti servono?','Età minima, anni di patente e cauzione ve li comunichiamo prima.'],['I chilometri sono illimitati?','Dipende dalla formula: ve lo diciamo nel preventivo.'],['Consegnate l’auto?','Chiedetelo con indirizzo e orario.']], fin:'Scegliete l’auto.' }
  : { eye:'Chauffeur privato · '+city, h1:'Il viaggio, <em>senza pensieri.</em>', lede:'Auto di rappresentanza con autista per aeroporti, eventi e ospiti importanti. Riservatezza e puntualità.',
  tick:['Aeroporti','Ospiti e delegazioni','Eventi','Riservatezza','Preventivo concordato'],
  mani:'Ospiti da accogliere, una serata importante, un volo all’alba. Vi lasciamo solo la parte del viaggio che conta.',
  svcT:'Per chi non può aspettare.', svc:[['Aeroporti','Accoglienza agli arrivi, bagagli, auto pronta.','aeroporto'],['Ospiti e delegazioni','Più auto coordinate, un solo referente.','interni'],['Serate ed eventi','Andata, attesa, ritorno.','notturno'],['Lunghe tratte','Preventivo fisso concordato prima.','strada']],
  rT:'Le tratte più richieste.', rS:'Il percorso si disegna mentre scorrete.',
  gT:'Dettagli.', gal:[['interni','A bordo'],['autista','Alla portiera'],['berlina','In arrivo'],['notturno','Di sera'],['strada','In viaggio'],['interni','Pelle e silenzio']],
  fT:'Le auto.', fleet:[['Berlina di rappresentanza','1–3 passeggeri','Per ospiti e aeroporti.','interni'],['Ammiraglia','1–3 passeggeri','Quando l’auto fa parte dell’accoglienza.','berlina'],['Van','fino a 7 passeggeri','Gruppi e bagagli.','van']],
  stT:'Come lavoriamo.', steps:[['Diteci il servizio','Data, orari, ospiti.'],['Preventivo prima','Concordato e scritto.'],['Al resto pensiamo noi','Puntuali, discreti.']],
  faq:[['Il prezzo è concordato prima?','Sì, sempre prima del servizio.'],['L’autista attende?','Sì, se lo prevedete nella prenotazione.'],['Fate servizi fuori città?','Sì, anche lunghe tratte.']], fin:'Diteci dove.' },
 cerimonia:{ eye:'Auto per cerimonie · '+city, h1:'Il giorno <em>del sì.</em>', lede:'L’auto per gli sposi, con autista. Tempi e percorso studiati insieme a voi, perché quel giorno non si fanno prove.',
  tick:['La sposa','Gli sposi','Gli ospiti','Foto lungo il percorso','Sopralluogo su richiesta'],
  mani:'Ogni matrimonio ha un orario preciso. Il nostro lavoro è rispettarlo, e farvi arrivare come avete immaginato.',
  svcT:'Il giorno, in tre momenti.', svc:[['La sposa','Dalla casa alla chiesa o al comune, con i tempi concordati con fotografo e cerimonia.','matrimonio'],['Gli sposi','Dalla cerimonia alla location, con le soste per le foto.','matrimonio'],['Gli ospiti','Corse per famiglie e invitati tra cerimonia, location e hotel.','van'],['Il sopralluogo','Percorso e tempi provati prima del giorno, su richiesta.','strada']],
  rT:'Dalla casa al ricevimento.', rS:'Scorrete: il percorso del giorno si disegna tappa per tappa.',
  gT:'Il giorno del sì.', gal:[['matrimonio','Davanti alla chiesa'],['matrimonio','I dettagli'],['matrimonio','In attesa'],['interni','A bordo'],['matrimonio','Gli sposi'],['strada','Verso la villa']],
  fT:'Le auto.', fleet:[['Berlina per la sposa','con autista','Elegante e discreta.','matrimonio'],['Auto d’epoca','su richiesta','Chiedeteci disponibilità.','matrimonio'],['Van per gli ospiti','gruppi','Corse coordinate.','van']],
  stT:'Come si prenota.', steps:[['Scriveteci la data','Data, luogo della cerimonia, location.'],['Disponibilità e preventivo','Vi rispondiamo con le auto libere quel giorno.'],['Sopralluogo','Se volete, proviamo insieme percorso e tempi.']],
  faq:[['Possiamo vedere l’auto prima?','Sì, chiedetelo quando prenotate.'],['L’auto viene addobbata?','Chiedetelo nel messaggio: vi diciamo cosa è incluso.'],['Con quanto anticipo prenotare?','Il prima possibile: le date di maggio–settembre si riempiono con mesi di anticipo.']], fin:'Chiedete la vostra data.' }
 }[a];
 // dati veri trovati online: flotta e servizi
 if (f.vehicles.length) { const real=f.vehicles.slice(0,3).map(v=>[v.charAt(0).toUpperCase()+v.slice(1),'nella flotta','Indicata da '+f.name+'.',C.fleet[0][3]]); C.fleet = real.concat(C.fleet).slice(0,3); }
 return C;
}
const DE = { eye:'Taxi & Transfer', h1:'Vom Flughafen bis vor die Hütte.', lede:'Transfer zu Flughäfen und Bahnhöfen, Fahrten ins Skigebiet und zu Ausflügen. Den Preis erfahrt ihr vor der Abfahrt.',
 mani:'Straßen, die wir auswendig kennen, auch bei Schnee. Ihr denkt an die Berge, wir an die Straße.', svcT:'Winter und Sommer.', rT:'Kurve um Kurve.', gT:'Das Tal aus der Nähe.', fT:'Fahrzeuge.', stT:'So bucht ihr.', fin:'Wir sehen uns im Tal.' };

// ---------- pagina ----------
module.exports = function v3(l, f, a){
 const city = f.city || 'Nord Italia';
 const TH = THEMES[a]; const C = copy(a,l,f,city);
 const de = a==='alpino' && SOUTH_TYROL.includes(city);
 const L = (it, key) => de && DE[key] ? T(it, DE[key], 'de') : it;
 const heroCat = {paese:'berlina',executive:'notturno',transfer:'aeroporto',alpino:'montagna',lago:'lago',nero:l.character==='noleggio_prestigio'?'supercar':l.character==='limousine_eventi'?'notturno':'interni',cerimonia:'matrimonio'}[a];
 const [hero] = pick(heroCat, l.slug, 1);
 const used = {}; const P = cat => { used[cat]=(used[cat]||0)+1; const arr = pick(cat, l.slug, Math.min(8, require('./lib').P[cat].length)); return arr[(used[cat]-1)%arr.length]; };
 const ph = (cat, alt, o) => img(P(cat), alt, Object.assign({w:1100,sizes:'(max-width:760px) 100vw, 50vw'}, o||{}));
 const ini = f.name.split(/\s+/).filter(w=>w.length>2&&!/^(ncc|taxi|di|del|con)$/i.test(w)).map(w=>w[0]).join('').slice(0,2).toUpperCase() || 'NC';
 const dests = f.dests.length ? f.dests : ['Aeroporto','Stazione','Centro'];
 const tk = C.tick.concat(C.tick).map(t=>`<span>${esc(t)}</span>`).join('');
 const callBtn = `<a class="btn a" href="tel:${f.tel}">${ICON.phone}Chiama</a>`;
 const waBtn = (cls) => `<a class="btn ${cls}" href="${waText(f,'Buongiorno, vorrei un preventivo.')}">${ICON.wa}WhatsApp</a>`;

 // HERO per tipo
 let heroHTML;
 if (a==='paese') heroHTML = `<section class="hero"><div class="w hw">
   <div><p class="eye" data-in>${esc(C.eye)}</p><h1>${split(C.h1)}</h1><p class="lede" data-in>${C.lede}</p>
   <div class="acts" data-in style="display:flex;gap:12px;flex-wrap:wrap">${callBtn}${waBtn('d')}</div>
   <a class="hnum" data-in href="tel:${f.tel}"><small>Il numero da salvare</small>${esc(f.phoneDisplay)}</a></div>
   <div class="hcard" data-in><div class="hmedia">${img(hero,'Auto pronta per una corsa',{eager:true,w:1200})}</div><span class="roof">TAXI</span>
   ${f.reviews?`<div class="hrate"><b>${esc(f.rating)}</b><div>${stars(f.ratingNum)}<br><span>${f.reviews} recensioni su Google</span></div></div>`:''}</div>
 </div></section>`;
 else if (a==='executive') heroHTML = `<section class="hero"><div class="hmedia">${img(hero,'Auto con autista in città di sera',{eager:true,w:2000,sizes:'100vw'})}</div><div class="w hw">
   <div><p class="eye" data-in>${esc(C.eye)}</p><h1>${split(C.h1)}</h1><p class="lede" data-in>${C.lede}</p>
   ${f.reviews?`<p data-in style="display:flex;gap:12px;align-items:center;color:#CFCBC2;margin:0">${stars(f.ratingNum)} <span>${esc(f.rating)} · ${f.reviews} recensioni Google</span></p>`:''}</div>
   <div data-in><div class="bk" style="padding:28px"><p class="bkh">Preventivo in un messaggio</p>${bookingForm(f,{id:'h',labels:{from:'Da',to:'A',date:'Quando',pax:'Passeggeri',send:'Invia su WhatsApp',note:'Vi risponde direttamente '+esc(f.name)+'.'}}).replace('<form class="bk"','<form class="bkin" style="display:grid;gap:12px"')}</div></div>
 </div></section>`;
 else if (a==='transfer') { const hours=['05:30','06:45','08:10','10:20','13:05','16:40'];
  heroHTML = `<section class="hero"><div class="hmedia">${img(hero,'Terminal aeroportuale',{eager:true,w:1800,sizes:'100vw'})}</div><div class="w hw">
   <div><p class="eye" data-in>${esc(C.eye)}</p><h1>${split(C.h1)}</h1><p class="lede" data-in>${C.lede}</p><div data-in style="display:flex;gap:12px;flex-wrap:wrap">${waBtn('a')}<a class="btn" style="border:1px solid var(--line)" href="tel:${f.tel}">${ICON.phone}${esc(f.phoneDisplay)}</a></div></div>
   <div class="board" data-in><div class="bh"><span><b>Partenze</b> da ${esc(city)}</span><span id="clk">--:--</span></div>
   ${dests.slice(0,6).map((d,i)=>`<div class="brow"><span class="h">${hours[i]}</span><span class="d" data-flap>${esc(d.toUpperCase())}</span><span class="s">● SU PRENOTAZIONE</span></div>`).join('')}
   <div class="bf">Orari di esempio · partite all’ora che scegliete voi</div></div>
 </div></section>`; }
 else if (a==='alpino') heroHTML = `<section class="hero"><div class="hmedia">${img(hero,'Strada di montagna',{eager:true,w:2000,sizes:'100vw'})}</div><canvas class="snow" aria-hidden="true"></canvas><div class="w hw">
   <div><p class="eye" data-in style="color:#fff">${L(esc(C.eye),'eye')}</p><h1>${de?T(split(C.h1),split(DE.h1),'de'):split(C.h1)}</h1><p class="lede" data-in>${L(C.lede,'lede')}</p><div data-in style="display:flex;gap:12px;flex-wrap:wrap">${callBtn}${waBtn('g')}</div></div>
   ${f.reviews?`<div class="hrate" data-in><b>${esc(f.rating)}</b><div>${stars(f.ratingNum)}<br><span>${f.reviews} recensioni Google</span></div></div>`:''}
 </div></section>`;
 else if (a==='lago') heroHTML = `<section class="hero"><div class="frame"><div class="hmedia">${img(hero,'Paese sul lago',{eager:true,w:2000,sizes:'100vw'})}</div><div class="w hw">
   <p class="eye" data-in style="color:#E9D3A8">${esc(C.eye)}</p><h1>${split(C.h1)}</h1><p class="lede" data-in>${C.lede}</p><div data-in style="display:flex;gap:12px;flex-wrap:wrap">${waBtn('a')}<a class="btn g" href="tel:${f.tel}">${ICON.phone}Chiama</a></div></div></div>
   <div class="w strip">${f.reviews?`<span><b>${esc(f.rating)}</b>${stars(f.ratingNum)} · ${f.reviews} recensioni Google</span>`:''}<span>Su prenotazione</span><span>Prezzo fisso a tratta</span></div></section>`;
 else heroHTML = `<section class="hero"><div class="hmedia">${img(hero,'Foto di repertorio',{eager:true,w:2000,sizes:'100vw'})}</div><div class="w hw">
   <p class="eye" data-in>${esc(C.eye)}</p><h1>${split(C.h1)}</h1><p class="lede" data-in>${C.lede}</p><div class="acts" data-in style="display:flex;gap:12px;flex-wrap:wrap">${waBtn('a')}<a class="btn g" href="tel:${f.tel}">${ICON.phone}Chiama</a></div></div></section>`;

 const nums = [
  f.reviews ? [`<b data-count="${String(f.rating).replace(',','.')}">${esc(f.rating)}</b>`,'valutazione media su Google'] : null,
  f.reviews ? [`<b data-count="${f.reviews}">${f.reviews}</b>`,'recensioni lasciate dai clienti'] : null,
  [`<b data-count="${dests.length}">${dests.length}</b>`,'tratte frequenti da '+esc(city)],
 ].filter(Boolean);
 if (nums.length<3) nums.push(['<b>€</b>','preventivo fisso prima di partire']);

 const navTel = `<a class="pill a" href="tel:${f.tel}">${ICON.phone}<span class="pt">${esc(f.phoneDisplay)}</span></a>`;
 const brand = a==='nero'||a==='cerimonia' ? `<a class="brand" href="#"><span class="mono">${esc(ini)}</span><span class="bn" style="font:500 10px/1.2 var(--body);letter-spacing:.3em;text-transform:uppercase">${esc(f.name)}</span></a>`
   : `<a class="brand" href="#">${a==='paese'?`<b style="display:grid;place-items:center;width:34px;height:34px;border-radius:9px;background:var(--acc);color:#1B1A17;font-size:13px">${esc(ini)}</b>`:''}<span class="bn">${esc(f.name)}</span></a>`;

 const html = head({ title: f.name+' — '+C.eye.replace(' · ',' a '), desc: C.lede.replace(/<[^>]+>/g,''), theme: TH.theme, ogImg: hero, fonts: TH.fonts,
   css: BASE_CSS + TH.css + (de?LANG_CSS:'') }).replace('<html lang="it"', '<html lang="it" class="'+a+'"') + `
<body>
<div class="prog" aria-hidden="true"><i></i></div>
<header class="hd"><div class="w">${brand}
 <nav class="nav"><a href="#servizi">Servizi</a><a href="#tratte">Tratte</a><a href="#auto">Auto</a><a href="#prenota">Prenota</a></nav>
 <div class="r">${de?langToggle('de'):''}${navTel}</div></div></header>
<main>
${heroHTML}

<div class="tick" aria-hidden="true"><div class="tk">${tk}</div></div>

<section class="sec"><div class="w two">
 <div><p class="eye">${esc(f.name)}</p></div>
 <p class="mani">${de?T(mani(C.mani),mani(DE.mani),'de'):mani(C.mani)}</p>
</div></section>

<section class="sec" id="servizi" style="padding-top:0"><div class="w">
 <p class="eye">Servizi</p><h2 class="h2" data-split>${split(L(C.svcT,'svcT'))}</h2>
 <div class="stack">${C.svc.map((s,i)=>`<article class="sc"><div class="tx"><span class="n">${String(i+1).padStart(2,'0')} / ${String(C.svc.length).padStart(2,'0')}</span><div><h3>${esc(s[0])}</h3><p>${s[1]}</p></div><a class="more" href="${waText(f,'Buongiorno, vorrei informazioni per: '+s[0])}">Chiedi il prezzo ${ICON.arrow}</a></div><div class="ph">${ph(s[2],s[0])}</div></article>`).join('')}</div>
</div></section>

<section class="route" id="tratte"><div class="w">
 <div><p class="eye" style="color:var(--acc)">Tratte</p><h2 class="h2">${L(esc(C.rT),'rT')}</h2><p class="lead">${esc(C.rS)}</p>
 <ul class="rlist">${dests.map(d=>`<li><span>${esc(d)}</span><a href="${waText(f,'Buongiorno, quanto costa da '+city+' a '+d+'?')}">Prezzo →</a></li>`).join('')}</ul></div>
 ${routeSvg(a,f,city)}
</div></section>

<section class="hgal" aria-label="Galleria"><div class="w head"><p class="eye">Galleria</p><h2 class="h2" data-split>${split(L(esc(C.gT),'gT'))}</h2></div>
 <div class="htrack">${C.gal.map((g,i)=>`<figure class="hit"><div class="im">${ph(g[0],g[1],{w:900})}</div><figcaption><b>${esc(g[1])}</b><span>${String(i+1).padStart(2,'0')}</span></figcaption></figure>`).join('')}</div>
</section>

<section class="sec" id="auto"><div class="w">
 <p class="eye">${a==='nero'&&l.character==='noleggio_prestigio'?'Il parco auto':'La flotta'}</p><h2 class="h2" data-split>${split(L(esc(C.fT),'fT'))}</h2>
 <div class="fleet">${C.fleet.map(v=>`<article class="fc"><div class="im" data-clip>${ph(v[3],v[0],{w:900})}</div><div class="tx"><small>${esc(v[1])}</small><h3>${esc(v[0])}</h3><p>${esc(v[2])}</p></div></article>`).join('')}</div>
</div></section>

<section class="sec" style="padding-top:0"><div class="w"><div class="nums" data-up>${nums.map(n=>`<div>${n[0]}<span>${n[1]}</span></div>`).join('')}</div></div></section>

<section class="sec" style="padding-top:0"><div class="w two">
 <div><p class="eye">Come funziona</p><h2 class="h2" data-split>${split(L(esc(C.stT),'stT'))}</h2><div class="ph" data-clip style="position:relative;aspect-ratio:4/3;border-radius:var(--r-card);overflow:hidden;margin-top:30px">${ph(a==='alpino'?'neve':a==='lago'?'lago':'autista','Foto di repertorio',{w:1000})}</div></div>
 <div class="steps"><i class="sfill" aria-hidden="true"></i>${C.steps.map(s=>`<div class="st"><h3>${esc(s[0])}</h3><p>${esc(s[1])}</p></div>`).join('')}</div>
</div></section>

${f.reviews?`<section class="sec" style="padding-top:0;background:var(--bg-2)"><div class="w" style="padding-top:clamp(70px,9vw,120px)"><div class="proof" data-up>
 <div class="big" data-count="${String(f.rating).replace(',','.')}">${esc(f.rating)}</div>
 <div>${stars(f.ratingNum)}<p class="lead" style="margin:14px 0 18px">Media di <b>${f.reviews} recensioni</b> lasciate su Google da chi ha viaggiato con ${esc(f.name)}.</p><a href="${f.maps}" target="_blank" rel="noopener" style="font-weight:600;color:var(--acc-2,var(--acc))">Leggete le recensioni su Google ↗</a></div>
</div></div></section>`:''}

<section class="sec"><div class="w two">
 <div><p class="eye">Domande</p><h2 class="h2" data-split>${split('Quello che ci chiedono.')}</h2></div>
 ${faq(C.faq)}
</div></section>

<section class="sec" id="prenota" style="padding-top:0"><div class="w two">
 <div><p class="eye">Prenota</p><h2 class="h2" data-split>${split('Il preventivo in un messaggio.')}</h2><p class="lead">Compilate i campi: si apre WhatsApp con il testo già scritto. Vi risponde direttamente ${esc(f.name)}.</p></div>
 <div data-up>${bookingForm(f,{id:'b',bigGroups:a==='transfer',fromPh:'Es. '+(a==='alpino'||a==='lago'?'hotel, ':'')+city})}</div>
</div></section>

<section class="final"><div class="w"><p class="big">${L(esc(C.fin),'fin')}</p><div class="acts">${waBtn('a')}<a class="btn" style="border:1px solid var(--line)" href="tel:${f.tel}">${ICON.phone}${esc(f.phoneDisplay)}</a></div></div></section>
</main>
<footer class="foot"><div class="w">
 <div>${brand}<p style="margin-top:14px">${esc(C.eye)}</p></div>
 <div><h4>Contatti</h4><p><a href="tel:${f.tel}">${esc(f.phoneDisplay)}</a></p><p><a href="${waText(f,'Buongiorno')}">WhatsApp</a></p></div>
 <div><h4>Dove siamo</h4><p>${esc(f.address)}${f.address?'<br>':''}${esc(city)}</p><p><a href="${f.maps}" target="_blank" rel="noopener">Google Maps ↗</a></p></div>
</div><div class="w legal">${esc(f.name)} · Foto di repertorio · Anteprima realizzata da Umbra</div></footer>
${mobileBar(f)}
${badge(f.name)}
${BOOK_JS}
${de?LANG_JS:''}
${a==='transfer'?`<script>(function(){var c=document.getElementById('clk');if(!c)return;function t(){var d=new Date();c.textContent=('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2)}t();setInterval(t,20000)})()</script>`:''}
${a==='alpino'?`<script>(function(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;var c=document.querySelector('.snow'),x=c.getContext('2d'),F=[],w,h;function rs(){w=c.width=c.offsetWidth;h=c.height=c.offsetHeight}rs();addEventListener('resize',rs);for(var i=0;i<90;i++)F.push({x:Math.random(),y:Math.random(),r:Math.random()*2.2+.6,s:Math.random()*.6+.25,d:Math.random()*6});(function f(t){x.clearRect(0,0,w,h);x.fillStyle='rgba(255,255,255,.85)';F.forEach(function(p){p.y+=p.s/h*1.4;if(p.y>1)p.y=0;var px=(p.x*w+Math.sin(t/1600+p.d)*14);x.beginPath();x.arc(px,p.y*h,p.r,0,6.3);x.fill()});requestAnimationFrame(f)})(0)})()</script>`:''}
${GSAP}
${ENGINE}
</body></html>`;
 return html;
};
