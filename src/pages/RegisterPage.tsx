import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../api/client';
import { UserPlus, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { setCurrentLearner, refreshEmployees, navigate } = useApp();
  const [formData, setFormData] = useState({
    staffId: '',
    name: '',
    role: 'Developer',
    section: 'API & Integration Platform',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const today = new Date().toISOString().split('T')[0];
      const newEmp = await api.createEmployee({
        ...formData,
        joinDate: today,
      });

      await refreshEmployees();
      setCurrentLearner(newEmp);
      navigate('#my-training');
    } catch (err: any) {
      setError(err.message || 'Failed to register employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs">
        <button
          onClick={() => navigate('#landing')}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <UserPlus className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">New Employee Registration</h2>
            <p className="text-xs text-slate-500">Enter your details to generate your tailored training curriculum</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Staff ID (รหัสพนักงาน) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. SYE-0023"
              value={formData.staffId}
              onChange={(e) => setFormData({ ...formData, staffId: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name (ชื่อ-นามสกุล) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Somchai Kaewmanee"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Corporate Email (อีเมลองค์กร) <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="name@aeon.co.th"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Role (ตำแหน่ง) <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="PM">PM (Project Manager)</option>
                <option value="BA">BA (Business Analyst)</option>
                <option value="Developer">Developer (Software Engineer)</option>
                <option value="QA">QA (Quality Assurance)</option>
                <option value="SRE">SRE (Site Reliability Engineer)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Section (ส่วนงาน) <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="API & Integration Platform">API & Integration Platform</option>
                <option value="Customer Experience Systems">Customer Experience Systems</option>
                <option value="Omnichannel Customer Service">Omnichannel Customer Service</option>
              </select>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{loading ? 'Creating Profile...' : 'Complete Registration & Start Training'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
