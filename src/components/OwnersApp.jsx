import React from 'react';
import { Icon } from './Icon.jsx';

const B = import.meta.env.BASE_URL.replace(/\/$/, '');

/* Lagoon Owners Page - standalone. Mino Design and Digital. */
const { useState, useEffect, useRef } = React;

/* ─── Image constants ──────────────────────────────────────────────────────── */
const HERO_BG       = `${B}/img/owners-embedded-2.jpg`;
const ARCH_IMG      = `${B}/img/owners-embedded-3.jpg`;
const CABANA_POOL   = `${B}/img/owners-embedded-4.jpg`;
const GALLERY_LEFT  = `${B}/img/owners-embedded-5.jpg`;
const GALLERY_CTR   = `${B}/img/owners-embedded-6.jpg`;
const GALLERY_RIGHT = `${B}/img/owners-embedded-7.jpg`;
const FOOTER_CTA    = `${B}/img/owners-embedded-8.jpg`;
const FOOTER_LOGO   = `${B}/img/owners-embedded-9.svg`;
const NAV_LOGO_W    = `${B}/img/owners-embedded-10.svg`;
const NAV_LOGO_D    = `${B}/img/owners-embedded-11.svg`;
const FAVICON_LOGO  = `${B}/img/owners-embedded-12.png`;

/* ─── Shared components ────────────────────────────────────────────────────── */

function Tag({ children, tone = 'tide', variant = 'soft', ...rest }) {
  const tones = {
    tide:  { soft: ['rgba(66,115,128,0.12)', 'var(--lagoon-tide)'], solid: ['var(--lagoon-tide)', 'var(--lagoon-ocean-mist)'] },
    swell: { soft: ['rgba(139,160,160,0.20)', '#52666a'], solid: ['var(--lagoon-swell)', 'var(--lagoon-ink)'] },
    coral: { soft: ['rgba(213,191,170,0.28)', '#8a7256'], solid: ['var(--lagoon-dusty-coral)', 'var(--lagoon-ink)'] },
    ink:   { soft: ['rgba(52,61,67,0.08)', 'var(--lagoon-ink)'], solid: ['var(--lagoon-ink)', 'var(--lagoon-ocean-mist)'] },
  };
  const [bg, fg] = (tones[tone] || tones.tide)[variant] || tones.tide.soft;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      background: bg, color: fg,
      fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '11px',
      letterSpacing: '0.12em', textTransform: 'uppercase',
      padding: '6px 13px', borderRadius: 'var(--radius-pill)', lineHeight: 1, whiteSpace: 'nowrap',
    }} {...rest}>{children}</span>
  );
}

function Button({
  children, variant = 'primary', size = 'md', fullWidth = false, disabled = false,
  iconRight = null, iconLeft = null, as = 'button', style: styleOverride, ...rest
}) {
  const sizes = {
    sm: { padding: '8px 18px', fontSize: '11px', tracking: '0.16em' },
    md: { padding: '13px 28px', fontSize: '12px', tracking: '0.18em' },
    lg: { padding: '17px 38px', fontSize: '13px', tracking: '0.2em' },
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary:   { background: 'var(--lagoon-tide)',        color: 'var(--lagoon-ocean-mist)', border: '1px solid var(--lagoon-tide)' },
    secondary: { background: 'transparent',               color: 'var(--lagoon-tide)',        border: '1px solid var(--lagoon-tide)' },
    ghost:     { background: 'transparent',               color: 'var(--lagoon-tide)',        border: '1px solid transparent' },
    inverse:   { background: 'var(--lagoon-ocean-mist)',  color: 'var(--lagoon-tide)',        border: '1px solid var(--lagoon-ocean-mist)' },
  };
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
    width: fullWidth ? '100%' : 'auto',
    fontFamily: 'var(--font-body)', fontWeight: 500, textTransform: 'uppercase',
    letterSpacing: s.tracking, fontSize: s.fontSize, lineHeight: 1, padding: s.padding,
    borderRadius: 'var(--radius-pill)',
    cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1,
    transition: 'background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
    ...variants[variant],
  };
  const mergedStyle = { ...base, ...styleOverride };
  const Comp = as;
  const onEnter = (e) => {
    if (disabled) return;
    if (variant === 'primary') { e.currentTarget.style.background = 'var(--lagoon-tide-700)'; e.currentTarget.style.borderColor = 'var(--lagoon-tide-700)'; e.currentTarget.style.boxShadow = 'var(--shadow-brand)'; }
    else if (variant === 'secondary') { e.currentTarget.style.background = 'var(--lagoon-tide)'; e.currentTarget.style.color = 'var(--lagoon-ocean-mist)'; }
    else if (variant === 'ghost') { e.currentTarget.style.background = 'rgba(66,115,128,0.08)'; }
    else if (variant === 'inverse') { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--lagoon-ocean-mist)'; e.currentTarget.style.borderColor = 'var(--lagoon-ocean-mist)'; }
  };
  const onLeave = (e) => {
    const v = variants[variant];
    e.currentTarget.style.background = (styleOverride && styleOverride.background) || v.background;
    e.currentTarget.style.color = (styleOverride && styleOverride.color) || v.color;
    e.currentTarget.style.borderColor = (styleOverride && styleOverride.borderColor) || v.border.split(' ').pop();
    e.currentTarget.style.boxShadow = 'none';
  };
  return (
    <Comp style={mergedStyle} disabled={as === 'button' ? disabled : undefined}
      onMouseEnter={onEnter} onMouseLeave={onLeave}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = 'translateY(1px)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'none'; }}
      {...rest}>
      {iconLeft}{children}{iconRight}
    </Comp>
  );
}

