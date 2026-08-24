import axios from 'axios';
import { ApiResponse, Course, Employee, EmployeeStats, ReportSummary, TrainingRecord, WorkInstruction, Quiz, QuizResult, ActivityLog } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = error.response?.data?.message?.en || error.message || 'API request failed';
    return Promise.reject(new Error(customError));
  }
);

export const api = {
  // Employees
  getEmployees: async () => {
    const res = await apiClient.get<ApiResponse<Employee[]>>('/employees/all');
    return res.data.data;
  },
  getEmployee: async (id: string) => {
    const res = await apiClient.get<ApiResponse<Employee>>(`/employees/${id}`);
    return res.data.data;
  },
  getEmployeeStats: async (id: string) => {
    const res = await apiClient.get<ApiResponse<EmployeeStats>>(`/employees/${id}/stats`);
    return res.data.data;
  },
  createEmployee: async (data: Omit<Employee, 'id' | 'status'>) => {
    const res = await apiClient.post<ApiResponse<Employee>>('/employees', data);
    return res.data.data;
  },
  updateEmployee: async (id: string, data: Partial<Employee>) => {
    const res = await apiClient.put<ApiResponse<Employee>>(`/employees/${id}`, data);
    return res.data.data;
  },
  deleteEmployee: async (id: string) => {
    await apiClient.delete(`/employees/${id}`);
  },

  // Courses
  getCourses: async () => {
    const res = await apiClient.get<ApiResponse<Course[]>>('/courses/all');
    return res.data.data;
  },
  getCourse: async (id: string) => {
    const res = await apiClient.get<ApiResponse<Course>>(`/courses/${id}`);
    return res.data.data;
  },
  createCourse: async (data: Partial<Course>) => {
    const res = await apiClient.post<ApiResponse<Course>>('/courses', data);
    return res.data.data;
  },
  updateCourse: async (id: string, data: Partial<Course>) => {
    const res = await apiClient.put<ApiResponse<Course>>(`/courses/${id}`, data);
    return res.data.data;
  },
  deleteCourse: async (id: string) => {
    await apiClient.delete(`/courses/${id}`);
  },

  // Training Records
  getRecords: async (empId?: string) => {
    const url = empId ? `/records/all?employeeId=${empId}` : '/records/all';
    const res = await apiClient.get<ApiResponse<TrainingRecord[]>>(url);
    return res.data.data;
  },
  createRecord: async (data: Partial<TrainingRecord>) => {
    const res = await apiClient.post<ApiResponse<TrainingRecord>>('/records', data);
    return res.data.data;
  },
  updateRecord: async (id: string, data: Partial<TrainingRecord>) => {
    const res = await apiClient.put<ApiResponse<TrainingRecord>>(`/records/${id}`, data);
    return res.data.data;
  },
  deleteRecord: async (id: string) => {
    await apiClient.delete(`/records/${id}`);
  },

  // Work Instructions
  getWorkInstructions: async () => {
    const res = await apiClient.get<ApiResponse<WorkInstruction[]>>('/work-instructions/all');
    return res.data.data;
  },
  getWorkInstruction: async (id: string) => {
    const res = await apiClient.get<ApiResponse<WorkInstruction>>(`/work-instructions/${id}`);
    return res.data.data;
  },
  createWorkInstruction: async (data: Partial<WorkInstruction>) => {
    const res = await apiClient.post<ApiResponse<WorkInstruction>>('/work-instructions', data);
    return res.data.data;
  },
  updateWorkInstruction: async (id: string, data: Partial<WorkInstruction>) => {
    const res = await apiClient.put<ApiResponse<WorkInstruction>>(`/work-instructions/${id}`, data);
    return res.data.data;
  },
  deleteWorkInstruction: async (id: string) => {
    await apiClient.delete(`/work-instructions/${id}`);
  },

  // Assessments
  getQuizzes: async () => {
    const res = await apiClient.get<ApiResponse<Quiz[]>>('/assessments/quizzes');
    return res.data.data;
  },
  getQuiz: async (courseId: string) => {
    const res = await apiClient.get<ApiResponse<Quiz>>(`/assessments/quizzes/${courseId}`);
    return res.data.data;
  },
  submitQuiz: async (quizId: string, employeeId: string, answers: number[]) => {
    const res = await apiClient.post<ApiResponse<any>>('/assessments/submit', {
      quizId,
      employeeId,
      answers,
    });
    return res.data.data;
  },
  getQuizResults: async () => {
    const res = await apiClient.get<ApiResponse<QuizResult[]>>('/assessments/results');
    return res.data.data;
  },

  // Reports & Logs
  getReportSummary: async () => {
    const res = await apiClient.get<ApiResponse<ReportSummary>>('/reports/summary');
    return res.data.data;
  },
  getRecentActivity: async (limit = 10) => {
    const res = await apiClient.get<ApiResponse<ActivityLog[]>>(`/reports/recent-activity?limit=${limit}`);
    return res.data.data;
  },
};
