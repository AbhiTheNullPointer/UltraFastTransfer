import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface Screenshot {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  imagePath: string;
}

const SCREENSHOTS: Screenshot[] = [
  {
    id: 'share',
    index: '01',
    title: 'Share files',
    subtitle: 'Add files, folders, or a text snippet, then start sharing over your local Wi-Fi.',
    imagePath: `${import.meta.env.BASE_URL}screenshots/01-share.png`,
  },
  {
    id: 'receive',
    index: '02',
    title: 'Receive files',
    subtitle: 'Connect to another device by scanning its QR code or pasting its local link.',
    imagePath: `${import.meta.env.BASE_URL}screenshots/02-receive.png`,
  },
  {
    id: 'transfers',
    index: '03',
    title: 'Track transfers',
    subtitle: 'See active transfer speeds and review downloads in the Transfers tab.',
    imagePath: `${import.meta.env.BASE_URL}screenshots/03-transfers.jpg`,
  },
  {
    id: 'guide',
    index: '04',
    title: 'Follow the quick guide',
    subtitle: 'The in-app walkthrough explains how to connect devices and send files.',
    imagePath: `${import.meta.env.BASE_URL}screenshots/04-how-to-use.png`,
  },
  {
    id: 'navigation',
    index: '05',
    title: 'Open the navigation menu',
    subtitle: 'Reach sharing, receiving, transfer history, and settings from the app menu.',
    imagePath: `${import.meta.env.BASE_URL}screenshots/05-nav-drawer.jpg`,
  },
];

function ScreenshotCard({ screenshot }: { screenshot: Screenshot }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="flex flex-col rounded-2xl bg-white dark:bg-[#181C26] border border-[#E3E1EC] dark:border-[#2D3140] p-5 transition-colors">
      <div className="relative mx-auto w-full max-w-[270px] aspect-[9/20] rounded-[26px] border-[6px] border-[#1A1B22] dark:border-[#2D3140] bg-[#FAFAFF] dark:bg-[#111318] overflow-hidden shadow-sm">
        {imageFailed ? (
          <div className="h-full flex flex-col items-center justify-center gap-2 text-[#767680] dark:text-[#8B93A7]">
            <ImageOff className="w-8 h-8" aria-hidden="true" />
            <span className="text-xs">Screenshot unavailable</span>
          </div>
        ) : (
          <img
            src={screenshot.imagePath}
            alt={`Ultra Fast Transfer ${screenshot.title} screen`}
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="mt-5 space-y-1.5 text-center sm:text-left">
        <h3 className="text-base font-bold text-[#1A1B22] dark:text-[#E3E4E8]">
          {screenshot.index}. {screenshot.title}
        </h3>
        <p className="text-sm text-[#46464F] dark:text-[#8B93A7] leading-relaxed">
          {screenshot.subtitle}
        </p>
      </div>
    </article>
  );
}

export function ScreenshotsShowcase() {
  const [showAll, setShowAll] = useState(false);
  const visibleScreenshots = showAll ? SCREENSHOTS : SCREENSHOTS.slice(0, 3);

  return (
    <section id="screenshots" className="py-16 sm:py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div className="max-w-xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1B22] dark:text-[#E3E4E8]">
              Designed for speed and clarity
            </h2>
            <p className="text-base text-[#46464F] dark:text-[#8B93A7] leading-relaxed">
              See the Android app screens for sharing, receiving, and managing local transfers.
            </p>
          </div>

          <div
            role="group"
            aria-label="Screenshot gallery view"
            className="inline-flex items-center p-1 rounded-xl bg-[#E3E1EC]/60 dark:bg-[#181C26] border border-[#E3E1EC] dark:border-[#2D3140] self-start sm:self-auto"
          >
            <button
              type="button"
              aria-pressed={!showAll}
              onClick={() => setShowAll(false)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                !showAll
                  ? 'bg-white dark:bg-[#2D3140] text-[#1A1B22] dark:text-[#E3E4E8] shadow-xs'
                  : 'text-[#46464F] dark:text-[#8B93A7] hover:text-[#1A1B22] dark:hover:text-[#E3E4E8]'
              }`}
            >
              Core 3 Views
            </button>
            <button
              type="button"
              aria-pressed={showAll}
              onClick={() => setShowAll(true)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                showAll
                  ? 'bg-white dark:bg-[#2D3140] text-[#1A1B22] dark:text-[#E3E4E8] shadow-xs'
                  : 'text-[#46464F] dark:text-[#8B93A7] hover:text-[#1A1B22] dark:hover:text-[#E3E4E8]'
              }`}
            >
              All 5 Screens
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleScreenshots.map((screenshot) => (
            <ScreenshotCard key={screenshot.id} screenshot={screenshot} />
          ))}
        </div>
      </div>
    </section>
  );
}