function Eyebrow({ children, color = 'tide', rule = false, align = 'left', ...rest }) {
  const colors = { tide: 'var(--lagoon-tide)', coral: 'var(--lagoon-coral-600)', ink: 'var(--lagoon-ink)', mist: 'var(--lagoon-ocean-mist)', muted: 'var(--text-muted)' };
  const label = (
    <span style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 'var(--text-xs)', letterSpacing: '0.32em', textTransform: 'uppercase', color: colors[color] || colors.tide, whiteSpace: 'nowrap' }}>{children}</span>
  );
  if (!rule) return <div style={{ textAlign: align }} {...rest}>{label}</div>;
  const line = <span style={{ flex: 1, height: 1, background: 'currentColor', opacity: 0.35, color: colors[color] || colors.tide }} />;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} {...rest}>
      {(align === 'center' || align === 'right') && line}
      {label}
      {(align === 'center' || align === 'left') && line}
    </div>
  );
}

const MAXW = 1320;
function Wrap({ children, style, ...rest }) {
  return <div style={{ maxWidth: MAXW, margin: '0 auto', paddingInline: 'clamp(1.25rem, 4vw, 2.75rem)', ...style }} {...rest}>{children}</div>;
}

function Wave({ fill = 'var(--lagoon-ocean-mist)', flip = false, height, style }) {
  return (
    <div className="wave" style={{ color: fill, height, transform: flip ? 'scaleX(-1)' : undefined, ...style }} aria-hidden="true">
      <svg viewBox="0 0 1200 180" preserveAspectRatio="none">
        <path fill="currentColor" d="M0,70 C170,176 330,176 500,96 C660,20 760,8 900,52 C1010,86 1110,108 1200,84 L1200,180 L0,180 Z"></path>
      </svg>
    </div>
  );
}


/* ─── Nav ──────────────────────────────────────────────────────────────────── */
const { useState: useStateNav, useEffect: useEffectNav } = React;

