import React from 'react';
const B = import.meta.env.BASE_URL.replace(/\/$/, '');

/* Lagoon Privacy Policy Page - standalone. Mino Design and Digital. */
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
      <main>
        <PrivacyHero />
        <PrivacyContent />
      </main>
      <FooterCta />
    </React.Fragment>
  );
}

export default PrivacyApp;
