'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  Video,
  Bot,
  Stethoscope,
  HeartPulse,
  Clock,
  ChevronRight,
  ShieldCheck,
  Award,
  Users,
  Calendar,
  CheckCircle2,
} from 'lucide-react';

interface HeroSectionProps {
  onOpenSymptomChecker: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenSymptomChecker }) => {
  const { setActiveTab, appointments, joinTelehealthRoom, setSelectedDoctor, doctors, openAuthModal, user } = useApp();

  // Find upcoming confirmed appointment
  const upcomingAppointment = appointments.find((a) => a.status === 'confirmed');

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24 bg-slate-950 text-slate-100">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-teal-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-6 shadow-lg shadow-teal-500/10">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400"></span>
          </span>
          CarePulse AI Triage Engine 2.0 Live & Ready
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Headline & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              Healthcare, Reimagined by{' '}
              <span className="bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent">
                Artificial Intelligence.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              Connect instantly with world-class specialists, analyze symptoms with high-accuracy AI triage, track live vitals, and order digital prescriptions in seconds.
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={onOpenSymptomChecker}
                className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-teal-500/25 transition-all hover:scale-105 active:scale-95"
              >
                <Bot className="w-5 h-5 text-slate-950" />
                Start Free AI Symptom Assessment
              </button>

              <button
                onClick={() => setActiveTab('doctors')}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-100 font-bold text-sm transition-all hover:border-slate-700"
              >
                <Stethoscope className="w-5 h-5 text-teal-400" />
                Find Specialist Doctor
              </button>
            </div>

            {/* Key Trust Signals */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-900">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-teal-500/10 text-teal-400 rounded-xl border border-teal-500/20">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xl font-black text-white">50,000+</p>
                  <p className="text-xs text-slate-400 font-medium">Patients Served</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xl font-black text-white">1,200+</p>
                  <p className="text-xs text-slate-400 font-medium">Board-Certified Doctors</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xl font-black text-white">99.8%</p>
                  <p className="text-xs text-slate-400 font-medium">HIPAA Compliant</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card / Telehealth Active Room Banner */}
          <div className="lg:col-span-5 space-y-4">
            {/* Live Consultation Card or Next Booking Card */}
            {upcomingAppointment ? (
              <div className="relative group bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-teal-500/30 rounded-3xl p-6 shadow-2xl shadow-teal-500/10 overflow-hidden">
                <div className="absolute top-0 right-0 px-4 py-1.5 bg-teal-500 text-slate-950 font-extrabold text-[11px] rounded-bl-2xl uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
                  Upcoming Consultation
                </div>

                <div className="flex items-center gap-4 mb-5 pt-2">
                  <img
                    src={upcomingAppointment.doctorImage}
                    alt={upcomingAppointment.doctorName}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-500/40 shadow-lg"
                  />
                  <div>
                    <h3 className="text-base font-bold text-white">{upcomingAppointment.doctorName}</h3>
                    <p className="text-xs text-teal-400 font-semibold">{upcomingAppointment.doctorSpecialty}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {upcomingAppointment.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {upcomingAppointment.time}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80 mb-5">
                  <p className="text-xs text-slate-400 font-medium">Chief Complaint / Notes:</p>
                  <p className="text-xs font-semibold text-slate-200 mt-0.5">
                    {upcomingAppointment.symptoms}
                  </p>
                </div>

                <button
                  onClick={() => joinTelehealthRoom(upcomingAppointment)}
                  className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <Video className="w-5 h-5 text-slate-950" />
                  Join Virtual Telehealth Room Now
                </button>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
                    <Stethoscope className="w-4 h-4" /> Top Recommended Specialist
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold rounded-lg">
                    Available Today
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={doctors[0].image}
                    alt={doctors[0].name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-500/30"
                  />
                  <div>
                    <h3 className="text-base font-bold text-white">{doctors[0].name}</h3>
                    <p className="text-xs text-teal-400 font-semibold">{doctors[0].specialty}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{doctors[0].hospital}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 mb-4 bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                  &ldquo;{doctors[0].bio}&rdquo;
                </p>

                <button
                  onClick={() => {
                    if (!user) {
                      openAuthModal(`Sign in to book consultation with ${doctors[0].name}`);
                    } else {
                      setSelectedDoctor(doctors[0]);
                    }
                  }}
                  className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  <Calendar className="w-4 h-4 text-slate-950" />
                  Book 1-on-1 Consultation (${doctors[0].fee})
                </button>
              </div>
            )}

            {/* Quick Feature Grid */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setActiveTab('vitals')}
                className="p-4 bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-teal-500/40 rounded-2xl text-left transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-white flex items-center justify-between">
                  Live Vitals <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-400" />
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">BPM, BP, SpO2 Charts</p>
              </button>

              <button
                onClick={() => setActiveTab('pharmacy')}
                className="p-4 bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-2xl text-left transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-white flex items-center justify-between">
                  Pharmacy Store <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400" />
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">Medications & Delivery</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
