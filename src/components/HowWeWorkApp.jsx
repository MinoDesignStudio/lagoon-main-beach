import React from 'react';
import { Icon } from './Icon.jsx';

const B = import.meta.env.BASE_URL.replace(/\/$/, '');

/* Lagoon How We Work Page - standalone. Mino Design and Digital. */
const { useState, useEffect } = React;

/* ─── Image constants ──────────────────────────────────────────────────────── */
const FOOTER_CTA   = `${B}/img/owners-embedded-8.jpg`;
const PARALLAX_IMG = `${B}/img/porte-cochere.jpg`;
const FOOTER_LOGO  = `${B}/img/owners-embedded-9.svg`;
const NAV_LOGO_W   = `${B}/img/owners-embedded-10.svg`;
const NAV_LOGO_D   = `${B}/img/owners-embedded-11.svg`;
const FAVICON_LOGO = `${B}/img/owners-embedded-12.png`;

/* ─── Shared components ────────────────────────────────────────────────────── */

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

function Eyebrow({ children, color = 'tide', align = 'left', ...rest }) {
  const colors = { tide: 'var(--lagoon-tide)', coral: 'var(--lagoon-coral-600)', ink: 'var(--lagoon-ink)', mist: 'var(--lagoon-ocean-mist)', muted: 'var(--text-muted)' };
  return (
    <div style={{ textAlign: align }} {...rest}>
      <span style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 'var(--text-xs)', letterSpacing: '0.32em', textTransform: 'uppercase', color: colors[color] || colors.tide, whiteSpace: 'nowrap' }}>{children}</span>
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
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onHero = false;

  const navLinks = [
    { label: 'Rentals', href: `${B}/rentals/` },
    { label: 'Owners', href: `${B}/owners/` },
    { label: 'How we work', href: '#top' },
    { label: 'About', href: `${B}/about/` },
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
          <Button as="a" href={`${B}/rentals/#contact`} variant="primary" size="md">BOOK NOW</Button>
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
            <Button as="a" href={`${B}/rentals/#contact`} variant="primary" size="md" style={{ width: '100%', justifyContent: 'center' }}>BOOK NOW</Button>
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
  const pageHrefs = { 'Rentals': `${B}/rentals/`, 'Owners': `${B}/owners/`, 'How We Work': `${B}/how-we-work/`, 'About': `${B}/about/`, 'Contact': `${B}/contact/` };
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
            <Button as="a" href={`${B}/rentals/`} variant="inverse" size="md">View Available Rentals</Button>
            <Button as="a" href={`${B}/owners/`} variant="secondary" size="md" style={{ color: cream, borderColor: 'var(--border-on-brand)' }}>Management for Owners</Button>
          </div>
        </div>
        <img src={FOOTER_CTA} alt="Lagoon Main Beach aerial view" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>

      <Wrap style={{ paddingBlock: 'clamp(3rem, 5vw, 4.5rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr 1fr 1.2fr', gap: 'clamp(1.5rem, 3vw, 2.5rem)', alignItems: 'start' }} className="foot-grid">
          <div>
            <img src={FOOTER_LOGO} alt="Lagoon Main Beach" style={{ height: 92, marginBottom: 22, display: 'block' }} />
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.7, color: 'rgba(244,243,239,0.72)', maxWidth: '34ch', margin: 0 }}>
              Premium long-term rentals and expert property management at Lagoon Main Beach.
            </p>
          </div>

          {cols.map((c) => (
            <nav key={c.h}>
              <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: cream, margin: '0 0 12px', opacity: 0.9 }}>{c.h}</h4>
              {c.links.map((l) => (
                <a key={l} href={pageHrefs[l] || '#'} style={linkStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>{l}</a>
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

function HowWeWorkHero() {
  return (
    <section id="top" style={{
      position: 'relative', minHeight: '46vh',
      display: 'flex', alignItems: 'center',
      background: 'var(--lagoon-tide)',
    }}>
      <Wrap style={{ position: 'relative', width: '100%', paddingBlock: 'clamp(7rem, 14vw, 11rem)', textAlign: 'center' }}>
        <div className="reveal in" style={{ margin: '0 auto', maxWidth: 720 }}>
          <img src={FAVICON_LOGO} alt="" aria-hidden="true" style={{ height: 26, marginBottom: 20, opacity: 0.92, filter: 'brightness(0) invert(1)' }} />
          <h1 style={{ color: 'var(--lagoon-ocean-mist)', margin: '0 0 0.4em', fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.08 }}>
            How We Work
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(244,243,239,0.88)', fontSize: 'var(--text-lg)', lineHeight: 1.55, maxWidth: '52ch', margin: '0 auto' }}>
            Whether you're looking for your next home or entrusting us with your investment, here's what to expect.
          </p>
        </div>
      </Wrap>
      <Wave fill="var(--lagoon-ocean-mist)" style={{ position: 'absolute', left: 0, right: 0, bottom: -1 }} />
    </section>
  );
}

const TENANT_STEPS = [
  { n: '1', title: 'Enquire',         desc: 'Browse listings and get in touch with any questions.' },
  { n: '2', title: 'Inspect',         desc: 'Book a private viewing at a time that suits you.' },
  { n: '3', title: 'Apply',           desc: 'Submit your application with supporting documents.' },
  { n: '4', title: 'Approval',        desc: 'Quick, fair assessment with clear communication.' },
  { n: '5', title: 'Lease',           desc: 'Sign your lease and receive your move-in guide.' },
  { n: '6', title: 'Move In',         desc: "Welcome to Lagoon. We're here whenever you need us." },
  { n: '7', title: 'Ongoing Support', desc: 'Responsive maintenance and a team that cares.' },
];

const OWNER_STEPS = [
  { n: '1', title: 'Consultation',      desc: 'Discuss your property goals and expectations.' },
  { n: '2', title: 'Appraisal',         desc: 'Market analysis and rental yield assessment.' },
  { n: '3', title: 'Onboarding',        desc: 'Seamless setup with documentation and compliance.' },
  { n: '4', title: 'Marketing',         desc: 'Professional photography and targeted advertising.' },
  { n: '5', title: 'Leasing',           desc: 'Tenant screening, viewings, and lease execution.' },
  { n: '6', title: 'Manage & Maintain', desc: 'Inspections, maintenance, and tenant relations.' },
  { n: '7', title: 'Reporting',         desc: 'Monthly statements and transparent communication.' },
];

function ParallaxBand() {
  const secRef = React.useRef(null);
  const imgRef = React.useRef(null);
  React.useEffect(() => {
    const sec = secRef.current, img = imgRef.current;
    if (!sec || !img) return;
    let raf = null;
    const update = () => {
      raf = null;
      const rect = sec.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const delta = window.innerHeight / 2 - sectionCenter;
      const shift = Math.max(-70, Math.min(70, delta * 0.12));
      img.style.transform = `translate3d(0, ${shift}px, 0)`;
    };
    const onScroll = () => { if (raf == null) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <section ref={secRef} aria-hidden="true" style={{ position: 'relative', height: 'clamp(280px, 42vw, 520px)', overflow: 'hidden', background: 'var(--lagoon-ink)' }}>
      <div ref={imgRef} style={{
        position: 'absolute', top: -90, bottom: -90, left: 0, right: 0,
        backgroundImage: `url("${PARALLAX_IMG}")`, backgroundSize: 'cover', backgroundPosition: 'center',
        willChange: 'transform',
      }} />
    </section>
  );
}

function ProcessFlow({ eyebrow, title, steps, bg }) {
  return (
    <section style={{ background: bg, paddingBlock: 'clamp(4rem, 7vw, 6.5rem)' }}>
      <Wrap>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 'clamp(2.4rem, 5vw, 4rem)' }}>
          <Eyebrow color="coral" align="center" style={{ marginBottom: 14 }}>{eyebrow}</Eyebrow>
          <h2 style={{ fontSize: 'var(--text-display-m)', color: 'var(--lagoon-tide)', margin: 0 }}>{title}</h2>
        </div>
        <div className="reveal process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'clamp(28px, 3vw, 44px) clamp(24px, 3vw, 40px)' }}>
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
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', color: 'var(--text-muted)', fontWeight: 300, lineHeight: 1.6, margin: 0, maxWidth: '22ch' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </Wrap>
      <style>{`
        .process-grid .step-item:nth-child(4n) .step-line, .process-grid .step-item:last-child .step-line { display: none; }
        @media(max-width:760px){
          .process-grid{ grid-template-columns:1fr 1fr !important; }
          .process-grid .step-item:nth-child(4n) .step-line { display: block; }
          .process-grid .step-item:nth-child(2n) .step-line, .process-grid .step-item:last-child .step-line { display: none; }
        }
        @media(max-width:430px){
          .process-grid{ grid-template-columns:1fr !important; }
          .process-grid .step-item .step-line { display: none !important; }
        }
      `}</style>
    </section>
  );
}

function HowWeWorkApp() {
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
        <HowWeWorkHero />
        <ProcessFlow eyebrow="For Tenants" title="Renting With Us" steps={TENANT_STEPS} bg="var(--lagoon-ocean-mist)" />
        <ParallaxBand />
        <ProcessFlow eyebrow="For Owners" title="Managing Your Property" steps={OWNER_STEPS} bg="var(--lagoon-white)" />
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default HowWeWorkApp;
