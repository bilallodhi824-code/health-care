'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Doctor,
  Appointment,
  Medication,
  CartItem,
  LabReport,
  VitalRecord,
  SymptomAssessment,
} from '@/lib/types';
import {
  INITIAL_PATIENT,
  INITIAL_DOCTOR_USER,
  MOCK_DOCTORS,
  MOCK_MEDICATIONS,
  MOCK_LAB_REPORTS,
  MOCK_VITALS_HISTORY,
} from '@/data/mockData';

interface AppContextType {
  // Auth & User state
  user: User | null;
  login: (email: string, role: 'patient' | 'doctor') => boolean;
  signup: (name: string, email: string, role: 'patient' | 'doctor') => boolean;
  logout: () => void;
  isAuthModalOpen: boolean;
  authModalReason: string;
  openAuthModal: (reason?: string) => void;
  closeAuthModal: () => void;

  // Active Tab & Telehealth Call state
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeTelehealthRoom: Appointment | null;
  joinTelehealthRoom: (appointment: Appointment) => void;
  leaveTelehealthRoom: () => void;

  // Doctors & Booking
  doctors: Doctor[];
  selectedDoctor: Doctor | null;
  setSelectedDoctor: (doc: Doctor | null) => void;
  appointments: Appointment[];
  bookAppointment: (
    doctor: Doctor,
    date: string,
    time: string,
    type: 'virtual' | 'in-clinic',
    symptoms: string
  ) => Appointment | null;
  cancelAppointment: (id: string) => void;

