import React from 'react';
import { Icon } from './Icon.jsx';

const B = import.meta.env.BASE_URL.replace(/\/$/, '');

/* Lagoon component library - generated from /components for standalone use in the UI kit. */
const { useState, useEffect, useRef } = React;

/* components/core/Tag.jsx */


/**
 * Lagoon - Tag
 * Small pill label for amenities, status and metadata.
 */
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
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      background: bg,
      color: fg,
      fontFamily: 'var(--font-body)',
      fontWeight: 500,
      fontSize: '11px',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      padding: '6px 13px',
      borderRadius: 'var(--radius-pill)',
      lineHeight: 1,
      whiteSpace: 'nowrap',
    }} {...rest}>{children}</span>
  );
}


/* components/core/Button.jsx */


/**
 * Lagoon - Button
 * Primary CTA in Tide, plus outline + ghost variants.
 * Labels are UPPERCASE Montserrat Medium with wide tracking (brand signature).
 */
function Button({
  children,
  variant = 'primary',   // 'primary' | 'secondary' | 'ghost' | 'inverse'
  size = 'md',           // 'sm' | 'md' | 'lg'
  fullWidth = false,
  disabled = false,
  iconRight = null,
  iconLeft = null,
  as = 'button',
  style: styleOverride,
  ...rest
}) {
  const sizes = {
    sm: { padding: '8px 18px', fontSize: '11px', tracking: '0.16em' },
    md: { padding: '13px 28px', fontSize: '12px', tracking: '0.18em' },
    lg: { padding: '17px 38px', fontSize: '13px', tracking: '0.2em' },
  };
  const s = sizes[size] || sizes.md;

  const variants = {
    primary: {
      background: 'var(--lagoon-tide)',
      color: 'var(--lagoon-ocean-mist)',
      border: '1px solid var(--lagoon-tide)',
    },
    secondary: {
      background: 'transparent',
      color: 'var(--lagoon-tide)',
      border: '1px solid var(--lagoon-tide)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--lagoon-tide)',
      border: '1px solid transparent',
    },
    inverse: {
      background: 'var(--lagoon-ocean-mist)',
      color: 'var(--lagoon-tide)',
      border: '1px solid var(--lagoon-ocean-mist)',
    },
  };

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    width: fullWidth ? '100%' : 'auto',
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: s.tracking,
    fontSize: s.fontSize,
    lineHeight: 1,
    padding: s.padding,
    borderRadius: 'var(--radius-pill)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
    ...variants[variant],
  };

  const mergedStyle = { ...base, ...styleOverride };
  const Tag = as;
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
    <Tag
      style={mergedStyle}
      disabled={as === 'button' ? disabled : undefined}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = 'translateY(1px)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'none'; }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </Tag>
  );
}


/* components/core/Eyebrow.jsx */


/**
 * Lagoon - Eyebrow
 * Wide-tracked uppercase Montserrat kicker that sits above display headings.
 * Optional flanking hairlines for the editorial "MAIN BEACH · GOLD COAST" look.
 */
function Eyebrow({ children, color = 'tide', rule = false, align = 'left', ...rest }) {
  const colors = {
    tide: 'var(--lagoon-tide)',
    coral: 'var(--lagoon-coral-600)',
    ink: 'var(--lagoon-ink)',
    mist: 'var(--lagoon-ocean-mist)',
    muted: 'var(--text-muted)',
  };
  const label = (
    <span style={{
      fontFamily: 'var(--font-body)',
      fontWeight: 500,
      fontSize: 'var(--text-xs)',
      letterSpacing: '0.32em',
      textTransform: 'uppercase',
      color: colors[color] || colors.tide,
      whiteSpace: 'nowrap',
    }}>{children}</span>
  );
  if (!rule) {
    return <div style={{ textAlign: align }} {...rest}>{label}</div>;
  }
  const line = <span style={{ flex: 1, height: 1, background: 'currentColor', opacity: 0.35, color: colors[color] || colors.tide }} />;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} {...rest}>
      {(align === 'center' || align === 'right') && line}
      {label}
      {(align === 'center' || align === 'left') && line}
    </div>
  );
}


/* components/forms/Input.jsx */


