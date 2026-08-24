import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Quiz, QuizResult } from '../types';
import { api } from '../api/client';
import { CheckSquare, Award, Clock, Users, CheckCircle2, XCircle } from 'lucide-react';

export const AdminAssessments: React.FC = () => {
  const { t } = useApp();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [activeTab, setActiveTab] = useState<'quizzes' | 'results'>('quizzes');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [qList, rList] = await Promise.all([
          api.getQuizzes(),
          api.getQuizResults(),
        ]);
        setQuizzes(qList);
        setResults(rList);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">{t.assessments}</h1>
          <p className="text-xs text-slate-500">Assessments Master, Grading Rules & Historical Results</p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('quizzes')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'quizzes' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Quizzes Master ({quizzes.length})
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'results' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Results History ({results.length})
          </button>
        </div>
      </div>

      {activeTab === 'quizzes' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quizzes.map((q) => (
            <div key={q.code} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/60">
                    {q.code}
                  </span>
                  <span className="text-xs font-mono font-semibold text-blue-600">{q.courseId}</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 mb-1">{q.title}</h3>
                <p className="text-xs text-slate-500">
                  {q.questions.length} questions • Passing Threshold: {q.passingScore}%
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Multiple Choice (4 Options)</span>
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">Active</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Result ID</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Employee</th>
                  <th className="py-3 px-4">Quiz Code</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Correct / Total</th>
                  <th className="py-3 px-4 text-right">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {results.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-700">{r.resultCode || r.id.substring(0, 8)}</td>
                    <td className="py-3 px-4 font-mono text-slate-500">{r.date}</td>
                    <td className="py-3 px-4 font-semibold text-slate-900">{r.employeeId}</td>
                    <td className="py-3 px-4 font-mono font-bold text-blue-600">{r.quizId}</td>
                    <td className="py-3 px-4 font-mono font-bold">{r.score}%</td>
                    <td className="py-3 px-4 text-slate-600">{r.correctAnswers} / {r.totalQuestions}</td>
                    <td className="py-3 px-4 text-right">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        r.passed ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {r.passed ? 'PASSED' : 'FAILED'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
