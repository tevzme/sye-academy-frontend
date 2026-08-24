import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './pages/LandingPage';
import { RegisterPage } from './pages/RegisterPage';
import { MyTrainingPage } from './pages/MyTrainingPage';
import { CoursePage } from './pages/CoursePage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminEmployees } from './pages/AdminEmployees';
import { AdminCatalog } from './pages/AdminCatalog';
import { AdminRecords } from './pages/AdminRecords';
import { AdminWorkInstructions } from './pages/AdminWorkInstructions';
import { AdminAssessments } from './pages/AdminAssessments';
import { AdminReports } from './pages/AdminReports';
import { AdminSettings } from './pages/AdminSettings';

export const App: React.FC = () => {
  const { currentRoute } = useApp();

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
};