function Nav() {
  const [scrolled, setScrolled] = useStateNav(false);
  const [menuOpen, setMenuOpen] = useStateNav(false);

  useEffectNav(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onHero = false;

  const navLinks = [
    { label: 'Rentals', href: '#' },
    { label: 'Owners', href: '#top' },
    { label: 'How we work', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: 'rgba(244,243,239,0.92)',
      backdropFilter: 'saturate(1.4) blur(14px)',
      WebkitBackdropFilter: 'saturate(1.4) blur(14px)',
      borderBottom: '1px solid var(--border-hairline)',
      boxShadow: 'var(--shadow-sm)',
      transition: 'background var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)',
    }}>
      <div style={{
        maxWidth: 1320, margin: '0 auto', paddingInline: 'clamp(1.25rem, 4vw, 2.75rem)',
        height: scrolled ? 80 : 98, display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 24,
        transition: 'height var(--dur-base) var(--ease-out)',
      }}>
        <a href="Lagoon-Homepage-Standalone.html" aria-label="Lagoon Main Beach - home" style={{ display: 'flex', alignItems: 'center', justifySelf: 'start' }}>
          <img src={onHero ? NAV_LOGO_W : NAV_LOGO_D} alt="Lagoon Main Beach" style={{ height: scrolled ? 48 : 60, transition: 'height var(--dur-base) var(--ease-out)', filter: onHero ? 'drop-shadow(0 1px 10px rgba(20,28,32,0.35))' : 'none' }} />
        </a>

        <nav className="nav-links" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 34 }}>
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="navlink" style={{
              fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 13,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: onHero ? 'var(--lagoon-ocean-mist)' : 'var(--lagoon-ink)',
              textShadow: onHero ? '0 1px 10px rgba(20,28,32,0.4)' : 'none',
              whiteSpace: 'nowrap', transition: 'color var(--dur-base) var(--ease-out)',
            }}>{l.label}</a>
          ))}
        </nav>

        <div className="nav-cta-desktop" style={{ display: 'flex', alignItems: 'center', justifySelf: 'end' }}>
          {onHero ? (
            <Button as="a" href="#contact" variant="inverse" size="md" style={{ background: 'var(--lagoon-white)', color: 'var(--lagoon-tide)', border: '1px solid var(--lagoon-white)' }}>BOOK NOW</Button>
          ) : (
            <Button as="a" href="#contact" variant="primary" size="md">BOOK NOW</Button>
          )}
        </div>

        <button aria-label="Menu" style={{
          justifySelf: 'end', gridColumn: 3, display: 'none', background: 'none', border: 'none',
          cursor: 'pointer', color: onHero ? 'var(--lagoon-ocean-mist)' : 'var(--lagoon-ink)',
        }} onClick={() => setMenuOpen(m => !m)} className="nav-burger"><Icon name={menuOpen ? 'x' : 'menu'} size={26} /></button>
      </div>

      <style>{`@media (max-width:900px){ .nav-burger{ display:inline-flex !important; } }`}</style>
      {menuOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'rgba(244,243,239,0.97)',
          backdropFilter: 'saturate(1.4) blur(14px)', WebkitBackdropFilter: 'saturate(1.4) blur(14px)',
          borderBottom: '1px solid var(--border-hairline)', boxShadow: 'var(--shadow-md)',
          padding: '0.5rem clamp(1.25rem, 4vw, 2.75rem) 1.5rem',
          display: 'flex', flexDirection: 'column',
        }}>
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{
              fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 15,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'var(--lagoon-ink)', padding: '1rem 0',
              borderBottom: '1px solid var(--border-hairline)', textDecoration: 'none',
            }}>{l.label}</a>
          ))}
          <div style={{ marginTop: '1.25rem' }}>
            <Button as="a" href="#contact" variant="primary" size="md" style={{ width: '100%', justifyContent: 'center' }}>BOOK NOW</Button>
          </div>
        </div>
      )}
    </header>
  );
}

