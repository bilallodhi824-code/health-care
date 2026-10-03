'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  PhoneOff,
  MessageSquare,
  FileText,
  Send,
  Shield,
  Monitor,
  Volume2,
  CheckCircle,
  Download,
  Sparkles,
} from 'lucide-react';

export const TelehealthRoom: React.FC = () => {
  const { activeTelehealthRoom, leaveTelehealthRoom, user, showToast } = useApp();

  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState<'chat' | 'notes'>('chat');

  const [callDuration, setCallDuration] = useState(0);
  const [chatMessages, setChatMessages] = useState<
    { sender: string; text: string; time: string }[]
  >([
    {
      sender: activeTelehealthRoom?.doctorName || 'Dr. Sarah Jenkins',
      text: 'Hello Alex! I am reviewing your recent vital logs and heart rate trends right now. How are you feeling today?',
      time: '11:00 AM',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [prescriptionNote, setPrescriptionNote] = useState(
    'Rx: Atorvastatin 20mg daily at bedtime. Recommend 30-minute moderate aerobic walk daily.'
  );

  // Call timer counter
  useEffect(() => {
    if (!activeTelehealthRoom) return;
    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [activeTelehealthRoom]);

  if (!activeTelehealthRoom) return null;

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMsg = {
      sender: user?.name || 'Patient',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setNewMessage('');

    // Simulated instant reply from doctor
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: activeTelehealthRoom.doctorName,
          text: 'Got it. I have noted that in your electronic medical file. Let us do a quick visual check.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col text-slate-100 font-sans">
      {/* Top Telehealth Header Bar */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
          <div>
            <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
              Virtual Telehealth Session • {activeTelehealthRoom.doctorName}
              <span className="text-[10px] px-2 py-0.5 bg-teal-500/20 text-teal-300 font-bold rounded-md">
                HD 1080p Encrypted
              </span>
            </h2>
            <p className="text-[11px] text-slate-400 font-mono">
              Room ID: {activeTelehealthRoom.meetRoomId} • Specialty: {activeTelehealthRoom.doctorSpecialty}
            </p>
          </div>
        </div>

        {/* Timer & Security */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 font-mono text-xs text-teal-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            {formatDuration(callDuration)}
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/60 px-3 py-1.5 rounded-xl">
            <Shield className="w-3.5 h-3.5 text-teal-400" />
            <span>HIPAA Compliant</span>
          </div>
        </div>
      </header>

      {/* Main Consultation Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left/Center Video Stage */}
        <div className="flex-1 p-4 lg:p-6 bg-slate-950 flex flex-col justify-between relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full relative">
            {/* Doctor Video Stream Card */}
            <div className="relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 flex items-center justify-center shadow-2xl">
              <img
                src={activeTelehealthRoom.doctorImage}
                alt={activeTelehealthRoom.doctorName}
                className="w-full h-full object-cover filter brightness-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Overlay Badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 text-xs font-bold text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {activeTelehealthRoom.doctorName} (Doctor)
              </div>

              <div className="absolute top-4 right-4 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800 text-[11px] text-teal-400">
                <Volume2 className="w-3.5 h-3.5 animate-bounce" /> Audio Connected
              </div>
            </div>

            {/* Patient Video Preview Card */}
            <div className="relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 flex items-center justify-center shadow-2xl">
              {isVideoOn ? (
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'}
                  alt="Patient Video"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center mx-auto mb-3">
                    <VideoOff className="w-8 h-8" />
                  </div>
                  <p className="text-xs text-slate-400 font-medium">Camera Muted</p>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 text-xs font-bold text-white">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                {user?.name || 'You'} (Patient)
              </div>
            </div>
          </div>

          {/* Bottom Floating Control Bar */}
          <div className="mt-4 flex items-center justify-center gap-3 bg-slate-900/90 backdrop-blur-xl p-3 rounded-2xl border border-slate-800 w-fit mx-auto shadow-2xl">
            <button
              onClick={() => setIsMicOn(!isMicOn)}
              className={`p-3 rounded-xl transition-all ${
                isMicOn
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  : 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
              }`}
              title={isMicOn ? 'Mute Microphone' : 'Unmute Microphone'}
            >
              {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-3 rounded-xl transition-all ${
                isVideoOn
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  : 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
              }`}
              title={isVideoOn ? 'Turn Off Camera' : 'Turn On Camera'}
            >
              {isVideoOn ? <VideoIcon className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>

            <button
              onClick={() => {
                setIsScreenSharing(!isScreenSharing);
                showToast(isScreenSharing ? 'Stopped screen sharing' : 'Screen sharing active');
              }}
              className={`p-3 rounded-xl transition-all ${
                isScreenSharing ? 'bg-teal-500 text-slate-950 font-bold' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
              title="Toggle Screen Share"
            >
              <Monitor className="w-5 h-5" />
            </button>

            <button
              onClick={() => leaveTelehealthRoom()}
              className="px-5 py-3 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-rose-600/30 flex items-center gap-2 transition-all hover:scale-105"
            >
              <PhoneOff className="w-5 h-5" />
              End Call
            </button>
          </div>
        </div>

        {/* Right Sidebar: Real-time Chat & Clinical Notes */}
        <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 flex flex-col">
          {/* Sidebar Tabs */}
          <div className="flex border-b border-slate-800 p-2 gap-1 bg-slate-950">
            <button
              onClick={() => setActiveSidebar('chat')}
              className={`flex-1 py-2 text-xs font-extrabold rounded-xl flex items-center justify-center gap-2 transition-all ${
                activeSidebar === 'chat'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Live Chat
            </button>
            <button
              onClick={() => setActiveSidebar('notes')}
              className={`flex-1 py-2 text-xs font-extrabold rounded-xl flex items-center justify-center gap-2 transition-all ${
                activeSidebar === 'notes'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" /> Prescription & Notes
            </button>
          </div>

          {activeSidebar === 'chat' ? (
            <div className="flex-1 flex flex-col justify-between p-4 overflow-hidden">
              {/* Chat Message List */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl text-xs space-y-1 ${
                      msg.sender === user?.name
                        ? 'bg-teal-500/20 border border-teal-500/30 ml-6 text-teal-100'
                        : 'bg-slate-950 border border-slate-800 mr-6 text-slate-200'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold">
                      <span>{msg.sender}</span>
                      <span>{msg.time}</span>
                    </div>
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="mt-3 relative">
                <input
                  type="text"
                  placeholder="Type message to doctor..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 p-1.5 bg-teal-500 text-slate-950 rounded-xl hover:bg-teal-400 transition-colors"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            /* Prescription & Doctor Notes Panel */
            <div className="p-4 space-y-4 overflow-y-auto flex-1">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase">
                  <Sparkles className="w-4 h-4" /> E-Prescription Draft
                </div>
                <textarea
                  rows={4}
                  value={prescriptionNote}
                  onChange={(e) => setPrescriptionNote(e.target.value)}
                  className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-teal-500 font-mono"
                />
                <button
                  onClick={() => showToast('Prescription saved to EHR Vault!')}
                  className="w-full py-2.5 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md"
                >
                  <Download className="w-4 h-4 text-slate-950" />
                  Save & Download E-Prescription PDF
                </button>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs text-slate-300">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> Digital Signatures Verified
                </p>
                <p className="text-[11px] text-slate-400">
                  Practitioner: {activeTelehealthRoom.doctorName} (NPI #9842019482)
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
