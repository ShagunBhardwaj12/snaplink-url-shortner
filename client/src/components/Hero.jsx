import { useState } from "react";
import API from "../services/api";

const Hero = () => {
  const [url, setUrl] = useState("");
  const [shortened, setShortened] = useState(""); // full short URL string
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const isValidUrl = (value) => {
    try {
      new URL(value.startsWith("http") ? value : `https://${value}`);
      return true;
    } catch {
      return false;
    }
  };

  // ── Real API call ──────────────────────────────────────────────────────────
  const handleShorten = async () => {
    const trimmed = url.trim();
    if (!trimmed) {
      setError("Please enter a URL.");
      return;
    }
    if (!isValidUrl(trimmed)) {
      setError("Please enter a valid URL (e.g. https://example.com).");
      return;
    }

    setError("");
    setLoading(true);
    setShortened("");

    const fullUrl = trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;

    try {
      const { data } = await API.post("/shorten", { url: fullUrl }); // ✅ matches backend field name

      // Handle both { shortUrl: "http://..." } and { shortCode: "abc123" }
      const result =
        data.shortUrl ||
        (data.shortCode ? `http://localhost:5000/${data.shortCode}` : null) ||
        data.data?.shortUrl || // nested { data: { shortUrl } }
        data.url; // some backends return { url }

      if (!result) {
        console.warn("[API] Unexpected response shape:", data);
        throw new Error(
          "Unexpected response from server. Check browser console for details.",
        );
      }

      setShortened(result);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };
  // ──────────────────────────────────────────────────────────────────────────

  const handleCopy = () => {
    navigator.clipboard.writeText(shortened);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleShorten();
  };

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Bricolage+Grotesque:wght@400;500;700;800&display=swap');

        .hero-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .hero-heading {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        .hero-sub {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 500;
          letter-spacing: -0.01em;
        }

        /* Badge glow */
        .badge-pill {
          background: linear-gradient(135deg, #eef2ff 0%, #f5f3ff 100%);
          border: 1px solid rgba(99,102,241,0.2);
          box-shadow: 0 1px 3px rgba(99,102,241,0.08), inset 0 1px 0 rgba(255,255,255,0.9);
        }

        /* Headline highlight chip */
        .headline-chip {
          display: inline-block;
          position: relative;
          color: #4f46e5;
          white-space: nowrap;
        }
        .headline-chip::before {
          content: '';
          position: absolute;
          inset: -4px -10px;
          background: linear-gradient(135deg, #eef2ff, #ede9fe);
          border-radius: 10px;
          z-index: -1;
          transform: rotate(-0.8deg);
        }

        /* Divider line for stats */
        .stat-divider {
          border-left: 1px solid rgba(0,0,0,0.08);
        }

        /* Animated gradient orbs */
        @keyframes float-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -40px) scale(1.08); }
        }
        @keyframes float-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 30px) scale(1.05); }
        }
        @keyframes float-c {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(15px, 20px) scale(1.06); }
        }

        .orb-a { animation: float-a 9s ease-in-out infinite; }
        .orb-b { animation: float-b 11s ease-in-out infinite; }
        .orb-c { animation: float-c 13s ease-in-out infinite; }

        /* Fade-up stagger */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up-1 { animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) both; animation-delay: 0.05s; }
        .fade-up-2 { animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) both; animation-delay: 0.18s; }
        .fade-up-3 { animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) both; animation-delay: 0.32s; }
        .fade-up-4 { animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) both; animation-delay: 0.46s; }
        .fade-up-5 { animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) both; animation-delay: 0.60s; }

        /* Shimmer on CTA button */
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .btn-shorten {
          background: linear-gradient(270deg, #4f46e5, #7c3aed, #2563eb, #4f46e5);
          background-size: 300% 300%;
          animation: shimmer 4s linear infinite;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .btn-shorten:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(99,60,237,0.45);
        }
        .btn-shorten:active { transform: scale(0.97); }

        /* Loader dots */
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        .dot { animation: bounce 1.2s infinite ease-in-out; }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }

        /* Result slide-in */
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .result-card { animation: slideIn 0.4s cubic-bezier(.22,1,.36,1) both; }

        /* Pill badge */
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(99,102,241,.45); }
          70%  { box-shadow: 0 0 0 8px rgba(99,102,241,0); }
          100% { box-shadow: 0 0 0 0 rgba(99,102,241,0); }
        }
        .badge-dot { animation: pulse-ring 2.2s infinite; }

        /* Dot pattern background */
        .dot-bg {
          background-image: radial-gradient(circle, rgba(99,102,241,0.13) 1.2px, transparent 1.2px);
          background-size: 30px 30px;
        }

        /* Stat counter font */
        .stat-num {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
      `}</style>

      <section className="hero-root relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#fafafa] pt-20 pb-16 px-4">
        {/* Dot background */}
        <div className="dot-bg absolute inset-0 pointer-events-none opacity-60" />

        {/* Gradient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="orb-a absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-indigo-300/30 blur-3xl" />
          <div className="orb-b absolute top-1/2 -right-40 w-[440px] h-[440px] rounded-full bg-violet-300/25 blur-3xl" />
          <div className="orb-c absolute bottom-0 left-1/3 w-[360px] h-[360px] rounded-full bg-blue-300/20 blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="fade-up-1 inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full badge-pill text-indigo-700 text-sm font-semibold tracking-wide">
            <span className="badge-dot w-2 h-2 rounded-full bg-indigo-500 inline-block flex-shrink-0" />
            Trusted by 10M+ marketers worldwide
            <span className="ml-1 text-indigo-400">✦</span>
          </div>

          {/* Headline */}
          <h1 className="hero-heading fade-up-2 text-[2.8rem] sm:text-[3.8rem] lg:text-[4.8rem] text-gray-950 leading-[1.08] mb-5">
            The fastest way to
            <br />
            share <span className="headline-chip">smarter links</span>
          </h1>

          {/* Subheading */}
          <p className="hero-sub fade-up-3 text-[1.1rem] sm:text-xl text-gray-500 max-w-[520px] mx-auto mb-10 leading-[1.7]">
            Shorten, brand & track every link — one platform for teams who care
            about every click.
          </p>

          {/* URL Input Box */}
          <div className="fade-up-4 w-full max-w-2xl mx-auto">
            <div
              className={`flex flex-col sm:flex-row items-stretch gap-3 p-2 rounded-2xl bg-white shadow-xl shadow-indigo-100/60 border ${error ? "border-red-300" : "border-indigo-100"} transition-all duration-200`}
            >
              {/* Link icon */}
              <div className="hidden sm:flex items-center pl-3 text-gray-400 flex-shrink-0">
                <svg
                  width="20"
                  height="20"
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
              </div>

              <input
                type="text"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError("");
                }}
                onKeyDown={handleKeyDown}
                placeholder="Paste your long URL here..."
                className="flex-1 bg-transparent text-gray-800 text-base placeholder-gray-400 outline-none px-3 py-3 min-w-0"
              />

              <button
                onClick={handleShorten}
                disabled={loading}
                className="btn-shorten flex-shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-base disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="dot w-2 h-2 rounded-full bg-white inline-block" />
                    <span className="dot w-2 h-2 rounded-full bg-white inline-block" />
                    <span className="dot w-2 h-2 rounded-full bg-white inline-block" />
                  </>
                ) : (
                  <>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Shorten URL
                  </>
                )}
              </button>
            </div>

            {/* Error */}
            {error && (
              <p className="mt-2 text-sm text-red-500 text-left px-2">
                {error}
              </p>
            )}

            {/* Result card */}
            {shortened && (
              <div className="result-card mt-4 flex items-center justify-between gap-4 px-5 py-4 rounded-xl bg-white border border-indigo-100 shadow-lg shadow-indigo-50">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-xs text-gray-400 mb-0.5">
                      Your short link is ready
                    </p>
                    <a
                      href={shortened}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 font-semibold text-base hover:underline truncate block"
                    >
                      {shortened}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopy}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    copied
                      ? "bg-green-50 text-green-600 border border-green-200"
                      : "bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100"
                  }`}
                >
                  {copied ? (
                    <>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="9"
                          y="9"
                          width="13"
                          height="13"
                          rx="2"
                          ry="2"
                        />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Fine print */}
            <p className="mt-4 text-xs text-gray-400 text-center">
              Free forever · No credit card required ·{" "}
              <a
                href="/signup"
                className="underline underline-offset-2 hover:text-indigo-500 transition-colors"
              >
                Sign up for more features →
              </a>
            </p>
          </div>

          {/* Stats row */}
          <div className="fade-up-5 mt-14 flex items-center justify-center divide-x divide-gray-200 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-100 shadow-sm max-w-md mx-auto overflow-hidden">
            {[
              { num: "10B+", label: "Links shortened" },
              { num: "99.9%", label: "Uptime SLA" },
              { num: "180+", label: "Countries" },
            ].map(({ num, label }) => (
              <div
                key={label}
                className="flex-1 flex flex-col items-center py-4 px-2 gap-0.5"
              >
                <div className="stat-num text-xl sm:text-2xl text-gray-900">
                  {num}
                </div>
                <div className="text-xs text-gray-400 font-medium">{label}</div>
              </div>
            ))}
          </div>

          {/* Brand logos strip */}
          <div className="fade-up-5 mt-12 flex flex-col items-center gap-4">
            <p className="text-xs uppercase tracking-widest text-gray-400 font-medium">
              Powering teams at
            </p>
            <div className="flex items-center gap-8 flex-wrap justify-center opacity-40 grayscale">
              {["Shopify", "Notion", "Linear", "Vercel", "Stripe"].map(
                (brand) => (
                  <span
                    key={brand}
                    className="text-gray-500 font-bold text-sm sm:text-base"
                    style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                  >
                    {brand}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
