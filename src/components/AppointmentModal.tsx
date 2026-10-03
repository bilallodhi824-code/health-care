'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Doctor, Appointment } from '@/lib/types';
import confetti from 'canvas-confetti';
import {
  X,
  Calendar,
  Clock,
  Video,
  Building,
  CreditCard,
  CheckCircle2,
  Lock,
  UserCheck,
} from 'lucide-react';

export const AppointmentModal: React.FC = () => {
  const { selectedDoctor, setSelectedDoctor, bookAppointment, user, joinTelehealthRoom } = useApp();

  const [date, setDate] = useState('2026-08-10');
  const [time, setTime] = useState('11:00 AM');
  const [type, setType] = useState<'virtual' | 'in-clinic'>('virtual');
  const [symptoms, setSymptoms] = useState('');

  const [confirmedAppt, setConfirmedAppt] = useState<Appointment | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!selectedDoctor) return null;

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const appt = bookAppointment(selectedDoctor, date, time, type, symptoms);
      if (appt) {
        setConfirmedAppt(appt);
        // Trigger celebration confetti
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch (e) {
          console.log(e);
        }
      }
    }, 1200);
  };

  const handleClose = () => {
    setSelectedDoctor(null);
    setConfirmedAppt(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 text-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-800/60 rounded-full transition-colors"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!confirmedAppt ? (
          <div>
            {/* Modal Doctor Header */}
            <div className="flex items-center gap-4 border-b border-slate-800 pb-5 mb-5">
              <img
                src={selectedDoctor.image}
                alt={selectedDoctor.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-500/40"
              />
              <div>
                <h3 className="text-lg font-extrabold text-white">{selectedDoctor.name}</h3>
                <p className="text-xs text-teal-400 font-semibold">{selectedDoctor.specialty}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{selectedDoctor.hospital}</p>
              </div>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-5">
              {/* Consultation Type Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Consultation Format:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setType('virtual')}
                    className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      type === 'virtual'
                        ? 'bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border-teal-500 text-teal-300 shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Video className="w-4 h-4 text-teal-400" />
                    HD Telehealth Video
                  </button>

                  <button
                    type="button"
                    onClick={() => setType('in-clinic')}
                    className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      type === 'in-clinic'
                        ? 'bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border-teal-500 text-teal-300 shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Building className="w-4 h-4 text-emerald-400" />
                    In-Clinic Visit
                  </button>
                </div>
              </div>

              {/* Date Slot */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Select Date:
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Select Time Slot:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {selectedDoctor.timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTime(slot)}
                      className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-all ${
                        time === slot
                          ? 'bg-teal-500 border-teal-400 text-slate-950'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chief Complaint */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Symptoms & Notes for Doctor:
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe your health concern, symptoms, or question..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>

              {/* Price & Summary */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Consultation Fee</span>
                  <span className="font-bold text-white">${selectedDoctor.fee}.00</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Platform & HIPAA Security Fee</span>
                  <span className="font-bold text-teal-400">Included (Free)</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-extrabold text-white">
                  <span>Total Amount Due</span>
                  <span className="text-teal-400">${selectedDoctor.fee}.00</span>
                </div>
              </div>

              {/* Confirm & Payment Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-extrabold text-sm rounded-xl shadow-xl shadow-teal-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    Processing Payment & Securing Slot...
                  </span>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 text-slate-950" />
                    Confirm & Reserve Appointment (${selectedDoctor.fee})
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-medium">
                <Lock className="w-3.5 h-3.5 text-teal-400" />
                Encrypted 256-Bit Payment & HIPAA Compliant Session
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Success Screen */
          <div className="text-center space-y-6 py-4">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8 animate-bounce" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-white">Appointment Confirmed!</h3>
              <p className="text-xs text-teal-400 font-medium mt-1">
                Booking ID: #{confirmedAppt.id}
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-left space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Doctor:</span>
                <span className="font-bold text-white">{confirmedAppt.doctorName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Date & Time:</span>
                <span className="font-bold text-teal-300">
                  {confirmedAppt.date} at {confirmedAppt.time}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Patient:</span>
                <span className="font-bold text-white">{user?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Telehealth Room ID:</span>
                <span className="font-mono text-xs text-cyan-400 font-bold">
                  {confirmedAppt.meetRoomId}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  handleClose();
                  joinTelehealthRoom(confirmedAppt);
                }}
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <Video className="w-4 h-4 text-slate-950" />
                Launch Virtual Telehealth Room Now
              </button>

              <button
                onClick={handleClose}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
              >
                Done / Return to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
