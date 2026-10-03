'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  ShieldAlert,
  PhoneCall,
  MapPin,
  Clock,
  X,
  AlertTriangle,
  Send,
  Navigation,
} from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useApp();

  if (!isOpen) return null;

  const nearestERs = [
    { name: 'Johns Hopkins Emergency Pavilion', distance: '1.4 miles', waitTime: '8 mins' },
    { name: 'University Health Trauma Center', distance: '2.8 miles', waitTime: '12 mins' },
    { name: 'Mount Sinai Urgent Care Bay', distance: '4.1 miles', waitTime: '15 mins' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-slate-900 border-2 border-rose-500/80 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full"
          aria-label="Close emergency modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Emergency Alert Badge */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-rose-500/20 text-rose-400 border border-rose-500/40 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white">Emergency SOS & Urgent Care</h2>
          <p className="text-xs text-rose-300 font-semibold">
            If you are experiencing life-threatening chest pain, stroke, or severe trauma, call emergency services immediately.
          </p>
        </div>

        {/* Call 911 CTA */}
        <div className="space-y-3">
          <button
            onClick={() => {
              showToast('Dialing Emergency Services Hotline (911)...');
            }}
            className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white font-black text-sm rounded-2xl shadow-xl shadow-rose-600/30 flex items-center justify-center gap-3 transition-all hover:scale-105"
          >
            <PhoneCall className="w-5 h-5 animate-bounce" />
            Call Emergency Hotline (911 / 112)
          </button>

          <button
            onClick={() => {
              showToast('Emergency SOS alert sent to your 3 primary emergency contacts!');
            }}
            className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-2xl flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4 text-teal-400" />
            Alert Primary Emergency Contacts with GPS Location
          </button>
        </div>

        {/* Nearest Emergency Rooms */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Navigation className="w-4 h-4 text-teal-400" /> Nearest ER Trauma Centers
          </h3>

          <div className="space-y-2">
            {nearestERs.map((er, idx) => (
              <div
                key={idx}
                className="bg-slate-900 p-3 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-white">{er.name}</p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>📍 {er.distance}</span>
                    <span className="text-teal-400">⏱ ER Wait: {er.waitTime}</span>
                  </p>
                </div>
                <button
                  onClick={() => showToast(`Directions initiated to ${er.name}`)}
                  className="px-3 py-1.5 bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 border border-teal-500/20 rounded-lg font-bold text-[11px]"
                >
                  Navigate
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
