"use client";

import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { LandingPage } from '../views/LandingPage';
import { RegisterPage } from '../views/RegisterPage';
import { MyTrainingPage } from '../views/MyTrainingPage';
import { CoursePage } from '../views/CoursePage';
import { AdminDashboard } from '../views/AdminDashboard';
import { AdminEmployees } from '../views/AdminEmployees';
import { AdminCatalog } from '../views/AdminCatalog';
import { AdminRecords } from '../views/AdminRecords';
import { AdminWorkInstructions } from '../views/AdminWorkInstructions';
import { AdminAssessments } from '../views/AdminAssessments';
import { AdminReports } from '../views/AdminReports';
import { AdminSettings } from '../views/AdminSettings';

export default function Home() {
  const { currentRoute } = useApp();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-400">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mb-2"></div>
      </div>
    );
  }

  const renderContent = () => {
    if (currentRoute === '' || currentRoute === '#' || currentRoute === '#landing') {
      return <LandingPage />;
    }
    if (currentRoute === '#register') {
      return <RegisterPage />;
    }
    if (currentRoute === '#my-training') {
      return <MyTrainingPage />;
    }
    if (currentRoute.startsWith('#course-')) {
      const courseCode = currentRoute.replace('#course-', '');
      return <CoursePage courseCode={courseCode} />;
    }

    // Admin Routes
    if (currentRoute === '#dashboard' || currentRoute === '#admin-dashboard') {
      return <AdminDashboard />;
    }
    if (currentRoute === '#admin-employees') {
      return <AdminEmployees />;
    }
    if (currentRoute === '#admin-catalog') {
      return <AdminCatalog />;
    }
    if (currentRoute === '#admin-records') {
      return <AdminRecords />;
    }
    if (currentRoute === '#admin-wi') {
      return <AdminWorkInstructions />;
    }
    if (currentRoute === '#admin-assessments') {
      return <AdminAssessments />;
    }
    if (currentRoute === '#admin-reports') {
      return <AdminReports />;
    }
    if (currentRoute === '#admin-settings') {
      return <AdminSettings />;
    }

    return <LandingPage />;
  };

  const isAdminRoute = currentRoute.startsWith('#admin-') || currentRoute === '#dashboard';

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 font-sans text-slate-800">
      <Navbar />

      <div className="flex-1 flex">
        {isAdminRoute && <Sidebar />}

        <main className={`flex-1 overflow-x-hidden ${isAdminRoute ? 'bg-slate-50/50' : ''}`}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
