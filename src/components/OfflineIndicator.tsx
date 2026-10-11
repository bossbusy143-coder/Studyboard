import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full bg-amber-600/95 backdrop-blur-md px-4 py-2 text-xs font-semibold text-white shadow-xl border border-amber-400/30 animate-pulse">
      <WifiOff className="w-4 h-4 text-white shrink-0" />
      <span>Offline Mode — Using cached study materials & notes</span>
    </div>
  );
};
