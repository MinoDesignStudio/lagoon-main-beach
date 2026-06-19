import React from 'react';
const B = import.meta.env.BASE_URL.replace(/\/$/, '');

/* Lagoon Contact Page - standalone. Mino Design and Digital. */
/* ─── Image constants ──────────────────────────────────────────────────────── */
const FOOTER_CTA   = `${B}/img/owners-embedded-8.jpg`;
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

/* ─── Footer CTA ───────────────────────────────────────────────────────────── */
function FooterCta() {
  const cream = 'var(--lagoon-ocean-mist)';

  return (
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
  );
}

/* ─── Page Sections ────────────────────────────────────────────────────────── */

function ContactHero() {
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
            Get in Touch
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(244,243,239,0.88)', fontSize: 'var(--text-lg)', lineHeight: 1.55, maxWidth: '52ch', margin: '0 auto' }}>
            Whether you're a tenant or an owner, we'd love to hear from you.
          </p>
        </div>
      </Wrap>
      <Wave fill="var(--lagoon-ocean-mist)" style={{ position: 'absolute', left: 0, right: 0, bottom: -1 }} />
    </section>
  );
}

function PathCard({ eyebrow, title, body, cta, href, tone = 'light', titleColor }) {
  const tones = {
    light: { bg: 'var(--lagoon-white)', fg: 'var(--text-body)', eb: 'tide', btn: 'primary' },
    brand: { bg: 'var(--lagoon-tide)', fg: 'var(--lagoon-ocean-mist)', eb: 'mist', btn: 'inverse' },
  };
  const t = tones[tone] || tones.light;
  return (
    <div style={{
      position: 'relative', background: t.bg, color: t.fg,
      borderRadius: 'var(--radius-lg)', padding: '40px 38px',
      boxShadow: tone === 'light' ? 'var(--shadow-md)' : 'var(--shadow-lg)',
      overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 18, minHeight: 248,
    }}>
      <Eyebrow color={t.eb}>{eyebrow}</Eyebrow>
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 31, lineHeight: 1.05, letterSpacing: 'var(--ls-feature)', textTransform: 'uppercase', margin: 0, color: titleColor || t.fg, whiteSpace: 'nowrap' }}>{title}</h2>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.65, margin: 0, color: t.fg, opacity: tone === 'light' ? 0.78 : 0.85 }}>{body}</p>
      <div style={{ marginTop: 'auto', paddingTop: 8 }}>
        <Button as="a" href={href} variant={t.btn} size="sm">{cta}</Button>
      </div>
    </div>
  );
}

function ContactPaths() {
  return (
    <section style={{ background: 'var(--lagoon-ocean-mist)', paddingBlock: 'clamp(4rem, 7vw, 6.5rem)' }}>
      <Wrap>
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(20px, 2.4vw, 32px)', maxWidth: 960, margin: '0 auto' }}>
          <PathCard
            tone="brand"
            eyebrow="For Tenants"
            title="Rent at Lagoon"
            body="Looking for your next home by the beach? Send us an enquiry or book a viewing and our team will be in touch."
            cta="Enquire as a Tenant"
            href={`${B}/rentals/#contact`}
          />
          <PathCard
            tone="light"
            eyebrow="For Owners"
            title="Let with Lagoon"
            titleColor="var(--lagoon-tide)"
            body="Want to maximise your investment with expert management? Request a proposal and we'll tailor it to your property."
            cta="Enquire as an Owner"
            href={`${B}/owners/#contact`}
          />
        </div>
      </Wrap>
    </section>
  );
}

function ContactDetails() {
  const items = [
    {
      label: 'Call us',
      value: '07 3666 8609',
      href: 'tel:0736668609',
      svg: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>,
    },
    {
      label: 'Email us',
      value: 'reception@lagoonmainbeach.com',
      href: 'mailto:reception@lagoonmainbeach.com',
      svg: <><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></>,
    },
    {
      label: 'Visit us',
      value: '11 Cronin Avenue, Main Beach QLD 4217',
      href: 'https://maps.google.com/maps?q=11+Cronin+Avenue+Main+Beach+QLD+4217+Australia',
      svg: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></>,
    },
  ];
  return (
    <section style={{ background: 'var(--lagoon-white)', paddingBlock: 'clamp(3.5rem, 6vw, 5.5rem)' }}>
      <Wrap>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 'clamp(2.2rem, 4vw, 3rem)' }}>
          <Eyebrow color="coral" align="center" style={{ marginBottom: 14 }}>Reach Us Directly</Eyebrow>
          <h2 style={{ fontSize: 'var(--text-display-m)', color: 'var(--lagoon-tide)', margin: 0 }}>Prefer to call or email?</h2>
        </div>
        <div className="reveal contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(24px, 3vw, 44px)' }}>
          {items.map((it) => (
            <a key={it.label} href={it.href} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', textDecoration: 'none' }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%', background: 'rgba(66,115,128,0.10)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, color: 'var(--lagoon-tide)',
              }}>
                <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{it.svg}</svg>
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--lagoon-tide)', marginBottom: 8 }}>{it.label}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '24ch' }}>{it.value}</div>
            </a>
          ))}
        </div>
      </Wrap>
      <style>{`@media(max-width:720px){.contact-grid{grid-template-columns:1fr !important;row-gap:2.6rem !important;}}`}</style>
    </section>
  );
}

function ContactApp() {
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
      <main>
        <ContactHero />
        <ContactPaths />
        <ContactDetails />
      </main>
      <FooterCta />
    </React.Fragment>
  );
}

export default ContactApp;
