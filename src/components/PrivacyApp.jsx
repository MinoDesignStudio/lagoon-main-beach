import React from 'react';
import { Icon } from './Icon.jsx';

const B = import.meta.env.BASE_URL.replace(/\/$/, '');

/* Lagoon Privacy Policy Page - standalone. Mino Design and Digital. */
const { useState, useEffect } = React;

/* ─── Image constants ──────────────────────────────────────────────────────── */
const FOOTER_CTA   = `${B}/img/owners-embedded-8.jpg`;
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
    sm: { padding: '11px 20px', fontSize: '12px', tracking: '0.16em' },
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
    { label: 'How we work', href: `${B}/how-we-work/` },
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
          <Button as="a" href={`${B}/contact/`} variant="primary" size="md">BOOK NOW</Button>
        </div>

        <button aria-label="Menu" style={{
          justifySelf: 'end', gridColumn: 3, display: 'none', background: 'none', border: 'none', padding: '9px', margin: '-9px', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: onHero ? 'var(--lagoon-ocean-mist)' : 'var(--lagoon-ink)',
        }} onClick={() => setMenuOpen(m => !m)} className="nav-burger"><Icon name={menuOpen ? 'x' : 'menu'} size={26} /></button>
      </div>

      <style>{`@media (max-width:900px){ .nav-burger{ display:inline-flex !important; } } .nav-burger .lucide{ width:50px !important; height:50px !important; }`}</style>
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
            <Button as="a" href={`${B}/contact/`} variant="primary" size="md" style={{ width: '100%', justifyContent: 'center' }}>BOOK NOW</Button>
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
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--lagoon-ocean-mist)', fontSize: 'var(--text-md)', lineHeight: 1.6, margin: 0, maxWidth: '44ch' }}>Whether you're looking to rent at Lagoon or exploring property management, we're here to help.</p>
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
              11 Cronin Avenue<br />Main Beach QLD 4217<br /><br />
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
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, fontWeight: 500, color: 'var(--lagoon-ocean-mist)' }}>© 2026 Lagoon Main Beach. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 22 }}>
            <a href={`${B}/privacy/`} style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, fontWeight: 500, color: 'var(--lagoon-ocean-mist)' }} onMouseEnter={onEnter} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--lagoon-ocean-mist)'}>Privacy Policy</a>
          </div>
        </Wrap>
      </div>

      <style>{`
        @media (max-width: 900px){ .foot-grid{ grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 520px){ .foot-grid{ grid-template-columns: 1fr !important; } }
        @media (max-width: 680px){ .foot-cta{ grid-template-columns: 1fr !important; } .foot-cta > img { display: block !important; height: 220px !important; width: 100% !important; order: -1; } }
      `}</style>
    </footer>
  );
}

/* ─── Page Sections ────────────────────────────────────────────────────────── */

function PrivacyHero() {
  return (
    <section id="top" style={{
      position: 'relative', minHeight: '38vh',
      display: 'flex', alignItems: 'center',
      background: 'var(--lagoon-tide)',
    }}>
      <Wrap style={{ position: 'relative', width: '100%', paddingBlock: 'clamp(6.5rem, 13vw, 10rem)', textAlign: 'center' }}>
        <div style={{ margin: '0 auto', maxWidth: 760 }}>
          <img src={FAVICON_LOGO} alt="" aria-hidden="true" style={{ height: 26, marginBottom: 20, opacity: 0.92, filter: 'brightness(0) invert(1)' }} />
          <h1 style={{ color: 'var(--lagoon-ocean-mist)', margin: '0 0 0.4em', fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.08 }}>
            Privacy Policy
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(244,243,239,0.88)', fontSize: 'var(--text-lg)', lineHeight: 1.55, maxWidth: '52ch', margin: '0 auto' }}>
            How we collect, use, and protect your personal information.
          </p>
        </div>
      </Wrap>
      <Wave fill="var(--lagoon-white)" style={{ position: 'absolute', left: 0, right: 0, bottom: -1 }} />
    </section>
  );
}

