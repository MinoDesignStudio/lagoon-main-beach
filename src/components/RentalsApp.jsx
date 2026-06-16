import React from 'react';
import { Icon } from './Icon.jsx';

const B = import.meta.env.BASE_URL.replace(/\/$/, '');

/* Lagoon Owners Page - standalone. Mino Design and Digital. */
const { useState, useEffect, useRef } = React;

/* ─── Image constants ──────────────────────────────────────────────────────── */
const HERO_BG       = `${B}/img/rentals-hero.jpg`;
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
    { label: 'Rentals', href: '#top' },
    { label: 'Owners', href: `${B}/owners/` },
    { label: 'How we work', href: `${B}/how-we-work/` },
    { label: 'About', href: '#' },
    { label: 'Contact', href: `${B}/contact/` },
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
        <a href={`${B}/`} aria-label="Lagoon Main Beach - home" style={{ display: 'flex', alignItems: 'center', justifySelf: 'start' }}>
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
            <Button as="a" href={`${B}/how-we-work/`} variant="inverse" size="md">See How We Work</Button>
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

function RentalsHero() {
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
        background: 'radial-gradient(120% 90% at 50% 45%, rgba(20,30,38,0.66) 0%, rgba(20,30,38,0.58) 55%, rgba(20,30,38,0.50) 100%)',
      }} />
      <Wrap style={{ position: 'relative', width: '100%', paddingBlock: 'clamp(7rem, 14vw, 11rem)', textAlign: 'center' }}>
        <div className="reveal in" style={{ margin: '0 auto', maxWidth: 680 }}>
          <img src={FAVICON_LOGO} alt="" aria-hidden="true" style={{ height: 26, marginBottom: 16, opacity: 0.92, filter: 'brightness(0) invert(1)' }} />
          <Eyebrow color="mist" style={{ marginBottom: 16 }}>For Tenants</Eyebrow>
          <h1 style={{ color: 'var(--lagoon-ocean-mist)', margin: '0 0 0.4em', fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.08 }}>
            Your Next Home, By The Beach
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(244,243,239,0.88)', fontSize: 'var(--text-lg)', lineHeight: 1.55, maxWidth: '46ch', margin: '0 auto 1.8em' }}>
            Quality long-term rental apartments at Lagoon Main Beach, Gold Coast.
          </p>
        </div>
      </Wrap>
      <Wave fill="var(--lagoon-ocean-mist)" style={{ position: 'absolute', left: 0, right: 0, bottom: -1 }} />
    </section>
  );
}

function BeachsideIntro() {
  return (
    <section style={{ background: 'var(--lagoon-ocean-mist)', paddingBlock: 'clamp(4rem, 7vw, 6rem)' }}>
      <Wrap>
        <div className="reveal" style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'var(--text-display-m)', color: 'var(--lagoon-tide)', margin: '0 0 0.5em' }}>Live the Beachside Life</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)', lineHeight: 1.8, color: 'var(--text-muted)', fontWeight: 300, margin: 0 }}>
            Lagoon Main Beach offers premium residential living just steps from the sand. Every apartment is thoughtfully maintained, with resort-style amenities and a genuine sense of community. This is long-term coastal living at its finest.
          </p>
        </div>
      </Wrap>
    </section>
  );
}

/**
 * Lagoon - ResidenceCard
 * A listing card: arch-topped photo, amenity tags, serif title, location, price.
 */
