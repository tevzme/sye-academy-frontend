import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Course } from '../types';
import { api } from '../api/client';
import { BookOpen, Plus, Search, Clock, Award, Trash2, Edit2, X } from 'lucide-react';

export const AdminCatalog: React.FC = () => {
  const { t, lang } = useApp();
  const [courses, setCourses] = useState<Course[]>([]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const data = await api.getCourses();
      setCourses(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete course ${name}?`)) {
      try {
        await api.deleteCourse(id);
        await loadCourses();
      } catch (err: any) {
        alert('Error: ' + err.message);
      }
    }
  };

  const filteredCourses = courses.filter((c) => {
    const matchesCategory = categoryFilter === 'All' || c.category === categoryFilter;
    const matchesSearch =
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.nameTh && c.nameTh.includes(search)) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">{t.catalog}</h1>
          <p className="text-xs text-slate-500">Enterprise Course Master & Technical Curriculum Management</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search courses by code or title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {['All', 'General', 'PM', 'BA', 'Developer', 'QA', 'SRE', 'Section'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                categoryFilter === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map((c) => (
          <div
            key={c.code}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-blue-300 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60">
                  {c.code}
                </span>
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="flex items-center gap-1 text-slate-500 text-[11px]">
                    <Clock className="w-3 h-3" />
                    {c.duration}
                  </span>
                  {c.hasAssessment && (
                    <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded text-[10px] font-semibold border border-amber-200/60">
                      <Award className="w-3 h-3" /> Quiz
                    </span>
                  )}
                </div>
              </div>

              <h3 className="font-bold text-sm text-slate-900 mb-1 leading-snug">
                {lang === 'th' && c.nameTh ? c.nameTh : c.name}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                {lang === 'th' && c.descriptionTh ? c.descriptionTh : c.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] font-medium text-slate-500">
                {c.category} {c.targetSection ? `• ${c.targetSection}` : ''}
              </span>
              <button
                onClick={() => handleDelete(c.code, c.name)}
                className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                title="Delete Course"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
