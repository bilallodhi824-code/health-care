'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { X, Lock, Mail, User as UserIcon, Phone, ShieldCheck, Stethoscope, UserCheck } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authModalReason, login, signup } = useApp();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [role, setRole] = useState<'patient' | 'doctor'>('patient');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'signin') {
      if (!email || !password) {
        setError('Please enter your email and password.');
        return;
      }
      login(email, role);
    } else {
      if (!name || !email || !password) {
        setError('Please complete all required fields.');
        return;
      }
      signup(name, email, role);
    }
  };

  const handleDemoPatient = () => {
    login('alex.mercer@carepulse.health', 'patient');
  };

  const handleDemoDoctor = () => {
    login('sarah.jenkins@carepulse.health', 'doctor');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-opacity">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 text-slate-100">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-800/60 rounded-full transition-colors"
          aria-label="Close authentication modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-3">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {mode === 'signin' ? 'Welcome Back to CarePulse' : 'Create CarePulse Account'}
          </h2>
          <p className="text-xs text-teal-400 font-medium mt-1">
            {authModalReason || 'Access video consultations, EHR records, & AI diagnostics.'}
          </p>
        </div>

        {/* Role Toggle */}
        <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800 mb-6">
          <button
            type="button"
            onClick={() => setRole('patient')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-xl transition-all ${
              role === 'patient'
                ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            Patient Portal
          </button>
          <button
            type="button"
            onClick={() => setRole('doctor')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-xl transition-all ${
              role === 'doctor'
                ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            Doctor Portal
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder={role === 'doctor' ? 'Dr. Sarah Jenkins' : 'Alex Mercer'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="email"
                placeholder="name@carepulse.health"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-2 bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-semibold text-sm rounded-xl shadow-lg shadow-teal-500/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            {mode === 'signin' ? `Sign In as ${role === 'doctor' ? 'Doctor' : 'Patient'}` : `Create ${role === 'doctor' ? 'Doctor' : 'Patient'} Account`}
          </button>
        </form>

        {/* Quick Demo Logins */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <p className="text-[11px] text-center text-slate-400 font-medium mb-3">Quick Demo Authentication</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleDemoPatient}
              className="py-2 px-3 bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-medium transition-colors border border-slate-700/50 flex items-center justify-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5 text-teal-400" />
              Demo Patient
            </button>
            <button
              type="button"
              onClick={handleDemoDoctor}
              className="py-2 px-3 bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-medium transition-colors border border-slate-700/50 flex items-center justify-center gap-1.5"
            >
              <Stethoscope className="w-3.5 h-3.5 text-emerald-400" />
              Demo Doctor
            </button>
          </div>
        </div>

        {/* Toggle Mode */}
        <div className="mt-5 text-center">
          {mode === 'signin' ? (
            <p className="text-xs text-slate-400">
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setError('');
                }}
                className="text-teal-400 hover:underline font-semibold"
              >
                Sign up free
              </button>
            </p>
          ) : (
            <p className="text-xs text-slate-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setError('');
                }}
                className="text-teal-400 hover:underline font-semibold"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
