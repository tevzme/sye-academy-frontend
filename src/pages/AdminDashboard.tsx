import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { ReportSummary, ActivityLog } from '../types';
import { api } from '../api/client';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Activity, 
  Building2, 
  Briefcase 
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { t } = useApp();
  const [summary, setSummary] = useState<ReportSummary | null>(null);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        const [sum, acts] = await Promise.all([
          api.getReportSummary(),
          api.getRecentActivity(10),
        ]);
        setSummary(sum);
        setActivities(acts);
      } catch (err) {
        console.error('Failed to load admin dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading || !summary) {
    return (
      <div className="p-8 text-center text-slate-500">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-3"></div>
        <p>Loading dashboard metrics...</p>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Employees', value: summary.totalEmployees, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Training Completed', value: summary.completedCount, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'In Progress / Scheduled', value: summary.inProgressCount + summary.scheduledCount, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Completion Rate', value: `${summary.completionRate}%`, icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">{t.dashboard}</h1>
        <p className="text-xs text-slate-500">System Enabler Division Real-time Training Analytics & Governance</p>
      </div>

      {/* Row 1: Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
              <div className={`p-3.5 rounded-2xl ${card.bg} ${card.color} shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 tracking-tight">{card.value}</div>
                <div className="text-xs text-slate-500 font-medium">{card.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Row 2: Section & Role Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span>Training Status by Section</span>
          </div>

          <div className="space-y-4">
            {Object.entries(summary.sectionBreakdown).map(([secName, stat]) => (
              <div key={secName} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span className="truncate">{secName}</span>
                  <span className="font-mono text-blue-600">{stat.completed} / {stat.total} employees</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.round((stat.completed / (stat.total || 1)) * 100))}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Role Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
            <Briefcase className="w-4 h-4 text-indigo-600" />
            <span>Training Status by Role</span>
          </div>

          <div className="space-y-4">
            {Object.entries(summary.roleBreakdown).map(([roleName, stat]) => (
              <div key={roleName} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>{roleName}</span>
                  <span className="font-mono text-indigo-600">{stat.completed} / {stat.total} employees</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.round((stat.completed / (stat.total || 1)) * 100))}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Recent Activity Stream */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
          <Activity className="w-4 h-4 text-emerald-600" />
          <span>Recent Activity & Audit Stream</span>
        </div>

        <div className="divide-y divide-slate-100">
          {activities.map((act) => (
            <div key={act.id} className="py-3 flex items-start justify-between gap-4 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                <div>
                  <div className="font-medium text-slate-800">{act.description}</div>
                  <span className="text-[10px] text-slate-400 font-mono">{act.type} • {act.relatedId || ''}</span>
                </div>
              </div>
              <span className="text-[11px] text-slate-400 font-mono shrink-0">{act.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
