'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { LabReport } from '@/lib/types';
import {
  FileText,
  Download,
  Eye,
  CheckCircle,
  AlertCircle,
  Calendar,
  UserCheck,
  X,
  Search,
} from 'lucide-react';

export const EHRVault: React.FC = () => {
  const { labReports, showToast } = useApp();
  const [selectedReport, setSelectedReport] = useState<LabReport | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReports = labReports.filter(
    (report) =>
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.doctorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-12 bg-slate-950 text-slate-100 min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
              <FileText className="w-4 h-4" /> HIPAA Digital Health Records
            </div>
            <h2 className="text-3xl font-black text-white">Electronic Health Records (EHR) & Diagnostics</h2>
            <p className="text-sm text-slate-400 mt-1">
              Encrypted lab results, imaging diagnostic reports, & verified physician notes.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search reports or doctors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>

        {/* Report Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 rounded-3xl p-6 shadow-xl flex flex-col justify-between transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-slate-800 text-teal-300 text-[11px] font-extrabold rounded-xl border border-slate-700">
                    {report.category}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-extrabold flex items-center gap-1 ${
                      report.status === 'Normal'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {report.status === 'Normal' ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : (
                      <AlertCircle className="w-3 h-3" />
                    )}
                    {report.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-tight">
                    {report.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" /> {report.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5 text-slate-500" /> {report.doctorName}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-2xl border border-slate-800/80 line-clamp-2 leading-relaxed">
                  {report.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">{report.fileSize} PDF</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedReport(report)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-teal-400" /> Preview
                  </button>
                  <button
                    onClick={() => showToast(`Downloaded ${report.title} (PDF)`)}
                    className="p-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl transition-colors"
                    title="Download Report"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
              <div>
                <h3 className="text-xl font-extrabold text-white">{selectedReport.title}</h3>
                <p className="text-xs text-teal-400 font-medium">
                  {selectedReport.category} • Date: {selectedReport.date}
                </p>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5 text-xs">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <p className="font-bold text-white">Physician Diagnostic Summary:</p>
                <p className="text-slate-300 leading-relaxed">{selectedReport.summary}</p>
                <p className="text-[11px] text-slate-500 pt-1">Attending: {selectedReport.doctorName}</p>
              </div>

              <div>
                <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-2">
                  Biomarker Metrics Breakdown:
                </h4>
                <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="p-3">Biomarker</th>
                        <th className="p-3">Measured Value</th>
                        <th className="p-3">Reference Range</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {selectedReport.metrics.map((m, idx) => (
                        <tr key={idx} className="hover:bg-slate-900/50">
                          <td className="p-3 font-semibold text-white">{m.name}</td>
                          <td className="p-3 font-bold text-teal-400">{m.value}</td>
                          <td className="p-3 text-slate-400">{m.referenceRange}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                                m.status === 'normal'
                                  ? 'bg-emerald-500/20 text-emerald-300'
                                  : 'bg-rose-500/20 text-rose-300'
                              }`}
                            >
                              {m.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <button
                onClick={() => {
                  showToast(`Downloaded ${selectedReport.title}`);
                  setSelectedReport(null);
                }}
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-extrabold rounded-xl flex items-center justify-center gap-2 shadow-lg"
              >
                <Download className="w-4 h-4 text-slate-950" />
                Download Verified PDF Document ({selectedReport.fileSize})
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
