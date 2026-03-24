import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
    setError("");
  };

  // Password strength
  const getStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };
  const strength = getStrength(form.password);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "#ef4444", "#f59e0b", "#6366f1", "#10b981"][
    strength
  ];

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Enter a valid email.";
    if (!form.password) errs.password = "Password is required.";
    else if (form.password.length < 6)
      errs.password = "Password must be at least 6 characters.";
    if (form.password.trim() !== form.confirmPassword.trim())
      errs.confirmPassword = "Passwords do not match.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }
    setLoading(true);
    setError("");

    // Only send what your backend expects: { email, password }
    const payload = {
      email: form.email.trim(),
      password: form.password,
    };

    try {
      // Route: POST http://localhost:5000/api/auth/signup
      // If this still 404s, change "auth/signup" to just "signup"
      await API.post("/auth/signup", payload);

      const loginRes = await API.post("/auth/login", payload);
      const token = loginRes.data.token;
      if (token) localStorage.setItem("token", token);
      navigate("/");
    } catch (err) {
      const backendMsg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message;
      setError(backendMsg || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Bricolage+Grotesque:wght@700;800&display=swap');

        .auth-root { font-family: 'Plus Jakarta Sans', sans-serif; }
        .auth-heading {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          letter-spacing: -0.03em;
        }
        .auth-wordmark {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        @keyframes orb-drift-a {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(40px,-50px) scale(1.1); }
        }
        @keyframes orb-drift-b {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(-30px,35px) scale(1.07); }
        }
        .orb-a { animation: orb-drift-a 10s ease-in-out infinite; }
        .orb-b { animation: orb-drift-b 13s ease-in-out infinite; }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fade-card { animation: fadeUp 0.55s cubic-bezier(.22,1,.36,1) both 0.05s; }

        .auth-input {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          transition: border-color 0.15s, box-shadow 0.15s;
          outline: none;
        }
        .auth-input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
        }
        .auth-input.field-error {
          border-color: #f87171 !important;
          box-shadow: 0 0 0 3px rgba(248,113,113,0.1) !important;
        }

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .btn-auth {
          background: linear-gradient(270deg, #4f46e5, #7c3aed, #4338ca, #4f46e5);
          background-size: 300% 300%;
          animation: shimmer 4s linear infinite;
          transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
        }
        .btn-auth:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(79,70,229,0.4);
        }
        .btn-auth:active:not(:disabled) { transform: scale(0.97); }
        .btn-auth:disabled { opacity:0.65; cursor:not-allowed; animation:none; background:#6366f1; }

        @keyframes bounce {
          0%,80%,100% { transform:scale(0); opacity:0.4; }
          40%          { transform:scale(1);   opacity:1; }
        }
        .dot { animation: bounce 1.2s infinite ease-in-out; }
        .dot:nth-child(2) { animation-delay:0.2s; }
        .dot:nth-child(3) { animation-delay:0.4s; }

        .dot-bg {
          background-image: radial-gradient(circle, rgba(99,102,241,0.1) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        .or-line {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #9ca3af;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .or-line::before,.or-line::after {
          content:''; flex:1; height:1px; background:#e5e7eb;
        }

        /* Strength bar segments */
        .strength-seg {
          flex: 1;
          height: 3px;
          border-radius: 99px;
          background: #e5e7eb;
          transition: background 0.3s;
        }
      `}</style>

      <div className="auth-root min-h-screen relative flex items-center justify-center bg-[#fafafa] px-4 py-12 overflow-hidden">
        <div className="dot-bg absolute inset-0 opacity-70 pointer-events-none" />

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="orb-a absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-violet-200/40 blur-3xl" />
          <div className="orb-b absolute -bottom-32 -left-32 w-[420px] h-[420px] rounded-full bg-indigo-200/35 blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-[440px]">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:shadow-indigo-300 transition-shadow duration-200">
                <svg width="17" height="17" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8.5 4.5L11 2C12.1 0.9 13.9 0.9 15 2C16.1 3.1 16.1 4.9 15 6L12.5 8.5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M7.5 11.5L5 14C3.9 15.1 2.1 15.1 1 14C-0.1 12.9 -0.1 11.1 1 10L3.5 7.5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M5.5 10.5L10.5 5.5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="auth-wordmark text-[1.2rem] text-gray-900">
                Snap<span className="text-indigo-600">Link</span>
              </span>
            </Link>
          </div>

          {/* Card */}
          <div className="fade-card bg-white rounded-2xl shadow-xl shadow-indigo-100/50 border border-gray-100 p-8">
            <div className="mb-7 text-center">
              <h1 className="auth-heading text-2xl text-gray-900 mb-1.5">
                Create your account
              </h1>
              <p className="text-gray-500 text-sm font-medium">
                Start shortening smarter links today
              </p>
            </div>

            {/* Error banner */}
            {error && (
              <div className="mb-5 flex items-start gap-2.5 px-4 py-3 rounded-xl bg-red-50 border border-red-100">
                <svg
                  className="flex-shrink-0 mt-0.5"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="text-red-600 text-sm font-semibold">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Email address
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  autoComplete="email"
                  className={`auth-input w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-900 placeholder-gray-400 ${fieldErrors.email ? "field-error border-red-300" : "border-gray-200"}`}
                />
                {fieldErrors.email && (
                  <p className="text-xs text-red-500 font-semibold mt-0.5">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Min. 6 characters"
                    autoComplete="new-password"
                    className={`auth-input w-full px-4 py-3 pr-11 rounded-xl border bg-gray-50 text-gray-900 placeholder-gray-400 ${fieldErrors.password ? "field-error border-red-300" : "border-gray-200"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {/* Strength meter */}
                {form.password && (
                  <div>
                    <div className="flex gap-1 mt-1.5">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="strength-seg"
                          style={{
                            background:
                              i <= strength ? strengthColor : "#e5e7eb",
                          }}
                        />
                      ))}
                    </div>
                    <p
                      className="text-xs font-semibold mt-1"
                      style={{ color: strengthColor }}
                    >
                      {strengthLabel} password
                    </p>
                  </div>
                )}
                {fieldErrors.password && (
                  <p className="text-xs text-red-500 font-semibold">
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    name="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    className={`auth-input w-full px-4 py-3 pr-11 rounded-xl border bg-gray-50 text-gray-900 placeholder-gray-400 ${fieldErrors.confirmPassword ? "field-error border-red-300" : "border-gray-200"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showConfirm ? (
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {fieldErrors.confirmPassword && (
                  <p className="text-xs text-red-500 font-semibold">
                    {fieldErrors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Terms */}
              <p className="text-xs text-gray-400 font-medium leading-relaxed">
                By signing up, you agree to our{" "}
                <Link
                  to="/terms"
                  className="text-indigo-600 hover:underline font-semibold"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-indigo-600 hover:underline font-semibold"
                >
                  Privacy Policy
                </Link>
                .
              </p>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn-auth mt-1 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white text-sm"
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
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <line x1="19" y1="8" x2="19" y2="14" />
                      <line x1="22" y1="11" x2="16" y2="11" />
                    </svg>
                    Create free account
                  </>
                )}
              </button>
            </form>

            <div className="or-line my-6">or</div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors duration-150 text-sm font-semibold text-gray-700"
            >
              <svg width="17" height="17" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 font-medium mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors underline underline-offset-2"
            >
              Sign in →
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