/* ─── Footer ───────────────────────────────────────────────────────────────── */
function Footer() {
  const cream = 'var(--lagoon-ocean-mist)';
  const cols = [{ h: 'Explore', links: ['Rentals', 'Owners', 'How We Work', 'About', 'Contact'] }];
  const linkStyle = { fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(244,243,239,0.78)', display: 'block', padding: '7px 0', transition: 'color var(--dur-fast) var(--ease-out)' };
  const onEnter = (e) => { e.currentTarget.style.color = cream; };
  const onLeave = (e) => { e.currentTarget.style.color = 'rgba(244,243,239,0.78)'; };

  return (
    <footer style={{ background: 'var(--lagoon-ink)', color: cream }}>
      <div className="foot-cta" style={{ borderBottom: '1px solid var(--border-on-brand)', background: 'var(--lagoon-tide)', display: 'grid', gridTemplateColumns: '1fr clamp(260px, 32vw, 500px)', overflow: 'hidden' }}>
        <div style={{ paddingBlock: 'clamp(3rem, 6vw, 5.5rem)', paddingLeft: 'calc(max(0px, (100vw - 1320px) / 2) + clamp(1.25rem, 4vw, 2.75rem))', paddingRight: 'clamp(1.5rem, 3vw, 3rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
          <div>
            <h2 style={{ color: cream, fontSize: 'clamp(1.8rem, 3.4vw, 2.9rem)', margin: '0 0 0.5em', maxWidth: '28ch' }}>Steps from the beach, minutes from Tedder Avenue.</h2>
            <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(244,243,239,0.75)', fontSize: 'var(--text-md)', lineHeight: 1.6, margin: 0, maxWidth: '44ch' }}>Whether you're looking to rent at Lagoon or exploring property management, we're here to help.</p>
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Button as="a" href="#" variant="inverse" size="md">View Available Rentals</Button>
          </div>
        </div>
        <img src={FOOTER_CTA} alt="Lagoon Main Beach aerial view" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>

      <Wrap style={{ paddingBlock: 'clamp(3rem, 5vw, 4.5rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr 1fr 1.2fr', gap: 'clamp(1.5rem, 3vw, 2.5rem)', alignItems: 'start' }} className="foot-grid">
          <div>
            <img src={FOOTER_LOGO} alt="Lagoon Main Beach" style={{ height: 48, width: 'auto', marginBottom: 20, opacity: 0.9 }} />
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.7, color: 'rgba(244,243,239,0.72)', maxWidth: '34ch', margin: 0 }}>
              Premium long-term rentals and expert property management at Lagoon Main Beach.
            </p>
          </div>

          {cols.map((c) => (
            <nav key={c.h}>
              <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: cream, margin: '0 0 12px', opacity: 0.9 }}>{c.h}</h4>
              {c.links.map((l) => (
                <a key={l} href="#" style={linkStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>{l}</a>
              ))}
            </nav>
          ))}

          <div>
            <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: cream, margin: '0 0 12px', opacity: 0.9 }}>Contact</h4>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.7, color: 'rgba(244,243,239,0.78)', margin: 0 }}>
              11–23 Cronin Avenue<br />Main Beach QLD 4217<br /><br />
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={cream} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <a href="tel:0736668609" style={{ color: cream }}>07 3666 8609</a>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={cream} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <a href="mailto:reception@lagoonmainbeach.com" style={{ color: cream }}>reception@lagoonmainbeach.com</a>
              </span>
            </p>
          </div>

          <div style={{ borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)', alignSelf: 'start', marginTop: 28 }}>
            <iframe
              src="https://maps.google.com/maps?q=11+Cronin+Avenue+Main+Beach+QLD+4217+Australia&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%" height="220"
              style={{ border: 0, display: 'block', filter: 'grayscale(25%) contrast(1.05)' }}
              allowFullScreen loading="lazy" title="Lagoon Main Beach location"
            />
          </div>
        </div>
      </Wrap>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', background: 'var(--lagoon-tide)' }}>
        <Wrap style={{ paddingBlock: 22, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'rgba(244,243,239,0.6)' }}>© 2026 Lagoon Main Beach. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 22 }}>
            {['Privacy Policy'].map((l) => (
              <a key={l} href="#" style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'rgba(244,243,239,0.6)' }} onMouseEnter={onEnter} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(244,243,239,0.6)'}>{l}</a>
            ))}
          </div>
        </Wrap>
      </div>

      <style>{`
        @media (max-width: 900px){ .foot-grid{ grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 520px){ .foot-grid{ grid-template-columns: 1fr !important; } }
        @media (max-width: 680px){ .foot-cta{ grid-template-columns: 1fr !important; } .foot-cta > img { display: none !important; } }
      `}</style>
    </footer>
  );
}

/* ─── Page Sections ────────────────────────────────────────────────────────── */

