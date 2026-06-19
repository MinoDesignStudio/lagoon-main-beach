import React from 'react';
import { Wrap, B, ALCYONE_LOGO } from './ui.jsx';

/* Site-wide footer: brand ("Managed by Alcyone"), Explore nav, contact, map and
   the bottom legal bar. The promotional CTA band that sits ABOVE this is owned
   by each page (see each page's FooterCta) so it can differ per page. */
export function SiteFooter() {
  const cream = 'var(--lagoon-ocean-mist)';
  const cols = [{ h: 'Explore', links: ['Rentals', 'Owners', 'How We Work', 'About', 'About Alcyone', 'Contact'] }];
  const pageHrefs = { 'Rentals': `${B}/rentals/`, 'Owners': `${B}/owners/`, 'How We Work': `${B}/how-we-work/`, 'About': `${B}/about/`, 'About Alcyone': `${B}/about-alcyone/`, 'Contact': `${B}/contact/` };
  const linkStyle = { fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(244,243,239,0.78)', display: 'block', padding: '7px 0', transition: 'color var(--dur-fast) var(--ease-out)' };
  const onEnter = (e) => { e.currentTarget.style.color = cream; };
  const onLeave = (e) => { e.currentTarget.style.color = 'rgba(244,243,239,0.78)'; };

  return (
    <footer style={{ background: 'var(--lagoon-ink)', color: cream }}>
      <Wrap style={{ paddingBlock: 'clamp(3rem, 5vw, 4.5rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr 1fr 1.2fr', gap: 'clamp(1.5rem, 3vw, 2.5rem)', alignItems: 'start' }} className="foot-grid">
          <div>
            <div style={{ marginBottom: 22 }}>
              <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(244,243,239,0.6)', marginBottom: 12 }}>Managed by</span>
              <a href={`${B}/about-alcyone/`} aria-label="About Alcyone Group" style={{ display: 'inline-block' }}>
                <img src={ALCYONE_LOGO} alt="Alcyone Group" style={{ height: 44, display: 'block' }} />
              </a>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.7, color: 'rgba(244,243,239,0.72)', maxWidth: '34ch', margin: 0 }}>
              Premium long-term rentals and expert property management at Lagoon Main Beach.
            </p>
          </div>

          {cols.map((c) => (
            <nav key={c.h}>
              <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: cream, margin: '0 0 12px', opacity: 0.9 }}>{c.h}</h3>
              {c.links.map((l) => (
                <a key={l} href={pageHrefs[l] || '#'} style={linkStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>{l}</a>
              ))}
            </nav>
          ))}

          <div>
            <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: cream, margin: '0 0 12px', opacity: 0.9 }}>Contact</h3>
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
            {['Privacy Policy'].map((l) => (
              <a key={l} href={`${B}/privacy/`} style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, fontWeight: 500, color: 'var(--lagoon-ocean-mist)' }} onMouseEnter={onEnter} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--lagoon-ocean-mist)'}>{l}</a>
            ))}
          </div>
        </Wrap>
      </div>

      <style>{`
        @media (max-width: 900px){ .foot-grid{ grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 520px){ .foot-grid{ grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
