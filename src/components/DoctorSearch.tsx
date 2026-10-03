'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Doctor } from '@/lib/types';
import {
  Search,
  Star,
  MapPin,
  Clock,
  Calendar,
  Award,
  Video,
  Building2,
  Filter,
} from 'lucide-react';

export const DoctorSearch: React.FC = () => {
  const { doctors, setSelectedDoctor, user, openAuthModal } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');

  const specialties = ['All', 'Cardiology', 'Neurology', 'Dermatology', 'Pediatrics', 'General Practice', 'Psychiatry'];

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.hospital.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const handleBookClick = (doctor: Doctor) => {
    if (!user) {
      openAuthModal(`Sign in required to book a consultation with ${doctor.name}`);
      return;
    }
    setSelectedDoctor(doctor);
  };

  return (
    <section className="py-12 bg-slate-950 text-slate-100 min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider mb-2">
              <Building2 className="w-4 h-4" /> Global Medical Network
            </div>
            <h2 className="text-3xl font-black text-white">Find Certified Healthcare Specialists</h2>
            <p className="text-sm text-slate-400 mt-1">
              Book instant virtual telehealth calls or in-clinic visits with top-tier practitioners.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search doctor name, hospital..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
            />
          </div>
        </div>

        {/* Specialty Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-500 shrink-0 mr-1" />
          {specialties.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                selectedSpecialty === spec
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-slate-950 font-extrabold shadow-lg shadow-teal-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* Doctor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-teal-500/40 rounded-3xl p-6 shadow-xl transition-all hover:shadow-2xl hover:shadow-teal-500/5 flex flex-col justify-between group"
            >
              <div>
                {/* Image & Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-800 group-hover:border-teal-500/50 transition-colors"
                    />
                    <span className="absolute -bottom-1 -right-1 p-1 bg-teal-500 text-slate-950 rounded-lg shadow-md">
                      <Video className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{doctor.rating}</span>
                      <span className="text-slate-500 font-normal">({doctor.reviewsCount})</span>
                    </div>

                    <h3 className="text-base font-bold text-white leading-tight group-hover:text-teal-300 transition-colors">
                      {doctor.name}
                    </h3>
                    <p className="text-xs font-semibold text-teal-400">{doctor.specialty}</p>

                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Award className="w-3 h-3 text-slate-500" />
                      <span>{doctor.experienceYears} Years Experience</span>
                    </div>
                  </div>
                </div>

                {/* Hospital & Location */}
                <div className="space-y-2 mb-4 bg-slate-950/60 p-3 rounded-2xl border border-slate-800/60 text-xs">
                  <p className="text-slate-300 font-medium flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span className="truncate">{doctor.hospital}</span>
                  </p>
                  <p className="text-slate-400 text-[11px] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="truncate">{doctor.location}</span>
                  </p>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {doctor.bio}
                </p>

                {/* Languages */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {doctor.languages.map((lang) => (
                    <span
                      key={lang}
                      className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] font-medium rounded-md"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & Book CTA */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Consultation Fee</p>
                  <p className="text-lg font-black text-white">${doctor.fee}</p>
                </div>

                <button
                  onClick={() => handleBookClick(doctor)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-teal-500/20 transition-all hover:scale-105 active:scale-95"
                >
                  <Calendar className="w-4 h-4 text-slate-950" />
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