function ResidenceCard({ image, title = 'Residence', location = null, price, period = 'week', tags = [], status, onView }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      background: 'var(--lagoon-white)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-md)',
      overflow: 'hidden',
      width: '100%',
    }}>
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{
          position: 'relative',
          height: 250,
          borderRadius: 'var(--radius-arch)',
          overflow: 'hidden',
          background: image
            ? `center/cover no-repeat url("${image}")`
            : 'linear-gradient(170deg, var(--lagoon-swell), var(--lagoon-tide))',
        }}>
          {status && (
            <div style={{ position: 'absolute', top: 14, left: 14 }}>
              <Tag tone="tide" variant="solid">{status}</Tag>
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {location && <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{location}</span>}
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 25, lineHeight: 1.12, letterSpacing: 'var(--ls-feature)', textTransform: 'uppercase', margin: 0, color: 'var(--text-body)', whiteSpace: 'pre-line' }}>{title}</h3>
        </div>

        {tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {tags.map((t) => <Tag key={t} tone="swell">{t}</Tag>)}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
          {price != null && (
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 22, color: 'var(--lagoon-tide)', fontWeight: 600, letterSpacing: '0.01em' }}>{price}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)' }}>/ {period}</span>
            </div>
          )}
          <Button variant="secondary" size="sm" onClick={onView}>View</Button>
        </div>
      </div>
    </div>
  );
}

