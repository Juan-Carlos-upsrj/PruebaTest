import { View, Student, Module, Assignment, Submission, GradebookItem, GalleryProject, ForumPost, Announcement, Question, Rubric, StudentGroup, PrivateMessage, User, RecycledItem, Notification, AuditLogEntry } from './types';

export const SIDEBAR_ITEMS: { view: View; icon: string }[] = [
  { view: View.Dashboard, icon: 'fa-solid fa-house' },
  { view: View.Analytics, icon: 'fa-solid fa-chart-line' },
  { view: View.Announcements, icon: 'fa-solid fa-bullhorn' },
  { view: View.Content, icon: 'fa-solid fa-book-open' },
  { view: View.Students, icon: 'fa-solid fa-users' },
  { view: View.Groups, icon: 'fa-solid fa-user-group' },
  { view: View.Gradebook, icon: 'fa-solid fa-table-list' },
  { view: View.SpeedGrader, icon: 'fa-solid fa-gauge-high' },
  { view: View.Forum, icon: 'fa-solid fa-comments' },
  { view: View.Inbox, icon: 'fa-solid fa-envelope' },
  { view: View.Gallery, icon: 'fa-solid fa-images' },
  { view: View.Calendar, icon: 'fa-solid fa-calendar-days' },
  { view: View.QuestionBank, icon: 'fa-solid fa-clipboard-question' },
  { view: View.RecycleBin, icon: 'fa-solid fa-recycle' },
  { view: View.Settings, icon: 'fa-solid fa-gear' },
];

export const MOCK_STUDENTS: Student[] = [
  { id: 1, name: 'Ana López', email: 'ana.lopez@example.com', progress: 85, lastConnection: '2024-07-22', avatar: 'https://picsum.photos/seed/student1/100', grades: { 'Tarea 1': 90, 'Examen Parcial': 85, 'Proyecto Final': 95, 'Proyecto de Módulo 2': 88 }, completedLessons: [101, 102, 201] },
  { id: 2, name: 'Juan Pérez', email: 'juan.perez@example.com', progress: 60, lastConnection: '2024-07-21', avatar: 'https://picsum.photos/seed/student2/100', grades: { 'Tarea 1': 75, 'Examen Parcial': 65, 'Proyecto Final': null, 'Proyecto de Módulo 2': 70 }, completedLessons: [101, 102] },
  { id: 3, name: 'María García', email: 'maria.garcia@example.com', progress: 95, lastConnection: '2024-07-23', avatar: 'https://picsum.photos/seed/student3/100', grades: { 'Tarea 1': 100, 'Examen Parcial': 92, 'Proyecto Final': 98, 'Proyecto de Módulo 2': 100 }, completedLessons: [101, 102, 201, 202] },
  { id: 4, name: 'Carlos Martínez', email: 'carlos.martinez@example.com', progress: 30, lastConnection: '2024-07-15', avatar: 'https://picsum.photos/seed/student4/100', grades: { 'Tarea 1': 50, 'Examen Parcial': null, 'Proyecto Final': null, 'Proyecto de Módulo 2': null }, completedLessons: [101] },
  { id: 5, name: 'Laura Rodríguez', email: 'laura.r@example.com', progress: 72, lastConnection: '2024-07-22', avatar: 'https://picsum.photos/seed/student5/100', grades: { 'Tarea 1': 80, 'Examen Parcial': 70, 'Proyecto Final': 85, 'Proyecto de Módulo 2': 78 }, completedLessons: [101, 102, 201] },
];

export const MOCK_MODULES: Module[] = [
  { id: 1, title: 'Módulo 1: Introducción a CAD', lessons: [
    { id: 101, title: '1.1 - ¿Qué es CAD?', type: 'video', isLocked: false },
    { id: 102, title: '1.2 - Interfaz del Software', type: 'lecture', isLocked: false },
    { id: 103, title: 'Tarea 1 - Primeros Pasos', type: 'assignment', isLocked: false }
  ] },
  { id: 2, title: 'Módulo 2: Modelado 3D', lessons: [
    { id: 201, title: '2.1 - Sólidos Primitivos', type: 'video', isLocked: false },
    { id: 202, title: '2.2 - Operaciones Booleanas', type: 'video', isLocked: true },
    { id: 203, title: 'Proyecto de Módulo 2', type: 'project', isLocked: true },
    { id: 204, title: 'Quiz de Modelado', type: 'quiz', isLocked: true }
  ] },
];

