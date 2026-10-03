'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Activity, ShieldCheck, HeartPulse, Lock, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/20">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-lg font-black text-white">CarePulse AI</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Omnichannel telehealth, AI diagnostics, biometric vitals monitoring, and instant prescription fulfillment.
            </p>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-2">
              Care Services
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('doctors')} className="hover:text-teal-300 transition-colors">
                  Find Specialist Doctors
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('triage')} className="hover:text-teal-300 transition-colors">
                  AI Symptom Assessment
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('vitals')} className="hover:text-teal-300 transition-colors">
                  Live Vitals Tracker
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('pharmacy')} className="hover:text-teal-300 transition-colors">
                  Express Pharmacy
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Compliance & Trust */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-2">
              Compliance & Security
            </h4>
            <div className="space-y-2 text-slate-300">
              <p className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-400" /> HIPAA & HITECH Compliant
              </p>
              <p className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" /> 256-Bit SSL End-to-End Encryption
              </p>
              <p className="flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-cyan-400" /> FDA-Approved Device Integration
              </p>
            </div>
          </div>

          {/* Col 4: Contact & Hotline */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-2">
              24/7 Clinical Hotline
            </h4>
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-slate-300 font-bold">
                <Phone className="w-4 h-4 text-teal-400" /> +1 (800) 555-CARE-PULSE
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500" /> support@carepulse.health
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-500" /> Johns Hopkins Tech Center, MD
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 CarePulse AI Health Systems, Inc. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Medical Disclaimer: CarePulse AI provides clinical support algorithms. Emergency cases require immediate 911 contact.
          </p>
        </div>
      </div>
    </footer>
  );
};
