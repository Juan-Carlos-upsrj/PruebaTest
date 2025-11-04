export enum View {
  Dashboard = 'Inicio del Curso',
  Analytics = 'Estadísticas del Curso',
  Content = 'Gestión de Contenido',
  SpeedGrader = 'Gestión de Entregas',
  Gradebook = 'Libro de Calificaciones',
  Students = 'Lista de Alumnos',
  Groups = 'Gestión de Grupos',
  Gallery = 'Moderar Galería',
  Forum = 'Foro de Discusión',
  Announcements = 'Anuncios',
  Calendar = 'Calendario',
  Inbox = 'Mensajería',
  QuestionBank = 'Banco de Preguntas',
  RecycleBin = 'Papelera',
  Settings = 'Configuración del Curso',
}

export interface Student {
  id: number;
  name: string;
  email: string;
  progress: number;
  lastConnection: string;
  avatar: string;
  grades: { [key: string]: number | null };
  completedLessons: number[];
}

export interface Lesson {
  id: number;
  title: string;
  type: 'video' | 'lecture' | 'assignment' | 'project' | 'quiz';
  isLocked: boolean;
}

export interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

export interface Assignment {
  id: number;
  title: string;
}

export interface Submission {
  studentId: number;
  studentName: string;
  status: 'Calificada' | 'Sin Calificar';
  grade: number | null;
  fileUrl: string;
  feedback: string;
}

export interface GradebookItem {
  id: number;
  title: string;
  weight: number;
  dueDate: string;
  category: 'Tareas' | 'Proyectos' | 'Exámenes';
  isPublished: boolean;
}

export interface GalleryProject {
  id: number;
  studentName: string;
  imageUrl: string;
  title: string;
}

export interface ForumPost {
  id: number;
  author: string;
  avatar: string;
  title: string;
  content: string;
  replies: number;
  isPinned: boolean;
  isLocked: boolean;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  scheduledDate?: string;
}

export enum ContentType {
  Video = "Lección de Video",
  Article = "Artículo/Lectura",
  Assignment = "Tarea (con entrega)",
  Project = "Proyecto (para Galería)",
  Quiz = "Quiz (Simulado)"
}

// New Types for Advanced Features
export interface Question {
  id: number;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options?: string[];
  correctAnswer: string;
}

export interface RubricCriterion {
  id: string;
  description: string;
  points: number;
  ratings: {
    description: string;
    points: number;
  }[];
}

export interface Rubric {
  id: number;
  assignmentId: number;
  criteria: RubricCriterion[];
}

export interface StudentGroup {
  id: number;
  name: string;
  members: number[]; // array of student IDs
}

export interface PrivateMessage {
  id: number;
  from: string;
  subject: string;
  body: string;
  timestamp: string;
  isRead: boolean;
}

export type UserRole = 'Profesor' | 'Co-Profesor' | 'Asistente';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface RecycledItem {
  id: number;
  name: string;
  type: 'Lección' | 'Módulo' | 'Tarea' | 'Anuncio';
  deletedDate: string;
}

// --- New types for V3 features ---
export interface Notification {
  id: number;
  icon: string;
  iconClass: string;
  text: string;
  time: string;
}

export interface AuditLogEntry {
  id: number;
  user: string;
  avatar: string;
  action: string;
  timestamp: string;
}