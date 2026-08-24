import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GraduationCap, Shield, UserPlus, ArrowRight, UserCheck } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { t, employees, setCurrentLearner, navigate } = useApp();
  const [selectedStaffId, setSelectedStaffId] = useState('');

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStaffId) return;
    const emp = employees.find(e => e.staffId === selectedStaffId);
    if (emp) {
      setCurrentLearner(emp);
      navigate('#my-training');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header Card */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl shadow-md text-white mb-4">
            <GraduationCap className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            {t.appName}
          </h1>
          <p className="mt-2 text-sm md:text-base text-slate-600 font-medium">
            {t.appSubtitle}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {t.portalSubtitle}
          </p>
        </div>

        {/* Action Choice Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => navigate('#register')}
            className="flex flex-col items-start p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-500 hover:shadow-md hover:scale-[1.01] transition-all text-left group"
          >
            <div className="p-3 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors mb-3">
              <UserPlus className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              {t.startTraining}
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {t.startTrainingDesc}
            </p>
          </button>

          <button
            onClick={() => navigate('#dashboard')}
            className="flex flex-col items-start p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-500 hover:shadow-md hover:scale-[1.01] transition-all text-left group"
          >
            <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors mb-3">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
              {t.adminPanel}
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {t.adminPanelDesc}
            </p>
          </button>
        </div>

        {/* Returning Learner Dropdown Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-3 text-slate-700 font-semibold text-sm">
            <UserCheck className="w-4 h-4 text-blue-600" />
            <span>{t.returningLearner}</span>
          </div>

          <form onSubmit={handleContinue} className="flex flex-col sm:flex-row gap-3">
            <select
              value={selectedStaffId}
              onChange={(e) => setSelectedStaffId(e.target.value)}
              className="flex-1 rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">-- {t.selectLearner} --</option>
              {employees.map((emp) => (
                <option key={emp.staffId} value={emp.staffId}>
                  {emp.staffId} - {emp.name} ({emp.role} • {emp.section})
                </option>
              ))}
            </select>

            <button
              type="submit"
              disabled={!selectedStaffId}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>{t.continueTraining}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