export const MOCK_ASSIGNMENTS: Assignment[] = [
  { id: 1, title: 'Tarea 1 - Primeros Pasos' },
  { id: 2, title: 'Proyecto de Módulo 2' },
  { id: 3, title: 'Proyecto Final' }
];

export const MOCK_SUBMISSIONS: { [key: number]: Submission[] } = {
  1: [
    { studentId: 1, studentName: 'Ana López', status: 'Calificada', grade: 90, fileUrl: 'https://picsum.photos/seed/file1/800/600', feedback: 'Excelente trabajo, muy detallado.' },
    { studentId: 2, studentName: 'Juan Pérez', status: 'Sin Calificar', grade: null, fileUrl: 'https://picsum.photos/seed/file2/800/600', feedback: '' },
    { studentId: 3, studentName: 'María García', status: 'Calificada', grade: 100, fileUrl: 'https://picsum.photos/seed/file3/800/600', feedback: 'Perfecto, sin comentarios.' },
  ],
  2: [
    { studentId: 1, studentName: 'Ana López', status: 'Sin Calificar', grade: null, fileUrl: 'https://picsum.photos/seed/file4/800/600', feedback: '' },
  ],
  3: [],
};

export const MOCK_GRADEBOOK_ITEMS: GradebookItem[] = [
  { id: 1, title: 'Tarea 1', weight: 15, dueDate: '2024-07-20', category: 'Tareas', isPublished: true },
  { id: 4, title: 'Proyecto de Módulo 2', weight: 25, dueDate: '2024-08-01', category: 'Proyectos', isPublished: true},
  { id: 2, title: 'Examen Parcial', weight: 30, dueDate: '2024-08-05', category: 'Exámenes', isPublished: false },
  { id: 3, title: 'Proyecto Final', weight: 30, dueDate: '2024-08-20', category: 'Proyectos', isPublished: false }
];

export const MOCK_GALLERY_PROJECTS: GalleryProject[] = [
  { id: 1, studentName: 'Juan Pérez', imageUrl: 'https://picsum.photos/seed/proj1/400/300', title: 'Diseño de Silla Ergonómica' },
  { id: 2, studentName: 'Laura Rodríguez', imageUrl: 'https://picsum.photos/seed/proj2/400/300', title: 'Modelo de Dron' },
  { id: 3, studentName: 'Carlos Martínez', imageUrl: 'https://picsum.photos/seed/proj3/400/300', title: 'Prototipo de Carcasa' },
];

export const MOCK_FORUM_POSTS: ForumPost[] = [
  { id: 1, author: 'Juan Pérez', avatar: 'https://picsum.photos/seed/student2/100', title: 'Duda sobre Operaciones Booleanas', content: 'No entiendo bien la diferencia entre unión e intersección, ¿alguien puede explicarlo?', replies: 3, isPinned: false, isLocked: false },
  { id: 2, author: 'Profesor', avatar: 'https://picsum.photos/seed/prof/100', title: 'Recordatorio: Entrega Tarea 1', content: 'Recuerden que la fecha límite para la Tarea 1 es este viernes. ¡No lo dejen para el último momento!', replies: 0, isPinned: true, isLocked: true },
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  { id: 1, title: '¡Bienvenidos al curso!', content: 'Estoy muy emocionado de empezar este semestre con ustedes...', date: '2024-07-10' },
  { id: 2, title: 'Actualización de Software', content: 'Asegúrense de tener la última versión del software de CAD instalada antes de la clase del lunes.', date: '2024-07-18' },
  { id: 3, title: 'Clase de repaso (Programado)', content: 'Tendremos una clase de repaso el próximo miércoles.', date: '2024-07-25', scheduledDate: '2024-07-25T10:00' },
];

// Mock data for new advanced features
export const MOCK_QUESTION_BANK: Question[] = [
  { id: 1, type: 'true-false', text: 'CAD significa "Diseño Asistido por Computadora".', correctAnswer: 'Verdadero' },
  { id: 2, type: 'multiple-choice', text: '¿Qué operación booleana combina dos sólidos en uno solo?', options: ['Unión', 'Sustracción', 'Intersección'], correctAnswer: 'Unión' },
  { id: 3, type: 'short-answer', text: '¿Cómo se llama el plano principal sobre el que se suele empezar a dibujar?', correctAnswer: 'Plano XY' },
];

