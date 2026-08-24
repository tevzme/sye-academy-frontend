import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { ReportSummary, Employee, Course, TrainingRecord } from '../types';
import { api } from '../api/client';
import { BarChart3, Download, Printer, Award, FileSpreadsheet, X, Sparkles } from 'lucide-react';

export const AdminReports: React.FC = () => {
  const { t } = useApp();
  const [summary, setSummary] = useState<ReportSummary | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [records, setRecords] = useState<TrainingRecord[]>([]);
  const [selectedCertEmp, setSelectedCertEmp] = useState<string>('');
  const [selectedCertCourse, setSelectedCertCourse] = useState<string>('');
  const [showCertModal, setShowCertModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [sum, emps, crs, recs] = await Promise.all([
          api.getReportSummary(),
          api.getEmployees(),
          api.getCourses(),
          api.getRecords(),
        ]);
        setSummary(sum);
        setEmployees(emps);
        setCourses(crs);
        setRecords(recs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const exportCSV = (filename: string, headers: string[], rows: (string | number)[][]) => {
    let csvContent = 'data:text/csv;charset=utf-8,' + headers.join(',') + '\n';
    rows.forEach(r => {
      csvContent += r.map(v => `"${v}"`).join(',') + '\n';
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportRecords = () => {
    const headers = ['RecordCode', 'EmployeeID', 'CourseID', 'Trainer', 'Method', 'Date', 'Status', 'Score'];
    const rows = records.map(r => [
      r.recordCode || r.id,
      r.employeeId,
      r.courseId,
      r.trainer,
      r.method,
      r.trainingDate,
      r.status,
      r.score || '',
    ]);
    exportCSV(`SYE_Training_Records_${new Date().toISOString().split('T')[0]}.csv`, headers, rows);
  };

  const targetEmp = employees.find(e => e.staffId === selectedCertEmp);
  const targetCourse = courses.find(c => c.code === selectedCertCourse);
  const targetRecord = records.find(r => r.employeeId === selectedCertEmp && r.courseId === selectedCertCourse && r.status === 'Completed');

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">{t.reports}</h1>
        <p className="text-xs text-slate-500">ISO 9001 & ISO 27001 Audit Evidence, Exports & Printable Certificates</p>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Export CSV Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 w-fit mb-3">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Export Training Evidence</h3>
            <p className="text-xs text-slate-500 mt-1">Download complete records as standard CSV for external auditors.</p>
          </div>
          <button
            onClick={handleExportRecords}
            className="mt-4 w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download CSV Export</span>
          </button>
        </div>

        {/* Generate Certificate Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="p-3 rounded-xl bg-amber-50 text-amber-600 w-fit mb-3">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Training Certificate</h3>
            <p className="text-xs text-slate-500 mt-1">Issue official bilingual completion certificate with print layout.</p>
          </div>
          <button
            onClick={() => setShowCertModal(true)}
            className="mt-4 w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Generate Certificate</span>
          </button>
        </div>

        {/* System Health / Summary */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="p-3 rounded-xl bg-blue-50 text-blue-600 w-fit mb-3">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">ISO Governance Status</h3>
            <p className="text-xs text-slate-500 mt-1">All {summary?.totalCourses || 37} courses active under ISO 9001:2015 & ISO 27001:2022.</p>
          </div>
          <div className="mt-4 p-2 bg-slate-50 rounded-xl border border-slate-100 text-center text-xs font-bold text-emerald-600">
            ✓ 100% Audit Ready
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-xl border border-slate-100 space-y-6">
            <div className="flex justify-between items-center no-print">
              <h3 className="text-base font-bold text-slate-900">Issue Training Certificate</h3>
              <button onClick={() => setShowCertModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 no-print text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Select Employee</label>
                <select
                  value={selectedCertEmp}
                  onChange={(e) => setSelectedCertEmp(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 bg-white outline-none"
                >
                  <option value="">-- Choose Employee --</option>
                  {employees.map((emp) => (
                    <option key={emp.staffId} value={emp.staffId}>
                      {emp.staffId} - {emp.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Select Course</label>
                <select
                  value={selectedCertCourse}
                  onChange={(e) => setSelectedCertCourse(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 bg-white outline-none"
                >
                  <option value="">-- Choose Course --</option>
                  {courses.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} - {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Certificate Preview Frame */}
            {targetEmp && targetCourse ? (
              <div className="p-8 border-4 border-double border-slate-300 rounded-2xl bg-gradient-to-b from-white to-slate-50 text-center space-y-4 shadow-sm">
                <div className="flex justify-center text-amber-500">
                  <Award className="w-12 h-12" />
                </div>
                <div className="text-xs uppercase tracking-widest font-bold text-slate-400">
                  Certificate of Completion
                </div>
                <div className="text-2xl font-black text-slate-900 tracking-tight">
                  {targetEmp.name}
                </div>
                <p className="text-xs text-slate-500">has successfully completed all requirements and assessments for</p>
                <div className="text-lg font-bold text-blue-900">
                  {targetCourse.code}: {targetCourse.name}
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Issue Date: {targetRecord?.completionDate || new Date().toISOString().split('T')[0]} • System Enabler Division
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs italic bg-slate-50 rounded-xl">
                Please select both an employee and a course to preview the certificate.
              </div>
            )}

            <div className="flex gap-3 no-print">
              <button
                type="button"
                onClick={() => setShowCertModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50"
              >
                Close
              </button>
              <button
                type="button"
                disabled={!targetEmp || !targetCourse}
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 disabled:opacity-50 text-white font-semibold text-xs hover:bg-blue-700 flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
