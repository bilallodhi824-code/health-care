'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Stethoscope,
  Calendar,
  UserCheck,
  Video,
  FileText,
  Clock,
  CheckCircle,
  Plus,
} from 'lucide-react';

export const DoctorDashboard: React.FC = () => {
  const { appointments, joinTelehealthRoom, showToast } = useApp();
  const [soapNotes, setSoapNotes] = useState({
    subjective: 'Patient reports mild dyspnea on exertion for 3 days.',
    objective: 'BP 118/76 mmHg, HR 72 BPM, SpO2 99%. ECG normal sinus rhythm.',
    assessment: 'Baseline cardiovascular wellness with stable metabolic metrics.',
    plan: 'Maintain daily 20mg Atorvastatin. Follow-up vitals in 14 days.',
  });

  const confirmedAppts = appointments.filter((a) => a.status === 'confirmed');

  const handleSaveNotes = () => {
    showToast('SOAP Clinical Note committed to EHR Records!');
  };

  return (
    <section className="py-12 bg-slate-950 text-slate-100 min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <div className="inline-flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider mb-2">
            <Stethoscope className="w-4 h-4" /> Practitioner Workspace
          </div>
          <h2 className="text-3xl font-black text-white">Clinical Provider Desk & Patient Queue</h2>
          <p className="text-sm text-slate-400 mt-1">
            Manage virtual appointments, document clinical SOAP notes, and review EHR diagnostics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 7 cols: Upcoming Patient Telehealth Queue */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-teal-400" />
                Today&apos;s Consultation Schedule ({confirmedAppts.length})
              </h3>
              <span className="text-xs text-teal-400 font-semibold">Live Queue Sync</span>
            </div>

            {confirmedAppts.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center text-slate-400 text-xs">
                No active appointments queued.
              </div>
            ) : (
              confirmedAppts.map((appt) => (
                <div
                  key={appt.id}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center font-extrabold text-base">
                      {appt.patientName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-white">{appt.patientName}</h4>
                      <p className="text-xs text-teal-400 font-medium">{appt.symptoms}</p>
                      <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-400 font-mono">
                        <span>{appt.date}</span>
                        <span>{appt.time}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => joinTelehealthRoom(appt)}
                    className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
                  >
                    <Video className="w-4 h-4 text-slate-950" />
                    Launch Telehealth Call
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Right 5 cols: SOAP Note Composer */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  Clinical SOAP Note Composer
                </h3>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-300 font-bold rounded">
                  EHR Compliant
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    S - Subjective (Patient Complaints)
                  </label>
                  <textarea
                    rows={2}
                    value={soapNotes.subjective}
                    onChange={(e) => setSoapNotes({ ...soapNotes, subjective: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    O - Objective (Vitals & Clinical Data)
                  </label>
                  <textarea
                    rows={2}
                    value={soapNotes.objective}
                    onChange={(e) => setSoapNotes({ ...soapNotes, objective: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    A - Assessment (Diagnosis)
                  </label>
                  <textarea
                    rows={2}
                    value={soapNotes.assessment}
                    onChange={(e) => setSoapNotes({ ...soapNotes, assessment: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    P - Plan & Prescriptions
                  </label>
                  <textarea
                    rows={2}
                    value={soapNotes.plan}
                    onChange={(e) => setSoapNotes({ ...soapNotes, plan: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200"
                  />
                </div>

                <button
                  onClick={handleSaveNotes}
                  className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-slate-950" />
                  Sign & Commit SOAP Record
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