export const MOCK_RUBRICS: { [assignmentId: number]: Rubric } = {
  1: {
    id: 1,
    assignmentId: 1,
    criteria: [
      { id: 'c1', description: 'Precisión del Modelo', points: 10, ratings: [{ description: 'Excelente', points: 10 }, { description: 'Bueno', points: 7 }, { description: 'Necesita Mejora', points: 4 }] },
      { id: 'c2', description: 'Uso de Herramientas', points: 5, ratings: [{ description: 'Experto', points: 5 }, { description: 'Adecuado', points: 3 }, { description: 'Básico', points: 1 }] },
    ]
  }
};

export const MOCK_GROUPS: StudentGroup[] = [
    { id: 1, name: 'Equipo Alfa', members: [1, 3] },
    { id: 2, name: 'Equipo Beta', members: [2, 5] },
    { id: 3, name: 'Equipo Gamma', members: [4] },
];

export const MOCK_MESSAGES: PrivateMessage[] = [
    { id: 1, from: 'Ana López', subject: 'Pregunta sobre el Proyecto Final', body: 'Profesor, ¿podemos usar texturas personalizadas en el render final?', timestamp: '2024-07-23 10:30', isRead: false },
    { id: 2, from: 'Administración', subject: 'Actualización de la plataforma', body: 'El sistema estará en mantenimiento este sábado de 2 a 4 AM.', timestamp: '2024-07-22 15:00', isRead: true },
];

export const MOCK_USERS: User[] = [
    { id: 1, name: 'Profesor Titular', email: 'prof.titular@example.com', role: 'Profesor', avatar: 'https://picsum.photos/seed/prof/100' },
    { id: 2, name: 'Juan Asistente', email: 'juan.asistente@example.com', role: 'Asistente', avatar: 'https://picsum.photos/seed/assist1/100' },
    { id: 3, name: 'Maria Colega', email: 'maria.colega@example.com', role: 'Co-Profesor', avatar: 'https://picsum.photos/seed/prof2/100' },
];

export const MOCK_RECYCLED_ITEMS: RecycledItem[] = [
    { id: 1, name: 'Borrador de Anuncio de Bienvenida', type: 'Anuncio', deletedDate: '2024-07-21' },
    { id: 2, name: 'Lección 1.3 - Ejemplos Prácticos', type: 'Lección', deletedDate: '2024-07-20' },
];

// --- Mock data for V3 Features ---
export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 1, icon: 'fa-file-arrow-up', iconClass: 'text-blue-500', text: 'Juan Pérez entregó la Tarea 1', time: 'hace 5m' },
  { id: 2, icon: 'fa-comment-dots', iconClass: 'text-green-500', text: 'Nuevo post en el foro de "Dudas Módulo 2"', time: 'hace 30m' },
  { id: 3, icon: 'fa-envelope', iconClass: 'text-purple-500', text: 'Recibiste un nuevo mensaje de Ana López', time: 'hace 1h' },
];

export const MOCK_PREDEFINED_COMMENTS: string[] = [
  'Excelente trabajo, muy bien estructurado.',
  'Buen análisis, pero faltan citar las fuentes.',
  'Revisa la ortografía y gramática.',
  'La conclusión podría ser más robusta.',
  'Asegúrate de seguir todos los puntos de la rúbrica.',
];

export const MOCK_AUDIT_LOG: AuditLogEntry[] = [
  { id: 1, user: 'Profesor Titular', avatar: 'https://picsum.photos/seed/prof/100', action: 'Calificó la "Tarea 1" para Ana López (90/100).', timestamp: '2024-07-23 11:45' },
  { id: 2, user: 'Juan Asistente', avatar: 'https://picsum.photos/seed/assist1/100', action: 'Creó el anuncio "Recordatorio: Entrega Tarea 1".', timestamp: '2024-07-23 09:15' },
  { id: 3, user: 'Profesor Titular', avatar: 'https://picsum.photos/seed/prof/100', action: 'Cambió la fecha de entrega del "Proyecto Final" al 2024-08-25.', timestamp: '2024-07-22 18:00' },
];