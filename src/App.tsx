import { useState, useEffect } from 'react';
import {
  Zap,
  Shield,
  Globe,
  QrCode,
  FileText,
  Folder,
  Download,
  ArrowRight,
  Sun,
  Moon,
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { AppLogo } from './components/AppLogo';
import { HeroTransferPreview } from './components/HeroTransferPreview';
import { ScreenshotsShowcase } from './components/ScreenshotsShowcase';
import { APP_CONFIG } from './config/appConfig';

const FEATURES = [
  {
    icon: Zap,
    title: 'Blazing fast',
    description:
      'Reach up to 42 MB/s (336 Mbps) on fast Wi-Fi. Actual speed depends on your network and devices.',
    accent: 'primary' as const,
  },
  {
    icon: Shield,
    title: '100% private',
    description:
      'Files go directly from one device to another. Nothing is uploaded to any server.',
    accent: 'tertiary' as const,
  },
  {
    icon: Globe,
    title: 'Browser-first',
    description:
      'The receiving device only needs a browser - no app install required on that side.',
    accent: 'primary' as const,
  },
  {
    icon: QrCode,
    title: 'Scan & go',
    description:
      'Share a QR code or link. The other person taps one button and downloads start.',
    accent: 'tertiary' as const,
  },
  {
    icon: FileText,
    title: 'Share text too',
    description:
      'Paste any text snippet - paragraphs, passwords, notes - and copy it on the other device.',
    accent: 'primary' as const,
  },
  {
    icon: Folder,
    title: 'Folders & bulk',
    description: 'Add entire folders. Download all as ZIP with one tap.',
    accent: 'tertiary' as const,
  },
];

const STEPS = [
  {
    number: '1',
    title: 'Connect to the same Wi-Fi',
    description: 'Both devices on the same network or mobile hotspot.',
    tip: 'No router nearby? Turn on your Android mobile hotspot and connect the other device to it - zero mobile data is used.',
  },
  {
    number: '2',
    title: 'Open Ultra Fast Transfer and add files',
    description: 'Pick individual files, entire folders, or plain text snippets.',
    tip: 'Original quality is always preserved - photos and 4K videos are sent byte-for-byte without compression.',
  },
  {
    number: '3',
    title: 'Tap Start Sharing',
    description: 'A local link and QR code appear instantly on your screen.',
    tip: 'A lightweight local HTTP server runs strictly on your LAN interface and stops the moment you tap Stop.',
  },
  {
    number: '4',
    title: 'Other device opens the link',
    description: 'Scan the QR code or open the link in any browser, no app needed.',
    tip: 'Works seamlessly on Windows, macOS, Linux, iOS, iPadOS, Chromebooks, and Android browsers.',
  },
  {
    number: '5',
    title: 'Files download at full speed',
    description: 'Everything streams directly device-to-device over your local network.',
    tip: 'Grab individual files or click Download All as ZIP for multi-file and folder transfers.',
  },
];

function GitHubIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0.5C5.37 0.5 0 5.87 0 12.5C0 17.8 3.44 22.3 8.21 23.89C8.81 24 9.03 23.63 9.03 23.31C9.03 23.03 9.02 22.08 9.01 21.08C5.67 21.81 4.97 19.66 4.97 19.66C4.42 18.28 3.63 17.91 3.63 17.91C2.55 17.17 3.71 17.18 3.71 17.18C4.91 17.27 5.54 18.41 5.54 18.41C6.61 20.24 8.34 19.71 9.07 19.4C9.18 18.63 9.49 18.1 9.83 17.8C7.17 17.5 4.37 16.47 4.37 11.88C4.37 10.57 4.84 9.5 5.6 8.66C5.48 8.36 5.07 7.14 5.72 5.49C5.72 5.49 6.73 5.17 9.02 6.72C9.98 6.45 11.01 6.32 12.03 6.31C13.05 6.32 14.08 6.45 15.04 6.72C17.33 5.17 18.33 5.49 18.33 5.49C18.99 7.14 18.58 8.36 18.45 8.66C19.22 9.5 19.68 10.57 19.68 11.88C19.68 16.48 16.88 17.49 14.21 17.79C14.64 18.16 15.02 18.89 15.02 20.01C15.02 21.62 15.01 22.92 15.01 23.31C15.01 23.63 15.22 24.01 15.83 23.89C20.59 22.3 24.03 17.8 24.03 12.5C24.03 5.87 18.65 0.5 12 0.5Z" />
    </svg>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const syncTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    syncTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystemChange = (e: MediaQueryListEvent) => {
      try {
        if (!localStorage.getItem('uft-theme')) {
          document.documentElement.classList.toggle('dark', e.matches);
          setIsDark(e.matches);
        }
      } catch {
        // Ignore storage restrictions
      }
    };
    mediaQuery.addEventListener('change', onSystemChange);
    return () => mediaQuery.removeEventListener('change', onSystemChange);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    document.documentElement.classList.toggle('dark', nextDark);
    setIsDark(nextDark);
    try {
      localStorage.setItem('uft-theme', nextDark ? 'dark' : 'light');
    } catch {
      // Ignore storage restrictions
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFF] dark:bg-[#111318] text-[#1A1B22] dark:text-[#E3E4E8] transition-colors duration-200">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-radial-bg pt-12 pb-16 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28 border-b border-[#E3E1EC]/70 dark:border-[#2D3140]/70">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Copy & CTAs */}
              <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
                <h1
                  className="font-extrabold tracking-tight text-[#1A1B22] dark:text-[#E3E4E8] leading-[1.08]"
                  style={{
                    fontSize: 'clamp(2.25rem, 5vw, 3.6rem)',
                    textWrap: 'balance',
                  }}
                >
                  Transfer files at full speed.
                </h1>

                <p className="text-lg sm:text-xl font-medium text-[#1A1B22]/90 dark:text-[#E3E4E8]/90 leading-snug max-w-xl mx-auto lg:mx-0">
                  No internet. No account. No cloud. Just your local Wi-Fi.
                </p>

                <p className="text-base text-[#46464F] dark:text-[#8B93A7] leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Transfer files between devices at full Wi-Fi speed - directly over your local network. Works from any browser. Nothing leaves your network.
                </p>

                <div className="space-y-1.5">
                  <div className="inline-flex flex-col items-center sm:flex-row gap-x-2 gap-y-0.5 rounded-xl border border-[#E3E1EC] dark:border-[#2D3140] bg-white/75 dark:bg-[#181C26]/75 px-4 py-2.5 text-sm">
                    <span className="font-bold text-[#4355B9] dark:text-[#9ECAFF]">Up to 42 MB/s</span>
                    <span className="text-[#46464F] dark:text-[#8B93A7]">(about 336 Mbps) over fast Wi-Fi</span>
                  </div>
                  <p className="text-xs text-[#767680] dark:text-[#8B93A7]">
                    Actual speed varies with your Wi-Fi network and devices.
                  </p>
                </div>

                {/* Primary & Secondary CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-2">
                  <a
                    href={APP_CONFIG.apkDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#4355B9] hover:bg-[#38479E] active:scale-[0.98] rounded-xl transition-all duration-150 whitespace-nowrap primary-btn-glow"
                  >
                    <Download className="w-4 h-4 shrink-0" />
                    <span>Download APK</span>
                  </a>

                  <a
                    href={APP_CONFIG.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-[#1A1B22] dark:text-[#E3E4E8] bg-transparent hover:bg-[#E3E1EC]/60 dark:hover:bg-[#181C26] border border-[#767680]/45 dark:border-[#2D3140] rounded-xl transition-colors whitespace-nowrap"
                  >
                    <GitHubIcon className="w-4 h-4 shrink-0" />
                    <span>View on GitHub</span>
                  </a>
                </div>

                {/* Clean unboxed trust line */}
                <p className="text-xs sm:text-sm text-[#46464F] dark:text-[#8B93A7] pt-1">
                  Free to download <span aria-hidden="true">·</span> Android 7+{' '}
                  <span aria-hidden="true">·</span> Works with any browser
                </p>
              </div>

              {/* Right Column: Interactive Product Showcase */}
              <div className="lg:col-span-6 w-full max-w-xl mx-auto lg:max-w-none">
                <HeroTransferPreview />
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-16 sm:py-24 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl space-y-2 mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1B22] dark:text-[#E3E4E8]">
                Built for local speed and privacy
              </h2>
              <p className="text-base text-[#46464F] dark:text-[#8B93A7] leading-relaxed">
                Everything you need to move large videos, folders, or quick notes between phones and computers without touching external servers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {FEATURES.map((feature) => {
                const Icon = feature.icon;
                const isPrimary = feature.accent === 'primary';
                return (
                  <article
                    key={feature.title}
                    className="rounded-2xl bg-white dark:bg-[#181C26] border border-[#E3E1EC] dark:border-[#2D3140] p-6 transition-colors hover:border-[#4355B9]/45 dark:hover:border-[#9ECAFF]/40"
                  >
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${
                        isPrimary
                          ? 'bg-[#DEE0FF] text-[#00006E] dark:bg-[#4355B9]/25 dark:text-[#9ECAFF]'
                          : 'bg-[#9CF1F7]/70 text-[#00696E] dark:bg-[#00696E]/30 dark:text-[#9CF1F7]'
                      }`}
                    >
                      <Icon className="w-5 h-5" strokeWidth={2} />
                    </div>
                    <h3 className="text-lg font-bold text-[#1A1B22] dark:text-[#E3E4E8] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-[15px] text-[#46464F] dark:text-[#8B93A7] leading-relaxed">
                      {feature.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section
          id="how-it-works"
          className="py-16 sm:py-24 scroll-mt-20 border-y border-[#E3E1EC]/80 dark:border-[#2D3140]/80 bg-white/60 dark:bg-[#181C26]/40"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl space-y-2 mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1B22] dark:text-[#E3E4E8]">
                How it works
              </h2>
              <p className="text-base text-[#46464F] dark:text-[#8B93A7] leading-relaxed">
                Five quick steps from selecting files to full-speed download. Tap any step for a quick tip.
              </p>
            </div>

            {/* Desktop horizontal timeline / Mobile vertical timeline */}
            <div className="relative">
              {/* Connecting line on desktop */}
              <div
                aria-hidden="true"
                className="hidden lg:block absolute top-5 left-5 right-5 h-px bg-[#E3E1EC] dark:bg-[#2D3140]"
              />

              <ol className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-5 relative">
                {STEPS.map((step, index) => {
                  const isActive = activeStep === index;
                  return (
                    <li key={step.number} className="relative">
                      <button
                        type="button"
                        onClick={() => setActiveStep(index)}
                        className={`w-full text-left flex lg:flex-col items-start gap-4 lg:gap-4 p-4 rounded-2xl border transition-colors ${
                          isActive
                            ? 'bg-white dark:bg-[#181C26] border-[#4355B9] dark:border-[#9ECAFF]'
                            : 'bg-transparent border-transparent hover:bg-white/80 dark:hover:bg-[#181C26]/70 hover:border-[#E3E1EC] dark:hover:border-[#2D3140]'
                        }`}
                      >
                        <span
                          className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold font-mono tabular-nums shrink-0 transition-colors ${
                            isActive
                              ? 'bg-[#4355B9] text-white'
                              : 'bg-[#DEE0FF] text-[#00006E] dark:bg-[#2D3140] dark:text-[#9ECAFF]'
                          }`}
                        >
                          {step.number}
                        </span>
                        <div className="space-y-1.5 min-w-0">
                          <h3 className="text-[15px] font-bold text-[#1A1B22] dark:text-[#E3E4E8] leading-snug">
                            {step.title}
                          </h3>
                          <p className="text-sm text-[#46464F] dark:text-[#8B93A7] leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Contextual tip bar for active step */}
            <div className="mt-6 rounded-2xl bg-[#FAFAFF] dark:bg-[#111318] border border-[#E3E1EC] dark:border-[#2D3140] px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <p className="text-sm text-[#1A1B22] dark:text-[#E3E4E8] leading-relaxed">
                <span className="font-semibold text-[#4355B9] dark:text-[#9ECAFF] mr-2">
                  Step {STEPS[activeStep].number} note:
                </span>
                {STEPS[activeStep].tip}
              </p>
              <span className="text-xs font-mono text-[#767680] dark:text-[#8B93A7] tabular-nums shrink-0">
                {activeStep + 1} / {STEPS.length}
              </span>
            </div>
          </div>
        </section>

        {/* Screenshots Showcase */}
        <ScreenshotsShowcase />

        {/* Download Section */}
        <section id="download" className="pb-16 sm:pb-24 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-white dark:bg-[#181C26] border border-[#E3E1EC] dark:border-[#2D3140] px-6 py-12 sm:px-12 sm:py-16 text-center relative overflow-hidden">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#DEE0FF]/55 to-transparent dark:from-[#4355B9]/20 dark:to-transparent"
              />

              <div className="relative max-w-xl mx-auto space-y-6">
                <div className="flex justify-center">
                  <AppLogo className="w-14 h-14 shadow-sm" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#1A1B22] dark:text-[#E3E4E8]">
                    Get Ultra Fast Transfer
                  </h2>
                  <p className="text-sm sm:text-base text-[#46464F] dark:text-[#8B93A7] tabular-nums">
                    v{APP_CONFIG.version} <span aria-hidden="true">·</span> Free{' '}
                    <span aria-hidden="true">·</span> Direct APK{' '}
                    <span aria-hidden="true">·</span> Android 7.0+
                  </p>
                </div>

                <div className="pt-1 flex flex-col items-center gap-4">
                  <a
                    href={APP_CONFIG.apkDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-[#4355B9] hover:bg-[#38479E] active:scale-[0.98] rounded-xl transition-all duration-150 whitespace-nowrap primary-btn-glow"
                  >
                    <Download className="w-5 h-5 shrink-0" />
                    <span>Download latest APK</span>
                  </a>

                  <a
                    href={APP_CONFIG.releasesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#4355B9] dark:text-[#9ECAFF] hover:underline py-1"
                  >
                    <span>View all releases on GitHub</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E3E1EC] dark:border-[#2D3140] bg-[#FAFAFF] dark:bg-[#111318]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left: logo + app name */}
            <a
              href="#"
              className="flex items-center gap-2.5 font-bold text-[#1A1B22] dark:text-[#E3E4E8] whitespace-nowrap"
            >
              <AppLogo className="w-7 h-7" />
              <span className="font-[var(--font-display)] text-sm sm:text-base">
                {APP_CONFIG.appName}
              </span>
            </a>

            {/* Center: credit */}
            <p className="text-sm text-[#46464F] dark:text-[#8B93A7] text-center">
              Built with care by{' '}
              <a
                href={APP_CONFIG.authorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#1A1B22] dark:text-[#E3E4E8] hover:text-[#4355B9] dark:hover:text-[#9ECAFF] underline underline-offset-4 decoration-[#E3E1EC] dark:decoration-[#2D3140]"
              >
                {APP_CONFIG.authorName}
              </a>
            </p>

            {/* Right: Theme switch & GitHub icon */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-[#46464F] dark:text-[#8B93A7] hover:text-[#1A1B22] dark:hover:text-[#E3E4E8] hover:bg-[#E3E1EC]/60 dark:hover:bg-[#181C26] transition-colors"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <a
                href={APP_CONFIG.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ultra Fast Transfer on GitHub"
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-[#46464F] dark:text-[#8B93A7] hover:text-[#1A1B22] dark:hover:text-[#E3E4E8] hover:bg-[#E3E1EC]/60 dark:hover:bg-[#181C26] transition-colors"
              >
                <GitHubIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="pt-6 border-t border-[#E3E1EC]/70 dark:border-[#2D3140]/70 text-center text-xs text-[#767680] dark:text-[#8B93A7]">
            © 2025 {APP_CONFIG.appName} <span aria-hidden="true">·</span> All rights reserved
          </div>
        </div>
      </footer>
    </div>
  );
}
