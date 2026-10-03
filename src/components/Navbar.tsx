'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Activity,
  UserCheck,
  Stethoscope,
  ShoppingBag,
  ShieldAlert,
  Bot,
  FileText,
  HeartPulse,
  LogOut,
  ChevronDown,
  Pill,
  Calendar,
} from 'lucide-react';

interface NavbarProps {
  onOpenEmergency: () => void;
  onOpenSymptomChecker: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEmergency, onOpenSymptomChecker }) => {
  const {
    user,
    logout,
    openAuthModal,
    activeTab,
    setActiveTab,
    cart,
    setIsCartOpen,
    appointments,
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const activeAppointmentsCount = appointments.filter((a) => a.status === 'confirmed').length;

  const navItems = [
    { id: 'home', label: 'Overview', icon: Activity },
    { id: 'doctors', label: 'Find Doctors', icon: Stethoscope },
    { id: 'triage', label: 'AI Symptom Bot', icon: Bot, isAction: true },
    { id: 'vitals', label: 'Vitals Tracker', icon: HeartPulse },
    { id: 'ehr', label: 'EHR Records', icon: FileText },
    { id: 'pharmacy', label: 'Online Pharmacy', icon: Pill },
  ];

  if (user?.role === 'doctor') {
    navItems.push({ id: 'doctor-desk', label: 'Doctor Workspace', icon: Calendar });
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-teal-400 via-emerald-500 to-cyan-600 p-[1px] shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center">
              <Activity className="w-6 h-6 text-teal-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                CarePulse
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-extrabold tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-md uppercase">
                AI 360
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-wide">
              Omnichannel Digital Health
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            if (item.isAction) {
              return (
                <button
                  key={item.id}
                  onClick={onOpenSymptomChecker}
                  className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl text-teal-300 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 transition-all hover:scale-[1.02]"
                >
                  <Icon className="w-4 h-4 text-teal-400" />
                  {item.label}
                </button>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-md shadow-teal-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Actions & Profile */}
        <div className="flex items-center gap-3">
          {/* Emergency SOS Button */}
          <button
            onClick={onOpenEmergency}
            className="flex items-center gap-2 px-3.5 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-xl text-xs font-bold transition-all shadow-lg shadow-rose-500/10 animate-pulse hover:animate-none"
          >
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span className="hidden sm:inline">Emergency SOS</span>
          </button>

          {/* Pharmacy Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl border border-slate-800 transition-colors"
            aria-label="View Pharmacy Cart"
          >
            <ShoppingBag className="w-5 h-5 text-slate-300" />
            {cartTotalCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-teal-500 text-slate-950 font-extrabold text-[11px] rounded-full flex items-center justify-center border-2 border-slate-950 shadow-md">
                {cartTotalCount}
              </span>
            )}
          </button>

          {/* User Profile / Auth State */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2.5 p-1.5 pr-3 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 rounded-2xl transition-colors"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-xl object-cover border border-teal-500/40"
                />
                <div className="text-left hidden md:block">
                  <p className="text-xs font-bold text-slate-100 leading-tight">{user.name}</p>
                  <p className="text-[10px] text-teal-400 font-medium capitalize">
                    {user.role} Account
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {/* User Menu Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 text-slate-200">
                  <div className="px-3 py-2 border-b border-slate-800">
                    <p className="text-xs font-bold text-white">{user.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setActiveTab('vitals');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl flex items-center gap-2 transition-colors"
                    >
                      <HeartPulse className="w-4 h-4 text-teal-400" />
                      My Vitals & Stats
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('ehr');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl flex items-center gap-2 transition-colors"
                    >
                      <FileText className="w-4 h-4 text-emerald-400" />
                      EHR & Lab Reports
                    </button>

                    {user.role === 'doctor' && (
                      <button
                        onClick={() => {
                          setActiveTab('doctor-desk');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl flex items-center gap-2 transition-colors"
                      >
                        <Calendar className="w-4 h-4 text-cyan-400" />
                        Clinical Workspace
                      </button>
                    )}
                  </div>
                  <div className="pt-1 border-t border-slate-800">
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 rounded-xl flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('Sign in to book doctor consultations & view records')}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-teal-500/20 transition-all hover:scale-105"
            >
              <UserCheck className="w-4 h-4" />
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="flex lg:hidden overflow-x-auto px-4 py-2 bg-slate-950 border-t border-slate-900 space-x-2 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.isAction) {
                  onOpenSymptomChecker();
                } else {
                  setActiveTab(item.id);
                }
              }}
              className={`whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                isActive
                  ? 'bg-teal-500 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
