"use client";

import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { WorkInstruction } from '../types';
import { api } from '../api/client';
import { FileText, Plus, Search, Eye, X, History, CheckCircle } from 'lucide-react';

export const AdminWorkInstructions: React.FC = () => {
  const { t } = useApp();
  const [instructions, setInstructions] = useState<WorkInstruction[]>([]);
  const [search, setSearch] = useState('');
  const [selectedWI, setSelectedWI] = useState<WorkInstruction | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await api.getWorkInstructions();
      setInstructions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredWIs = instructions.filter((w) =>
    w.docNo.toLowerCase().includes(search.toLowerCase()) ||
    w.title.toLowerCase().includes(search.toLowerCase()) ||
    w.section.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">{t.workInstructions}</h1>
        <p className="text-xs text-slate-500">ISO Standard Operating Procedures & Engineering Runbooks</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search work instructions by doc number or title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Doc No</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Section</th>
                <th className="py-3 px-4">Version</th>
                <th className="py-3 px-4">Effective Date</th>
                <th className="py-3 px-4">Prepared By</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredWIs.map((wi) => (
                <tr key={wi.docNo} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-blue-600">{wi.docNo}</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">{wi.title}</td>
                  <td className="py-3 px-4 text-slate-600">{wi.section}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-700">v{wi.version}</td>
                  <td className="py-3 px-4 font-mono text-slate-500">{wi.effectiveDate}</td>
                  <td className="py-3 px-4 text-slate-600">{wi.preparedBy}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedWI(wi)}
                      className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-semibold flex items-center gap-1 ml-auto transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* WI Detail Modal with Revision History */}
      {selectedWI && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-xl border border-slate-100 max-h-[85vh] overflow-y-auto space-y-6">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                  {selectedWI.docNo} • v{selectedWI.version}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">{selectedWI.title}</h3>
                <p className="text-xs text-slate-500">Effective: {selectedWI.effectiveDate} • Section: {selectedWI.section}</p>
              </div>
              <button onClick={() => setSelectedWI(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs leading-relaxed">
              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-1">1. Objective</h4>
                <p className="text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">{selectedWI.objective}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-1">2. Scope</h4>
                <p className="text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">{selectedWI.scope}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-2">3. Operating Procedure</h4>
                <div className="space-y-2">
                  {selectedWI.procedure?.map((p) => (
                    <div key={p.step} className="p-3 bg-white border border-slate-200 rounded-xl">
                      <div className="font-bold text-slate-900 mb-0.5">Step {p.step}: {p.title}</div>
                      <div className="text-slate-600">{p.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <History className="w-4 h-4 text-blue-600" />
                  <span>4. Revision History</span>
                </h4>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                  {selectedWI.revisionHistory?.map((rev, i) => (
                    <div key={i} className="p-3 bg-white flex justify-between items-center text-[11px]">
                      <div>
                        <span className="font-mono font-bold text-blue-600">v{rev.version}</span>
                        <span className="text-slate-600 ml-2">{rev.changes}</span>
                      </div>
                      <div className="text-slate-400 font-mono">
                        {rev.date} • {rev.author}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
