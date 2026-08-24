export interface Employee {
  id: string;
  staffId: string;
  name: string;
  role: string;
  section: string;
  joinDate: string;
  email: string;
  status: 'Active' | 'Inactive';
}

export interface ContentSection {
  title: string;
  body: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  nameTh?: string;
  category: 'General' | 'PM' | 'BA' | 'Developer' | 'QA' | 'SRE' | 'Section';
  description: string;
  descriptionTh?: string;
  duration: string;
  targetRoles: string[];
  targetSection?: string | null;
  prerequisites: string[];
  hasAssessment: boolean;
  learningObjectives?: string[];
  learningObjectivesTh?: string[];
  content?: ContentSection[];
  contentTh?: ContentSection[];
  createdDate: string;
}

export interface TrainingRecord {
  id: string;
  recordCode: string;
  employeeId: string;
  courseId: string;
  trainingDate: string;
  completionDate?: string;
  trainer: string;
  method: 'Classroom' | 'Online' | 'Self-study' | 'OJT';
  status: 'Completed' | 'In Progress' | 'Scheduled' | 'Failed';
  score?: number | null;
  passed?: boolean | null;
  remarks?: string;
}

export interface ProcedureStep {
  step: number;
  title: string;
  description: string;
}

export interface RevisionEntry {
  version: string;
  date: string;
  changes: string;
  author: string;
}

export interface WorkInstruction {
  id: string;
  docNo: string;
  title: string;
  section: string;
  objective: string;
  scope: string;
  procedure: ProcedureStep[];
  references: string[];
  version: string;
  effectiveDate: string;
  preparedBy: string;
  reviewedBy: string;
  approvedBy: string;
  revisionHistory: RevisionEntry[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  id: string;
  code: string;
  courseId: string;
  title: string;
  passingScore: number;
  questions: QuizQuestion[];
}

export interface QuizResult {
  id: string;
  resultCode: string;
  quizId: string;
  employeeId: string;
  date: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  passed: boolean;
  answers: number[];
}

export interface ActivityLog {
  id: string;
  logCode: string;
  date: string;
  timestamp: string;
  type: string;
  description: string;
  relatedId?: string;
}

export interface EmployeeStats {
  employeeId: string;
  required: number;
  completed: number;
  percent: number;
}

export interface ReportSummary {
  totalEmployees: number;
  totalCourses: number;
  completedCount: number;
  inProgressCount: number;
  scheduledCount: number;
  completionRate: number;
  sectionBreakdown: Record<string, { total: number; completed: number; rate: number }>;
  roleBreakdown: Record<string, { total: number; completed: number; rate: number }>;
}

export interface ApiResponse<T> {
  data: T;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null;
  message: {
    en: string;
    th: string;
  };
  code: string;
  errors: Array<{ field: string; message: { en: string; th: string } }>;
}
