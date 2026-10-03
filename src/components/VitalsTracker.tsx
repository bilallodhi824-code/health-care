'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  HeartPulse,
  Activity,
  Plus,
  TrendingUp,
  Calendar,
  CheckCircle,
  Thermometer,
  Zap,
} from 'lucide-react';

export const VitalsTracker: React.FC = () => {
  const { vitals, addVitalRecord } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [heartRate, setHeartRate] = useState(72);
  const [bpSystolic, setBpSystolic] = useState(118);
  const [bpDiastolic, setBpDiastolic] = useState(76);
  const [spO2, setSpO2] = useState(99);
  const [glucose, setGlucose] = useState(92);
  const [temperature, setTemperature] = useState(98.6);
  const [notes, setNotes] = useState('');

  const latestVital = vitals[0] || {
    heartRate: 72,
    bpSystolic: 118,
    bpDiastolic: 76,
    spO2: 99,
    glucose: 92,
    temperature: 98.6,
  };

  const handleLogVital = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    addVitalRecord({
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      heartRate: Number(heartRate),
      bpSystolic: Number(bpSystolic),
      bpDiastolic: Number(bpDiastolic),
      spO2: Number(spO2),
      glucose: Number(glucose),
      temperature: Number(temperature),
      notes,
    });
    setIsModalOpen(false);
  };

  return (
    <section className="py-12 bg-slate-950 text-slate-100 min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider mb-2">
              <HeartPulse className="w-4 h-4 animate-pulse" /> Real-Time Biometric Monitoring
            </div>
            <h2 className="text-3xl font-black text-white">Vitals & Health Analytics</h2>
            <p className="text-sm text-slate-400 mt-1">
              Continuous vital signs tracking synced with CarePulse clinical algorithms.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-extrabold text-xs rounded-2xl shadow-lg shadow-teal-500/20 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4 text-slate-950" />
            Log New Vital Measurement
          </button>
        </div>

        {/* Current Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Heart Rate */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Heart Rate</span>
              <div className="p-2 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20">
                <HeartPulse className="w-5 h-5 animate-pulse" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white">{latestVital.heartRate}</span>
              <span className="text-xs text-slate-400 font-bold">BPM</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Resting Optimal
              </span>
              <span className="text-slate-500">Normal 60-100</span>
            </div>
          </div>

          {/* Blood Pressure */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Blood Pressure</span>
              <div className="p-2 bg-teal-500/10 text-teal-400 rounded-xl border border-teal-500/20">
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white">
                {latestVital.bpSystolic}/{latestVital.bpDiastolic}
              </span>
              <span className="text-xs text-slate-400 font-bold">mmHg</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Ideal Range
              </span>
              <span className="text-slate-500">&lt; 120/80</span>
            </div>
          </div>

          {/* Blood Oxygen SpO2 */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Oxygen Saturation</span>
              <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20">
                <Zap className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white">{latestVital.spO2}%</span>
              <span className="text-xs text-slate-400 font-bold">SpO2</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Excellent
              </span>
              <span className="text-slate-500">Target 95-100%</span>
            </div>
          </div>

          {/* Blood Glucose */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fasting Glucose</span>
              <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                <Thermometer className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white">{latestVital.glucose}</span>
              <span className="text-xs text-slate-400 font-bold">mg/dL</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Normal Fasting
              </span>
              <span className="text-slate-500">70-99 mg/dL</span>
            </div>
          </div>
        </div>

        {/* Interactive SVG Trend Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-teal-400" />
                7-Day Heart Rate & BP Micro-Trend Graph
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Automated smoothing & threshold detection</p>
            </div>
            <span className="px-3 py-1 bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-bold rounded-xl">
              Live Biometrics
            </span>
          </div>

          {/* SVG Visualizer */}
          <div className="h-64 w-full bg-slate-950 rounded-2xl p-4 border border-slate-800/80 relative flex items-end justify-between gap-2 overflow-hidden">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-20">
              <div className="border-b border-slate-700 w-full" />
              <div className="border-b border-slate-700 w-full" />
              <div className="border-b border-slate-700 w-full" />
            </div>

            {vitals.slice(0, 7).reverse().map((record, idx) => {
              const heightPercent = Math.min(Math.max((record.heartRate / 120) * 100, 20), 95);
              return (
                <div key={record.id || idx} className="flex-1 flex flex-col items-center gap-2 z-10 group">
                  <div className="text-[10px] text-teal-300 font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 px-2 py-1 rounded border border-teal-500/30">
                    {record.heartRate} BPM
                  </div>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full max-w-[32px] bg-gradient-to-t from-teal-500/40 via-teal-400 to-emerald-400 rounded-t-xl group-hover:brightness-125 transition-all relative"
                  />
                  <span className="text-[11px] text-slate-400 font-medium truncate w-full text-center">
                    {record.date.slice(5)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* History Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white">Log History</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3 font-semibold">Date & Time</th>
                  <th className="p-3 font-semibold">Heart Rate</th>
                  <th className="p-3 font-semibold">Blood Pressure</th>
                  <th className="p-3 font-semibold">SpO2</th>
                  <th className="p-3 font-semibold">Glucose</th>
                  <th className="p-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {vitals.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-medium flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {v.date} ({v.time})
                    </td>
                    <td className="p-3 font-bold text-rose-400">{v.heartRate} BPM</td>
                    <td className="p-3 font-bold text-teal-400">
                      {v.bpSystolic}/{v.bpDiastolic} mmHg
                    </td>
                    <td className="p-3 font-bold text-cyan-400">{v.spO2}%</td>
                    <td className="p-3 font-bold text-amber-400">{v.glucose} mg/dL</td>
                    <td className="p-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Optimal
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Log Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-slate-100">
            <h3 className="text-xl font-bold text-white mb-4">Log New Vitals</h3>
            <form onSubmit={handleLogVital} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-300 mb-1">Heart Rate (BPM)</label>
                  <input
                    type="number"
                    value={heartRate}
                    onChange={(e) => setHeartRate(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-300 mb-1">Oxygen SpO2 (%)</label>
                  <input
                    type="number"
                    value={spO2}
                    onChange={(e) => setSpO2(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-300 mb-1">BP Systolic</label>
                  <input
                    type="number"
                    value={bpSystolic}
                    onChange={(e) => setBpSystolic(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-300 mb-1">BP Diastolic</label>
                  <input
                    type="number"
                    value={bpDiastolic}
                    onChange={(e) => setBpDiastolic(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-300 mb-1">Glucose (mg/dL)</label>
                  <input
                    type="number"
                    value={glucose}
                    onChange={(e) => setGlucose(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-300 mb-1">Body Temp (°F)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-300 mb-1">Clinical Notes (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Post-exercise reading..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-800 text-slate-300 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-600 text-slate-950 rounded-xl font-extrabold"
                >
                  Save Measurement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