/**
 * Lagoon - Input
 * Text field with a wide-tracked uppercase label. Calm, editorial styling - 
 * hairline border, Tide focus. Works for text / email / tel / textarea / select.
 */
function Input({
  label,
  type = 'text',
  placeholder = '',
  value,
  defaultValue,
  onChange,
  hint,
  error,
  options,           // when provided -> renders a <select>
  multiline = false, // -> renders a <textarea>
  id,
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  const fid = id || `lg-${Math.random().toString(36).slice(2, 8)}`;
  const borderColor = error ? '#b06a5a' : focused ? 'var(--lagoon-tide)' : 'var(--border-strong)';

  const fieldStyle = {
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-base)',
    color: 'var(--text-body)',
    background: 'var(--lagoon-white)',
    border: `1px solid ${borderColor}`,
    borderRadius: 'var(--radius-sm)',
    padding: multiline ? '12px 14px' : '0 14px',
    height: multiline ? 'auto' : '46px',
    minHeight: multiline ? '110px' : undefined,
    outline: 'none',
    transition: 'border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
    boxShadow: focused ? '0 0 0 3px var(--focus-ring)' : 'none',
    resize: multiline ? 'vertical' : undefined,
    appearance: options ? 'none' : undefined,
  };

  const common = {
    id: fid,
    value, defaultValue, onChange, placeholder,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: fieldStyle,
    ...rest,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      {label && (
        <label htmlFor={fid} style={{
          fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '11px',
          letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)',
        }}>{label}</label>
      )}
      {options ? (
        <div style={{ position: 'relative' }}>
          <select {...common}>
            {placeholder && <option value="" disabled>{placeholder}</option>}
            {options.map((o) => {
              const val = typeof o === 'string' ? o : o.value;
              const lab = typeof o === 'string' ? o : o.label;
              return <option key={val} value={val}>{lab}</option>;
            })}
          </select>
          <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--lagoon-tide)', fontSize: 12 }}>▾</span>
        </div>
      ) : multiline ? (
        <textarea {...common} />
      ) : (
        <input type={type} {...common} />
      )}
      {(hint || error) && (
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: error ? '#b06a5a' : 'var(--text-muted)' }}>
          {error || hint}
        </span>
      )}
    </div>
  );
}


/* components/cards/ResidenceCard.jsx */




/**
 * Lagoon - ResidenceCard
 * A listing card: arch-topped photo, amenity tags, serif title, location, price.
 */
function ResidenceCard({
  image,
  title = 'Residence',
  location = null,
  price,
  period = 'week',
  tags = [],
  status,          // e.g. 'Available now'
  onView,
}) {
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


/* components/cards/ServiceCard.jsx */




/**
 * Lagoon - ServiceCard
 * Presents one of the two brand services (Rent / Let). Tide or cream surface.
 */
function ServiceCard({
  eyebrow = 'Service',
  title,
  body,
  cta = 'Discover more',
  onCta,
  tone = 'light',   // 'light' (cream) | 'brand' (tide) | 'ink'
  titleColor,
}) {
  const tones = {
    light: { bg: 'var(--lagoon-white)', fg: 'var(--text-body)', eb: 'tide', btn: 'primary' },
    brand: { bg: 'var(--lagoon-tide)', fg: 'var(--lagoon-ocean-mist)', eb: 'mist', btn: 'inverse' },
    ink:   { bg: 'var(--lagoon-ink)', fg: 'var(--lagoon-ocean-mist)', eb: 'mist', btn: 'inverse' },
  };
  const t = tones[tone] || tones.light;
  return (
    <div style={{
      position: 'relative',
      background: t.bg,
      color: t.fg,
      borderRadius: 'var(--radius-lg)',
      padding: '40px 38px',
      boxShadow: tone === 'light' ? 'var(--shadow-md)' : 'var(--shadow-lg)',
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column', gap: 18, minHeight: 240,
    }}>
      <Eyebrow color={t.eb}>{eyebrow}</Eyebrow>
      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 31, lineHeight: 1.05, letterSpacing: 'var(--ls-feature)', textTransform: 'uppercase', margin: 0, color: titleColor || t.fg, whiteSpace: 'nowrap' }}>{title}</h3>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.65, margin: 0, color: t.fg, opacity: tone === 'light' ? 0.78 : 0.85 }}>{body}</p>
      <div style={{ marginTop: 'auto', paddingTop: 8 }}>
        <Button variant={t.btn} size="sm" onClick={onCta}>{cta}</Button>
      </div>
    </div>
  );
}


