import { useState, useEffect } from 'react';
import {
  Wifi,
  FileVideo,
  FolderArchive,
  FileText,
  Copy,
  Check,
  Download,
  QrCode,
  Smartphone,
  Globe,
  RotateCcw,
} from 'lucide-react';
import { AppLogo } from './AppLogo';

type DemoTab = 'share' | 'qr' | 'browser';

const DEMO_FILES = [
  {
    name: 'Goa_Trip_4K.mp4',
    size: '1.42 GB',
    type: 'video',
  },
  {
    name: 'Semester_Notes_Folder',
    size: '384 MB · 42 files',
    type: 'folder',
  },
  {
    name: 'Shared text snippet',
    size: '148 chars',
    type: 'text',
  },
];

export function HeroTransferPreview() {
  const [activeTab, setActiveTab] = useState<DemoTab>('share');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [transferring, setTransferring] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!transferring) return;
    const interval = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setTransferring(false);
          window.clearInterval(interval);
          return 100;
        }
        return Math.min(100, prev + 8);
      });
    }, 110);
    return () => window.clearInterval(interval);
  }, [transferring]);

  const handleCopyUrl = async () => {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard access is unavailable');
      await navigator.clipboard.writeText('http://192.168.1.42:8080');
      setCopiedUrl(true);
      setCopyError(false);
    } catch {
      setCopiedUrl(false);
      setCopyError(true);
    }
    window.setTimeout(() => {
      setCopiedUrl(false);
      setCopyError(false);
    }, 1800);
  };

  const handleSimulateDownload = () => {
    setProgress(0);
    setTransferring(true);
  };

  const renderFileIcon = (type: string) => {
    if (type === 'video') return <FileVideo className="w-4 h-4 text-[#4355B9] dark:text-[#9ECAFF]" />;
    if (type === 'folder') return <FolderArchive className="w-4 h-4 text-[#00696E] dark:text-[#9CF1F7]" />;
    return <FileText className="w-4 h-4 text-[#4355B9] dark:text-[#9ECAFF]" />;
  };

  return (
    <div className="w-full rounded-2xl bg-white dark:bg-[#181C26] border border-[#E3E1EC] dark:border-[#2D3140] shadow-[0_18px_48px_-18px_rgba(26,27,34,0.12)] dark:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.65)] overflow-hidden">
      {/* Interactive mode switcher bar */}
      <div className="px-4 sm:px-5 pt-4 pb-3 border-b border-[#E3E1EC] dark:border-[#2D3140] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <AppLogo className="w-6 h-6 shrink-0" />
          <span className="text-sm font-semibold text-[#1A1B22] dark:text-[#E3E4E8] truncate">
            Interactive transfer demo
          </span>
        </div>

        <div
          role="tablist"
          aria-label="Interactive transfer preview modes"
          className="inline-flex items-center p-1 rounded-xl bg-[#FAFAFF] dark:bg-[#111318] border border-[#E3E1EC] dark:border-[#2D3140]"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'share'}
            onClick={() => setActiveTab('share')}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'share'
                ? 'bg-[#4355B9] text-white'
                : 'text-[#46464F] dark:text-[#8B93A7] hover:text-[#1A1B22] dark:hover:text-[#E3E4E8]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Phone</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'qr'}
            onClick={() => setActiveTab('qr')}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'qr'
                ? 'bg-[#4355B9] text-white'
                : 'text-[#46464F] dark:text-[#8B93A7] hover:text-[#1A1B22] dark:hover:text-[#E3E4E8]'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>QR Link</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'browser'}
            onClick={() => setActiveTab('browser')}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'browser'
                ? 'bg-[#4355B9] text-white'
                : 'text-[#46464F] dark:text-[#8B93A7] hover:text-[#1A1B22] dark:hover:text-[#E3E4E8]'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Browser</span>
          </button>
        </div>
      </div>

      {/* Preview Body */}
      <div className="p-4 sm:p-5 space-y-4">
        {/* Local network address bar */}
        <div className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-[#FAFAFF] dark:bg-[#111318] border border-[#E3E1EC] dark:border-[#2D3140]">
          <div className="flex items-center gap-2.5 min-w-0">
            <Wifi className="w-4 h-4 text-[#00696E] dark:text-[#9CF1F7] shrink-0" />
            <code className="font-mono text-xs sm:text-[13px] text-[#1A1B22] dark:text-[#E3E4E8] truncate">
              http://192.168.1.42:8080
            </code>
          </div>
          <button
            type="button"
            onClick={handleCopyUrl}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#4355B9] dark:text-[#9ECAFF] hover:underline whitespace-nowrap shrink-0 py-1 px-2 rounded-lg"
          >
            {copiedUrl ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied</span>
              </>
            ) : copyError ? (
              <span>Copy unavailable</span>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Tab 1: Phone Share Queue */}
        {activeTab === 'share' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-[#46464F] dark:text-[#8B93A7]">
              <span>Ready to share on local Wi-Fi</span>
              <span className="font-mono tabular-nums">3 items · 1.80 GB</span>
            </div>

            <div className="divide-y divide-[#E3E1EC] dark:divide-[#2D3140] rounded-xl border border-[#E3E1EC] dark:border-[#2D3140] bg-[#FAFAFF]/60 dark:bg-[#111318]/60">
              {DEMO_FILES.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center justify-between gap-3 px-3.5 py-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#DEE0FF]/70 dark:bg-[#2D3140] flex items-center justify-center shrink-0">
                      {renderFileIcon(file.type)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#1A1B22] dark:text-[#E3E4E8] truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-[#46464F] dark:text-[#8B93A7] tabular-nums">
                        {file.size}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-[#00696E] dark:text-[#9CF1F7] shrink-0">
                    Queued
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3 pt-1">
              <p className="text-xs text-[#46464F] dark:text-[#8B93A7]">
                Demo preview. No files are sent.
              </p>
              <button
                type="button"
                onClick={() => setActiveTab('qr')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#4355B9] hover:bg-[#38479E] rounded-xl transition-colors whitespace-nowrap shrink-0"
              >
                <span>Show QR Code</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: QR Connect View */}
        {activeTab === 'qr' && (
          <div className="flex flex-col sm:flex-row items-center gap-5 py-2">
            {/* Crisp SVG QR pattern */}
            <div className="p-3.5 rounded-2xl bg-white border border-[#E3E1EC] shrink-0">
              <svg
                viewBox="0 0 120 120"
                className="w-32 h-32 text-[#1A1B22]"
                aria-label="Illustrative QR pattern; this is not scannable"
                role="img"
              >
                {/* Finder squares */}
                <rect x="8" y="8" width="28" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="16" y="16" width="12" height="12" rx="2" fill="#4355B9" />

                <rect x="84" y="8" width="28" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="92" y="16" width="12" height="12" rx="2" fill="#4355B9" />

                <rect x="8" y="84" width="28" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="16" y="92" width="12" height="12" rx="2" fill="#4355B9" />

                {/* Data modules */}
                <rect x="46" y="10" width="8" height="8" rx="1.5" fill="currentColor" />
                <rect x="62" y="10" width="12" height="8" rx="1.5" fill="currentColor" />
                <rect x="46" y="24" width="16" height="8" rx="1.5" fill="currentColor" />
                <rect x="68" y="24" width="6" height="14" rx="1.5" fill="currentColor" />

                <rect x="10" y="46" width="10" height="8" rx="1.5" fill="currentColor" />
                <rect x="26" y="46" width="12" height="12" rx="1.5" fill="currentColor" />
                <rect x="46" y="46" width="28" height="28" rx="6" fill="#4355B9" />
                <path
                  d="M61.5 51L53.5 61h6l-1 8 8-10h-6l1-8z"
                  fill="#FFFFFF"
                  stroke="#FFFFFF"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />

                <rect x="84" y="46" width="10" height="12" rx="1.5" fill="currentColor" />
                <rect x="100" y="46" width="12" height="8" rx="1.5" fill="currentColor" />
                <rect x="84" y="64" width="28" height="8" rx="1.5" fill="currentColor" />

                <rect x="10" y="64" width="24" height="8" rx="1.5" fill="currentColor" />
                <rect x="46" y="84" width="12" height="10" rx="1.5" fill="currentColor" />
                <rect x="64" y="84" width="10" height="26" rx="1.5" fill="currentColor" />
                <rect x="84" y="84" width="14" height="12" rx="1.5" fill="#00696E" />
                <rect x="104" y="84" width="8" height="28" rx="1.5" fill="currentColor" />
                <rect x="46" y="102" width="12" height="10" rx="1.5" fill="currentColor" />
                <rect x="82" y="102" width="16" height="10" rx="1.5" fill="currentColor" />
              </svg>
            </div>

            <div className="space-y-2.5 text-center sm:text-left">
              <h3 className="text-base font-bold text-[#1A1B22] dark:text-[#E3E4E8]">
                Example QR connection
              </h3>
              <p className="text-sm text-[#46464F] dark:text-[#8B93A7] leading-relaxed">
                This QR graphic and local address are illustrative. The website preview does not connect to a phone or transfer files.
              </p>
              <button
                type="button"
                onClick={() => setActiveTab('browser')}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#4355B9] hover:bg-[#38479E] rounded-xl transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Open Browser Receiver</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Browser Receive View */}
        {activeTab === 'browser' && (
          <div className="space-y-3.5">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-[#1A1B22] dark:text-[#E3E4E8]">
                  Example connection on local Wi-Fi
                </p>
                <p className="text-xs text-[#46464F] dark:text-[#8B93A7]">
                  Preview only. No device is connected.
                </p>
              </div>
              <span className="font-mono text-xs font-semibold text-[#00696E] dark:text-[#9CF1F7] tabular-nums whitespace-nowrap">
                {transferring ? 'Demo: 42 MB/s' : progress === 100 ? 'Demo complete' : 'Ready'}
              </span>
            </div>

            {/* Transfer progress block */}
            <div className="p-3.5 rounded-xl bg-[#FAFAFF] dark:bg-[#111318] border border-[#E3E1EC] dark:border-[#2D3140] space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[#1A1B22] dark:text-[#E3E4E8] truncate">
                  All_Shared_Files.zip (1.80 GB)
                </span>
                <span className="font-mono text-[#46464F] dark:text-[#8B93A7] tabular-nums">
                  {progress}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#E3E1EC] dark:bg-[#2D3140] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#4355B9] dark:bg-[#9ECAFF] transition-transform duration-150 origin-left"
                  style={{ transform: `scaleX(${Math.max(progress, 4) / 100})` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#46464F] dark:text-[#8B93A7] tabular-nums">
                <span>
                  {progress === 100
                    ? 'Demo complete. No files were transferred.'
                    : transferring
                      ? 'Simulating transfer progress...'
                      : 'Demo only. No files are downloaded.'}
                </span>
                <span>Simulation only</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleSimulateDownload}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#4355B9] hover:bg-[#38479E] rounded-xl transition-colors whitespace-nowrap"
              >
                {progress === 100 ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Replay demo</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Simulate ZIP download</span>
                  </>
                )}
              </button>
              <span className="text-xs text-[#46464F] dark:text-[#8B93A7]">
                Works on Windows, macOS, Linux, iOS
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
