"use client";

import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Course, Quiz, TrainingRecord } from '../types';
import { api } from '../api/client';
import { MarkdownViewer } from '../components/MarkdownViewer';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  Clock, 
  Layers, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Award, 
  RotateCcw,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface CoursePageProps {
  courseCode: string;
}

export const CoursePage: React.FC<CoursePageProps> = ({ courseCode }) => {
  const { currentLearner, lang, t, navigate } = useApp();
  const [course, setCourse] = useState<Course | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [existingRecord, setExistingRecord] = useState<TrainingRecord | null>(null);
  const [hasAcknowledged, setHasAcknowledged] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizResult, setQuizResult] = useState<any | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourseData = async () => {
      try {
        setLoading(true);
        const c = await api.getCourse(courseCode);
        setCourse(c);

        if (c.hasAssessment) {
          try {
            const q = await api.getQuiz(courseCode);
            setQuiz(q);
            if (q?.questions) {
              setSelectedAnswers(new Array(q.questions.length).fill(-1));
            }
          } catch (e) {
            console.log('No quiz definition found for course');
          }
        }

        if (currentLearner) {
          const empRecords = await api.getRecords(currentLearner.staffId);
          const found = empRecords.find(r => r.courseId === courseCode);
          if (found) {
            setExistingRecord(found);
            if (found.status === 'Completed') {
              setHasAcknowledged(true);
            }
          }
        }
      } catch (err) {
        console.error('Failed to load course:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCourseData();
  }, [courseCode, currentLearner]);

  const handleCompleteWithoutAssessment = async () => {
    if (!currentLearner || !course) return;
    try {
      setSubmitting(true);
      const today = new Date().toISOString().split('T')[0];
      await api.createRecord({
        employeeId: currentLearner.staffId,
        courseId: course.code,
        trainingDate: today,
        completionDate: today,
        trainer: 'Self-study',
        method: 'Self-study',
        status: 'Completed',
        remarks: 'Course completed via Learner Portal',
      });
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      setTimeout(() => navigate('#my-training'), 1000);
    } catch (err) {
      alert('Failed to save completion: ' + err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuizSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quiz || !currentLearner) return;

    if (selectedAnswers.includes(-1)) {
      alert('Please answer all questions before submitting.');
      return;
    }

    try {
      setSubmitting(true);
      const result = await api.submitQuiz(quiz.code, currentLearner.staffId, selectedAnswers);
      setQuizResult(result);

      if (result.passed) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    } catch (err) {
      alert('Failed to submit quiz: ' + err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetake = () => {
    if (quiz) {
      setSelectedAnswers(new Array(quiz.questions.length).fill(-1));
      setQuizResult(null);
    }
  };

  if (loading || !course) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center text-slate-500">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-3"></div>
        <p>Loading course content...</p>
      </div>
    );
  }

  const sections = (lang === 'th' && course.contentTh && course.contentTh.length > 0)
    ? course.contentTh
    : course.content || [];

  const objectives = (lang === 'th' && course.learningObjectivesTh && course.learningObjectivesTh.length > 0)
    ? course.learningObjectivesTh
    : course.learningObjectives || [];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Back Link */}
      <button
        onClick={() => navigate('#my-training')}
        className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>← {t.backToHome}</span>
      </button>

      {/* Course Header */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200/60">
            {course.code}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
            {course.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-500 ml-auto">
            <Clock className="w-3.5 h-3.5" />
            {course.duration}
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
          {lang === 'th' && course.nameTh ? course.nameTh : course.name}
        </h1>

        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          {lang === 'th' && course.descriptionTh ? course.descriptionTh : course.description}
        </p>

        {/* Learning Objectives Box */}
        {objectives.length > 0 && (
          <div className="mt-6 p-5 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 rounded-2xl border border-blue-100/80">
            <div className="flex items-center gap-2 font-bold text-xs text-blue-900 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>{t.learningObjectives}</span>
            </div>
            <ul className="space-y-1.5">
              {objectives.map((obj, i) => (
                <li key={i} className="text-xs md:text-sm text-slate-700 flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Main Reading Content */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-8">
        {sections.length > 0 ? (
          sections.map((section, idx) => (
            <div key={idx} className="pb-8 border-b border-slate-100 last:border-0 last:pb-0">
              <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center font-mono">
                  {idx + 1}
                </span>
                <span>{section.title}</span>
              </h2>
              <MarkdownViewer content={section.body} />
            </div>
          ))
        ) : (
          <p className="text-slate-500 italic">Course content is being prepared.</p>
        )}
      </div>

      {/* Course Acknowledgment & Action Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-6">
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={hasAcknowledged}
            onChange={(e) => setHasAcknowledged(e.target.checked)}
            className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 mt-0.5"
          />
          <span className="text-sm font-medium text-slate-700 leading-snug">
            {t.markAsUnderstood}
          </span>
        </label>

        {course.hasAssessment ? (
          <div>
            {!showQuiz ? (
              <button
                disabled={!hasAcknowledged}
                onClick={() => setShowQuiz(true)}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm rounded-2xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <Award className="w-5 h-5" />
                <span>{t.takeAssessment}</span>
              </button>
            ) : null}
          </div>
        ) : (
          <button
            disabled={!hasAcknowledged || submitting || existingRecord?.status === 'Completed'}
            onClick={handleCompleteWithoutAssessment}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-sm rounded-2xl shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>
              {existingRecord?.status === 'Completed' ? 'Already Completed' : t.completeCourse}
            </span>
          </button>
        )}
      </div>

      {/* Interactive Assessment Quiz Engine */}
      {showQuiz && quiz && (
        <div id="quiz-section" className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">{quiz.title}</h3>
              <p className="text-xs text-slate-500">
                {quiz.questions.length} questions • Passing score: {quiz.passingScore}%
              </p>
            </div>
            <Award className="w-8 h-8 text-amber-500" />
          </div>

          {quizResult ? (
            /* Quiz Result Screen */
            <div className="space-y-6">
              <div className={`p-6 rounded-2xl border text-center ${
                quizResult.passed
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}>
                <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-xl bg-current">
                  {quizResult.passed ? <CheckCircle2 className="w-8 h-8 text-emerald-600" /> : <XCircle className="w-8 h-8 text-rose-600" />}
                </div>
                <h4 className="text-xl font-black">{quizResult.passed ? t.passedQuiz : t.failedQuiz}</h4>
                <p className="text-sm mt-1 font-medium">
                  Your Score: <strong className="text-lg">{quizResult.score}%</strong> ({quizResult.correctAnswers} / {quizResult.totalQuestions} correct)
                </p>
              </div>

              {/* Question Review List */}
              <div className="space-y-4">
                <h5 className="font-bold text-sm text-slate-900">Question Review:</h5>
                {quizResult.questions.map((q: any, idx: number) => (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border ${
                      q.isCorrect ? 'bg-emerald-50/30 border-emerald-200' : 'bg-rose-50/30 border-rose-200'
                    }`}
                  >
                    <div className="flex items-start gap-2 text-xs font-bold mb-2">
                      {q.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      )}
                      <span>Q{idx + 1}: {q.question}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt: string, optIdx: number) => {
                        const isCorrectOption = optIdx === q.CorrectAnswer;
                        const isUserChoice = optIdx === q.UserAnswer;
                        return (
                          <div
                            key={optIdx}
                            className={`p-2 rounded-lg border text-[11px] ${
                              isCorrectOption
                                ? 'bg-emerald-100/70 border-emerald-300 text-emerald-900 font-semibold'
                                : isUserChoice
                                ? 'bg-rose-100/70 border-rose-300 text-rose-900 line-through'
                                : 'bg-white border-slate-200 text-slate-600'
                            }`}
                          >
                            {opt}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 pt-4">
                {!quizResult.passed && (
                  <button
                    onClick={handleRetake}
                    className="flex-1 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>{t.retakeQuiz}</span>
                  </button>
                )}
                <button
                  onClick={() => navigate('#my-training')}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <span>{t.continueTraining}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Quiz Questions Form */
            <form onSubmit={handleQuizSubmit} className="space-y-6">
              {quiz.questions.map((q, qIdx) => (
                <div key={q.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <div className="flex items-start gap-2 font-bold text-sm text-slate-900">
                    <span className="text-blue-600 font-mono">Q{qIdx + 1}.</span>
                    <span>{q.question}</span>
                  </div>

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => (
                      <label
                        key={optIdx}
                        className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          selectedAnswers[qIdx] === optIdx
                            ? 'bg-blue-50/80 border-blue-500 text-blue-900 font-semibold shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${qIdx}`}
                          value={optIdx}
                          checked={selectedAnswers[qIdx] === optIdx}
                          onChange={() => {
                            const newAnswers = [...selectedAnswers];
                            newAnswers[qIdx] = optIdx;
                            setSelectedAnswers(newAnswers);
                          }}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm rounded-2xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>{submitting ? 'Grading Answers...' : 'Submit Assessment Answers'}</span>
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