function OwnersHero() {
  return (
    <section id="top" style={{
      position: 'relative', minHeight: '50vh',
      display: 'flex', alignItems: 'center',
      backgroundImage: `url("${HERO_BG}")`,
      backgroundSize: 'cover', backgroundPosition: 'center bottom',
      backgroundRepeat: 'no-repeat',
    }}>
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(20,30,38,0.55) 0%, rgba(20,30,38,0.50) 100%)',
      }} />
      <Wrap style={{ position: 'relative', width: '100%', paddingBlock: 'clamp(7rem, 14vw, 11rem)', textAlign: 'center' }}>
        <div className="reveal in" style={{ margin: '0 auto', maxWidth: 680 }}>
          <img src={FAVICON_LOGO} alt="" aria-hidden="true" style={{ height: 26, marginBottom: 16, opacity: 0.92, filter: 'brightness(0) invert(1)' }} />
          <Eyebrow color="mist" style={{ marginBottom: 16 }}>For Owners</Eyebrow>
          <h1 style={{ color: 'var(--lagoon-ocean-mist)', margin: '0 0 0.4em', fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.08 }}>
            Your Property, Expertly Managed
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(244,243,239,0.88)', fontSize: 'var(--text-lg)', lineHeight: 1.55, maxWidth: '46ch', margin: '0 auto 1.8em' }}>
            Maximise your investment with expert property management at Main Beach, Gold Coast.
          </p>
        </div>
      </Wrap>
      <Wave fill="var(--lagoon-ocean-mist)" style={{ position: 'absolute', left: 0, right: 0, bottom: -1 }} />
    </section>
  );
}

function ProactiveIntro() {
  return (
    <section style={{ background: 'var(--lagoon-ocean-mist)', paddingBlock: 'clamp(4rem, 7vw, 6rem)' }}>
      <Wrap>
        <div className="reveal" style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <Eyebrow color="coral" align="center" rule style={{ marginBottom: 24 }}>Proactive Care. Premium Results.</Eyebrow>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)', lineHeight: 1.8, color: 'var(--text-muted)', fontWeight: 300, margin: '0 0 2rem' }}>
            At Lagoon, we don't just manage properties - we protect your asset, attract quality tenants, and keep you informed every step of the way. Our hands-on approach means fewer surprises and better returns.
          </p>
          <Button as="a" href="#contact" variant="primary" size="md">REQUEST A PROPOSAL</Button>
        </div>
      </Wrap>
    </section>
  );
}

