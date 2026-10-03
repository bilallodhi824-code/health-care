'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Pill,
  Search,
  Star,
  Plus,
  ShieldCheck,
  Truck,
  Filter,
} from 'lucide-react';

export const PharmacyStore: React.FC = () => {
  const { medications, addToCart } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Antibiotics', 'Cardiology', 'Diabetes', 'Wellness', 'Pain Relief', 'Pediatrics'];

  const filteredMeds = medications.filter((med) => {
    const matchesSearch =
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || med.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-12 bg-slate-950 text-slate-100 min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider mb-2">
              <Pill className="w-4 h-4" /> Express Digital Pharmacy
            </div>
            <h2 className="text-3xl font-black text-white">Online Pharmacy & Medication Fulfillment</h2>
            <p className="text-sm text-slate-400 mt-1">
              FDA-approved medications & daily health supplements with 2-hour home delivery.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search medication, dosage, brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-500 shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-slate-950 font-extrabold shadow-lg shadow-teal-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeds.map((med) => (
            <div
              key={med.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-teal-500/40 rounded-3xl p-6 shadow-xl flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="relative mb-4 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 h-48">
                  <img
                    src={med.image}
                    alt={med.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {med.requiresPrescription && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-amber-500/90 text-slate-950 text-[10px] font-black rounded-lg uppercase tracking-wider shadow-md">
                      Rx Required
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 px-2 py-1 bg-slate-950/80 backdrop-blur-md text-teal-400 text-[11px] font-bold rounded-lg border border-slate-800 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {med.rating}
                  </span>
                </div>

                <div className="space-y-1 mb-3">
                  <p className="text-[11px] font-bold text-teal-400 uppercase tracking-wider">{med.brand}</p>
                  <h3 className="text-base font-bold text-white leading-tight group-hover:text-teal-300 transition-colors">
                    {med.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">{med.dosage}</p>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {med.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 font-semibold uppercase">Price</span>
                  <p className="text-xl font-black text-white">${med.price.toFixed(2)}</p>
                </div>

                <button
                  onClick={() => addToCart(med)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-teal-500/20 transition-all hover:scale-105"
                >
                  <Plus className="w-4 h-4 text-slate-950" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
