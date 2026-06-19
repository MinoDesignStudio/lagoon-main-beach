import React from 'react';
import { Icon } from '../Icon.jsx';
import { Button, B, NAV_LOGO_W, NAV_LOGO_D } from './ui.jsx';

const { useState, useEffect } = React;

/* Site-wide fixed header.
   overHero=true (home only): transparent white nav over the hero image that
   turns solid on scroll. overHero=false (all other pages): always solid. */
export function Nav({ overHero = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onHero = overHero && !scrolled; // white-over-hero treatment
  const solid = !onHero;                // solid header background

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
      background: solid ? 'rgba(244,243,239,0.92)' : 'transparent',
      backdropFilter: solid ? 'saturate(1.4) blur(14px)' : 'none',
      WebkitBackdropFilter: solid ? 'saturate(1.4) blur(14px)' : 'none',
      borderBottom: `1px solid ${solid ? 'var(--border-hairline)' : 'transparent'}`,
      boxShadow: solid ? 'var(--shadow-sm)' : 'none',
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
            <Button as="a" href={`${B}/contact/`} variant="inverse" size="md" style={{ background: 'var(--lagoon-white)', color: 'var(--lagoon-tide)', border: '1px solid var(--lagoon-white)' }}>Book Now</Button>
          ) : (
            <Button as="a" href={`${B}/contact/`} variant="primary" size="md">Book Now</Button>
          )}
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
            <Button as="a" href={`${B}/contact/`} variant="primary" size="md" style={{ width: '100%', justifyContent: 'center' }}>Book Now</Button>
          </div>
        </div>
      )}
    </header>
  );
}