/* Featured residences - arch-top listing cards (shared with the homepage). */
function FeaturedResidences() {
  const items = [
    { image: `${B}/img/home-embedded-11.jpg`, title: '1 Bedroom\nOcean View', price: '$520', period: 'week', tags: ['1 Bed', '1 Bath', '1 Parking'] },
    { image: `${B}/img/home-embedded-12.jpg`, title: '2 Bedroom Coastal Retreat', price: '$720', period: 'week', tags: ['2 Bed', '2 Bath', '1 Parking'] },
    { image: `${B}/img/home-embedded-13.jpg`, title: '3 Bedroom Premium Residence', price: '$950', period: 'week', tags: ['3 Bed', '2 Bath', '2 Parking'] },
  ];

  return (
    <section style={{ background: 'var(--lagoon-white)', paddingBlock: 'clamp(3.5rem, 7vw, 7rem)' }}>
      <Wrap>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', marginBottom: 'clamp(2rem, 4vw, 3.4rem)' }}>
          <div className="reveal">
            <div className="lagoon-eyebrow" style={{ color: 'var(--text-coral)', marginBottom: 16 }}>Now Leasing</div>
            <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 3.1rem)', margin: '0 0 1.2rem', color: 'var(--lagoon-tide)' }}>Featured residences</h2>
            <Button as="a" href="#" variant="primary" size="md">View Available Rentals</Button>
          </div>
        </div>

        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 'clamp(20px, 2.4vw, 32px)' }}>
          {items.map((it) => (
            <ResidenceCard key={it.title} {...it} onView={() => {}} />
          ))}
        </div>
      </Wrap>
    </section>
  );
}
/* "Why Rent at Lagoon" lifestyle gallery slider (shared layout with the homepage). */
function WhyRentAtLagoon() {
  const reasons = [
    { title: 'Prime Location', desc: 'Steps from the beach and Tedder Avenue.', image: `${B}/img/hero-pano.jpg` },
    { title: 'Quality Building', desc: 'Well-maintained, with modern finishes throughout.', image: `${B}/img/3-print-11-cronin-ave.jpg` },
    { title: 'Resort Amenities', desc: 'Pool, gym, and beautifully landscaped grounds.', image: `${B}/img/cabana-pool.jpg` },
    { title: 'Community', desc: 'Friendly, established long-term residents.', image: `${B}/img/Lagoon-Colour-Final-Web-Res-2.jpg`, pos: 'center 88%' },
  ];

  const [active, setActive] = React.useState(0);
  const go = (n) => setActive((n + reasons.length) % reasons.length);

  React.useEffect(() => {
    const timer = setInterval(() => setActive((a) => (a + 1) % reasons.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <React.Fragment>
      {/* Cream to white wave transition */}
      <div style={{ background: 'var(--lagoon-ocean-mist)', lineHeight: 0 }}>
        <Wave fill="var(--lagoon-white)" />
      </div>

      <section style={{ background: 'var(--lagoon-white)', paddingBlock: 'clamp(3rem, 6vw, 6.5rem)', overflow: 'hidden' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'minmax(0, 0.78fr) minmax(0, 1fr)',
          gap: 'clamp(2rem, 4vw, 4.5rem)', alignItems: 'center',
          paddingLeft: 'calc(max(0px, (100vw - 1320px) / 2) + clamp(1.25rem, 4vw, 2.75rem))',
        }} className="owners-grid">
            <div className="reveal">
              <div className="lagoon-eyebrow" style={{ color: 'var(--text-coral)', marginBottom: 18 }}>Beachside Living</div>
              <h2 style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)', margin: '0 0 0.6em', color: 'var(--lagoon-tide)' }}>Why Rent at Lagoon</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '50ch', marginBottom: 0 }}>
                Lagoon Main Beach puts you steps from the sand and the cafes of Tedder Avenue, in a well-maintained building with resort-style amenities and a friendly community of long-term residents. Every apartment is cared for and move-in ready, so you can simply settle in and enjoy relaxed coastal living.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12, maxWidth: 300, marginTop: 'clamp(1.6rem, 3vw, 2.4rem)' }} className="owners-cta">
                <Button as="a" href="#contact" variant="primary" size="md" fullWidth style={{ whiteSpace: 'nowrap' }}>Enquire or Book a Viewing</Button>
              </div>
            </div>

            <div className="reveal" style={{ position: 'relative' }}>
              <div style={{
                position: 'relative', overflow: 'hidden', height: 'clamp(340px, 33vw, 470px)',
                boxShadow: 'var(--shadow-lg)', background: 'var(--lagoon-swell)',
              }}>
                {reasons.map((r, i) => (
                  <div key={r.title} aria-hidden={i !== active} style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `url("${r.image}")`, backgroundSize: 'cover', backgroundPosition: r.pos || 'center',
                    opacity: i === active ? 1 : 0,
                    transform: i === active ? 'scale(1.0)' : 'scale(1.04)',
                    transition: 'opacity 0.7s var(--ease-out), transform 1.4s var(--ease-out)',
                  }} />
                ))}

                <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(28,38,44,0) 38%, rgba(28,38,44,0.72) 100%)' }} />

                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 'clamp(1.6rem, 3vw, 2.4rem)', color: 'var(--lagoon-ocean-mist)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 12, letterSpacing: '0.22em' }}>
                      {String(active + 1).padStart(2, '0')}
                    </span>
                    <span style={{ width: 26, height: 1, background: 'currentColor', opacity: 0.6 }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 12, letterSpacing: '0.22em', opacity: 0.7 }}>
                      {String(reasons.length).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="lagoon-display" style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.1rem)', margin: '0 0 6px', color: 'var(--lagoon-ocean-mist)' }}>{reasons[active].title}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 'var(--text-md)', lineHeight: 1.5, margin: 0, maxWidth: '40ch', opacity: 0.92 }}>{reasons[active].desc}</p>
                </div>

                <div style={{ position: 'absolute', bottom: 'clamp(1.4rem, 2.6vw, 2.2rem)', right: 'clamp(1.4rem, 2.6vw, 2.2rem)', display: 'flex', gap: 6 }}>
                  {[['chevron-left', -1], ['chevron-right', 1]].map(([ic, d]) => (
                    <button key={ic} aria-label={d < 0 ? 'Previous' : 'Next'} onClick={() => go(active + d)} style={{
                      width: 48, height: 48, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', border: 'none', background: 'none', padding: 0,
                      color: 'var(--lagoon-ocean-mist)', filter: 'drop-shadow(0 2px 6px rgba(20,28,32,0.55))',
                      transition: 'transform var(--dur-fast) var(--ease-out), opacity var(--dur-fast) var(--ease-out)', opacity: 0.92,
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = 1; e.currentTarget.style.transform = d < 0 ? 'translateX(-3px)' : 'translateX(3px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = 0.92; e.currentTarget.style.transform = 'none'; }}>
                      <Icon name={ic} size={34} stroke={1.6} color="var(--lagoon-ocean-mist)" />
                    </button>
                  ))}
                </div>
                </div>
            </div>
          </div>
      </section>

      <style>{`
        @media (max-width: 860px){
          .owners-grid{ grid-template-columns: 1fr !important; padding-right: var(--gutter) !important; }
        }
      `}</style>
    </React.Fragment>
  );
}

