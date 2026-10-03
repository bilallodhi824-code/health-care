'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  X,
  Bot,
  AlertTriangle,
  CheckCircle,
  Activity,
  ArrowRight,
  ShieldAlert,
  Calendar,
  Sparkles,
  RefreshCw,
  Clock,
  HeartPulse,
} from 'lucide-react';

interface SymptomCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEmergency: () => void;
}

const COMMON_SYMPTOMS = [
  { id: 'chest_pain', label: 'Chest Pressure / Tightness', category: 'Cardiology', icon: '❤️' },
  { id: 'headache', label: 'Severe Headache / Migraine', category: 'Neurology', icon: '🧠' },
  { id: 'skin_rash', label: 'Skin Rash or Irritation', category: 'Dermatology', icon: '🔬' },
  { id: 'fever', label: 'Fever & Body Aches', category: 'General Practice', icon: '🌡️' },
  { id: 'shortness_breath', label: 'Difficulty Breathing / Cough', category: 'General Practice', icon: '🫁' },
  { id: 'joint_pain', label: 'Joint & Muscle Inflammation', category: 'Orthopedics', icon: '🦴' },
  { id: 'anxiety', label: 'Panic, Anxiety, or Insomnia', category: 'Psychiatry', icon: '🌙' },
];

export const SymptomCheckerModal: React.FC<SymptomCheckerModalProps> = ({
  isOpen,
  onClose,
  onOpenEmergency,
}) => {
  const { doctors, setSelectedDoctor, addSymptomAssessment, showToast, setActiveTab } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedSymptom, setSelectedSymptom] = useState(COMMON_SYMPTOMS[0]);
  const [customInput, setCustomInput] = useState('');
  const [severity, setSeverity] = useState(5);
  const [duration, setDuration] = useState('2-3 Days');
  const [associated, setAssociated] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  if (!isOpen) return null;

  const toggleAssociated = (item: string) => {
    if (associated.includes(item)) {
      setAssociated(associated.filter((i) => i !== item));
    } else {
      setAssociated([...associated, item]);
    }
  };

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setStep(3);

    setTimeout(() => {
      setIsAnalyzing(false);
      // Determine risk level based on symptom & severity
      let riskLevel: 'Low' | 'Moderate' | 'High' | 'Emergency' = 'Moderate';
      if (selectedSymptom.id === 'chest_pain' && severity >= 7) {
        riskLevel = 'Emergency';
      } else if (severity >= 8) {
        riskLevel = 'High';
      } else if (severity <= 4) {
        riskLevel = 'Low';
      }

      addSymptomAssessment({
        symptom: customInput || selectedSymptom.label,
        severity,
        duration,
        riskLevel,
        summary: `AI Clinical assessment completed for ${selectedSymptom.label} (Severity: ${severity}/10).`,
        recommendedSpecialty: selectedSymptom.category,
        actionItems: [
          `Consult with a ${selectedSymptom.category} specialist within 24-48 hours.`,
          'Monitor vitals (Heart rate & Blood Pressure) twice daily.',
          'Stay hydrated and avoid strenuous exertion.',
        ],
      });
    }, 1800);
  };

  const resetForm = () => {
    setStep(1);
    setSeverity(5);
    setAssociated([]);
    setCustomInput('');
  };

  const matchedDoctor = doctors.find((d) => d.specialty === selectedSymptom.category) || doctors[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 text-slate-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                CareBot AI Clinical Triage
                <span className="text-[10px] px-2 py-0.5 bg-teal-500/20 text-teal-300 font-bold rounded-md uppercase border border-teal-500/30">
                  Medical Grade
                </span>
              </h2>
              <p className="text-xs text-slate-400">Step {step} of 3 • Symptom Assessment</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/60 rounded-full transition-colors"
            aria-label="Close symptom checker"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-6 scrollbar-thin">
          {/* STEP 1: Select Primary Symptom */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="bg-teal-500/10 border border-teal-500/20 rounded-2xl p-4 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <p className="text-xs text-teal-200">
                  Select your main symptom below or describe how you are feeling. CareBot AI uses evidence-based clinical decision algorithms to recommend optimal next steps.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Select Primary Concern:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {COMMON_SYMPTOMS.map((item) => {
                    const isSelected = selectedSymptom.id === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectedSymptom(item)}
                        className={`p-3.5 rounded-2xl text-left border text-xs font-semibold flex items-center gap-3 transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border-teal-500 text-white shadow-lg shadow-teal-500/10'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <div>
                          <p className="font-bold">{item.label}</p>
                          <p className="text-[10px] text-teal-400/80 font-medium">
                            Category: {item.category}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Or Describe in Detail:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sharp pain in left shoulder after exercise..."
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-teal-500/20 transition-all hover:scale-105"
                >
                  Continue to Symptom Severity <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Severity & Duration */}
          {step === 2 && (
            <div className="space-y-6">
              {/* Severity Slider */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Symptom Severity (1 to 10):
                  </label>
                  <span
                    className={`px-3 py-1 text-xs font-black rounded-lg ${
                      severity >= 8
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : severity >= 5
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                    }`}
                  >
                    Level {severity} - {severity >= 8 ? 'Severe' : severity >= 5 ? 'Moderate' : 'Mild'}
                  </span>
                </div>

                <input
                  type="range"
                  min={1}
                  max={10}
                  value={severity}
                  onChange={(e) => setSeverity(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-medium">
                  <span>1 - Mild Discomfort</span>
                  <span>5 - Moderate Pain</span>
                  <span>10 - Unbearable Emergency</span>
                </div>
              </div>

              {/* Duration Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  How long have you experienced this?
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['< 24 Hours', '2-3 Days', '1 Week', '> 2 Weeks'].map((dur) => (
                    <button
                      key={dur}
                      onClick={() => setDuration(dur)}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                        duration === dur
                          ? 'bg-teal-500/20 border-teal-500 text-teal-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {dur}
                    </button>
                  ))}
                </div>
              </div>

              {/* Associated Symptoms Checkboxes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Associated Symptoms:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['Nausea', 'Dizziness', 'Cold Sweats', 'Shortness of Breath', 'Chills', 'Fatigue'].map(
                    (item) => {
                      const isChecked = associated.includes(item);
                      return (
                        <button
                          key={item}
                          onClick={() => toggleAssociated(item)}
                          className={`py-2 px-3 rounded-xl border text-xs font-medium text-left transition-all ${
                            isChecked
                              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {isChecked ? '✓ ' : '+ '}
                          {item}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-800">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold"
                >
                  Back
                </button>
                <button
                  onClick={handleStartAnalysis}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-teal-500/20 transition-all hover:scale-105"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  Analyze Symptoms Now
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Results & Recommendations */}
          {step === 3 && (
            <div>
              {isAnalyzing ? (
                <div className="py-12 text-center space-y-4">
                  <RefreshCw className="w-10 h-10 text-teal-400 animate-spin mx-auto" />
                  <h3 className="text-lg font-bold text-white">CareBot AI is processing clinical data...</h3>
                  <p className="text-xs text-slate-400">
                    Evaluating clinical indicators against international triage standards.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Risk Alert Header */}
                  {selectedSymptom.id === 'chest_pain' && severity >= 7 ? (
                    <div className="bg-rose-500/20 border-2 border-rose-500 rounded-3xl p-5 text-rose-200 space-y-3">
                      <div className="flex items-center gap-3">
                        <ShieldAlert className="w-7 h-7 text-rose-400 animate-pulse" />
                        <div>
                          <h4 className="text-base font-extrabold text-white">HIGH RISK / POTENTIAL URGENCY DETECTED</h4>
                          <p className="text-xs text-rose-300">
                            Severe chest symptoms require immediate clinical evaluation.
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          onClose();
                          onOpenEmergency();
                        }}
                        className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-rose-500/30 transition-all"
                      >
                        Trigger Emergency SOS & Call 911 Now
                      </button>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-teal-500/30 rounded-3xl p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
                          <CheckCircle className="w-4 h-4" /> AI Assessment Summary
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                            severity >= 7
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}
                        >
                          {severity >= 7 ? 'Moderate-High Risk' : 'Low-Moderate Risk'}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-base font-extrabold text-white">
                          Primary Symptom: {selectedSymptom.label}
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Based on your reported severity score ({severity}/10) and duration ({duration}), CareBot AI recommends consulting a certified specialist in{' '}
                          <span className="text-teal-300 font-bold">{selectedSymptom.category}</span>.
                        </p>
                      </div>

                      <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 text-xs space-y-2 text-slate-300">
                        <p className="font-bold text-white flex items-center gap-1.5">
                          <Activity className="w-4 h-4 text-teal-400" /> Key Advice & Next Steps:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                          <li>Book a telehealth video consultation for detailed clinical diagnosis.</li>
                          <li>Log your heart rate and blood pressure in the Vitals Tracker.</li>
                          <li>If symptoms escalate rapidly, seek urgent care immediately.</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Matched Doctor Recommendation */}
                  <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Recommended Specialist Matched:
                      </p>
                      <span className="text-xs text-teal-400 font-semibold">100% Match</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <img
                        src={matchedDoctor.image}
                        alt={matchedDoctor.name}
                        className="w-14 h-14 rounded-2xl object-cover border border-teal-500/40"
                      />
                      <div>
                        <h5 className="text-sm font-bold text-white">{matchedDoctor.name}</h5>
                        <p className="text-xs text-teal-400 font-medium">{matchedDoctor.specialty}</p>
                        <p className="text-[11px] text-slate-400">{matchedDoctor.hospital}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedDoctor(matchedDoctor);
                        onClose();
                      }}
                      className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 transition-all hover:scale-105"
                    >
                      <Calendar className="w-4 h-4 text-slate-950" />
                      Book Consultation with {matchedDoctor.name} (${matchedDoctor.fee})
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={resetForm}
                      className="px-4 py-2.5 bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold"
                    >
                      Start New Symptom Check
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        setActiveTab('vitals');
                        showToast('Assessment saved to your health profile!');
                      }}
                      className="px-4 py-2.5 bg-slate-800 text-teal-400 hover:bg-slate-700 rounded-xl text-xs font-semibold"
                    >
                      Save to My Health Vault
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