function PrivacyContent() {
  const h2 = { fontFamily: 'var(--font-display)', fontSize: 'clamp(1.25rem, 1.9vw, 1.55rem)', fontWeight: 400, color: 'var(--lagoon-tide)', textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.2, margin: '2.6rem 0 0.9rem' };
  const p = { fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', color: 'var(--text-muted)', lineHeight: 1.8, margin: '0 0 1rem' };
  const ul = { ...p, paddingLeft: '1.3rem', margin: '0 0 1rem' };
  const li = { marginBottom: '0.5rem' };
  const a = { color: 'var(--lagoon-tide)', textDecoration: 'underline' };

  return (
    <section style={{ background: 'var(--lagoon-white)', paddingBlock: 'clamp(3rem, 6vw, 5.5rem)' }}>
      <Wrap>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', letterSpacing: '0.04em', margin: '0 0 2rem', textTransform: 'uppercase' }}>
            Last updated: 16 June 2026
          </p>

          <p style={p}>
            Lagoon Main Beach ("we", "us", "our") is committed to protecting your privacy. This policy explains how we collect, use, hold, and disclose your personal information, and how we comply with the Australian Privacy Principles (APPs) under the Privacy Act 1988 (Cth). By using our website or services, you agree to the collection and use of information in accordance with this policy.
          </p>

          <h2 style={h2}>Who we are</h2>
          <p style={p}>
            Lagoon Main Beach provides residential rental and property management services at 11 Cronin Avenue, Main Beach QLD 4217. If you have any questions about this policy or how we handle your information, you can contact us using the details at the end of this page.
          </p>

          <h2 style={h2}>Information we collect</h2>
          <p style={p}>The personal information we collect may include:</p>
          <ul style={ul}>
            <li style={li}>Your name, email address, phone number, and postal address.</li>
            <li style={li}>Details of the property you own or are enquiring about, including tenancy and lease information.</li>
            <li style={li}>Information you provide in enquiry, application, or contact forms, including your preferences and any notes you choose to share.</li>
            <li style={li}>Identity and supporting documentation required to assess a rental application or manage a property, where applicable.</li>
            <li style={li}>Technical information such as your IP address, browser type, and how you use our website (see "Cookies and analytics" below).</li>
          </ul>

          <h2 style={h2}>How we collect your information</h2>
          <p style={p}>
            We collect personal information directly from you when you complete a form on our website, email or call us, apply for a property, or otherwise interact with our team. We may also collect information from third parties such as referees, previous agents, or tenancy databases where this is reasonably necessary and permitted by law.
          </p>

          <h2 style={h2}>How we use your information</h2>
          <p style={p}>We use your personal information to:</p>
          <ul style={ul}>
            <li style={li}>Respond to your enquiries and provide the services you have requested.</li>
            <li style={li}>Process rental applications and manage tenancies and properties.</li>
            <li style={li}>Communicate with you about your enquiry, property, or tenancy.</li>
            <li style={li}>Maintain and improve our website and services.</li>
            <li style={li}>Meet our legal, regulatory, and contractual obligations.</li>
          </ul>

          <h2 style={h2}>Disclosure of your information</h2>
          <p style={p}>
            We do not sell your personal information. We may disclose it to third parties where reasonably necessary to provide our services, including property owners, prospective or current tenants, trades and contractors, referees, tenancy databases, and our professional advisers. We may also disclose information where required or authorised by law. We take reasonable steps to ensure any third party handles your information in line with applicable privacy laws.
          </p>

          <h2 style={h2}>Storage and security</h2>
          <p style={p}>
            We take reasonable steps to protect the personal information we hold from misuse, interference, loss, and unauthorised access, modification, or disclosure. When information is no longer required, we take reasonable steps to securely destroy or de-identify it. While we strive to protect your information, no method of transmission over the internet or electronic storage is completely secure.
          </p>

          <h2 style={h2}>Cookies and website analytics</h2>
          <p style={p}>
            Our website may use cookies and similar technologies to help it function and to understand how visitors use it. You can set your browser to refuse cookies, though some parts of the site may not work as intended. We may use analytics services to collect aggregated, non-identifying information about website usage to help us improve our content and experience.
          </p>

          <h2 style={h2}>Access and correction</h2>
          <p style={p}>
            You may request access to the personal information we hold about you, and ask us to correct it if it is inaccurate, out of date, incomplete, or misleading. To make a request, please contact us using the details below. We will respond within a reasonable period and may need to verify your identity first.
          </p>

          <h2 style={h2}>Complaints</h2>
          <p style={p}>
            If you believe we have breached the Australian Privacy Principles or mishandled your personal information, please contact us so we can investigate and respond. If you are not satisfied with our response, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC) at <a style={a} href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer">www.oaic.gov.au</a>.
          </p>

          <h2 style={h2}>Links to other websites</h2>
          <p style={p}>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites, and we encourage you to review their privacy policies.
          </p>

          <h2 style={h2}>Changes to this policy</h2>
          <p style={p}>
            We may update this policy from time to time. Any changes will be published on this page with a revised "last updated" date. We encourage you to review this page periodically.
          </p>

          <h2 style={h2}>Contact us</h2>
          <p style={p}>
            If you have any questions, requests, or concerns about this privacy policy or your personal information, please contact us:
          </p>
          <p style={p}>
            Lagoon Main Beach<br />
            11 Cronin Avenue, Main Beach QLD 4217<br />
            Phone: <a style={a} href="tel:0736668609">07 3666 8609</a><br />
            Email: <a style={a} href="mailto:reception@lagoonmainbeach.com">reception@lagoonmainbeach.com</a>
          </p>

          <p style={{ ...p, fontStyle: 'italic', marginTop: '2.5rem', fontSize: 'var(--text-sm)' }}>
            This privacy policy is provided as a general template and should be reviewed by the business and, where appropriate, a qualified legal adviser before publication to ensure it accurately reflects your practices and obligations.
          </p>
        </div>
      </Wrap>
    </section>
  );
}

function PrivacyApp() {
  return (
    <React.Fragment>
      <Nav />
      <main>
        <PrivacyHero />
        <PrivacyContent />
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default PrivacyApp;
