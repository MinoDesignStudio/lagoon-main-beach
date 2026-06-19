import React from 'react';
const B = import.meta.env.BASE_URL.replace(/\/$/, '');

/* Lagoon About Alcyone Page - standalone. Mino Design and Digital. */
/* ─── Image constants ──────────────────────────────────────────────────────── */
const FOOTER_CTA   = `${B}/img/owners-embedded-8.jpg`;
const PARALLAX_IMG = `${B}/img/hero-pano.jpg`;
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

function BIcon({ svg, size = 28 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: svg }} />
  );
}

/* ─── Footer CTA band (page-specific; sits above the shared SiteFooter) ─────── */
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

function AlcyoneHero() {
  return (
    <section id="top" style={{
      position: 'relative', minHeight: '46vh',
      display: 'flex', alignItems: 'center',
      background: 'var(--lagoon-tide)',
    }}>
      <Wrap style={{ position: 'relative', width: '100%', paddingBlock: 'clamp(7rem, 14vw, 11rem)', textAlign: 'center' }}>
        <div className="reveal in" style={{ margin: '0 auto', maxWidth: 760 }}>
          <img src={FAVICON_LOGO} alt="" aria-hidden="true" style={{ height: 26, marginBottom: 20, opacity: 0.92, filter: 'brightness(0) invert(1)' }} />
          <h1 style={{ color: 'var(--lagoon-ocean-mist)', margin: '0 0 0.4em', fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.08 }}>
            About Alcyone Group
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(244,243,239,0.88)', fontSize: 'var(--text-lg)', lineHeight: 1.55, maxWidth: '52ch', margin: '0 auto' }}>
            Premium residential management by a professional operator.
          </p>
        </div>
      </Wrap>
      <Wave fill="var(--lagoon-ocean-mist)" style={{ position: 'absolute', left: 0, right: 0, bottom: -1 }} />
    </section>
  );
}

function TheGroup() {
  return (
    <section style={{ background: 'var(--lagoon-ocean-mist)', paddingTop: 'clamp(2rem, 3.5vw, 3rem)', paddingBottom: 'clamp(4rem, 7vw, 6.5rem)' }}>
      <Wrap>
        <div className="reveal" style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'var(--text-display-m)', color: 'var(--lagoon-tide)', margin: '0 0 0.8em' }}>Part of the Citimark Properties Group</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.02rem, 1.5vw, 1.18rem)', lineHeight: 1.8, color: 'var(--text-muted)', fontWeight: 300, margin: '0 0 1.4rem' }}>
            Alcyone Group is a Queensland-based management rights operator specialising in the management of premium residential apartment communities.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.02rem, 1.5vw, 1.18rem)', lineHeight: 1.8, color: 'var(--text-muted)', fontWeight: 300, margin: 0 }}>
            The business forms part of the Citimark Properties Group, a privately owned developer and investment company with more than three decades of experience across residential, commercial and mixed-use developments.
          </p>
        </div>
      </Wrap>
    </section>
  );
}

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

function Model() {
  const items = [
    {
      title: 'Building management',
      desc: 'Day-to-day oversight of the building, its services and common areas, held to a consistent operational standard.',
      svg: '<path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 9h.01M9 13h.01M9 17h.01M15 9h.01M15 13h.01M15 17h.01"/>',
    },
    {
      title: 'Asset presentation',
      desc: 'Maintaining the condition and appeal of each apartment and the wider community to protect long-term value.',
      svg: '<path d="m12 3 1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z"/>',
    },
    {
      title: 'Structured residential leasing',
      desc: 'A disciplined leasing process focused on tenant quality, stable occupancy and dependable income.',
      svg: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/>',
    },
  ];
  return (
    <section style={{ background: 'var(--lagoon-white)', paddingBlock: 'clamp(4rem, 7vw, 6.5rem)' }}>
      <Wrap>
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto clamp(2.4rem, 5vw, 3.6rem)' }}>
          <Eyebrow color="coral" align="center" style={{ marginBottom: 14 }}>Our Model</Eyebrow>
          <h2 style={{ fontSize: 'var(--text-display-m)', color: 'var(--lagoon-tide)', margin: '0 0 0.6em' }}>A vertically integrated approach</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
            Through Alcyone, a vertically integrated property management model has been developed, combining three core disciplines.
          </p>
        </div>
        <div className="reveal manage-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(24px, 3vw, 44px)' }}>
          {items.map((it) => (
            <div key={it.title} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%', background: 'rgba(66,115,128,0.10)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, color: 'var(--lagoon-tide)',
              }}>
                <BIcon svg={it.svg} size={26} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)', fontWeight: 400, color: 'var(--lagoon-tide)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 10px' }}>{it.title}</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, maxWidth: '26ch' }}>{it.desc}</p>
            </div>
          ))}
        </div>
      </Wrap>
      <style>{`@media(max-width:760px){.manage-grid{grid-template-columns:1fr !important;row-gap:2.6rem !important;}}`}</style>
    </section>
  );
}

function ClosingStatement() {
  return (
    <section style={{ background: 'var(--lagoon-white)', paddingTop: 0, paddingBottom: 'clamp(4rem, 7vw, 6.5rem)' }}>
      <Wrap>
        <div className="reveal" style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'var(--text-display-m)', color: 'var(--lagoon-tide)', margin: '0 0 0.8em' }}>How We Operate</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.05rem, 1.6vw, 1.22rem)', lineHeight: 1.75, color: 'var(--text-muted)', fontWeight: 300, margin: 0 }}>
            This model ensures that leasing, operations and presentation standards are managed in alignment, supporting consistent tenant quality, stable income and long-term asset performance.
          </p>
        </div>
      </Wrap>
    </section>
  );
}

function AboutAlcyoneApp() {
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
        <AlcyoneHero />
        <TheGroup />
        <ParallaxBand />
        <Model />
        <ClosingStatement />
      </main>
      <FooterCta />
    </React.Fragment>
  );
}

export default AboutAlcyoneApp;