function ImageGallery() {
  return (
    <section style={{ background: 'var(--lagoon-ocean-mist)', paddingBlock: 'clamp(3rem, 5vw, 5rem)' }}>
      <Wrap>
        <div className="reveal gallery-grid" style={{ display: 'grid', gridTemplateColumns: '0.7fr 1fr 0.7fr', gap: 'clamp(14px, 2vw, 28px)', alignItems: 'end' }}>
          <div style={{ height: 'clamp(170px, 20vw, 260px)', backgroundImage: `url("${ARCH_IMG}")`, backgroundSize: 'cover', backgroundPosition: 'left top' }} />
          <div style={{ height: 'clamp(240px, 28vw, 350px)', backgroundImage: `url("${CABANA_POOL}")`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: 'var(--radius-arch)' }} />
          <div style={{ height: 'clamp(170px, 20vw, 260px)', backgroundImage: `url("${GALLERY_RIGHT}")`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </div>
      </Wrap>
      <style>{`@media(max-width:680px){.gallery-grid{grid-template-columns:1fr 1fr !important;} .gallery-grid>div:first-child{display:none !important;}}`}</style>
    </section>
  );
}
function ServicesGrid() {
  const svgs = {
    megaphone: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
    userCheck: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/>',
    clipboard: '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M9 14l2 2 4-4"/>',
    wrench:    '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    dollar:    '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    barChart:  '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  };
  function BIcon({ svg }) {
    return (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: svg }} />
    );
  }
  const services = [
    { svg: svgs.megaphone, title: 'Marketing & Leasing',       desc: 'Professional photography, targeted listings, and competitive market positioning to fill vacancies fast.' },
    { svg: svgs.userCheck, title: 'Tenant Screening',          desc: 'Rigorous vetting process including employment, rental history, and reference checks for peace of mind.' },
    { svg: svgs.clipboard, title: 'Inspections & Compliance',  desc: 'Regular routine inspections, entry/exit condition reports, and full legislative compliance.' },
    { svg: svgs.wrench,    title: 'Maintenance Coordination',  desc: 'Trusted network of preferred contractors. Responsive issue resolution to protect your asset.' },
    { svg: svgs.dollar,    title: 'Rent Collection & Arrears', desc: 'Consistent rent collection with proactive arrears management. Your income, on time.' },
    { svg: svgs.barChart,  title: 'Owner Reporting',           desc: 'Clear monthly statements, open communication, and transparent financial reporting.' },
  ];
  return (
    <section style={{ background: 'var(--lagoon-white)', paddingBlock: 'clamp(4rem, 7vw, 7rem)' }}>
      <Wrap>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 1.15fr)', gap: 'clamp(3rem, 5vw, 6rem)', alignItems: 'start' }} className="sg-grid">
          <div className="reveal" style={{ position: 'sticky', top: 80 }}>
            <div className="lagoon-eyebrow" style={{ color: 'var(--text-coral)', marginBottom: 18 }}>What We Do</div>
            <h2 style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', margin: '0 0 0.6em', color: 'var(--lagoon-tide)', lineHeight: 1.1 }}>Full-service management, handled.</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '42ch', margin: '0 0 2rem' }}>
              Everything your property needs, taken care of. So you don't have to think about it.
            </p>
            <Button as="a" href="#contact" variant="primary" size="md">REQUEST A PROPOSAL</Button>
          </div>
          <div className="reveal sg-items" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'clamp(1rem, 1.75vw, 1.5rem) clamp(2rem, 4vw, 3rem)' }}>
            {services.map((s) => (
              <div key={s.title} style={{ paddingTop: 'clamp(1.2rem, 2vw, 1.8rem)', borderTop: '1px solid var(--border-light)' }}>
                <div style={{ marginBottom: 14, color: 'var(--lagoon-dusty-coral)' }}><BIcon svg={s.svg} /></div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.05rem, 1.4vw, 1.2rem)', fontWeight: 400, color: 'var(--lagoon-tide)', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Wrap>
      <style>{`@media (max-width: 820px){ .sg-grid{ grid-template-columns: 1fr !important; } .sg-grid > div:first-child { position: static !important; } } @media (max-width: 480px){ .sg-items{ grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
function BenefitsBand() {
  const clusters = [
    { title: 'Financial Returns', items: ['Competitive rental yields through strategic pricing', 'Minimised vacancy periods with proactive marketing', 'Cost-effective maintenance through preferred contractors', 'Transparent fee structure with no hidden costs'] },
    { title: 'Peace of Mind', items: ['Fully managed service - we handle everything', 'Regular inspections protect your asset long-term', 'Quality tenants reduce risk and wear', 'Responsive communication when you need it'] },
  ];
  return (
    <section style={{ background: 'var(--lagoon-tide)', paddingBlock: 'clamp(4rem, 7vw, 7rem)' }}>
      <Wrap>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <div className="lagoon-eyebrow" style={{ color: 'var(--lagoon-dusty-coral)', marginBottom: 18 }}>How Owners Benefit</div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)', color: 'var(--lagoon-ocean-mist)', margin: 0, lineHeight: 1.1 }}>Your investment, in good hands.</h2>
        </div>
        <div className="reveal bb-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem, 4vw, 4rem)' }}>
          {clusters.map((c) => (
            <div key={c.title}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)', color: 'var(--lagoon-ocean-mist)', margin: '0 0 1.2rem', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.title}</h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {c.items.map((item) => (
                  <li key={item} style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', color: 'rgba(244,243,239,0.85)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--lagoon-dusty-coral)', flexShrink: 0, marginTop: 2 }}>&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Wrap>
      <style>{`@media (max-width: 680px){ .bb-grid{ grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
function Testimonials() {
  const reviews = [
    { quote: "Since switching to Lagoon, our apartment has been consistently tenanted with quality residents. The reporting is clear and the team genuinely cares.", name: 'Lagoon Apartment Owner', role: '2 Bedroom Apartment Owner' },
    { quote: "Professional, responsive, and proactive. I wish I'd found Lagoon years ago. They've made property ownership stress-free.", name: 'Lagoon Apartment Owner', role: '1 Bedroom Apartment Owner' },
  ];
  const [active, setActive] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % reviews.length), 5000);
    return () => clearInterval(t);
  }, []);
  const r = reviews[active];
  return (
    <section style={{ background: 'var(--lagoon-ocean-mist)', paddingBlock: 'clamp(4rem, 7vw, 7rem)' }}>
      <Wrap>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
          <div className="lagoon-eyebrow" style={{ color: 'var(--text-coral)', marginBottom: 18 }}>What Owners Say</div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)', color: 'var(--lagoon-tide)', margin: 0, lineHeight: 1.1 }}>Trusted by local property owners.</h2>
        </div>
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)', color: 'var(--lagoon-tide)', lineHeight: 1.7, margin: '0 0 1.6rem' }}>"{r.quote}"</p>
          <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, color: 'var(--lagoon-tide)' }}>{r.name}</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: '2rem' }}>
            {reviews.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} aria-label={'Testimonial ' + (i + 1)} style={{ width: 10, height: 10, borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0, background: active === i ? 'var(--lagoon-tide)' : 'rgba(28,60,60,0.25)', transition: 'background var(--dur-base)' }} />
            ))}
          </div>
        </div>
      </Wrap>
    </section>
  );
}

