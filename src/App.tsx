import { useEffect, useMemo, useState } from 'react';

const downloadLinks = {
  appStore: '#app-store',
  googlePlay: '#google-play',
};

type LegalSlug = 'privacy' | 'terms';

type LegalPageData = {
  title: string;
  slug: LegalSlug;
  content: string;
  status: 'draft' | 'published';
  updatedAt?: string;
};

const floatingCards = [
  { text: 'C1 is active now', className: 'float-card-one' },
  { text: 'Shevchenko is trending', className: 'float-card-two' },
  { text: 'New event tonight', className: 'float-card-three' },
  { text: 'Friends nearby', className: 'float-card-four' },
  { text: '+120 XP', className: 'float-card-five' },
  { text: 'Verified creator', className: 'float-card-six' },
];

const featureCards = [
  {
    icon: '📍',
    title: 'Vibe Spots',
    description:
      'See which streets, cafes, squares, and hangout places are active before you decide where to go.',
  },
  {
    icon: '💬',
    title: 'Place Chats',
    description:
      'Join lightweight chats tied to real places, from C1 plans to cafe queues and street-level updates.',
  },
  {
    icon: '🎟️',
    title: 'Local Events',
    description:
      'Track tonight’s meetups, pop-ups, parties, launches, and smaller moments moving through Tashkent.',
  },
  {
    icon: '🗺️',
    title: 'Friends Map',
    description:
      'Find friends through consent-based visibility controls made for plans, safety, and privacy.',
  },
  {
    icon: '⚡',
    title: 'Rewards & Ranks',
    description:
      'Earn XP, build your city reputation, and climb local rankings as you explore and contribute.',
  },
  {
    icon: '✅',
    title: 'Verified Profiles',
    description:
      'Highlight trusted locals, creators, venues, and community voices with stronger profile signals.',
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Discover vibe spots',
    text: 'Open the city layer and see where Tashkent feels alive right now.',
  },
  {
    step: '02',
    title: 'Join place chats',
    text: 'Drop into location-based conversations before meeting up or moving across town.',
  },
  {
    step: '03',
    title: 'Follow events',
    text: 'Watch local energy shift through cafes, streets, campuses, venues, and pop-ups.',
  },
  {
    step: '04',
    title: 'Build your city profile',
    text: 'Collect XP, grow your reputation, and become part of the local social graph.',
  },
];

const communityItems = [
  'Profiles with local reputation',
  'Posts tied to real places',
  'Chats around active spots',
  'Friend activity and plans',
  'Rankings, XP, and rewards',
  'Verified users and creators',
];

const safetyItems = [
  'Consent-based friend visibility',
  'Clear controls for location sharing',
  'Reporting and moderation paths',
  'A safer local community by design',
];

const fallbackLegalPages: Record<LegalSlug, LegalPageData> = {
  privacy: {
    title: 'Privacy Policy',
    slug: 'privacy',
    status: 'draft',
    content:
      'The final UZVibes Privacy Policy will be published before public launch. This placeholder explains that privacy details, data handling, location controls, account settings, and contact options are still being prepared.',
  },
  terms: {
    title: 'Terms of Service',
    slug: 'terms',
    status: 'draft',
    content:
      'The final UZVibes Terms of Service will be published before public launch. This placeholder explains that usage rules, account responsibilities, community standards, and platform terms are still being prepared.',
  },
};

function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const updatePath = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', updatePath);
    return () => window.removeEventListener('popstate', updatePath);
  }, []);

  return pathname;
}

