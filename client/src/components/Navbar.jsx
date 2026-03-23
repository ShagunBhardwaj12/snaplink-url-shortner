import { useState, useEffect } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Platform", "Solutions", "Pricing", "Resources"];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-white border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="/"
              className="flex items-center gap-2 group"
              aria-label="SnapLink Home"
            >
              {/* Icon Mark */}
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-md group-hover:shadow-violet-200 transition-shadow duration-200">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
              {/* Wordmark */}
              <span className="text-[1.4rem] font-bold tracking-tight text-gray-900">
                Snap<span className="text-violet-600">Link</span>
              </span>
            </a>
          </div>

          {/* Center Nav Links — Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="relative px-4 py-2 text-base font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 transition-all duration-150 group"
              >
                {link}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-violet-500 rounded-full transition-all duration-200 group-hover:w-4" />
              </a>
            ))}
          </div>

          {/* Right Actions — Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/login"
              className="px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 transition-colors duration-150 rounded-md hover:bg-gray-50"
            >
              Log in
            </a>
            <a
              href="/signup"
              className="px-4 py-2 text-base font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg hover:from-violet-700 hover:to-indigo-700 shadow-sm hover:shadow-md hover:shadow-violet-100 transition-all duration-200 active:scale-[0.98]"
            >
              Sign up free
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 transition-colors duration-150"
          >
            <span className="sr-only">Open menu</span>
            <div className="w-5 flex flex-col gap-[5px]">
              <span
                className={`block h-0.5 bg-gray-700 rounded transition-all duration-300 origin-center ${
                  menuOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-gray-700 rounded transition-all duration-300 ${
                  menuOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-gray-700 rounded transition-all duration-300 origin-center ${
                  menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-5 bg-white border-t border-gray-100 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2.5 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-150"
            >
              {link}
            </a>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <a
              href="/login"
              className="block text-center px-4 py-2.5 text-base font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-150"
            >
              Log in
            </a>
            <a
              href="/signup"
              className="block text-center px-4 py-2.5 text-base font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-200"
            >
              Sign up free
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
