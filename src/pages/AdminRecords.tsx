import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { TrainingRecord, Employee, Course } from '../types';
import { api } from '../api/client';
import { ClipboardCheck, Search, Filter, Grid, List } from 'lucide-react';

export const AdminRecords: React.FC = () => {
  const { t } = useApp();
  const [records, setRecords] = useState<TrainingRecord[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'matrix'>('list');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [recs, emps, crs] = await Promise.all([
          api.getRecords(),
          api.getEmployees(),
          api.getCourses(),
        ]);
        setRecords(recs);
        setEmployees(emps);
        setCourses(crs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredRecords = records.filter((r) => {
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    const matchesSearch =
      r.employeeId.toLowerCase().includes(search.toLowerCase()) ||
      r.courseId.toLowerCase().includes(search.toLowerCase()) ||
      r.trainer.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">{t.records}</h1>
          <p className="text-xs text-slate-500">ISO 9001 & ISO 27001 Training Evidence & Skills Matrix</p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              viewMode === 'list' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Records List</span>
          </button>
          <button
            onClick={() => setViewMode('matrix')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              viewMode === 'matrix' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Training Matrix</span>
          </button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <>
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search by employee ID, course code, or trainer..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-700 outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Failed">Failed</option>
            </select>
          </div>

          {/* Records Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">Record ID</th>
                    <th className="py-3 px-4">Employee</th>
                    <th className="py-3 px-4">Course</th>
                    <th className="py-3 px-4">Trainer</th>
                    <th className="py-3 px-4">Method</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRecords.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-slate-700">{r.recordCode || r.id.substring(0, 8)}</td>
                      <td className="py-3 px-4 font-semibold text-slate-900">{r.employeeId}</td>
                      <td className="py-3 px-4 font-mono font-bold text-blue-600">{r.courseId}</td>
                      <td className="py-3 px-4 text-slate-600">{r.trainer}</td>
                      <td className="py-3 px-4 text-slate-500">{r.method}</td>
                      <td className="py-3 px-4 font-mono text-slate-500">{r.trainingDate}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          r.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : r.status === 'Failed'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold">
                        {r.score !== undefined && r.score !== null ? `${r.score}%` : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* Training Matrix Grid View */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 overflow-x-auto">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Training Completion Matrix (Cross-Reference)</h3>
            <div className="flex items-center gap-3 text-[11px] font-medium text-slate-600">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Completed</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> In Progress</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span> Not Started</span>
            </div>
          </div>

          <table className="min-w-full text-xs border border-slate-200">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-2.5 border-r border-slate-200 sticky left-0 bg-slate-50 z-10 text-left font-bold text-slate-700 min-w-[140px]">
                  Employee
                </th>
                {courses.slice(0, 15).map((c) => (
                  <th key={c.code} className="p-2 border-r border-slate-200 font-mono text-[10px] text-slate-600 text-center whitespace-nowrap" title={c.name}>
                    {c.code}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employees.map((emp) => (
                <tr key={emp.staffId} className="hover:bg-slate-50">
                  <td className="p-2.5 border-r border-slate-200 sticky left-0 bg-white z-10 font-medium text-slate-800 text-xs">
                    <span className="font-bold text-blue-600 block">{emp.staffId}</span>
                    <span className="text-[10px] text-slate-400 truncate block">{emp.name}</span>
                  </td>
                  {courses.slice(0, 15).map((c) => {
                    const record = records.find(r => r.employeeId === emp.staffId && r.courseId === c.code);
                    const isCompleted = record?.status === 'Completed';
                    const isInProgress = record?.status === 'In Progress';

                    return (
                      <td key={c.code} className="p-2 border-r border-slate-200 text-center">
                        {isCompleted ? (
                          <span className="inline-block w-4 h-4 rounded-full bg-emerald-500 text-white text-[9px] font-bold leading-4">✓</span>
                        ) : isInProgress ? (
                          <span className="inline-block w-4 h-4 rounded-full bg-amber-400 text-white text-[9px] font-bold leading-4">~</span>
                        ) : (
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
