"use client";

import React, { useEffect } from 'react';

export default function AppRouterPage() {
  useEffect(() => {
    const initializeApp = () => {
      if (typeof window !== 'undefined') {
        const w = window as any;
        if (typeof w.initData === 'function') {
          w.initData();
        }
        if (typeof w.handleRoute === 'function') {
          w.handleRoute();
        }
      }
    };

    if (document.readyState === 'complete') {
      initializeApp();
    } else {
      window.addEventListener('load', initializeApp);
    }

    const timer = setInterval(() => {
      const w = window as any;
      if (typeof w.handleRoute === 'function' && typeof w.initData === 'function') {
        w.initData();
        w.handleRoute();
        clearInterval(timer);
      }
    }, 40);

    return () => {
      clearInterval(timer);
      window.removeEventListener('load', initializeApp);
    };
  }, []);

  const nav = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    const w = window as any;
    if (typeof w.navigate === 'function') {
      w.navigate(path, e);
    } else if (typeof w.handleRoute === 'function') {
      window.history.pushState(null, '', path);
      w.handleRoute();
    }
  };

  return (
    <>
      {/* LEARNER LAYOUT */}
      <div id="learner-layout" className="hidden flex-col w-full h-screen overflow-hidden">
        {/* Top Navbar */}
        <nav id="learner-nav" className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center shadow-xs shrink-0 z-10">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={(e) => nav('/landing', e)}>
            <img src="/favicon.svg" alt="AEON" className="w-9 h-9 rounded-xl shadow-xs object-cover border border-slate-200" />
            <div>
              <h1 className="text-base font-bold text-slate-800 leading-tight">SYE Academy</h1>
              <p className="text-xs text-slate-500 font-medium">System Enabler Division • AEON</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              id="lang-toggle-learner"
              onClick={() => { if (typeof (window as any).toggleLanguage === 'function') (window as any).toggleLanguage(); }}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition"
            >
              <span>🌐</span> <span id="lang-label-learner">EN</span>
            </button>
            <a href="/dashboard" onClick={(e) => nav('/dashboard', e)} className="text-xs font-semibold px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition flex items-center gap-1.5 shadow-xs">
              <span>🔧</span>
              <span>Admin Panel</span>
            </a>
          </div>
        </nav>

        {/* Learner Content */}
        <main id="learner-content" className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
          {/* Dynamically injected by app.js */}
        </main>
      </div>

      {/* ADMIN LAYOUT */}
      <div id="admin-layout" className="hidden flex w-full h-screen overflow-hidden">
        {/* Sidebar */}
        <aside id="sidebar" className="w-64 bg-white border-r border-slate-200 flex flex-col z-20 shrink-0">
          <div className="h-16 flex items-center px-6 border-b border-slate-100 justify-between">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={(e) => nav('/landing', e)}>
              <img src="/favicon.svg" alt="AEON" className="w-8 h-8 rounded-lg shadow-xs object-cover border border-slate-200" />
              <div>
                <h1 className="text-base font-bold text-slate-800 leading-tight">SYE Academy</h1>
                <p className="text-xs text-slate-400 font-medium">Admin & Audit Portal</p>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 border-b border-slate-100 bg-blue-50/40">
            <button onClick={() => { if (typeof (window as any).openLearnerModal === 'function') (window as any).openLearnerModal(); }} className="w-full rounded-xl px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition flex items-center justify-center gap-1.5 shadow-xs">
              <span>📚</span>
              <span>Start Training</span>
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto py-3">
            <ul className="space-y-0.5 px-3">
              <li><a href="/dashboard" onClick={(e) => nav('/dashboard', e)} className="nav-item flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">📊 <span className="ml-2.5">Dashboard</span></a></li>
              <li><a href="/catalog" onClick={(e) => nav('/catalog', e)} className="nav-item flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">📚 <span className="ml-2.5">Training Catalog</span></a></li>
              <li><a href="/work-instructions" onClick={(e) => nav('/work-instructions', e)} className="nav-item flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">📋 <span className="ml-2.5">Work Instructions</span></a></li>
              <li><a href="/employees" onClick={(e) => nav('/employees', e)} className="nav-item flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">👥 <span className="ml-2.5">Employees</span></a></li>
              <li><a href="/records" onClick={(e) => nav('/records', e)} className="nav-item flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">📝 <span className="ml-2.5">Training Records</span></a></li>
              <li><a href="/assessments" onClick={(e) => nav('/assessments', e)} className="nav-item flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">✏️ <span className="ml-2.5">Assessments</span></a></li>
              <li><a href="/reports" onClick={(e) => nav('/reports', e)} className="nav-item flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">📄 <span className="ml-2.5">Reports</span></a></li>
              <li><a href="/settings" onClick={(e) => nav('/settings', e)} className="nav-item flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">⚙️ <span className="ml-2.5">Settings</span></a></li>
            </ul>
          </nav>
          <div className="p-3.5 border-t border-slate-100 text-xs text-slate-400 text-center font-medium">
            &copy; 2025-2026 AEON SYE Division
          </div>
        </aside>

        {/* Main Wrapper */}
        <div id="main-content-wrapper" className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Header */}
          <header id="header" className="h-16 bg-white border-b border-slate-100 shadow-xs flex items-center justify-between px-8 z-10 shrink-0">
            <h2 id="page-title" className="text-xl font-bold text-slate-800">Dashboard</h2>
            <div className="flex items-center space-x-3 text-sm text-slate-600">
              <button
                id="lang-toggle-admin"
                onClick={() => { if (typeof (window as any).toggleLanguage === 'function') (window as any).toggleLanguage(); }}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition"
              >
                <span>🌐</span> <span id="lang-label-admin">EN</span>
              </button>
              <span id="current-date" className="text-xs text-slate-500 font-medium"></span>
              <div className="h-8 px-3 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs border border-blue-100">
                System Enabler (SYE)
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto p-6 lg:p-8" id="admin-content">
            {/* Content dynamically injected by JS */}
          </main>
        </div>
      </div>

      {/* Modal Container */}
      <div id="modal-container" className="fixed inset-0 z-50 flex items-center justify-center modal-overlay hidden p-4">
        <div id="modal-content" className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-100">
          {/* Modal Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
            <h3 id="modal-title" className="text-base font-bold text-slate-800">Modal Title</h3>
            <button id="modal-close" onClick={() => { (window as any).UI?.closeModal(); }} className="text-slate-400 hover:text-slate-600 text-2xl font-bold leading-none p-1">&times;</button>
          </div>
          {/* Modal Body */}
          <div id="modal-body" className="p-6 overflow-y-auto flex-1">
            {/* Modal content goes here */}
          </div>
          {/* Modal Footer */}
          <div id="modal-footer" className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end space-x-3 shrink-0">
            <button id="modal-cancel" onClick={() => { (window as any).UI?.closeModal(); }} className="rounded-xl px-4 py-2 bg-white text-slate-700 text-xs font-semibold border border-slate-200 hover:bg-slate-50 transition-colors">Cancel</button>
            <button id="modal-save" className="rounded-xl px-4 py-2 bg-blue-600 text-white text-xs font-semibold shadow-xs hover:bg-blue-700 transition-colors">Save</button>
          </div>
        </div>
      </div>

      {/* Full Screen Print Container for Certificates & Reports */}
      <div id="print-container" className="hidden"></div>
    </>
  );
}
