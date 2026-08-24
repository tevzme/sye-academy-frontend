"use client";

import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Users, 
  ClipboardCheck, 
  CheckSquare, 
  BarChart3, 
  Settings,
  ArrowLeft
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { t, currentRoute, navigate, currentLearner } = useApp();

  const navItems = [
    { label: t.dashboard, route: '#dashboard', icon: LayoutDashboard },
    { label: t.catalog, route: '#admin-catalog', icon: BookOpen },
    { label: t.workInstructions, route: '#admin-wi', icon: FileText },
    { label: t.employees, route: '#admin-employees', icon: Users },
    { label: t.records, route: '#admin-records', icon: ClipboardCheck },
    { label: t.assessments, route: '#admin-assessments', icon: CheckSquare },
    { label: t.reports, route: '#admin-reports', icon: BarChart3 },
    { label: t.settings, route: '#admin-settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between shrink-0 no-print">
      <div>
        <div className="mb-4 pb-3 border-b border-slate-100">
          <button
            onClick={() => navigate(currentLearner ? '#my-training' : '#landing')}
            className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors w-full px-2 py-1.5 rounded-md hover:bg-slate-50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Exit to Learner Portal</span>
          </button>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.route || (item.route === '#dashboard' && currentRoute === '#admin-dashboard');

            return (
              <button
                key={item.route}
                onClick={() => navigate(item.route)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs border border-blue-100'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-xs text-slate-500">
        <div className="font-semibold text-slate-700">SYE Academy v2.0</div>
        <div>Go + PostgreSQL + React</div>
        <div className="text-[10px] text-emerald-600 font-medium mt-1">● API Connected</div>
      </div>
    </aside>
  );
};
