const socials = [
  {
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.736-8.859L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
      </svg>
    ),
  },
];

const navLinks = [
  { label: "Platform", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Docs", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
];

const Footer = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Bricolage+Grotesque:wght@700;800&display=swap');

        .sf-root { font-family: 'Plus Jakarta Sans', sans-serif; }

        .sf-wordmark {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        .sf-link {
          color: #6b7280;
          font-size: 0.8rem;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.15s;
        }
        .sf-link:hover { color: #c7d2fe; }

        .sf-social {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b7280;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.04);
          transition: color 0.15s, background 0.15s, border-color 0.15s, transform 0.15s;
        }
        .sf-social:hover {
          color: #a5b4fc;
          background: rgba(99,102,241,0.15);
          border-color: rgba(99,102,241,0.35);
          transform: translateY(-2px);
        }

        @keyframes status-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.35; }
        }
        .sf-status-dot { animation: status-pulse 2.5s ease-in-out infinite; }
      `}</style>

      <footer className="sf-root bg-[#0f0f14]">
        {/* Top glow line */}
        <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/25 to-transparent" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left — Logo + copyright */}
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8.5 4.5L11 2C12.1 0.9 13.9 0.9 15 2C16.1 3.1 16.1 4.9 15 6L12.5 8.5"
                    stroke="white"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M7.5 11.5L5 14C3.9 15.1 2.1 15.1 1 14C-0.1 12.9 -0.1 11.1 1 10L3.5 7.5"
                    stroke="white"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M5.5 10.5L10.5 5.5"
                    stroke="white"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="sf-wordmark text-[0.95rem] text-white">
                Snap<span className="text-indigo-400">Link</span>
              </span>
              <span className="hidden sm:block text-gray-700 text-xs select-none">
                ·
              </span>
              <span className="hidden sm:block text-gray-600 text-xs font-medium">
                © {new Date().getFullYear()} SnapLink, Inc.
              </span>
            </div>

            {/* Center — Nav links */}
            <nav className="flex items-center gap-5 flex-wrap justify-center">
              {navLinks.map((l) => (
                <a key={l.label} href={l.href} className="sf-link">
                  {l.label}
                </a>
              ))}
            </nav>

            {/* Right — Status + Socials */}
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-1.5">
                <span className="sf-status-dot w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                <span className="text-[0.7rem] text-gray-600 font-semibold">
                  All systems up
                </span>
              </div>
              <div className="w-px h-4 bg-white/10 hidden lg:block" />
              <div className="flex items-center gap-1.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="sf-social"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile-only copyright */}
          <p className="sm:hidden text-center text-gray-700 text-xs font-medium mt-4">
            © {new Date().getFullYear()} SnapLink, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