  // Pharmacy & Cart
  medications: Medication[];
  cart: CartItem[];
  addToCart: (medication: Medication, quantity?: number) => void;
  removeFromCart: (medicationId: string) => void;
  updateCartQuantity: (medicationId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Vitals & Lab Records
  vitals: VitalRecord[];
  addVitalRecord: (record: Omit<VitalRecord, 'id' | 'timestamp'>) => void;
  labReports: LabReport[];
  
  // AI Triage
  symptomAssessments: SymptomAssessment[];
  addSymptomAssessment: (assessment: Omit<SymptomAssessment, 'id' | 'createdAt'>) => void;

  // Quick Toast / Notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_USER = 'carepulse_user_v1';
const STORAGE_KEY_APPOINTMENTS = 'carepulse_appointments_v1';
const STORAGE_KEY_CART = 'carepulse_cart_v1';
const STORAGE_KEY_VITALS = 'carepulse_vitals_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(INITIAL_PATIENT);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalReason, setAuthModalReason] = useState('');

  const [activeTab, setActiveTab] = useState<string>('home');
  const [activeTelehealthRoom, setActiveTelehealthRoom] = useState<Appointment | null>(null);

  const [doctors] = useState<Doctor[]>(MOCK_DOCTORS);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const [medications] = useState<Medication[]>(MOCK_MEDICATIONS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [vitals, setVitals] = useState<VitalRecord[]>(MOCK_VITALS_HISTORY);
  const [labReports] = useState<LabReport[]>(MOCK_LAB_REPORTS);
  const [symptomAssessments, setSymptomAssessments] = useState<SymptomAssessment[]>([]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load persisted data on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY_USER);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      const savedAppts = localStorage.getItem(STORAGE_KEY_APPOINTMENTS);
      if (savedAppts) {
        setAppointments(JSON.parse(savedAppts));
      } else {
        // Sample initial upcoming appointment
        const defaultAppt: Appointment = {
          id: 'apt_demo_01',
          patientId: INITIAL_PATIENT.id,
          patientName: INITIAL_PATIENT.name,
          patientEmail: INITIAL_PATIENT.email,
          doctorId: MOCK_DOCTORS[0].id,
          doctorName: MOCK_DOCTORS[0].name,
          doctorSpecialty: MOCK_DOCTORS[0].specialty,
          doctorImage: MOCK_DOCTORS[0].image,
          date: '2026-08-10',
          time: '11:00 AM',
          type: 'virtual',
          status: 'confirmed',
          consultationFee: MOCK_DOCTORS[0].fee,
          symptoms: 'Routine cardiovascular follow-up & vital check',
          meetRoomId: 'room_cardio_901',
          createdAt: new Date().toISOString(),
        };
        setAppointments([defaultAppt]);
      }

      const savedCart = localStorage.getItem(STORAGE_KEY_CART);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }

      const savedVitals = localStorage.getItem(STORAGE_KEY_VITALS);
      if (savedVitals) {
        setVitals(JSON.parse(savedVitals));
      }
    } catch (e) {
      console.error('Error restoring state from localStorage', e);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const openAuthModal = (reason = 'Sign in to access CarePulse telehealth services') => {
    setAuthModalReason(reason);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = (email: string, role: 'patient' | 'doctor'): boolean => {
    let loggedUser: User;
    if (role === 'doctor') {
      loggedUser = { ...INITIAL_DOCTOR_USER, email: email || INITIAL_DOCTOR_USER.email };
    } else {
      loggedUser = { ...INITIAL_PATIENT, email: email || INITIAL_PATIENT.email };
    }
    setUser(loggedUser);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(loggedUser));
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${loggedUser.name}! Logged in as ${loggedUser.role}.`);
    return true;
  };

  const signup = (name: string, email: string, role: 'patient' | 'doctor'): boolean => {
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: name || (role === 'doctor' ? 'Dr. New Provider' : 'New Patient'),
      email,
      role,
      avatar: role === 'doctor' 
        ? 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300',
      bloodGroup: 'O+',
      age: 28,
      gender: 'Unspecified',
      medicalHistory: ['General Wellness Check'],
    };
    setUser(newUser);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
    setIsAuthModalOpen(false);
    showToast(`Account created successfully! Welcome, ${newUser.name}.`);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY_USER);
    showToast('Logged out of CarePulse.');
  };

  const joinTelehealthRoom = (appointment: Appointment) => {
    setActiveTelehealthRoom(appointment);
  };

  const leaveTelehealthRoom = () => {
    setActiveTelehealthRoom(null);
  };

  const bookAppointment = (
    doctor: Doctor,
    date: string,
    time: string,
    type: 'virtual' | 'in-clinic',
    symptoms: string
  ): Appointment | null => {
    if (!user) {
      openAuthModal(`Please sign in to confirm appointment with ${doctor.name}`);
      return null;
    }

    const newAppt: Appointment = {
      id: `apt_${Date.now()}`,
      patientId: user.id,
      patientName: user.name,
      patientEmail: user.email,
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      doctorImage: doctor.image,
      date,
      time,
      type,
      status: 'confirmed',
      consultationFee: doctor.fee,
      symptoms: symptoms || 'General Medical Consultation',
      meetRoomId: `room_${doctor.specialty.toLowerCase()}_${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
    };

    const updated = [newAppt, ...appointments];
    setAppointments(updated);
    localStorage.setItem(STORAGE_KEY_APPOINTMENTS, JSON.stringify(updated));
    showToast(`Appointment confirmed with ${doctor.name} for ${date} at ${time}!`);
    return newAppt;
  };

  const cancelAppointment = (id: string) => {
    const updated = appointments.map((a) => (a.id === id ? { ...a, status: 'cancelled' as const } : a));
    setAppointments(updated);
    localStorage.setItem(STORAGE_KEY_APPOINTMENTS, JSON.stringify(updated));
    showToast('Appointment cancelled.');
  };

  const addToCart = (medication: Medication, quantity = 1) => {
    const existingIndex = cart.findIndex((item) => item.medication.id === medication.id);
    let updatedCart: CartItem[];
    if (existingIndex > -1) {
      updatedCart = cart.map((item, idx) =>
        idx === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      updatedCart = [...cart, { medication, quantity }];
    }
    setCart(updatedCart);
    localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(updatedCart));
    showToast(`Added ${medication.name} to pharmacy cart.`);
  };

  const removeFromCart = (medicationId: string) => {
    const updated = cart.filter((item) => item.medication.id !== medicationId);
    setCart(updated);
    localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(updated));
  };

  const updateCartQuantity = (medicationId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(medicationId);
      return;
    }
    const updated = cart.map((item) =>
      item.medication.id === medicationId ? { ...item, quantity } : item
    );
    setCart(updated);
    localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(updated));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(STORAGE_KEY_CART);
  };

  const addVitalRecord = (record: Omit<VitalRecord, 'id' | 'timestamp'>) => {
    const newRecord: VitalRecord = {
      ...record,
      id: `vit_${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    const updated = [newRecord, ...vitals];
    setVitals(updated);
    localStorage.setItem(STORAGE_KEY_VITALS, JSON.stringify(updated));
    showToast('New vital sign metrics logged successfully!');
  };

  const addSymptomAssessment = (assessment: Omit<SymptomAssessment, 'id' | 'createdAt'>) => {
    const newAssess: SymptomAssessment = {
      ...assessment,
      id: `sym_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setSymptomAssessments((prev) => [newAssess, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthModalOpen,
        authModalReason,
        openAuthModal,
        closeAuthModal,

        activeTab,
        setActiveTab,
        activeTelehealthRoom,
        joinTelehealthRoom,
        leaveTelehealthRoom,

        doctors,
        selectedDoctor,
        setSelectedDoctor,
        appointments,
        bookAppointment,
        cancelAppointment,

        medications,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,

        vitals,
        addVitalRecord,
        labReports,

        symptomAssessments,
        addSymptomAssessment,

        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