function ContactForm() {
  const field = { fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--lagoon-ocean-mist)', background: 'transparent', border: '1px solid rgba(244,243,239,0.45)', borderRadius: 0, padding: '13px 14px', outline: 'none', width: '100%', boxSizing: 'border-box', display: 'block', appearance: 'auto' };
  const taStyle = { fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--lagoon-ocean-mist)', background: 'transparent', border: '1px solid rgba(244,243,239,0.45)', borderRadius: 0, padding: '13px 14px', outline: 'none', width: '100%', boxSizing: 'border-box', display: 'block', resize: 'vertical' };
  return (
    <section id="contact" style={{ background: 'var(--lagoon-tide)', paddingBlock: 'clamp(4rem, 7vw, 7rem)' }}>
      <Wrap>
        <div className="reveal cf-outer" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 'clamp(3rem, 6vw, 6rem)', alignItems: 'start' }}>
          <div>
            <div className="lagoon-eyebrow" style={{ color: 'var(--lagoon-ocean-mist)', marginBottom: 18 }}>Get In Touch</div>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.6rem)', color: 'var(--lagoon-ocean-mist)', margin: '0 0 1rem', lineHeight: 1.15 }}>Request a Property Management Proposal</h2>
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--lagoon-ocean-mist)', fontSize: 'var(--text-md)', lineHeight: 1.7, margin: '0 0 1.5rem' }}>Tell us about your property and we will prepare a tailored management proposal.</p>
            <a href="#" style={{ display: 'inline-block', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--lagoon-ocean-mist)', border: '1px solid rgba(244,243,239,0.6)', padding: '12px 20px', letterSpacing: '0.08em', textDecoration: 'none' }}>DOWNLOAD OWNER INFORMATION PACK</a>
          </div>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <input type="text" placeholder="Owner Name" required style={field} />
              <input type="tel" placeholder="Phone" style={field} />
            </div>
            <input type="email" placeholder="Email Address" required style={field} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <select style={field}>
                <option value="" disabled selected>Suburb</option>
                <option>Main Beach</option>
                <option>Surfers Paradise</option>
                <option>Broadbeach</option>
                <option>Other</option>
              </select>
              <select style={field}>
                <option value="" disabled selected>Bedrooms</option>
                <option>Studio</option>
                <option>1 Bedroom</option>
                <option>2 Bedrooms</option>
                <option>3 Bedrooms</option>
                <option>4+ Bedrooms</option>
              </select>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <select style={field}>
                <option value="" disabled selected>Current Status</option>
                <option>Currently tenanted</option>
                <option>Vacant</option>
                <option>Self-managed</option>
                <option>With another agent</option>
              </select>
              <select style={field}>
                <option value="" disabled selected>Preferred Contact Time</option>
                <option>Morning (8am - 12pm)</option>
                <option>Afternoon (12pm - 5pm)</option>
                <option>Evening (5pm - 7pm)</option>
                <option>Anytime</option>
              </select>
            </div>
            <textarea placeholder="Notes - anything else we should know about your property or goals?" rows="5" style={taStyle}></textarea>
            <button type="submit" style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, color: 'var(--lagoon-tide)', background: 'var(--lagoon-white)', border: 'none', borderRadius: 0, padding: '16px 24px', cursor: 'pointer', width: '100%', letterSpacing: '0.04em' }}>Request Proposal</button>
          </form>
        </div>
      </Wrap>
      <style>{`@media (max-width: 720px){ .cf-outer{ grid-template-columns: 1fr !important; } } ::placeholder{ color: rgba(244,243,239,0.6) !important; } select option{ color: var(--lagoon-ink); background: var(--lagoon-white); }`}</style>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = React.useState(null);
  const faqs = [
    { q: 'What does your management fee include?', a: 'Our fee covers everything - tenant sourcing, routine inspections, rent collection, arrears management, maintenance coordination, monthly reporting, and ongoing owner communication. No surprises, no add-ons for the basics.' },
    { q: 'How do you find and screen tenants?', a: "We market your property with professional photography and targeted listings, then run a thorough vetting process covering employment verification, rental history, and personal references. We don't just fill vacancies - we find the right fit." },
    { q: 'How often is my property inspected?', a: 'We carry out routine inspections every 3 months, plus a detailed entry and exit condition report for every tenancy. You receive a copy of each report with photos.' },
    { q: 'What happens if a tenant falls behind on rent?', a: 'We act immediately. Our arrears management process kicks in from day one of a missed payment - owners are kept informed throughout and we follow all legislative requirements for notices and escalation.' },
    { q: 'How are maintenance requests handled?', a: "Tenants report issues through our system and we coordinate with our trusted contractor network. Minor repairs are actioned promptly. Anything above a set threshold (agreed with you upfront) is approved by you before we proceed." },
    { q: 'How and when do I receive my rental income?', a: 'Rental funds are disbursed to your nominated account monthly, with a clear statement outlining income and any outgoings. You always know exactly where things stand.' },
  ];
  const half = Math.ceil(faqs.length / 2);
  const cols = [faqs.slice(0, half), faqs.slice(half)];
  return (
    <section id="faq" style={{ background: 'var(--lagoon-white)', paddingBlock: 'clamp(4rem, 7vw, 7rem)' }}>
      <Wrap>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }}>
          <div className="lagoon-eyebrow" style={{ color: 'var(--text-coral)', marginBottom: 18 }}>FAQs</div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)', color: 'var(--lagoon-tide)', margin: 0, lineHeight: 1.1 }}>Questions from owners.</h2>
        </div>
        <div className="reveal faq-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 clamp(3rem, 5vw, 5rem)' }}>
          {cols.map((col, ci) => (
            <div key={ci}>
              {col.map((f, i) => {
                const idx = ci === 0 ? i : half + i;
                return (
                  <div key={idx} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <button onClick={() => setOpen(open === idx ? null : idx)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'clamp(1rem, 2vw, 1.4rem) 0', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)', fontWeight: 500, color: 'var(--lagoon-tide)', textAlign: 'left', gap: 16 }}>
                      {f.q}
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: 'var(--lagoon-dusty-coral)', transition: 'transform var(--dur-base) var(--ease-out)', transform: open === idx ? 'rotate(180deg)' : 'rotate(0deg)' }}><polyline points="6 9 12 15 18 9" /></svg>
                    </button>
                    {open === idx && (
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', color: 'var(--text-muted)', lineHeight: 1.75, margin: '0 0 1.4rem', paddingRight: 30 }}>{f.a}</p>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </Wrap>
      <style>{`@media (max-width: 720px){ .faq-grid{ grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

function OwnersApp() {
  React.useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return (
    <React.Fragment>
      <Nav />
      <main>
        <OwnersHero />
        <ProactiveIntro />
        <ImageGallery />
        <ServicesGrid />
        <BenefitsBand />
        <Testimonials />
        <ContactForm />
        <FAQSection />
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default OwnersApp;
