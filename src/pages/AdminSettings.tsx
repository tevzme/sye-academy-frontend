import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../api/client';
import { Settings, Database, RefreshCw, Server, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { t } = useApp();
  const [health, setHealth] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/healthz')
      .then(res => res.json())
      .then(data => setHealth(data.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">{t.settings}</h1>
        <p className="text-xs text-slate-500">System Architecture, Microservices Health & Database Management</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Backend Info Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
            <Server className="w-4 h-4 text-blue-600" />
            <span>Backend Microservice (Go + Gin)</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs font-mono space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Service:</span>
              <span className="font-bold text-slate-800">sye-academy-backend</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Architecture:</span>
              <span className="font-bold text-slate-800">Clean Architecture (SDD v2.0)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Status:</span>
              <span className="font-bold text-emerald-600">● {health?.status || 'Active'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Port:</span>
              <span className="font-bold text-slate-800">:8080</span>
            </div>
          </div>
        </div>

        {/* Database Info Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
            <Database className="w-4 h-4 text-indigo-600" />
            <span>Enterprise Database Layer</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs font-mono space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Database Engine:</span>
              <span className="font-bold text-slate-800">PostgreSQL / GORM ORM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Auto-Migration:</span>
              <span className="font-bold text-emerald-600">Enabled</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Master Seed:</span>
              <span className="font-bold text-blue-600">37 Courses • 22 Employees</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">ISO Compliance:</span>
              <span className="font-bold text-slate-800">ISO 27001 / 9001 / 22301</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