/* Four-step tenant process, styled in the Lagoon palette. */
function TenantJourney() {
  const steps = [
    { n: '1', title: 'Search',   desc: 'Browse available apartments' },
    { n: '2', title: 'Apply',    desc: 'Submit your application' },
    { n: '3', title: 'Approval', desc: 'Quick, clear approval process' },
    { n: '4', title: 'Move In',  desc: 'Welcome to Lagoon' },
  ];
  return (
    <section style={{ background: 'var(--lagoon-ocean-mist)', paddingBlock: 'clamp(4rem, 7vw, 6.5rem)' }}>
      <Wrap>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 'clamp(2.4rem, 5vw, 4rem)' }}>
          <h2 style={{ fontSize: 'var(--text-display-m)', color: 'var(--lagoon-tide)', margin: 0 }}>Your Tenant Journey</h2>
        </div>
        <div className="reveal journey-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'clamp(24px, 3vw, 40px)' }}>
          {steps.map((s) => (
            <div key={s.n} className="step-item" style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <span className="step-line" aria-hidden="true" style={{
                position: 'absolute', top: 37, left: '50%', width: 'calc(100% + clamp(24px, 3vw, 40px))',
                height: 2, background: 'rgba(66,115,128,0.28)', zIndex: 0,
              }} />
              <div style={{
                position: 'relative', zIndex: 1,
                width: 74, height: 74, borderRadius: '50%',
                background: 'var(--lagoon-tide)', color: 'var(--lagoon-ocean-mist)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 400, lineHeight: 1,
                boxShadow: 'var(--shadow-brand)', marginBottom: 22,
              }}>{s.n}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)', fontWeight: 400, color: 'var(--lagoon-tide)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 8px' }}>{s.title}</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', color: 'var(--text-muted)', fontWeight: 300, lineHeight: 1.6, margin: 0, maxWidth: '20ch' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </Wrap>
      <style>{`
        .journey-grid .step-item:nth-child(4n) .step-line, .journey-grid .step-item:last-child .step-line { display: none; }
        @media(max-width:760px){
          .journey-grid{ grid-template-columns:1fr 1fr !important; row-gap:2.8rem !important; }
          .journey-grid .step-item:nth-child(2n) .step-line, .journey-grid .step-item:last-child .step-line { display: none; }
        }
        @media(max-width:430px){
          .journey-grid{ grid-template-columns:1fr !important; }
          .journey-grid .step-item .step-line { display: none !important; }
        }
      `}</style>
    </section>
  );
}

