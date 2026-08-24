import React from 'react';
import { useApp } from '../context/AppContext';
import { Globe, User, Shield, LogOut, BookOpen, GraduationCap } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { lang, setLang, t, currentLearner, setCurrentLearner, navigate, currentRoute } = useApp();
  const isAdmin = currentRoute.startsWith('#admin-') || currentRoute === '#dashboard';

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={() => navigate('#landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-slate-900">SYE Academy</span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
                Enterprise
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">System Enabler Division • AEON</p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Active Learner Info */}
          {currentLearner && !isAdmin && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs">
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span className="font-medium text-slate-700">{currentLearner.name}</span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-500">{currentLearner.role}</span>
              <button
                onClick={() => {
                  setCurrentLearner(null);
                  navigate('#landing');
                }}
                className="ml-2 text-slate-400 hover:text-rose-600 transition-colors"
                title={t.logout}
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Mode Switcher */}
          {!isAdmin ? (
            <button
              onClick={() => navigate('#dashboard')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200/80 text-slate-700 transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-slate-600" />
              <span>{t.adminPanel}</span>
            </button>
          ) : (
            <button
              onClick={() => navigate(currentLearner ? '#my-training' : '#landing')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Learner Portal</span>
            </button>
          )}

          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'th' : 'en')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-semibold uppercase">{lang}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