/* Shared helpers for the Lagoon homepage. */


const MAXW = 1320;

function Wrap({ children, style, ...rest }) {
  return (
    <div style={{ maxWidth: MAXW, margin: '0 auto', paddingInline: 'clamp(1.25rem, 4vw, 2.75rem)', ...style }} {...rest}>
      {children}
    </div>
  );
}

/* Organic wave divider. `fill` = the colour the wave resolves INTO (the next band). */
function Wave({ fill = 'var(--lagoon-ocean-mist)', flip = false, height, style }) {
  return (
    <div className="wave" style={{ color: fill, height, transform: flip ? 'scaleX(-1)' : undefined, ...style }} aria-hidden="true">
      <svg viewBox="0 0 1200 180" preserveAspectRatio="none">
        <path fill="currentColor" d="M0,70 C170,176 330,176 500,96 C660,20 760,8 900,52 C1010,86 1110,108 1200,84 L1200,180 L0,180 Z"></path>
      </svg>
    </div>
  );
}

/* Lucide icon - re-renders the glyph after mount. */


/* Fixed site navigation - blue logo left, links + two CTAs right. */
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

  const links = ['Rentals', 'Owners', 'How we work', 'About', 'Contact'];
  const linkHrefs = {};

  const onHero = !scrolled; // transparent white nav over the hero image

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? 'rgba(244,243,239,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'saturate(1.4) blur(14px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'saturate(1.4) blur(14px)' : 'none',
      borderBottom: `1px solid ${scrolled ? 'var(--border-hairline)' : 'transparent'}`,
      boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
      transition: 'background var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)',
    }}>
      <div style={{
        maxWidth: 1320, margin: '0 auto', paddingInline: 'clamp(1.25rem, 4vw, 2.75rem)',
        height: scrolled ? 80 : 98, display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 24,
        transition: 'height var(--dur-base) var(--ease-out)',
      }}>
        {/* Logo */}
        <a href="#top" aria-label="Lagoon Main Beach - home" style={{ display: 'flex', alignItems: 'center', justifySelf: 'start' }}>
          <img src={onHero ? `${B}/img/home-embedded-2.svg` : `${B}/img/home-embedded-3.svg`} alt="Lagoon Main Beach" style={{ height: scrolled ? 48 : 60, transition: 'height var(--dur-base) var(--ease-out)', filter: onHero ? 'drop-shadow(0 1px 10px rgba(20,28,32,0.35))' : 'none' }} />
        </a>

        {/* Links (page-centred) */}
        <nav className="nav-links" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 34 }}>
          {links.map((l) => (
            <a key={l} href={linkHrefs[l] || '#'} className="navlink" style={{
              fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 13,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: onHero ? 'var(--lagoon-ocean-mist)' : 'var(--lagoon-ink)',
              textShadow: onHero ? '0 1px 10px rgba(20,28,32,0.4)' : 'none',
              whiteSpace: 'nowrap', transition: 'color var(--dur-base) var(--ease-out)',
            }}>{l}</a>
          ))}
        </nav>

        {/* CTA */}
        <div className="nav-cta-desktop" style={{ display: 'flex', alignItems: 'center', justifySelf: 'end' }}>
          {onHero ? (
            <Button as="a" href="#" variant="inverse" size="md" style={{ background: 'var(--lagoon-white)', color: 'var(--lagoon-tide)', border: '1px solid var(--lagoon-white)' }}>Book Now</Button>
          ) : (
            <Button as="a" href="#" variant="primary" size="md">Book Now</Button>
          )}
        </div>

        {/* Mobile menu glyph */}
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
          backdropFilter: 'saturate(1.4) blur(14px)',
          WebkitBackdropFilter: 'saturate(1.4) blur(14px)',
          borderBottom: '1px solid var(--border-hairline)',
          boxShadow: 'var(--shadow-md)',
          padding: '0.5rem clamp(1.25rem, 4vw, 2.75rem) 1.5rem',
          display: 'flex', flexDirection: 'column',
        }}>
          {links.map((l) => (
            <a key={l} href={linkHrefs[l] || '#'} onClick={() => setMenuOpen(false)} style={{
              fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 15,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'var(--lagoon-ink)', padding: '1rem 0',
              borderBottom: '1px solid var(--border-hairline)',
              textDecoration: 'none',
            }}>{l}</a>
          ))}
          <div style={{ marginTop: '1.25rem' }}>
            <Button as="a" href="#" variant="primary" size="md" style={{ width: '100%', justifyContent: 'center' }}>Book Now</Button>
          </div>
        </div>
      )}
    </header>
  );
}


