const features = [
  {
    id: "01",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    title: "Instant Link Shortening",
    description:
      "Shorten any URL in milliseconds. Clean, memorable links that work everywhere — emails, social, ads, or SMS.",
    accent: "#6366f1",
    bg: "#eef2ff",
    tag: "Core",
  },
  {
    id: "02",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Deep Click Analytics",
    description:
      "Track clicks in real-time. See location, device, referrer, and time-of-day breakdowns for every link you share.",
    accent: "#0ea5e9",
    bg: "#e0f2fe",
    tag: "Analytics",
  },
  {
    id: "03",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Custom Branded Domains",
    description:
      "Replace snaplink.io with your own domain. Build trust and reinforce your brand on every link you send.",
    accent: "#10b981",
    bg: "#d1fae5",
    tag: "Branding",
  },
  {
    id: "04",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <path
          d="M14 14h.01M14 17h.01M17 14h.01M17 17h.01M20 14h.01M20 17h.01M20 20h.01M17 20h.01M14 20h.01"
          strokeWidth="2.5"
        />
      </svg>
    ),
    title: "QR Code Generation",
    description:
      "Every short link gets a downloadable, print-ready QR code. Perfect for packaging, posters, and events.",
    accent: "#f59e0b",
    bg: "#fef3c7",
    tag: "Tools",
  },
  {
    id: "05",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Team Collaboration",
    description:
      "Invite teammates, assign roles, and manage links together. Shared workspaces keep everyone aligned.",
    accent: "#8b5cf6",
    bg: "#ede9fe",
    tag: "Teams",
  },
  {
    id: "06",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "Developer API",
    description:
      "Programmatically shorten, manage, and track links at scale. Full REST API with SDKs for every stack.",
    accent: "#ec4899",
    bg: "#fce7f3",
    tag: "Dev",
  },
];

const Features = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Bricolage+Grotesque:wght@700;800&display=swap');

        .feat-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .feat-heading {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          letter-spacing: -0.03em;
        }
        .feat-label {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        /* Section fade-in on load */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .feat-fade-1 { animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) both; animation-delay: 0.05s; }
        .feat-fade-2 { animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) both; animation-delay: 0.15s; }

        /* Card hover lift */
        .feat-card {
          transition: transform 0.22s cubic-bezier(.22,1,.36,1), box-shadow 0.22s cubic-bezier(.22,1,.36,1), border-color 0.18s;
          border: 1.5px solid #f0f0f2;
          background: #ffffff;
        }
        .feat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.08);
          border-color: transparent;
        }

        /* Icon wrapper glow on hover */
        .feat-card:hover .feat-icon-wrap {
          transform: scale(1.1) rotate(-4deg);
        }
        .feat-icon-wrap {
          transition: transform 0.22s cubic-bezier(.34,1.56,.64,1);
        }

        /* Tag pill */
        .feat-tag {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          font-size: 0.68rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* Card number */
        .feat-num {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          font-size: 0.78rem;
          letter-spacing: 0.05em;
          color: #d1d5db;
        }

        /* Diagonal stripe accent block */
        .feat-stripe {
          background: repeating-linear-gradient(
            -55deg,
            transparent,
            transparent 4px,
            rgba(99,102,241,0.06) 4px,
            rgba(99,102,241,0.06) 8px
          );
        }

        /* Bottom CTA band */
        .feat-cta-band {
          background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%);
        }
        .feat-cta-band::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 20px,
            rgba(255,255,255,0.015) 20px,
            rgba(255,255,255,0.015) 40px
          );
        }
      `}</style>

      <section className="feat-root relative bg-[#fafafa] py-24 px-4 overflow-hidden">
        {/* Faint diagonal stripe background */}
        <div className="feat-stripe absolute inset-0 pointer-events-none" />

        {/* Top glow blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Section header */}
          <div className="feat-fade-1 text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100">
              <span className="feat-tag text-indigo-600">
                Everything you need
              </span>
            </div>

            <h2 className="feat-heading text-4xl sm:text-5xl lg:text-[3.4rem] text-gray-950 mb-5 leading-[1.08]">
              Built for links that
              <br className="hidden sm:block" />{" "}
              <span className="text-indigo-600">actually work</span>
            </h2>

            <p className="text-gray-500 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed font-medium">
              Every tool you need to shorten, brand, share, and measure — all in
              one place.
            </p>
          </div>

          {/* Feature grid */}
          <div className="feat-fade-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat) => (
              <div
                key={feat.id}
                className="feat-card rounded-2xl p-6 flex flex-col gap-4 cursor-default"
              >
                {/* Top row: icon + tag + number */}
                <div className="flex items-start justify-between">
                  <div
                    className="feat-icon-wrap w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: feat.bg, color: feat.accent }}
                  >
                    {feat.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="feat-tag px-2.5 py-1 rounded-full"
                      style={{ background: feat.bg, color: feat.accent }}
                    >
                      {feat.tag}
                    </span>
                    <span className="feat-num">{feat.id}</span>
                  </div>
                </div>

                {/* Text */}
                <div>
                  <h3
                    className="text-[1.05rem] font-bold text-gray-900 mb-2 leading-snug"
                    style={{
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {feat.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-[1.75] font-medium">
                    {feat.description}
                  </p>
                </div>

                {/* Bottom arrow link */}
                <div className="mt-auto pt-2">
                  <span
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-150 group"
                    style={{ color: feat.accent }}
                  >
                    Learn more
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-150 group-hover:translate-x-1"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA band */}
          <div className="relative feat-cta-band rounded-2xl mt-14 px-8 py-10 overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Glow orb inside band */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-8 left-10 w-36 h-36 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative text-center sm:text-left">
              <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-1.5">
                Get started free
              </p>
              <h3
                className="text-white text-2xl sm:text-3xl leading-tight"
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                }}
              >
                Start shortening smarter today.
              </h3>
            </div>

            <div className="relative flex items-center gap-3 flex-shrink-0">
              <a
                href="/signup"
                className="px-6 py-3 rounded-xl bg-white text-indigo-700 text-sm font-bold hover:bg-indigo-50 transition-colors duration-150 shadow-lg"
              >
                Create free account
              </a>
              <a
                href="/demo"
                className="px-5 py-3 rounded-xl border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors duration-150"
              >
                See demo →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
