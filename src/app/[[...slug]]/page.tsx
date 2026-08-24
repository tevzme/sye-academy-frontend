"use client";

import React, { useEffect, useState } from 'react';

export default function AppRouterPage() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    // Check saved collapse state
    const saved = localStorage.getItem('sye_sidebar_collapsed') === 'true';
    setCollapsed(saved);

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

  const toggleSidebar = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem('sye_sidebar_collapsed', String(next));
  };

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
            <div className="w-9 h-9 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
              S
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-800 leading-tight">SYE Academy</h1>
              <p className="text-xs text-slate-500 font-medium">System Enabler Division • AEON</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              id="lang-toggle-learner"
              onClick={() => { if (typeof (window as any).toggleLanguage === 'function') (window as any).toggleLanguage(); }}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition shrink-0"
            >
              <svg className="w-3.5 h-3.5 text-slate-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
              <span id="lang-label-learner">EN</span>
            </button>
            <a href="/dashboard" onClick={(e) => nav('/dashboard', e)} className="text-xs font-semibold px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition flex items-center gap-2 shadow-xs shrink-0">
              <svg className="w-4 h-4 text-slate-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
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
        {/* Collapsible Sidebar */}
        <aside
          id="sidebar"
          className={`bg-white border-r border-slate-200 flex flex-col z-20 shrink-0 transition-all duration-300 ease-in-out ${
            collapsed ? 'w-20' : 'w-64'
          }`}
        >
          {/* Sidebar Header with Brand & Collapse Button */}
          <div className="h-16 flex items-center px-4 border-b border-slate-100 justify-between">
            <div
              className={`flex items-center cursor-pointer overflow-hidden ${
                collapsed ? 'justify-center w-full' : 'space-x-3'
              }`}
              onClick={(e) => nav('/landing', e)}
              title="SYE Academy"
            >
              <div className="w-9 h-9 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-base shadow-sm shrink-0">
                S
              </div>
              {!collapsed && (
                <div className="min-w-0">
                  <h1 className="text-sm font-bold text-slate-800 leading-tight truncate">SYE Academy</h1>
                  <p className="text-[11px] text-slate-400 font-medium truncate">Admin & Audit Portal</p>
                </div>
              )}
            </div>
            {!collapsed && (
              <button
                onClick={toggleSidebar}
                title="Collapse Sidebar"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition shrink-0 ml-1"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
            )}
          </div>

          {/* Quick Learner Portal Link */}
          <div className={`px-3 py-2.5 border-b border-slate-100 bg-blue-50/50 flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
            <a
              href="/landing"
              onClick={(e) => nav('/landing', e)}
              className={`text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 ${collapsed ? 'justify-center' : ''}`}
              title="Learner Portal"
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              {!collapsed && <span>Learner Portal</span>}
            </a>
            {collapsed && (
              <button
                onClick={toggleSidebar}
                title="Expand Sidebar"
                className="p-1 text-slate-400 hover:text-slate-700 transition"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-3">
            <ul className="space-y-1 px-2.5">
              <li>
                <a
                  href="/dashboard"
                  onClick={(e) => nav('/dashboard', e)}
                  className={`nav-item flex items-center py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors ${
                    collapsed ? 'justify-center px-0' : 'px-3'
                  }`}
                  title="Dashboard"
                >
                  <svg className="w-4 h-4 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
                  {!collapsed && <span className="ml-3 truncate">Dashboard</span>}
                </a>
              </li>
              <li>
                <a
                  href="/catalog"
                  onClick={(e) => nav('/catalog', e)}
                  className={`nav-item flex items-center py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors ${
                    collapsed ? 'justify-center px-0' : 'px-3'
                  }`}
                  title="Training Catalog"
                >
                  <svg className="w-4 h-4 text-indigo-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10M6 10h10"/></svg>
                  {!collapsed && <span className="ml-3 truncate">Training Catalog</span>}
                </a>
              </li>
              <li>
                <a
                  href="/work-instructions"
                  onClick={(e) => nav('/work-instructions', e)}
                  className={`nav-item flex items-center py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors ${
                    collapsed ? 'justify-center px-0' : 'px-3'
                  }`}
                  title="Work Instructions"
                >
                  <svg className="w-4 h-4 text-cyan-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
                  {!collapsed && <span className="ml-3 truncate">Work Instructions</span>}
                </a>
              </li>
              <li>
                <a
                  href="/employees"
                  onClick={(e) => nav('/employees', e)}
                  className={`nav-item flex items-center py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors ${
                    collapsed ? 'justify-center px-0' : 'px-3'
                  }`}
                  title="Employees"
                >
                  <svg className="w-4 h-4 text-emerald-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  {!collapsed && <span className="ml-3 truncate">Employees</span>}
                </a>
              </li>
              <li>
                <a
                  href="/records"
                  onClick={(e) => nav('/records', e)}
                  className={`nav-item flex items-center py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors ${
                    collapsed ? 'justify-center px-0' : 'px-3'
                  }`}
                  title="Training Records"
                >
                  <svg className="w-4 h-4 text-amber-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  {!collapsed && <span className="ml-3 truncate">Training Records</span>}
                </a>
              </li>
              <li>
                <a
                  href="/assessments"
                  onClick={(e) => nav('/assessments', e)}
                  className={`nav-item flex items-center py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors ${
                    collapsed ? 'justify-center px-0' : 'px-3'
                  }`}
                  title="Assessments"
                >
                  <svg className="w-4 h-4 text-purple-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                  {!collapsed && <span className="ml-3 truncate">Assessments</span>}
                </a>
              </li>
              <li>
                <a
                  href="/reports"
                  onClick={(e) => nav('/reports', e)}
                  className={`nav-item flex items-center py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors ${
                    collapsed ? 'justify-center px-0' : 'px-3'
                  }`}
                  title="Reports"
                >
                  <svg className="w-4 h-4 text-rose-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
                  {!collapsed && <span className="ml-3 truncate">Reports</span>}
                </a>
              </li>
              <li>
                <a
                  href="/settings"
                  onClick={(e) => nav('/settings', e)}
                  className={`nav-item flex items-center py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors ${
                    collapsed ? 'justify-center px-0' : 'px-3'
                  }`}
                  title="Settings"
                >
                  <svg className="w-4 h-4 text-slate-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                  {!collapsed && <span className="ml-3 truncate">Settings</span>}
                </a>
              </li>
            </ul>
          </nav>

          {!collapsed && (
            <div className="p-3.5 border-t border-slate-100 text-[11px] text-slate-400 text-center font-medium truncate">
              &copy; 2025-2026 AEON SYE
            </div>
          )}
        </aside>

        {/* Main Wrapper */}
        <div id="main-content-wrapper" className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Header */}
          <header id="header" className="h-16 bg-white border-b border-slate-100 shadow-xs flex items-center justify-between px-6 z-10 shrink-0">
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleSidebar}
                title="Toggle Sidebar"
                className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition shrink-0"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
              </button>
              <h2 id="page-title" className="text-lg font-bold text-slate-800 truncate">Dashboard</h2>
            </div>
            <div className="flex items-center space-x-3 text-xs text-slate-600">
              <button
                id="lang-toggle-admin"
                onClick={() => { if (typeof (window as any).toggleLanguage === 'function') (window as any).toggleLanguage(); }}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition shrink-0"
              >
                <svg className="w-3.5 h-3.5 text-slate-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                <span id="lang-label-admin">EN</span>
              </button>
              <span id="current-date" className="text-xs text-slate-500 font-medium hidden md:inline"></span>
              <div className="h-8 px-3 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs border border-blue-100 whitespace-nowrap">
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
