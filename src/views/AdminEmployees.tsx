"use client";

import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Employee, TrainingRecord, Course } from '../types';
import { api } from '../api/client';
import { Users, Plus, Search, Filter, Trash2, Edit2, CheckCircle2, Clock, XCircle, X } from 'lucide-react';

export const AdminEmployees: React.FC = () => {
  const { t } = useApp();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [records, setRecords] = useState<TrainingRecord[]>([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [sectionFilter, setSectionFilter] = useState('All');
  const [selectedEmp, setSelectedEmp] = useState<Employee | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    staffId: '',
    name: '',
    role: 'Developer',
    section: 'API & Integration Platform',
    email: '',
    joinDate: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const [emps, crs, recs] = await Promise.all([
        api.getEmployees(),
        api.getCourses(),
        api.getRecords(),
      ]);
      setEmployees(emps);
      setCourses(crs);
      setRecords(recs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createEmployee(formData);
      setShowAddModal(false);
      setFormData({
        staffId: '',
        name: '',
        role: 'Developer',
        section: 'API & Integration Platform',
        email: '',
        joinDate: new Date().toISOString().split('T')[0],
      });
      await loadData();
    } catch (err: any) {
      alert('Error creating employee: ' + err.message);
    }
  };

  const handleDeleteEmployee = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete employee ${name}?`)) {
      try {
        await api.deleteEmployee(id);
        await loadData();
      } catch (err: any) {
        alert('Error deleting: ' + err.message);
      }
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.staffId.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'All' || emp.role === roleFilter;
    const matchesSection = sectionFilter === 'All' || emp.section === sectionFilter;
    return matchesSearch && matchesRole && matchesSection;
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">{t.employees}</h1>
          <p className="text-xs text-slate-500">Employee Roster, Role Mapping & Training Compliance</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by name, staff ID, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-700 outline-none"
        >
          <option value="All">All Roles</option>
          <option value="PM">PM</option>
          <option value="BA">BA</option>
          <option value="Developer">Developer</option>
          <option value="QA">QA</option>
          <option value="SRE">SRE</option>
        </select>

        <select
          value={sectionFilter}
          onChange={(e) => setSectionFilter(e.target.value)}
          className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-700 outline-none"
        >
          <option value="All">All Sections</option>
          <option value="API & Integration Platform">API & Integration Platform</option>
          <option value="Customer Experience Systems">Customer Experience Systems</option>
          <option value="Omnichannel Customer Service">Omnichannel Customer Service</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Staff ID</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Section</th>
                <th className="py-3 px-4">Join Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEmployees.map((emp) => (
                <tr key={emp.staffId} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-blue-600">{emp.staffId}</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    <button
                      onClick={() => setSelectedEmp(emp)}
                      className="hover:underline text-left"
                    >
                      {emp.name}
                    </button>
                    <div className="text-[10px] text-slate-400 font-normal">{emp.email}</div>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-700">{emp.role}</td>
                  <td className="py-3 px-4 text-slate-600">{emp.section}</td>
                  <td className="py-3 px-4 font-mono text-slate-500">{emp.joinDate}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      emp.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDeleteEmployee(emp.staffId, emp.name)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete Employee"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-slate-900">Add New Employee</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEmployee} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Staff ID</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SYE-0023"
                  value={formData.staffId}
                  onChange={(e) => setFormData({ ...formData, staffId: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Somchai Kaewmanee"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Email</label>
                <input
                  type="email"
                  required
                  placeholder="name@aeon.co.th"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 p-2.5 bg-white outline-none"
                  >
                    <option value="PM">PM</option>
                    <option value="BA">BA</option>
                    <option value="Developer">Developer</option>
                    <option value="QA">QA</option>
                    <option value="SRE">SRE</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Section</label>
                  <select
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 p-2.5 bg-white outline-none"
                  >
                    <option value="API & Integration Platform">API & Integration</option>
                    <option value="Customer Experience Systems">CXS</option>
                    <option value="Omnichannel Customer Service">OCS</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
                >
                  Save Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Employee Detail Modal */}
      {selectedEmp && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-xl border border-slate-100 max-h-[85vh] overflow-y-auto space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                  {selectedEmp.staffId}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">{selectedEmp.name}</h3>
                <p className="text-xs text-slate-500">{selectedEmp.role} • {selectedEmp.section} • Joined {selectedEmp.joinDate}</p>
              </div>
              <button onClick={() => setSelectedEmp(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">Completed Training Records</h4>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
                {records.filter(r => r.employeeId === selectedEmp.staffId).map(r => (
                  <div key={r.id} className="p-3 flex items-center justify-between bg-white hover:bg-slate-50">
                    <div>
                      <span className="font-mono font-bold text-slate-700">{r.courseId}</span>
                      <span className="text-slate-500 ml-2">({r.method} • {r.trainingDate})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {r.score !== undefined && r.score !== null && (
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                          {r.score}%
                        </span>
                      )}
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        r.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {r.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
