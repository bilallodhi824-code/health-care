export type UserRole = 'patient' | 'doctor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone?: string;
  bloodGroup?: string;
  age?: number;
  gender?: string;
  medicalHistory?: string[];
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  fee: number;
  image: string;
  hospital: string;
  location: string;
  bio: string;
  languages: string[];
  education: string;
  availableDays: string[];
  timeSlots: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientEmail: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorImage: string;
  date: string;
  time: string;
  type: 'virtual' | 'in-clinic';
  status: 'confirmed' | 'completed' | 'cancelled';
  symptoms?: string;
  consultationFee: number;
  meetRoomId: string;
  createdAt: string;
}

export interface Medication {
  id: string;
  name: string;
  brand: string;
  category: 'Antibiotics' | 'Cardiology' | 'Diabetes' | 'Wellness' | 'Pain Relief' | 'Pediatrics';
  dosage: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  requiresPrescription: boolean;
  inStock: boolean;
  description: string;
  usageInstructions: string;
}

export interface CartItem {
  medication: Medication;
  quantity: number;
}

export interface LabMetric {
  name: string;
  value: string;
  referenceRange: string;
  status: 'normal' | 'high' | 'low';
}

export interface LabReport {
  id: string;
  title: string;
  date: string;
  category: string;
  doctorName: string;
  fileSize: string;
  status: 'Normal' | 'Attention Required' | 'Pending Review';
  summary: string;
  metrics: LabMetric[];
}

export interface VitalRecord {
  id: string;
  timestamp: string;
  date: string;
  time: string;
  heartRate: number; // BPM
  bpSystolic: number; // mmHg
  bpDiastolic: number; // mmHg
  spO2: number; // %
  glucose: number; // mg/dL
  temperature: number; // °F
  notes?: string;
}

export interface SymptomAssessment {
  id: string;
  symptom: string;
  severity: number; // 1-10
  duration: string;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Emergency';
  summary: string;
  recommendedSpecialty: string;
  actionItems: string[];
  createdAt: string;
}
