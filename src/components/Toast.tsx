'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { CheckCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900/95 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-teal-500/30 backdrop-blur-md animate-bounce-short transition-all">
      <CheckCircle className="w-5 h-5 text-teal-400 shrink-0" />
      <span className="text-sm font-medium tracking-wide">{toastMessage}</span>
    </div>
  );
};