/* Hero (full-bleed pool) + Rent/Let service cards overlapping into a cream band. */
function HeroServices() {


  return (
    <section id="top" style={{ position: 'relative' }}>
      {/* ---------- HERO ---------- */}
      <div style={{
        position: 'relative',
        display: 'flex', alignItems: 'stretch',
        backgroundImage: `url("${B}/img/home-embedded-4.jpg")`,
        backgroundColor: 'var(--lagoon-ocean-mist)',
        backgroundSize: '100% auto',
        backgroundPosition: 'top left',
        backgroundRepeat: 'no-repeat',
      }}>


        {/* left-to-right scrim - image area only, stops at image bottom */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 'calc(100vw * 0.367)',
          background: 'linear-gradient(to right, rgba(20,30,38,0.60) 0%, rgba(20,30,38,0.35) 45%, rgba(20,30,38,0) 72%)',
        }} />

        <Wrap style={{ position: 'relative', width: '100%', paddingTop: 96, paddingBottom: 100, display: 'flex', flexDirection: 'column' }}>
          <div className="reveal in" style={{ maxWidth: 940, textAlign: 'left', paddingTop: 'clamp(32px, 8vw, 120px)' }}>
            <h1 style={{
              color: 'var(--lagoon-ocean-mist)', margin: 0, letterSpacing: '0.02em',
              lineHeight: 1.04,
            }}>
              <span style={{ display: 'block', fontSize: 'clamp(2.1rem, 5.6vw, 5rem)' }}>Live the Beachside Life</span>
              <span style={{ display: 'block', fontSize: 'clamp(1.3rem, 2.7vw, 2.35rem)', opacity: 0.92, marginTop: '0.35em', letterSpacing: '0.05em' }}>at Main Beach, Gold Coast</span>
            </h1>

            <p style={{
              fontFamily: 'var(--font-body)', color: 'var(--lagoon-ocean-mist)', opacity: 0.9,
              fontSize: 'var(--text-lg)', lineHeight: 1.55, maxWidth: '46ch', margin: '24px 0 36px',

            }}>
              Premium long-term rentals and expert property management at Lagoon Main Beach.
            </p>

          </div>
          <div className="reveal" style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(20px, 2.4vw, 32px)',
            position: 'relative', zIndex: 5, marginTop: 50,
          }}>
            <ServiceCard
              tone="brand"
              eyebrow="For Tenants"
              title="Rent at Lagoon"
              body="Discover premium beachside apartments at Main Beach. Quality long-term living with ocean breezes and resort-style amenities."
              cta="View Available Rentals"
            />
            <ServiceCard
              tone="light"
              eyebrow="For Owners"
              title="Let with Lagoon"
              titleColor="var(--lagoon-tide)"
              body="Maximise your investment with expert property management. Proactive care, premium tenants, transparent reporting."
              cta="Management for Owners"
            />
          </div>
        </Wrap>

        {/* wave into cream - sits below service cards */}

        <Wave fill="var(--lagoon-ocean-mist)" style={{ position: 'absolute', left: 0, right: 0, bottom: -1 }} />
      </div>
    </section>
  );
}


