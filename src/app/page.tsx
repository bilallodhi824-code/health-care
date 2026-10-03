'use client';

import React, { useState } from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { DoctorSearch } from '@/components/DoctorSearch';
import { AppointmentModal } from '@/components/AppointmentModal';
import { TelehealthRoom } from '@/components/TelehealthRoom';
import { VitalsTracker } from '@/components/VitalsTracker';
import { EHRVault } from '@/components/EHRVault';
import { PharmacyStore } from '@/components/PharmacyStore';
import { CartDrawer } from '@/components/CartDrawer';
import { DoctorDashboard } from '@/components/DoctorDashboard';
import { SymptomCheckerModal } from '@/components/SymptomCheckerModal';
import { AuthModal } from '@/components/AuthModal';
import { EmergencyModal } from '@/components/EmergencyModal';
import { Toast } from '@/components/Toast';
import { Footer } from '@/components/Footer';

function MainAppContent() {
  const { activeTab } = useApp();
  const [isSymptomCheckerOpen, setIsSymptomCheckerOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-slate-950">
      {/* Navigation */}
      <Navbar
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenSymptomChecker={() => setIsSymptomCheckerOpen(true)}
      />

      {/* Main Dynamic Viewport */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div>
            <HeroSection onOpenSymptomChecker={() => setIsSymptomCheckerOpen(true)} />
            <DoctorSearch />
            <VitalsTracker />
            <EHRVault />
            <PharmacyStore />
          </div>
        )}

        {activeTab === 'doctors' && <DoctorSearch />}
        {activeTab === 'vitals' && <VitalsTracker />}
        {activeTab === 'ehr' && <EHRVault />}
        {activeTab === 'pharmacy' && <PharmacyStore />}
        {activeTab === 'doctor-desk' && <DoctorDashboard />}
      </main>

      {/* Modals & Overlays */}
      <SymptomCheckerModal
        isOpen={isSymptomCheckerOpen}
        onClose={() => setIsSymptomCheckerOpen(false)}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
      />
      <AppointmentModal />
      <AuthModal />
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />
      <CartDrawer />
      <TelehealthRoom />
      <Toast />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