function ContactForm() {
  const field = { fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--lagoon-ocean-mist)', background: 'transparent', border: '1px solid rgba(244,243,239,0.45)', borderRadius: 0, padding: '13px 14px', outline: 'none', width: '100%', boxSizing: 'border-box', display: 'block', appearance: 'auto' };
  const taStyle = { ...field, resize: 'vertical' };
  return (
    <section id="contact" style={{ background: 'var(--lagoon-tide)', paddingBlock: 'clamp(4rem, 7vw, 7rem)' }}>
      <Wrap>
        <div className="reveal cf-outer" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 'clamp(3rem, 6vw, 6rem)', alignItems: 'start' }}>
          <div>
            <div className="lagoon-eyebrow" style={{ color: 'var(--lagoon-ocean-mist)', marginBottom: 18 }}>Get In Touch</div>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.6rem)', color: 'var(--lagoon-ocean-mist)', margin: '0 0 1rem', lineHeight: 1.15 }}>Enquire or Book a Viewing</h2>
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--lagoon-ocean-mist)', fontSize: 'var(--text-md)', lineHeight: 1.7, margin: 0 }}>Interested in renting at Lagoon Main Beach? Fill in the form and we'll be in touch.</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="cf-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <input type="text" placeholder="Full Name" required style={field} />
              <input type="tel" placeholder="Phone" style={field} />
            </div>
            <input type="email" placeholder="Email Address" required style={field} />
            <div className="cf-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <select style={field} defaultValue="">
                <option value="" disabled>Bedrooms</option>
                <option>Studio</option>
                <option>1 Bedroom</option>
                <option>2 Bedrooms</option>
                <option>3 Bedrooms</option>
                <option>4+ Bedrooms</option>
              </select>
              <input type="date" aria-label="Preferred viewing date" style={field} />
            </div>
            <div className="cf-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <input type="text" placeholder="Max Rent per Week (optional)" style={field} />
              <select style={field} defaultValue="">
                <option value="" disabled>Inspection Preference</option>
                <option>Private inspection</option>
                <option>Open inspection</option>
                <option>Either</option>
              </select>
            </div>
            <textarea placeholder="Notes - tell us anything else about what you're looking for" rows="5" style={taStyle}></textarea>
            <button type="submit" style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, color: 'var(--lagoon-tide)', background: 'var(--lagoon-white)', border: 'none', borderRadius: 0, padding: '16px 24px', cursor: 'pointer', width: '100%', letterSpacing: '0.04em' }}>Submit Enquiry</button>
          </form>
        </div>
      </Wrap>
      <style>{`@media (max-width: 720px){ .cf-outer{ grid-template-columns: 1fr !important; } } @media (max-width: 560px){ .cf-row{ grid-template-columns: 1fr !important; } } #contact ::placeholder{ color: rgba(244,243,239,0.6) !important; opacity: 1; } #contact select option{ color: var(--lagoon-ink); background: var(--lagoon-white); } #contact select:invalid{ color: rgba(244,243,239,0.6); }`}</style>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = React.useState(null);
  const faqs = [
    { q: 'How do I apply for an apartment at Lagoon?', a: "Browse the featured residences, then send us an enquiry using the form above. We'll walk you through the application from there - a quick, clear process from search to move in." },
    { q: 'Can I book an inspection before I apply?', a: 'Yes. Let us know your inspection preference when you enquire - a private viewing or an open inspection - and we will arrange a time that suits you.' },
    { q: 'How long are the lease terms?', a: 'Lagoon Main Beach is focused on long-term residential living, with leases typically running 12 months. The exact term is confirmed with you during your application.' },
    { q: 'What amenities and inclusions come with the apartment?', a: 'Residents enjoy resort-style amenities including the pool, gym and beautifully landscaped grounds, with secure parking available. Specific inclusions vary by apartment and are confirmed when you enquire.' },
    { q: 'Are pets allowed?', a: "Pet applications are considered on a case-by-case basis. If you have a pet, let us know in your enquiry and we'll talk you through what's possible." },
    { q: 'How are maintenance requests handled during my tenancy?', a: "Report any issue through our team and we'll coordinate repairs with our trusted local contractors, keeping you informed until everything is resolved." },
  ];
  const half = Math.ceil(faqs.length / 2);
  const cols = [faqs.slice(0, half), faqs.slice(half)];
  return (
    <section id="faq" style={{ background: 'var(--lagoon-white)', paddingBlock: 'clamp(4rem, 7vw, 7rem)' }}>
      <Wrap>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }}>
          <div className="lagoon-eyebrow" style={{ color: 'var(--text-coral)', marginBottom: 18 }}>FAQs</div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)', color: 'var(--lagoon-tide)', margin: 0, lineHeight: 1.1 }}>Questions from tenants.</h2>
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

function RentalsApp() {
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
        <RentalsHero />
        <BeachsideIntro />
        <FeaturedResidences />
        <TenantJourney />
        <WhyRentAtLagoon />
        <ContactForm />
        <FAQSection />
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default RentalsApp;