/* "Why Lagoon Main Beach" lifestyle gallery + parallax quote band. */
function Owners() {

  const reasons = [
    { icon: 'map-pin', title: 'Prime Location', desc: 'Steps from the beach and Tedder Avenue.', image: `${B}/img/home-embedded-5.jpg` },
    { icon: 'building-2', title: 'Quality Building', desc: 'Well-maintained, with modern finishes throughout.', image: `${B}/img/home-embedded-6.jpg` },
    { icon: 'waves', title: 'Resort Amenities', desc: 'Pool, gym, and beautifully landscaped grounds.', image: `${B}/img/home-embedded-7.jpg` },
    { icon: 'users', title: 'Community', desc: 'Friendly, established long-term residents.', image: `${B}/img/home-embedded-8.jpg`, pos: 'center 72%' },
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

      {/* ---------- WHY LAGOON MAIN BEACH ---------- */}
      <section style={{ background: 'var(--lagoon-white)', paddingBlock: 'clamp(3rem, 6vw, 6.5rem)', overflow: 'hidden' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'minmax(0, 0.78fr) minmax(0, 1fr)',
          gap: 'clamp(2rem, 4vw, 4.5rem)', alignItems: 'center',
          paddingLeft: 'calc(max(0px, (100vw - 1320px) / 2) + clamp(1.25rem, 4vw, 2.75rem))',
        }} className="owners-grid">
            {/* Text + clickable list */}
            <div className="reveal">
              <div className="lagoon-eyebrow" style={{ color: 'var(--text-coral)', marginBottom: 18 }}>Beachside Living</div>
              <h2 style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)', margin: '0 0 0.6em', color: 'var(--lagoon-tide)' }}>Why Lagoon Main Beach</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '50ch', marginBottom: 0 }}>
                Wake to the sound of the surf and wander barefoot to the sand, then spend your afternoons among the cafes, restaurants and boutiques of Tedder Avenue. This is Main Beach at its best, the Gold Coast's most relaxed and sought-after address, where the ocean, the Broadwater and a genuine sense of community all meet on your doorstep.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12, maxWidth: 300, marginTop: 'clamp(1.6rem, 3vw, 2.4rem)' }} className="owners-cta">
                <Button as="a" href="#" variant="primary" size="md" fullWidth style={{ whiteSpace: 'nowrap' }}>Management for Owners</Button>
                <Button as="a" href="#" variant="secondary" size="md" fullWidth style={{ whiteSpace: 'nowrap' }}>View Available Rentals</Button>
              </div>
            </div>

            {/* Gallery */}
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

                {/* scrim */}
                <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(28,38,44,0) 38%, rgba(28,38,44,0.72) 100%)' }} />

                {/* caption */}
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

                {/* arrows */}
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
        @media (max-width: 420px){
          .owners-cta{ grid-template-columns: 1fr !important; }
        }
      `}</style>
    </React.Fragment>
  );
}


/* Parallax quote band. */
function QuoteBand() {
  return (
      <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--lagoon-ocean-mist)' }}>
        <div style={{
          position: 'relative',
          minHeight: 'clamp(320px, 40vw, 460px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundImage: `url("${B}/img/home-embedded-9.jpg")`,
          backgroundSize: 'cover', backgroundPosition: 'center 55%',
          backgroundAttachment: 'fixed',
          paddingBottom: 'clamp(64px, 8vw, 130px)',
        }}>
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(28,38,44,0.46), rgba(28,38,44,0.60))' }} />
          <div className="reveal" style={{ position: 'relative', textAlign: 'center', padding: '0 var(--gutter)', maxWidth: 1100 }}>
            <img src={`${B}/img/home-embedded-10.png`} alt="" aria-hidden="true" style={{ width: 62, height: 'auto', opacity: 0.92, marginBottom: 22, filter: 'brightness(0) invert(1)' }} />
            <p className="lagoon-quote" style={{
              color: 'var(--lagoon-ocean-mist)', fontSize: 'clamp(1.2rem, 3.6vw, 3.1rem)',
              lineHeight: 1.15, margin: 0, letterSpacing: '0.02em',
              textShadow: '0 2px 22px rgba(20,28,32,0.5)',
            }}>A new era in relaxed coastal living</p>
          </div>
          <Wave fill="var(--lagoon-ocean-mist)" style={{ position: 'absolute', left: 0, right: 0, bottom: -1 }} />
        </div>
      </section>
  );
}


/* Why Owners Choose Lagoon - editorial benefits grid. */
function OwnersBenefits() {


  const svgs = {
    shield:      '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    userCheck:   '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/>',
    barChart:    '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    mapPin:      '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    megaphone:   '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
    circleCheck: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  };

  function BIcon({ svg }) {
    return (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
        dangerouslySetInnerHTML={{ __html: svg }} />
    );
  }

  const items = [
    { svg: svgs.shield,      title: 'Asset Protection', desc: 'Regular inspections and proactive maintenance to preserve your property.' },
    { svg: svgs.userCheck,   title: 'Premium Tenants', desc: 'Rigorous screening to find reliable, quality long-term tenants.' },
    { svg: svgs.barChart,    title: 'Transparent Reporting', desc: 'Clear financial reports and open communication, always.' },
    { svg: svgs.mapPin,      title: 'Local Expertise', desc: 'Deep knowledge of the Main Beach rental market.' },
    { svg: svgs.megaphone,   title: 'Marketing & Leasing', desc: 'Professional marketing to minimise vacancy periods.' },
    { svg: svgs.circleCheck, title: 'Peace of Mind', desc: "We handle everything so you don't have to." },
  ];

  return (
    <section style={{ background: 'var(--lagoon-ocean-mist)', paddingBlock: 'clamp(4rem, 7vw, 7rem)' }}>
      <Wrap>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 1.15fr)', gap: 'clamp(3rem, 5vw, 6rem)', alignItems: 'start' }} className="ob-grid">
          <div className="reveal" style={{ position: 'sticky', top: 80 }}>
            <div className="lagoon-eyebrow" style={{ color: 'var(--text-coral)', marginBottom: 18 }}>Property Management</div>
            <h2 style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', margin: '0 0 0.6em', color: 'var(--lagoon-tide)', lineHeight: 1.1 }}>Why Owners Choose Lagoon</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '42ch', margin: '0 0 2rem', fontWeight: 300 }}>
              Expert property management that protects your asset and maximises your return.
            </p>
            <Button as="a" href="#" variant="primary" size="md">Management for Owners</Button>
          </div>
          <div className="reveal ob-items" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'clamp(1rem, 1.75vw, 1.5rem) clamp(2rem, 4vw, 3.5rem)' }}>
            {items.map(item => (
              <div key={item.title} style={{ paddingTop: 'clamp(1.2rem, 2vw, 1.8rem)', borderTop: '1px solid var(--border-light)' }}>
                <div style={{ marginBottom: 14, color: 'var(--lagoon-dusty-coral)' }}><BIcon svg={item.svg} /></div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem, 1.4vw, 1.25rem)', fontWeight: 400, color: 'var(--lagoon-tide)', margin: '0 0 8px', letterSpacing: '0.05em', textTransform: 'uppercase', lineHeight: 1.2 }}>{item.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0, fontWeight: 400 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Wrap>
      <style>{"@media (max-width: 820px){ .ob-grid{ grid-template-columns: 1fr !important; } .ob-grid > div:first-child { position: static !important; } } @media (max-width: 480px){ .ob-items{ grid-template-columns: 1fr !important; } }"}</style>
    </section>
  );
}


/* Featured residences - arch-top listing cards. */
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


/* Trust bar - Tide band of headline stats. */
function Trust() {
  const stats = [
    { value: '50+', label: 'Properties Managed' },
    { value: '98%', label: 'Occupancy Rate' },
    { value: '4.9', star: true, label: 'Owner Rating' },
    { value: '10+', label: 'Years Local Experience' },
  ];

  const cream = 'var(--lagoon-ocean-mist)';

  return (
    <section style={{ background: 'var(--lagoon-tide)', color: cream, paddingBlock: 'clamp(3.5rem, 6vw, 5.5rem)' }}>
      <Wrap>
        <div className="reveal trust-stats" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'clamp(1.5rem, 3vw, 2.5rem)',
          textAlign: 'center',
        }}>
          {stats.map((s) => (
            <div key={s.label}>
              <div className="lagoon-display" style={{ fontSize: 'clamp(2.6rem, 4.6vw, 3.8rem)', lineHeight: 1, color: cream, display: 'inline-flex', alignItems: 'flex-start', gap: 4 }}>
                {s.value}{s.star && <span style={{ fontSize: '0.7em', lineHeight: 1.1, color: 'var(--lagoon-dusty-coral)' }}>★</span>}
              </div>
              <div style={{
                fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 12, letterSpacing: '0.16em',
                textTransform: 'uppercase', color: 'rgba(244,243,239,0.72)', marginTop: 14,
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </Wrap>

      <style>{`
        @media (max-width: 820px){ .trust-stats{ grid-template-columns: repeat(2,1fr) !important; row-gap: 2.6rem !important; } }
      `}</style>
    </section>
  );
}


/* Footer - Tide band with closing CTA, link columns and contact. */
function Footer() {

  const cream = 'var(--lagoon-ocean-mist)';

  const cols = [
    { h: 'Explore', links: ['Rentals', 'Owners', 'How We Work', 'About', 'Contact'] },
  ];

  const linkStyle = { fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(244,243,239,0.78)', display: 'block', padding: '7px 0', transition: 'color var(--dur-fast) var(--ease-out)' };
  const onEnter = (e) => { e.currentTarget.style.color = cream; };
  const onLeave = (e) => { e.currentTarget.style.color = 'rgba(244,243,239,0.78)'; };

  return (
    <footer style={{ background: 'var(--lagoon-ink)', color: cream }}>
      {/* Closing CTA */}
      <div className="foot-cta" style={{ borderBottom: '1px solid var(--border-on-brand)', background: 'var(--lagoon-tide)', display: 'grid', gridTemplateColumns: '1fr clamp(260px, 32vw, 500px)', overflow: 'hidden' }}>
        {/* Text + buttons */}
        <div style={{ paddingBlock: 'clamp(3rem, 6vw, 5.5rem)', paddingLeft: 'calc(max(0px, (100vw - 1320px) / 2) + clamp(1.25rem, 4vw, 2.75rem))', paddingRight: 'clamp(1.5rem, 3vw, 3rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
          <div>
            <h2 style={{ color: cream, fontSize: 'clamp(1.8rem, 3.4vw, 2.9rem)', margin: '0 0 0.5em', maxWidth: '28ch' }}>Steps from the beach, minutes from Tedder Avenue.</h2>
            <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(244,243,239,0.75)', fontSize: 'var(--text-md)', lineHeight: 1.6, margin: 0, maxWidth: '44ch' }}>Whether you're looking to rent at Lagoon or exploring property management, we're here to help.</p>
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Button as="a" href="#" variant="inverse" size="md">View Available Rentals</Button>
            <Button as="a" href="#" variant="secondary" size="md" style={{ color: cream, borderColor: 'var(--border-on-brand)' }}>Management for Owners</Button>
          </div>
        </div>
        {/* Aerial image - full height, edge to edge */}
        <img src={`${B}/img/home-embedded-14.jpg`} alt="" aria-hidden="true" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>

      {/* Columns */}
      <Wrap style={{ paddingBlock: 'clamp(3rem, 5vw, 4.5rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr 1fr 1.2fr', gap: 'clamp(1.5rem, 3vw, 2.5rem)', alignItems: 'start' }} className="foot-grid">
          {/* Brand */}
          <div>
            <img src={`${B}/img/home-embedded-15.svg`} alt="Lagoon Main Beach" style={{ height: 92, marginBottom: 22, display: 'block' }} />
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

          {/* Contact */}
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

          {/* Map */}
          <div style={{ borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)', alignSelf: 'start', marginTop: 28 }}>
            <iframe
              src="https://maps.google.com/maps?q=11+Cronin+Avenue+Main+Beach+QLD+4217+Australia&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="220"
              style={{ border: 0, display: 'block', filter: 'grayscale(25%) contrast(1.05)' }}
              allowFullScreen
              loading="lazy"
              title="Lagoon Main Beach location"
            />
          </div>
        </div>
      </Wrap>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', background: 'var(--lagoon-tide)' }}>
        <Wrap style={{ paddingBlock: 22, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'rgba(244,243,239,0.6)' }}>© 2026 Lagoon Main Beach. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 22 }}>
            {['Privacy Policy'].map((l) => (
              <a key={l} href="#" style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'rgba(244,243,239,0.6)' }} onMouseEnter={onEnter} onMouseLeave={(e)=>e.currentTarget.style.color='rgba(244,243,239,0.6)'}>{l}</a>
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



function App() {
  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);
  return (
    <div>
      <Nav />
      <main>
        <HeroServices />
        <Owners />
        <Trust />
        <QuoteBand />
        <OwnersBenefits />
        <FeaturedResidences />
      </main>
      <Footer />
    </div>
  );
}
export default App;
