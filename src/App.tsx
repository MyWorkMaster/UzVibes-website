const downloadLinks = {
  appStore: '#app-store',
  googlePlay: '#google-play',
};

const floatingCards = [
  { text: 'C1 is active now', className: 'float-card-one' },
  { text: 'New event near you', className: 'float-card-two' },
  { text: 'Shevchenko is trending', className: 'float-card-three' },
  { text: '+120 XP today', className: 'float-card-four' },
];

const features = [
  {
    icon: '📍',
    title: 'Vibe Spots',
    description:
      'Find the streets, cafes, parks, and city corners where people are gathering right now.',
  },
  {
    icon: '💬',
    title: 'Place Chats',
    description:
      'Join location-based conversations and feel what is happening before you arrive.',
  },
  {
    icon: '🎟️',
    title: 'Local Events',
    description:
      'Follow pop-ups, meetups, parties, launches, and everyday moments around Tashkent.',
  },
  {
    icon: '🗺️',
    title: 'Friends Map',
    description:
      'See nearby friends through consent-based sharing, built for real plans and privacy.',
  },
  {
    icon: '⚡',
    title: 'Rewards & Ranks',
    description:
      'Earn XP, level up your profile, and climb local rankings as you explore the city.',
  },
  {
    icon: '✅',
    title: 'Verified Profiles',
    description:
      'Build trust with verified accounts, profile signals, and a stronger local identity.',
  },
];

const communityItems = ['Profiles', 'Posts', 'Chats', 'Events', 'Friend activity', 'Rankings'];

function Header() {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <a className="brand" href="/" aria-label="UZVibes home">
        <span className="brand-mark" aria-hidden="true">
          UZ
        </span>
        UZVibes
      </a>
      <nav className="header-nav" aria-label="Primary navigation">
        <a href="#features">Features</a>
        <a href="#city-vibes">City vibes</a>
        <a href="#download">Download</a>
      </nav>
    </header>
  );
}

function DownloadButtons() {
  return (
    <div className="download-buttons" aria-label="Download UZVibes">
      <a
        className="store-button"
        href={downloadLinks.appStore}
        aria-label="Download UZVibes on the App Store"
      >
        <span className="store-icon" aria-hidden="true">
          
        </span>
        <span>
          <small>Download on</small>
          App Store
        </span>
      </a>
      <a
        className="store-button store-button-alt"
        href={downloadLinks.googlePlay}
        aria-label="Get UZVibes on Google Play"
      >
        <span className="store-icon play-icon" aria-hidden="true">
          ▶
        </span>
        <span>
          <small>Get it on</small>
          Google Play
        </span>
      </a>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div
      className="phone-shell"
      role="img"
      aria-label="UZVibes app preview showing city vibe score, active places, and trending chats"
    >
      <div className="phone-notch" aria-hidden="true" />
      <div className="phone-screen" aria-hidden="true">
        <div className="app-topbar">
          <div>
            <span className="app-kicker">Tonight in</span>
            <strong>Tashkent</strong>
          </div>
          <span className="profile-dot" />
        </div>

        <div className="vibe-meter">
          <span>City vibe</span>
          <strong>92%</strong>
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
        </div>

        <div className="app-card active">
          <div>
            <span className="app-card-label">C1</span>
            <strong>Active now</strong>
          </div>
          <span>🔥 248</span>
        </div>
        <div className="app-card">
          <div>
            <span className="app-card-label">Shevchenko</span>
            <strong>Trending chat</strong>
          </div>
          <span>+76</span>
        </div>
        <div className="app-nav" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="hero section-wrap" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">UZVibes · uzvibes.com</p>
        <h1 id="hero-title">Feel the vibe of your city.</h1>
        <p className="hero-text">
          UZVibes helps you discover popular places, join local chats, follow city events,
          and connect with friends around Tashkent.
        </p>
        <DownloadButtons />
        <p className="launch-note">Launching for Tashkent first.</p>
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
      <div className="section-heading">
        <p className="eyebrow">What is UZVibes?</p>
        <h2 id="what-title">A city-based social app for real local energy.</h2>
      </div>
      <div className="glass-panel intro-panel">
        <p>
          UZVibes brings places, chats, events, and profiles into one social map for
          Tashkent. Discover where the city is alive, join the conversation, and build
          your local presence as you move through the places you care about.
        </p>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="section-wrap" id="features" aria-labelledby="features-title">
      <div className="section-heading">
        <p className="eyebrow">Core features</p>
        <h2 id="features-title">Everything around the places people actually go.</h2>
      </div>
      <div className="feature-grid">
        {features.map((feature) => (
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
        <p className="eyebrow">City vibes</p>
        <h2 id="city-title">Follow the energy of Tashkent.</h2>
        <p>
          Discover what places are active, see what is happening around popular areas,
          and move with the city in real time.
        </p>
      </div>

      <div
        className="city-map glass-panel"
        role="img"
        aria-label="Abstract Tashkent activity map with active place, cafe chat, live event, and trending street pins"
      >
        <span className="route route-a" aria-hidden="true" />
        <span className="route route-b" aria-hidden="true" />
        <span className="route route-c" aria-hidden="true" />
        <div className="map-pin map-pin-a" aria-hidden="true">
          <strong>C1</strong>
          <span>Active</span>
        </div>
        <div className="map-pin map-pin-b" aria-hidden="true">
          <strong>Cafe</strong>
          <span>Chat</span>
        </div>
        <div className="map-pin map-pin-c" aria-hidden="true">
          <strong>Event</strong>
          <span>Live</span>
        </div>
        <div className="map-pin map-pin-d" aria-hidden="true">
          <strong>Street</strong>
          <span>Trend</span>
        </div>
      </div>
    </section>
  );
}

function CommunitySection() {
  return (
    <section className="section-wrap community-section" aria-labelledby="community-title">
      <div className="section-heading">
        <p className="eyebrow">More than a map</p>
        <h2 id="community-title">A social layer for the city.</h2>
        <p>
          UZVibes connects profiles, posts, chats, events, friend activity, and rankings
          so local life feels easier to follow.
        </p>
      </div>

      <div className="community-stack" aria-label="UZVibes social features">
        {communityItems.map((item, index) => (
          <div className="community-pill glass-panel" key={item} style={{ '--pill-index': index } as React.CSSProperties}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="section-wrap cta-section" id="download" aria-labelledby="cta-title">
      <div className="cta-panel glass-panel">
        <p className="eyebrow">Coming soon</p>
        <h2 id="cta-title">Be ready when Tashkent goes live.</h2>
        <p>
          Download links are placeholders for now and can be swapped with real store URLs
          when UZVibes is published.
        </p>
        <DownloadButtons />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <a className="brand" href="/" aria-label="UZVibes home">
          <span className="brand-mark" aria-hidden="true">
            UZ
          </span>
          UZVibes
        </a>
        <p>Built for the next generation of city social life.</p>
      </div>
      <div className="footer-meta">
        <span>uzvibes.com</span>
        <nav aria-label="Footer links">
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="site-shell">
      <div className="background-glow glow-one" aria-hidden="true" />
      <div className="background-glow glow-two" aria-hidden="true" />
      <div className="background-grid" aria-hidden="true" />
      <Header />
      <main id="main-content">
        <HeroSection />
        <WhatSection />
        <FeaturesSection />
        <CityVibesSection />
        <CommunitySection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
