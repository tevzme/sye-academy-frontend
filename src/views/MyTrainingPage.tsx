"use client";

import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Course, TrainingRecord, EmployeeStats } from '../types';
import { api } from '../api/client';
import { 
  CheckCircle2, 
  Lock, 
  PlayCircle, 
  Clock, 
  Award, 
  ArrowLeft, 
  User, 
  Layers, 
  Building2, 
  Sparkles,
  BookOpen
} from 'lucide-react';

export const MyTrainingPage: React.FC = () => {
  const { currentLearner, setCurrentLearner, lang, t, navigate } = useApp();
  const [courses, setCourses] = useState<Course[]>([]);
  const [records, setRecords] = useState<TrainingRecord[]>([]);
  const [stats, setStats] = useState<EmployeeStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentLearner) {
      navigate('#landing');
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true);
        const [allCourses, empRecords, empStats] = await Promise.all([
          api.getCourses(),
          api.getRecords(currentLearner.staffId),
          api.getEmployeeStats(currentLearner.staffId),
        ]);
        setCourses(allCourses);
        setRecords(empRecords);
        setStats(empStats);
      } catch (err) {
        console.error('Failed to load training roadmap:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [currentLearner]);

  if (!currentLearner) return null;

  // Filter courses for this learner
  const step1Courses = courses.filter(c => c.category === 'General');
  const step2Courses = courses.filter(c => c.category === currentLearner.role);
  const step3Courses = courses.filter(c => c.category === 'Section' && c.targetSection === currentLearner.section);

  const completedCourseCodes = new Set(
    records.filter(r => r.status === 'Completed').map(r => r.courseId)
  );

  const getRecordForCourse = (courseCode: string) => {
    return records.find(r => r.courseId === courseCode);
  };

  const isCourseUnlocked = (courseList: Course[], index: number, prevStepComplete: boolean) => {
    if (!prevStepComplete) return false;
    if (index === 0) return true;
    const prevCourse = courseList[index - 1];
    return completedCourseCodes.has(prevCourse.code);
  };

  const isStep1Complete = step1Courses.every(c => completedCourseCodes.has(c.code));
  const isStep2Complete = step2Courses.every(c => completedCourseCodes.has(c.code));

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4 text-center text-slate-500">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-3"></div>
        <p>Loading your training curriculum...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Learner Profile & Progress Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md shrink-0">
              {currentLearner.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  {lang === 'th' ? `ยินดีต้อนรับ, ${currentLearner.name}` : `Welcome, ${currentLearner.name}`}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
                  {currentLearner.staffId}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 flex-wrap">
                <span className="flex items-center gap-1 font-medium text-slate-700">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  {currentLearner.role}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-medium text-slate-700">
                  <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                  {currentLearner.section}
                </span>
              </div>
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-4 md:w-72 shrink-0">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
              <span>Overall Progress</span>
              <span className="text-blue-600 font-extrabold">{stats?.percent || 0}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${stats?.percent || 0}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-500 mt-2 font-medium">
              <span>{stats?.completed || 0} of {stats?.required || 0} completed</span>
              {stats?.percent === 100 && (
                <span className="text-emerald-600 flex items-center gap-1 font-bold">
                  <Sparkles className="w-3 h-3" /> Certified
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Steps */}
      <div className="space-y-8">
        {/* Step 1 */}
        <StepSection
          number={1}
          title={t.step1Title}
          description={t.step1Desc}
          courses={step1Courses}
          completedSet={completedCourseCodes}
          getRecord={getRecordForCourse}
          isUnlocked={true}
          lang={lang}
          navigate={navigate}
        />

        {/* Step 2 */}
        <StepSection
          number={2}
          title={`${t.step2Title} (${currentLearner.role})`}
          description={t.step2Desc}
          courses={step2Courses}
          completedSet={completedCourseCodes}
          getRecord={getRecordForCourse}
          isUnlocked={isStep1Complete}
          lang={lang}
          navigate={navigate}
        />

        {/* Step 3 */}
        <StepSection
          number={3}
          title={`${t.step3Title} (${currentLearner.section})`}
          description={t.step3Desc}
          courses={step3Courses}
          completedSet={completedCourseCodes}
          getRecord={getRecordForCourse}
          isUnlocked={isStep1Complete && isStep2Complete}
          lang={lang}
          navigate={navigate}
        />
      </div>
    </div>
  );
};

interface StepSectionProps {
  number: number;
  title: string;
  description: string;
  courses: Course[];
  completedSet: Set<string>;
  getRecord: (code: string) => TrainingRecord | undefined;
  isUnlocked: boolean;
  lang: 'en' | 'th';
  navigate: (route: string) => void;
}

const StepSection: React.FC<StepSectionProps> = ({
  number,
  title,
  description,
  courses,
  completedSet,
  getRecord,
  isUnlocked,
  lang,
  navigate,
}) => {
  const completedCount = courses.filter(c => completedSet.has(c.code)).length;

  return (
    <div className={`rounded-3xl border transition-all ${
      isUnlocked ? 'bg-white border-slate-200/80 shadow-xs' : 'bg-slate-50/70 border-slate-200/50 opacity-75'
    } p-6 md:p-8`}>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
              isUnlocked ? 'bg-blue-600 text-white' : 'bg-slate-300 text-slate-600'
            }`}>
              {number}
            </span>
            <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          </div>
          <p className="text-xs text-slate-500">{description}</p>
        </div>

        <div className="text-right shrink-0">
          <span className="text-xs font-bold text-slate-700">
            {completedCount} / {courses.length}
          </span>
          <span className="text-[10px] text-slate-400 block font-medium">Completed</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course, idx) => {
          const isCompleted = completedSet.has(course.code);
          const record = getRecord(course.code);
          const unlocked = isUnlocked && (idx === 0 || completedSet.has(courses[idx - 1].code) || isCompleted);

          return (
            <div
              key={course.code}
              className={`rounded-2xl border p-5 transition-all flex flex-col justify-between ${
                isCompleted
                  ? 'bg-emerald-50/40 border-emerald-200/80'
                  : unlocked
                  ? 'bg-white border-slate-200 hover:border-blue-500 hover:shadow-md'
                  : 'bg-slate-50 border-slate-200/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[11px] font-bold font-mono px-2 py-0.5 rounded-md ${
                    isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {course.code}
                  </span>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="flex items-center gap-1 text-slate-500 text-[11px]">
                      <Clock className="w-3 h-3" />
                      {course.duration}
                    </span>
                    {course.hasAssessment && (
                      <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded text-[10px] font-semibold border border-amber-200/60">
                        <Award className="w-3 h-3" /> Quiz
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="font-bold text-sm text-slate-900 mb-1 leading-snug">
                  {lang === 'th' && course.nameTh ? course.nameTh : course.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {lang === 'th' && course.descriptionTh ? course.descriptionTh : course.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                {isCompleted ? (
                  <div className="flex items-center justify-between w-full">
                    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Completed
                    </span>
                    {record?.score !== undefined && record?.score !== null && (
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                        Score: {record.score}%
                      </span>
                    )}
                    <button
                      onClick={() => navigate(`#course-${course.code}`)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Review →
                    </button>
                  </div>
                ) : unlocked ? (
                  <button
                    onClick={() => navigate(`#course-${course.code}`)}
                    className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <PlayCircle className="w-3.5 h-3.5" />
                    <span>Start Course →</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Locked (Complete previous course)</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
