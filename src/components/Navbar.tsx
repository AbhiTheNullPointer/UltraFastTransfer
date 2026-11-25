import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { AppLogo } from './AppLogo';
import { APP_CONFIG } from '../config/appConfig';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features', external: false },
    { label: 'How it works', href: '#how-it-works', external: false },
    { label: 'Screenshots', href: '#screenshots', external: false },
    { label: 'GitHub', href: APP_CONFIG.repoUrl, external: true },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled || mobileMenuOpen
          ? 'bg-[#FAFAFF]/85 dark:bg-[#111318]/85 backdrop-blur-md border-b border-[#E3E1EC] dark:border-[#2D3140]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand lockup */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-[#1A1B22] dark:text-[#E3E4E8] font-bold text-base sm:text-[17px] tracking-tight whitespace-nowrap shrink-0 rounded-lg"
        >
          <AppLogo className="w-8 h-8 shrink-0" />
          <span className="font-[var(--font-display)]">{APP_CONFIG.appName}</span>
        </a>

        {/* Zone 2: Navigation links */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#46464F] dark:text-[#8B93A7]"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="whitespace-nowrap shrink-0 hover:text-[#4355B9] dark:hover:text-[#9ECAFF] transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={APP_CONFIG.apkDownloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-[#4355B9] hover:bg-[#38479E] active:scale-[0.98] rounded-xl transition-all duration-150 whitespace-nowrap shrink-0 primary-btn-glow"
          >
            Download
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl text-[#1A1B22] dark:text-[#E3E4E8] hover:bg-[#E3E1EC]/70 dark:hover:bg-[#2D3140] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E3E1EC] dark:border-[#2D3140] bg-[#FAFAFF] dark:bg-[#111318] px-4 pt-3 pb-5 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-3 rounded-xl text-base font-medium text-[#1A1B22] dark:text-[#E3E4E8] hover:bg-[#DEE0FF]/50 dark:hover:bg-[#181C26] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href={APP_CONFIG.apkDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center px-4 py-3 text-sm font-semibold text-white bg-[#4355B9] hover:bg-[#38479E] rounded-xl transition-colors primary-btn-glow"
            >
              Download APK
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
