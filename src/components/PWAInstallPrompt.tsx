import React, { useState, useEffect } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, X, CheckCircle2, Sparkles, Share2 } from 'lucide-react';

interface PWAInstallPromptProps {
  variant?: 'button' | 'banner' | 'modal';
}

export const PWAInstallHeaderButton: React.FC = () => {
  const { isInstallable, isInstalled, install, isIOS } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  // If already installed as a standalone PWA / Android app, don't show the install button
  if (isInstalled) {
    return null;
  }

  const handleClick = async () => {
    if (isInstallable) {
      await install();
    } else {
      setShowGuide(true);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
        title="Install GyanSarthi Android App"
      >
        <Smartphone className="w-3.5 h-3.5" />
        <span className="hidden xs:inline">App</span>
        <Download className="w-3 h-3 text-emerald-200" />
      </button>

      {showGuide && (
        <InstallGuideModal 
          onClose={() => setShowGuide(false)} 
          isIOS={isIOS} 
        />
      )}
    </>
  );
};

export const PWAInstallBanner: React.FC = () => {
  const { isInstallable, isInstalled, install, isIOS } = usePWAInstall();
  const [isDismissed, setIsDismissed] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  // Persist dismissal for 2 days in localStorage so it doesn't annoy the user
  useEffect(() => {
    const dismissedTime = localStorage.getItem('gyansarthi_pwa_dismissed');
    if (dismissedTime) {
      const diff = Date.now() - parseInt(dismissedTime, 10);
      if (diff < 2 * 24 * 60 * 60 * 1000) {
        setIsDismissed(true);
      }
    }
  }, []);

  if (isInstalled || isDismissed) {
    return null;
  }

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('gyansarthi_pwa_dismissed', Date.now().toString());
  };

  const handleInstallClick = async () => {
    if (isInstallable) {
      const ok = await install();
      if (ok) {
        setIsDismissed(true);
      }
    } else {
      setShowGuide(true);
    }
  };

  return (
    <>
      <div className="fixed bottom-16 sm:bottom-4 left-3 right-3 sm:left-auto sm:right-4 sm:max-w-md z-40 animate-in fade-in slide-in-from-bottom duration-300">
        <div className="bg-slate-900/95 text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl border border-slate-700/80 backdrop-blur-xl flex items-center justify-between gap-3">
          
          {/* App Icon */}
          <div className="relative shrink-0">
            <img
              src="/pwa-192x192.png"
              alt="GyanSarthi App Icon"
              className="w-12 h-12 rounded-xl object-cover shadow-lg border border-white/20 bg-slate-950"
            />
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] text-white font-bold ring-2 ring-slate-900">
              ✓
            </span>
          </div>

          {/* App Info */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-sm tracking-tight text-white truncate">
                GyanSarthi App
              </h4>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.5 rounded border border-emerald-500/30">
                Android PWA
              </span>
            </div>
            <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
              Install app for fast full-screen study & reels
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleInstallClick}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install</span>
            </button>
            <button
              onClick={handleDismiss}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {showGuide && (
        <InstallGuideModal 
          onClose={() => setShowGuide(false)} 
          isIOS={isIOS} 
        />
      )}
    </>
  );
};

export const InstallGuideModal: React.FC<{ onClose: () => void; isIOS: boolean }> = ({ onClose, isIOS }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 text-white shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center text-center">
          <img
            src="/pwa-192x192.png"
            alt="GyanSarthi App"
            className="w-16 h-16 rounded-2xl shadow-xl border border-white/20 mb-3 object-cover"
          />
          <h3 className="text-xl font-bold font-display text-white">
            Install GyanSarthi
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Get the full Android App experience on your home screen
          </p>
        </div>

        {/* Steps */}
        <div className="mt-5 space-y-3 bg-slate-950/60 rounded-2xl p-4 border border-slate-800 text-xs">
          {isIOS ? (
            <>
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center font-bold shrink-0">
                  1
                </div>
                <div>
                  <p className="font-semibold text-white">Tap Share Button</p>
                  <p className="text-slate-400 text-[11px]">
                    Tap the Safari share icon <Share2 className="w-3.5 h-3.5 inline mx-0.5 text-blue-400" /> at bottom.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center font-bold shrink-0">
                  2
                </div>
                <div>
                  <p className="font-semibold text-white">Add to Home Screen</p>
                  <p className="text-slate-400 text-[11px]">
                    Scroll and tap <strong>Add to Home Screen</strong>.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center font-bold shrink-0">
                  1
                </div>
                <div>
                  <p className="font-semibold text-white">Open Chrome Menu</p>
                  <p className="text-slate-400 text-[11px]">
                    Tap the <strong>⋮ (three dots)</strong> menu in Google Chrome.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-emerald-600/30 text-emerald-400 flex items-center justify-center font-bold shrink-0">
                  2
                </div>
                <div>
                  <p className="font-semibold text-white">Install or Add to Home Screen</p>
                  <p className="text-slate-400 text-[11px]">
                    Tap <strong>Install App</strong> or <strong>Add to Home Screen</strong>.
                  </p>
                </div>
              </div>
            </>
          )}

          <div className="flex items-center gap-2 pt-2 border-t border-slate-800 text-[11px] text-emerald-400">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Instant access, offline lecture notes & full-screen reels</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition"
        >
          Got it
        </button>
      </div>
    </div>
  );
};