function useLegalPage(slug: LegalSlug) {
  const [page, setPage] = useState<LegalPageData>(fallbackLegalPages[slug]);
  const [isLoading, setIsLoading] = useState(false);
  const [source, setSource] = useState<'api' | 'fallback'>('fallback');

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_LEGAL_API_BASE_URL;

    if (!baseUrl) {
      setPage(fallbackLegalPages[slug]);
      setSource('fallback');
      return;
    }

    const controller = new AbortController();
    const url = `${baseUrl.replace(/\/$/, '')}/legal-pages/${slug}/`;

    setIsLoading(true);
    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Legal page request failed with ${response.status}`);
        }
        return response.json() as Promise<LegalPageData>;
      })
      .then((data) => {
        setPage({
          ...fallbackLegalPages[slug],
          ...data,
          slug,
        });
        setSource('api');
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setPage(fallbackLegalPages[slug]);
          setSource('fallback');
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [slug]);

  return { page, isLoading, source };
}

function Header({ isHome }: { isHome: boolean }) {
  const homePrefix = isHome ? '' : '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { href: `${homePrefix}#features`, label: 'Features' },
    { href: `${homePrefix}#city-vibes`, label: 'City vibes' },
    { href: `${homePrefix}#safety`, label: 'Safety' },
    { href: `${homePrefix}#download`, label: 'Download' },
    { href: `${homePrefix}#contact`, label: 'Contact' },
  ];

  return (
    <header className={`site-header ${isMenuOpen ? 'menu-open' : ''}`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <a className="brand" href="/" aria-label="UZVibes home">
        <span className="brand-mark" aria-hidden="true">
          <img src="/website-logo.png" alt="" />
        </span>
        UZVibes
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={isMenuOpen}
        aria-controls="primary-navigation"
        onClick={() => setIsMenuOpen((current) => !current)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span className="menu-toggle-label">Menu</span>
      </button>
      <nav className="header-nav" id="primary-navigation" aria-label="Primary navigation">
        {navLinks.map((link) => (
          <a href={link.href} key={link.href} onClick={() => setIsMenuOpen(false)}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function DownloadButtons() {
  return (
    <div className="download-buttons" aria-label="UZVibes store availability">
      <a
        className="store-button"
        href={downloadLinks.appStore}
        aria-label="Coming soon on the App Store. Placeholder link for UZVibes."
      >
        <span className="store-icon" aria-hidden="true">
          
        </span>
        <span>
          <small>Coming soon on</small>
          App Store
        </span>
      </a>
      <a
        className="store-button store-button-alt"
        href={downloadLinks.googlePlay}
        aria-label="Coming soon on Google Play. Placeholder link for UZVibes."
      >
        <span className="store-icon play-icon" aria-hidden="true">
          ▶
        </span>
        <span>
          <small>Coming soon on</small>
          Google Play
        </span>
      </a>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div
      className="phone-orbit"
      role="img"
      aria-label="UZVibes app preview showing active Tashkent places, city vibe score, events, friends, and rankings"
    >
      <span className="orbit-ring orbit-ring-one" aria-hidden="true" />
      <span className="orbit-ring orbit-ring-two" aria-hidden="true" />
      <div className="phone-shell" aria-hidden="true">
        <div className="phone-notch" />
        <div className="phone-screen">
          <div className="app-topbar">
            <div>
              <span className="app-kicker">Tonight in</span>
              <strong>Tashkent</strong>
            </div>
            <span className="profile-dot" />
          </div>

          <div className="vibe-meter">
            <span>City vibe</span>
            <strong>94%</strong>
            <div className="meter-track">
              <span />
            </div>
          </div>

          <div className="mini-map">
            <span className="map-road road-one" />
            <span className="map-road road-two" />
            <span className="map-road road-three" />
            <span className="pin pin-one" />
            <span className="pin pin-two" />
            <span className="pin pin-three" />
            <span className="pin pin-four" />
          </div>

          <div className="app-card active">
            <div>
              <span className="app-card-label">C1</span>
              <strong>Active now</strong>
            </div>
            <span>🔥 312</span>
          </div>
          <div className="app-card">
            <div>
              <span className="app-card-label">Shevchenko</span>
              <strong>Trending chat</strong>
            </div>
            <span>+96</span>
          </div>
          <div className="app-card">
            <div>
              <span className="app-card-label">Friends</span>
              <strong>4 nearby</strong>
            </div>
            <span>XP +120</span>
          </div>
          <div className="app-nav">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="hero section-wrap" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">UZVibes · launching first in Tashkent</p>
        <h1 id="hero-title">Feel the vibe of Tashkent.</h1>
        <p className="hero-text">
          UZVibes helps you discover active places, local chats, events, friends,
          rankings, and the city energy moving around Tashkent.
        </p>
        <DownloadButtons />
        <p className="launch-note">Store links are coming soon. The city layer is being built now.</p>
      </div>

      <div className="hero-visual">
        <PhoneMockup />
        {floatingCards.map((card) => (
          <div className={`floating-card ${card.className}`} key={card.text} aria-hidden="true">
            {card.text}
          </div>
        ))}
      </div>
    </section>
  );
}

function WhatSection() {
  return (
    <section className="section-wrap compact-section" aria-labelledby="what-title">
      <div className="section-heading wide-heading">
        <p className="eyebrow">What is UZVibes?</p>
        <h2 id="what-title">A city-based social layer for Tashkent nightlife, cafes, streets, and events.</h2>
      </div>
      <div className="intro-grid">
        <article className="glass-panel intro-panel">
          <h3>Find where the city is alive.</h3>
          <p>
            UZVibes turns local energy into a simple social map: active vibe spots,
            place chats, event signals, friend activity, and city reputation.
          </p>
        </article>
        <article className="glass-panel intro-panel accent-panel">
          <h3>Built for local momentum.</h3>
          <p>
            Start with Tashkent, then follow how people gather, talk, meet, rank,
            verify, and build identity around the places they actually visit.
          </p>
        </article>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section className="section-wrap" id="how-it-works" aria-labelledby="how-title">
      <div className="section-heading">
        <p className="eyebrow">How it works</p>
        <h2 id="how-title">From “where should we go?” to “everyone is already there.”</h2>
      </div>
      <div className="steps-grid">
        {howItWorks.map((item) => (
          <article className="step-card glass-panel" key={item.step}>
            <span>{item.step}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="section-wrap" id="features" aria-labelledby="features-title">
      <div className="section-heading">
        <p className="eyebrow">Core features</p>
        <h2 id="features-title">The city, turned into a living social feed.</h2>
      </div>
      <div className="feature-grid">
        {featureCards.map((feature) => (
          <article className="feature-card glass-panel" key={feature.title}>
            <span className="feature-icon" aria-hidden="true">
              {feature.icon}
            </span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function CityVibesSection() {
  return (
    <section className="section-wrap city-section" id="city-vibes" aria-labelledby="city-title">
      <div className="section-heading">
        <p className="eyebrow">City map</p>
        <h2 id="city-title">Purple-night map energy for Tashkent.</h2>
        <p>
          Follow active zones around C1, Shevchenko, cafes, campuses, events, and
          the places where the city keeps moving after dark.
        </p>
      </div>

      <div
        className="city-map glass-panel"
        role="img"
        aria-label="Abstract purple Tashkent nightlife map with active zones, place chats, events, and pulsing pins"
      >
        <span className="route route-a" aria-hidden="true" />
        <span className="route route-b" aria-hidden="true" />
        <span className="route route-c" aria-hidden="true" />
        <span className="zone zone-one" aria-hidden="true" />
        <span className="zone zone-two" aria-hidden="true" />
        <div className="map-pin map-pin-a" aria-hidden="true">
          <strong>C1</strong>
          <span>Active</span>
        </div>
        <div className="map-pin map-pin-b" aria-hidden="true">
          <strong>Shevchenko</strong>
          <span>Trending</span>
        </div>
        <div className="map-pin map-pin-c" aria-hidden="true">
          <strong>Events</strong>
          <span>Tonight</span>
        </div>
        <div className="map-pin map-pin-d" aria-hidden="true">
          <strong>Cafes</strong>
          <span>Chats</span>
        </div>
      </div>
    </section>
  );
}

function CommunitySection() {
  return (
    <section className="section-wrap community-section" aria-labelledby="community-title">
      <div className="section-heading">
        <p className="eyebrow">Social identity</p>
        <h2 id="community-title">Not just a map. A local profile that grows with the city.</h2>
        <p>
          UZVibes connects profiles, posts, place chats, friends, rewards, rankings,
          verified users, and local reputation into one social city layer.
        </p>
      </div>

      <div className="community-stack" aria-label="UZVibes social identity features">
        {communityItems.map((item, index) => (
          <div
            className="community-pill glass-panel"
            key={item}
            style={{ '--pill-index': index } as React.CSSProperties}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function SafetySection() {
  return (
    <section className="section-wrap safety-section" id="safety" aria-labelledby="safety-title">
      <div className="section-heading">
        <p className="eyebrow">Safety and consent</p>
        <h2 id="safety-title">City social should feel alive, not exposed.</h2>
        <p>
          UZVibes is being designed around consent, control, and a safer local community
          before the first public launch.
        </p>
      </div>
      <div className="safety-grid">
        {safetyItems.map((item) => (
          <article className="safety-card glass-panel" key={item}>
            <span aria-hidden="true">✦</span>
            <h3>{item}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="section-wrap cta-section" id="download" aria-labelledby="cta-title">
      <span id="app-store" className="anchor-target" aria-hidden="true" />
      <span id="google-play" className="anchor-target" aria-hidden="true" />
      <div className="cta-panel glass-panel">
        <p className="eyebrow">Coming soon</p>
        <h2 id="cta-title">Be ready when Tashkent goes live.</h2>
        <p>
          UZVibes is preparing for launch. Store links are placeholders for now and
          will be replaced when the app is published.
        </p>
        <DownloadButtons />
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="section-wrap contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-panel glass-panel">
        <div>
          <p className="eyebrow">Launching first in Tashkent</p>
          <h2 id="contact-title">Want early access or partnership updates?</h2>
          <p>
            Reach the UZVibes team for launch updates, local partnerships, venue ideas,
            and early access interest.
          </p>
        </div>
        <a className="contact-link" href="mailto:contact@uzvibes.com">
          contact@uzvibes.com
        </a>
      </div>
    </section>
  );
}

function Footer({ isHome }: { isHome: boolean }) {
  const contactHref = isHome ? '#contact' : '/#contact';

  return (
    <footer className="site-footer">
      <div>
        <a className="brand" href="/" aria-label="UZVibes home">
          <span className="brand-mark" aria-hidden="true">
            <img src="/website-logo.png" alt="" />
          </span>
          UZVibes
        </a>
        <p>Built for the next generation of city social life.</p>
      </div>
      <div className="footer-meta">
        <nav aria-label="Footer links">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href={contactHref}>Contact</a>
        </nav>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <WhatSection />
      <HowItWorksSection />
      <FeaturesSection />
      <CityVibesSection />
      <CommunitySection />
      <SafetySection />
      <CtaSection />
      <ContactSection />
    </main>
  );
}

function LegalPage({ slug }: { slug: LegalSlug }) {
  const { page, isLoading, source } = useLegalPage(slug);
  const formattedDate = useMemo(() => {
    if (!page.updatedAt) {
      return 'Not published yet';
    }

    return new Intl.DateTimeFormat('en', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(page.updatedAt));
  }, [page.updatedAt]);

  return (
    <main id="main-content" className="legal-page section-wrap">
      <a className="back-link" href="/">
        Back to home
      </a>
      <article className="legal-shell glass-panel">
        <p className="eyebrow">{page.status === 'published' ? 'Legal' : 'Draft placeholder'}</p>
        <h1>{page.title}</h1>
        <div className="legal-meta">
          <span>Last updated: {formattedDate}</span>
          <span>
            {isLoading
              ? 'Loading legal CMS content...'
              : source === 'api'
                ? 'Loaded from UZVibes Legal CMS'
                : 'Fallback placeholder'}
          </span>
        </div>
        <div className="legal-content">
          {page.content.split('\n').map((paragraph, index) => (
            <p key={`${page.slug}-${index}`}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main id="main-content" className="legal-page section-wrap">
      <article className="legal-shell glass-panel">
        <p className="eyebrow">404</p>
        <h1>Page not found.</h1>
        <p className="hero-text">
          This route is not part of the UZVibes landing site yet.
        </p>
        <a className="contact-link" href="/">
          Back to home
        </a>
      </article>
    </main>
  );
}

export default function App() {
  const pathname = usePathname();
  const normalizedPath = pathname.replace(/\/$/, '') || '/';
  const isHome = normalizedPath === '/';

  let page = <NotFoundPage />;
  if (isHome) {
    page = <HomePage />;
  } else if (normalizedPath === '/privacy') {
    page = <LegalPage slug="privacy" />;
  } else if (normalizedPath === '/terms') {
    page = <LegalPage slug="terms" />;
  }

  return (
    <div className="site-shell">
      <div className="background-glow glow-one" aria-hidden="true" />
      <div className="background-glow glow-two" aria-hidden="true" />
      <div className="background-glow glow-three" aria-hidden="true" />
      <div className="background-grid" aria-hidden="true" />
      <Header isHome={isHome} />
      {page}
      <Footer isHome={isHome} />
    </div>
  );
}
