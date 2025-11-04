
import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { View, Student, Submission, ContentType, Rubric, User, Question, StudentGroup, PrivateMessage, RecycledItem, Notification, AuditLogEntry, GradebookItem } from './types';
import { SIDEBAR_ITEMS, MOCK_STUDENTS, MOCK_MODULES, MOCK_ASSIGNMENTS, MOCK_SUBMISSIONS, MOCK_GRADEBOOK_ITEMS, MOCK_GALLERY_PROJECTS, MOCK_FORUM_POSTS, MOCK_ANNOUNCEMENTS, MOCK_QUESTION_BANK, MOCK_RUBRICS, MOCK_GROUPS, MOCK_MESSAGES, MOCK_USERS, MOCK_RECYCLED_ITEMS, MOCK_NOTIFICATIONS, MOCK_PREDEFINED_COMMENTS, MOCK_AUDIT_LOG } from './constants';

// --- HELPER & GENERIC COMPONENTS ---
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl p-6 transition-all duration-300 dark:border dark:border-gray-700/60 ${className}`}>
    {children}
  </div>
);

const HelpTooltip: React.FC<{ text: string }> = ({ text }) => (
    <span className="group relative ml-2">
        <i className="fa-solid fa-circle-question text-gray-400 cursor-help"></i>
        <span className="absolute bottom-full mb-2 w-48 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 -translate-x-1/2 left-1/2">
            {text}
        </span>
    </span>
);

const NotificationDropdown: React.FC<{ notifications: Notification[]; onClose: () => void }> = ({ notifications, onClose }) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    return (
        <div ref={dropdownRef} className="absolute top-14 right-4 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 z-50">
            <div className="p-3 font-semibold border-b dark:border-gray-700">Notificaciones</div>
            <ul className="divide-y dark:divide-gray-700 max-h-96 overflow-y-auto">
                {notifications.map(n => (
                    <li key={n.id} className="p-3 flex items-start space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer">
                        <i className={`fa-solid ${n.icon} ${n.iconClass} mt-1`}></i>
                        <div>
                            <p className="text-sm">{n.text}</p>
                            <p className="text-xs text-gray-500">{n.time}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// --- HEADER & SIDEBAR ---
const Header: React.FC<{ title: string; onMenuClick: () => void }> = ({ title, onMenuClick }) => {
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex items-center justify-between z-30 sticky top-0 border-b border-gray-200 dark:border-gray-700/80">
            <button onClick={onMenuClick} className="lg:hidden text-gray-600 dark:text-gray-300">
                <i className="fa-solid fa-bars text-xl"></i>
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white flex items-center">{title}</h1>
            <div className="flex items-center space-x-4">
                <button className="text-gray-600 dark:text-gray-300 hover:text-indigo-500 transition-colors" title="Vista de Alumno de Prueba"><i className="fa-solid fa-user-graduate"></i></button>
                <div className="relative">
                    <button onClick={() => setNotificationsOpen(o => !o)} className="text-gray-600 dark:text-gray-300 relative hover:text-indigo-500 transition-colors">
                        <i className="fa-solid fa-bell"></i>
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                    </button>
                    {notificationsOpen && <NotificationDropdown notifications={MOCK_NOTIFICATIONS} onClose={() => setNotificationsOpen(false)} />}
                </div>
                <img src="https://picsum.photos/seed/prof/100" alt="Perfil del profesor" className="w-10 h-10 rounded-full"/>
            </div>
        </header>
    );
};


const Sidebar: React.FC<{ activeView: View; setActiveView: (view: View) => void; isOpen: boolean; setIsOpen: (isOpen: boolean) => void; }> = ({ activeView, setActiveView, isOpen, setIsOpen }) => (
    <>
        <aside className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white flex flex-col transition-transform duration-300 ease-in-out z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
            <div className="p-6 text-2xl font-bold border-b border-gray-700">
                Plataforma LMS
            </div>
            <nav className="flex-grow overflow-y-auto">
                <ul>
                    {SIDEBAR_ITEMS.map(item => (
                        <li key={item.view}>
                            <a href="#" onClick={(e) => { e.preventDefault(); setActiveView(item.view); setIsOpen(false); }}
                                className={`flex items-center py-3 px-6 text-base transition-colors duration-200 ${activeView === item.view ? 'bg-indigo-600 text-white' : 'hover:bg-gray-700'}`}>
                                <i className={`${item.icon} w-8`}></i>
                                <span>{item.view}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="p-4 border-t border-gray-700">
                <p className="text-sm">© 2024 Tu Universidad</p>
            </div>
        </aside>
        {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"></div>}
    </>
);


// --- MODALS ---
const RubricModal: React.FC<{ rubric: Rubric; onClose: () => void }> = ({ rubric, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Card className="w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Rúbrica de Calificación</h2>
                <button onClick={onClose}><i className="fa-solid fa-times text-xl"></i></button>
            </div>
            <div className="space-y-4">
                {rubric.criteria.map(c => (
                    <div key={c.id} className="border-t pt-2">
                        <div className="flex justify-between font-semibold">
                            <span>{c.description}</span>
                            <span>{c.points} pts.</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                            {c.ratings.map(r => <span key={r.points}>{r.description} ({r.points} pts)</span>)}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    </div>
);

// --- VIEWS ---
const AtRiskStudentsCard = () => {
    const atRiskStudents = MOCK_STUDENTS.filter(s => s.progress < 40 || Object.values(s.grades).some(g => g !== null && g < 60));
    return (
        <Card>
            <h2 className="text-lg font-semibold mb-4 flex items-center text-red-500">
                <i className="fa-solid fa-triangle-exclamation mr-2"></i>
                Alumnos en Riesgo
            </h2>
            <ul className="divide-y dark:divide-gray-700">
                {atRiskStudents.map(s => (
                    <li key={s.id} className="py-2 flex items-center space-x-3">
                        <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full" />
                        <span className="font-semibold">{s.name}</span>
                        <span className="text-sm text-gray-500">({s.progress}% Progreso)</span>
                    </li>
                ))}
            </ul>
        </Card>
    );
};

const DashboardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="flex items-center justify-between">
            <div>
                <h2 className="text-base font-semibold text-gray-500 dark:text-gray-400">Alumnos activos hoy</h2>
                <p className="text-4xl font-bold text-indigo-500">15 <span className="text-xl text-gray-500">/ 30</span></p>
            </div>
            <div className="bg-indigo-100 dark:bg-indigo-500/20 p-4 rounded-full">
                <i className="fa-solid fa-user-clock text-indigo-500 dark:text-indigo-300 text-3xl"></i>
            </div>
        </Card>
        <Card className="flex items-center justify-between">
            <div>
                <h2 className="text-base font-semibold text-gray-500 dark:text-gray-400">Entregas pendientes</h2>
                <p className="text-4xl font-bold text-amber-500">10</p>
                <p className="text-gray-500 text-sm">En Tarea 2</p>
            </div>
             <div className="bg-amber-100 dark:bg-amber-500/20 p-4 rounded-full">
                <i className="fa-solid fa-file-circle-exclamation text-amber-500 dark:text-amber-300 text-3xl"></i>
            </div>
        </Card>
        <AtRiskStudentsCard />
    </div>
);

const AnalyticsView = () => (
    <div className="space-y-8">
        <Card>
            <h2 className="text-xl font-bold mb-4">Mapa de Calor de Actividad del Curso</h2>
            <div className="grid grid-cols-7 gap-1 text-xs">
                {['', 'Lun', 'Mié', 'Vie'].map(d => <div key={d} className="text-center">{d}</div>)}
                {Array.from({ length: 4 * 7 }).map((_, i) => (
                    <div key={i} className={`w-full aspect-square rounded ${[2, 9, 10, 11, 15, 17, 24].includes(i) ? 'bg-indigo-200' : [3, 4, 16, 18, 25].includes(i) ? 'bg-indigo-400' : [12, 19, 26].includes(i) ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`} title={`Actividad el día ${i}`}></div>
                ))}
            </div>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
                <h2 className="text-xl font-bold mb-4">Lecciones Problemáticas</h2>
                <ul>
                    <li className="py-2 border-b dark:border-gray-700">2.1 - Sólidos Primitivos (25% de abandono)</li>
                    <li className="py-2">Quiz de Modelado (Puntaje promedio: 55%)</li>
                </ul>
            </Card>
            <Card>
                <h2 className="text-xl font-bold mb-4">Alumnos con Menor Actividad</h2>
                <ul>
                    {MOCK_STUDENTS.filter(s => new Date().getDate() - new Date(s.lastConnection).getDate() > 7).map(s => (
                        <li key={s.id} className="flex items-center py-2 border-b dark:border-gray-700">
                            <img src={s.avatar} alt={s.name} className="w-10 h-10 rounded-full mr-4"/>
                            <div>
                                <p className="font-semibold">{s.name}</p>
                                <p className="text-sm text-gray-500">Última conexión: {s.lastConnection}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    </div>
);

const ContentManagerView: React.FC<{ setSubView: (subView: string) => void }> = ({ setSubView }) => (
    <div className="space-y-6">
        {MOCK_MODULES.map(module => (
            <Card key={module.id}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold flex items-center">
                        <i className="fa-solid fa-grip-vertical mr-3 text-gray-400 cursor-grab"></i>
                        {module.title}
                    </h3>
                    <div className="space-x-2">
                        <button className="text-gray-500 hover:text-indigo-500 transition-colors"><i className="fa-solid fa-pen"></i></button>
                        <button className="text-gray-500 hover:text-red-500 transition-colors"><i className="fa-solid fa-trash"></i></button>
                        <button onClick={() => setSubView('ContentForm')} className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 text-sm font-semibold">Añadir Contenido</button>
                    </div>
                </div>
                <ul className="space-y-2 ml-8">
                    {module.lessons.map(lesson => (
                        <li key={lesson.id} className={`flex justify-between items-center p-2 rounded ${lesson.isLocked ? 'bg-gray-100 dark:bg-gray-700/80' : 'bg-gray-50 dark:bg-gray-700/50'}`}>
                             <span className={`flex items-center ${lesson.isLocked ? 'text-gray-400' : ''}`}>
                                <i className="fa-solid fa-grip-vertical mr-3 text-gray-400 cursor-grab"></i>
                                {lesson.isLocked && <i className="fa-solid fa-lock mr-2 text-amber-500" title="Esta lección se desbloqueará al completar la anterior."></i>}
                                {lesson.title}
                             </span>
                             <div className="space-x-2">
                                <button className="text-gray-500 hover:text-indigo-500 transition-colors"><i className="fa-solid fa-pen"></i></button>
                                <button className="text-gray-500 hover:text-red-500 transition-colors"><i className="fa-solid fa-trash"></i></button>
                            </div>
                        </li>
                    ))}
                </ul>
            </Card>
        ))}
    </div>
);

const SpeedGraderView = () => {
    const [selectedAssignmentId, setSelectedAssignmentId] = useState<number>(MOCK_ASSIGNMENTS[0].id);
    const [submissions, setSubmissions] = useState<Submission[]>(MOCK_SUBMISSIONS[selectedAssignmentId] || []);
    const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(submissions[0] || null);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [showRubric, setShowRubric] = useState(false);
    const feedbackRef = useRef<HTMLTextAreaElement>(null);
    
    const handleAssignmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = parseInt(e.target.value);
        const newSubmissions = MOCK_SUBMISSIONS[id] || [];
        setSelectedAssignmentId(id);
        setSubmissions(newSubmissions);
        setSelectedSubmission(newSubmissions[0] || null);
    };

    const addPredefinedComment = (comment: string) => {
        if(feedbackRef.current) {
            feedbackRef.current.value += `\n- ${comment}`;
        }
    };

    const currentRubric = MOCK_RUBRICS[selectedAssignmentId];

    return (
        <Card>
            {showRubric && currentRubric && <RubricModal rubric={currentRubric} onClose={() => setShowRubric(false)} />}
            <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                <div className="flex items-center">
                    <label htmlFor="assignment-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Tarea:</label>
                    <select id="assignment-select" onChange={handleAssignmentChange} value={selectedAssignmentId} className="block w-full md:w-auto pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        {MOCK_ASSIGNMENTS.map(a => <option key={a.id} value={a.id}>{a.title}</option>)}
                    </select>
                    <HelpTooltip text="Seleccione la tarea para ver y calificar las entregas de los alumnos." />
                </div>
                 <div className="flex items-center space-x-4">
                    {currentRubric && <button onClick={() => setShowRubric(true)} className="text-indigo-600 dark:text-indigo-400 hover:underline">Ver Rúbrica</button>}
                    <label htmlFor="anonymous-grading" className="flex items-center cursor-pointer">
                        <span className="mr-2 text-sm">Calificación Ciega</span>
                        <div className="relative">
                            <input type="checkbox" id="anonymous-grading" className="sr-only" checked={isAnonymous} onChange={() => setIsAnonymous(!isAnonymous)} />
                            <div className={`block w-10 h-6 rounded-full ${isAnonymous ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isAnonymous ? 'translate-x-4' : ''}`}></div>
                        </div>
                    </label>
                 </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[70vh]">
                <div className="lg:col-span-3 bg-gray-50 dark:bg-gray-900/50 p-2 rounded-lg overflow-y-auto">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {submissions.map((sub, index) => (
                           <li key={sub.studentId} onClick={() => setSelectedSubmission(sub)} className={`p-3 cursor-pointer rounded ${selectedSubmission?.studentId === sub.studentId ? 'bg-indigo-100 dark:bg-indigo-900/50' : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'}`}>
                               <div className="flex justify-between items-center">
                                   <p className="font-semibold">{isAnonymous ? `Alumno #${index + 1}` : sub.studentName}</p>
                                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${sub.status === 'Calificada' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{sub.status}</span>
                               </div>
                           </li> 
                        ))}
                    </ul>
                </div>
                <div className="lg:col-span-6 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    {selectedSubmission ? <img src={selectedSubmission.fileUrl} alt="Entrega del alumno" className="max-w-full max-h-full object-contain"/> : <p>Seleccione una entrega</p>}
                </div>
                <div className="lg:col-span-3 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg flex flex-col">
                    {selectedSubmission && <>
                        <h3 className="text-lg font-bold mb-4">{isAnonymous ? `Alumno #${submissions.findIndex(s => s.studentId === selectedSubmission.studentId) + 1}` : selectedSubmission.studentName}</h3>
                        <div>
                            <label htmlFor="grade" className="block text-sm font-medium">Nota</label>
                            <div className="flex items-center">
                                <input type="number" id="grade" defaultValue={selectedSubmission.grade || ''} className="mt-1 block w-20 text-center border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                                <span className="ml-2 text-gray-500">/ 100</span>
                            </div>
                        </div>
                        <div className="mt-4 flex-grow flex flex-col">
                            <label htmlFor="feedback" className="block text-sm font-medium">Feedback y Comentarios</label>
                            <textarea id="feedback" ref={feedbackRef} rows={6} defaultValue={selectedSubmission.feedback} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md flex-grow focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                        </div>
                        <div className="mt-2">
                           <h4 className="text-sm font-semibold mb-1">Banco de Comentarios Rápidos</h4>
                           <div className="flex flex-wrap gap-1">
                               {MOCK_PREDEFINED_COMMENTS.map((c, i) => <button key={i} onClick={() => addPredefinedComment(c)} className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-500">{c}</button>)}
                           </div>
                        </div>
                        <button className="mt-4 w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">Guardar Calificación</button>
                    </>}
                </div>
            </div>
        </Card>
    );
};


const GradebookView = () => {
    const [gradebookItems, setGradebookItems] = useState<GradebookItem[]>(MOCK_GRADEBOOK_ITEMS);

    const categories = useMemo(() => {
        const grouped: { [key: string]: typeof gradebookItems } = {};
        gradebookItems.forEach(item => {
            if (!grouped[item.category]) {
                grouped[item.category] = [];
            }
            grouped[item.category].push(item);
        });
        return grouped;
    }, [gradebookItems]);

    const togglePublished = (itemId: number) => {
        setGradebookItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, isPublished: !item.isPublished } : item
            )
        );
    };

    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold flex items-center">
                    Libro de Calificaciones Ponderado
                    <HelpTooltip text="Las calificaciones de las columnas ocultas (ojo cerrado) no son visibles para los alumnos. Haz clic en el ojo para publicarlas."/>
                </h2>
                <button className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">Crear Tarea Calificable</button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th rowSpan={2} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider sticky left-0 bg-gray-50 dark:bg-gray-700">Alumno</th>
                            {Object.keys(categories).map(cat => (
                                <th key={cat} colSpan={categories[cat].length} className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-l border-r dark:border-gray-600">{cat} ({categories[cat].reduce((acc, item) => acc + item.weight, 0)}%)</th>
                            ))}
                            <th rowSpan={2} className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-l dark:border-gray-600">Nota Final</th>
                        </tr>
                        <tr>
                            {Object.values(categories).flat().map(item => (
                                <th key={item.id} className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    <div className="flex items-center justify-center">
                                        {item.title} ({item.weight}%)
                                        <button onClick={() => togglePublished(item.id)} className="ml-2 text-gray-400 hover:text-indigo-500" title={item.isPublished ? "Ocultar Calificaciones" : "Publicar Calificaciones"}>
                                            <i className={`fa-solid ${item.isPublished ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                                        </button>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {MOCK_STUDENTS.map(student => (
                            <tr key={student.id} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-800/50">
                                <td className="px-6 py-4 whitespace-nowrap font-medium sticky left-0 bg-inherit">{student.name}</td>
                                {Object.values(categories).flat().map(item => (
                                    <td key={item.id} contentEditable="true" className={`px-6 py-4 whitespace-nowrap text-center text-gray-500 dark:text-gray-300 transition-colors ${!item.isPublished ? 'bg-gray-100 dark:bg-gray-700/50' : ''}`}>
                                        {item.isPublished ? (student.grades[item.title] ?? '-') : <span className="italic text-gray-400">Oculto</span>}
                                    </td>
                                ))}
                                <td className="px-6 py-4 whitespace-nowrap text-center font-bold text-indigo-600 dark:text-indigo-400 border-l dark:border-gray-600">
                                    {/* Dummy final grade calculation */}
                                    {student.progress - 10 > 0 ? (student.progress - 10).toFixed(1) : '...'}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

const StudentListView: React.FC<{ onSelectStudent: (id: number) => void }> = ({ onSelectStudent }) => (
    <Card>
         <h2 className="text-xl font-bold mb-4">Lista de Alumnos</h2>
         <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Progreso</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Última Conexión</th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {MOCK_STUDENTS.map(student => (
                        <tr key={student.id} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-800/50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button onClick={() => onSelectStudent(student.id)} className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">{student.name}</button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">{student.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                    <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${student.progress}%` }}></div>
                                </div>
                                <span className="text-sm text-gray-500">{student.progress}%</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">{student.lastConnection}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </Card>
);

const GalleryModerationView = () => ( <Card> <h2 className="text-xl font-bold mb-4">Moderar Galería de Proyectos</h2> <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> {MOCK_GALLERY_PROJECTS.map(project => ( <div key={project.id} className="border dark:border-gray-700 rounded-lg overflow-hidden"> <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" /> <div className="p-4"> <h3 className="font-semibold">{project.title}</h3> <p className="text-sm text-gray-500">{project.studentName}</p> <div className="flex justify-end space-x-2 mt-4"> <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm font-semibold transition-colors">Rechazar</button> <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm font-semibold transition-colors">Aprobar</button> </div> </div> </div> ))} </div> </Card> );
const ForumView = () => ( <div className="space-y-4"> {MOCK_FORUM_POSTS.map(post => ( <Card key={post.id} className="relative"> {post.isPinned && <i className="fa-solid fa-thumbtack absolute top-4 right-4 text-amber-500"></i>} <div className="flex items-start space-x-4"> <img src={post.avatar} alt={post.author} className="w-12 h-12 rounded-full"/> <div> <h3 className="font-bold text-lg">{post.title}</h3> <p className="text-sm text-gray-500">por {post.author}</p> <p className="mt-2">{post.content}</p> </div> </div> <div className="flex justify-between items-center mt-4 pt-4 border-t dark:border-gray-700"> <span className="text-sm text-gray-500">{post.replies} respuestas</span> <div className="space-x-2"> <button className="text-sm text-gray-500 hover:text-indigo-500 transition-colors">Fijar Post</button> <button className="text-sm text-gray-500 hover:text-amber-500 transition-colors">Cerrar Hilo</button> <button className="text-sm text-gray-500 hover:text-red-500 transition-colors">Borrar Post</button> </div> </div> </Card> ))} </div> );

const AnnouncementsView = () => (
    <Card>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Anuncios del Curso</h2>
            <button className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">Crear Nuevo Anuncio</button>
        </div>
        <div className="space-y-4">
            {MOCK_ANNOUNCEMENTS.map(ann => (
                <div key={ann.id} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                     <div className="flex justify-between items-start">
                        <div>
                           <h3 className="font-bold text-lg">{ann.title}</h3>
                           <p className="text-sm text-gray-500">
                               {ann.scheduledDate ? `Programado para: ${new Date(ann.scheduledDate).toLocaleString()}` : `Publicado: ${ann.date}`}
                           </p>
                           <p className="mt-2">{ann.content}</p>
                        </div>
                        <div className="flex space-x-2">
                            <button className="text-gray-500 hover:text-indigo-500 transition-colors"><i className="fa-solid fa-pen"></i></button>
                            <button className="text-gray-500 hover:text-red-500 transition-colors"><i className="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </Card>
);

const CalendarView = () => ( <Card> <div className="flex items-center justify-between mb-4"> <button className="text-gray-500"><i className="fa-solid fa-chevron-left"></i></button> <h2 className="text-xl font-bold">Julio 2024</h2> <button className="text-gray-500"><i className="fa-solid fa-chevron-right"></i></button> </div> <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 border border-gray-200 dark:border-gray-700"> {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => ( <div key={day} className="text-center py-2 bg-gray-100 dark:bg-gray-800 font-semibold">{day}</div> ))} {Array.from({ length: 35 }).map((_, i) => ( <div key={i} className="h-24 bg-white dark:bg-gray-800/50 p-2 relative group hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-colors cursor-pointer"> <span className={`flex items-center justify-center h-8 w-8 ${i < 3 || i > 33 ? 'text-gray-400' : ''} ${i === 25 ? 'bg-indigo-600 text-white rounded-full' : ''}`}>{i-2 > 0 ? i-2 : ''}</span> {i === 22 && <div className="mt-1 text-xs bg-red-500 text-white rounded px-1">Tarea 1</div>} <button className="absolute bottom-2 right-2 w-6 h-6 bg-indigo-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">+</button> </div> ))} </div> </Card> );

// --- NEW ADVANCED VIEWS ---
const QuestionBankView = () => (
    <Card>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Banco de Preguntas</h2>
            <button className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">Añadir Pregunta</button>
        </div>
        <ul className="divide-y dark:divide-gray-700">
            {MOCK_QUESTION_BANK.map(q => (
                <li key={q.id} className="py-3">
                    <p className="font-semibold">{q.text}</p>
                    <p className="text-sm text-gray-500">Tipo: {q.type}, Respuesta: {q.correctAnswer}</p>
                </li>
            ))}
        </ul>
    </Card>
);

const InboxView = () => (
    <Card>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Mensajería Interna</h2>
            <button className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">Nuevo Mensaje</button>
        </div>
        <ul className="divide-y dark:divide-gray-700">
            {MOCK_MESSAGES.map(m => (
                <li key={m.id} className={`py-3 px-2 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 ${!m.isRead ? 'font-bold' : ''}`}>
                    <div className="flex justify-between">
                        <span>{m.from}</span>
                        <span className="text-sm font-normal text-gray-500">{m.timestamp}</span>
                    </div>
                    <p className="font-normal">{m.subject}</p>
                </li>
            ))}
        </ul>
    </Card>
);

const GroupsView = () => {
    const studentMap = useMemo(() => MOCK_STUDENTS.reduce((acc, s) => ({...acc, [s.id]: s }), {} as {[key: number]: Student}), []);
    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Gestión de Grupos</h2>
                <button className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">Crear Grupo</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MOCK_GROUPS.map(g => (
                    <div key={g.id} className="p-4 border dark:border-gray-700 rounded-lg">
                        <h3 className="font-bold">{g.name}</h3>
                        <ul className="mt-2 text-sm">
                            {g.members.map(id => <li key={id} className="flex items-center space-x-2 py-1"><img src={studentMap[id].avatar} className="w-6 h-6 rounded-full" /><span>{studentMap[id].name}</span></li>)}
                        </ul>
                    </div>
                ))}
            </div>
        </Card>
    );
};

const RecycleBinView = () => (
    <Card>
        <h2 className="text-xl font-bold mb-4">Papelera de Reciclaje</h2>
        <p className="text-sm text-gray-500 mb-4">Los elementos se eliminan permanentemente después de 30 días.</p>
        <ul className="divide-y dark:divide-gray-700">
            {MOCK_RECYCLED_ITEMS.map(i => (
                <li key={i.id} className="py-3 flex justify-between items-center">
                    <div>
                        <p><span className="font-semibold">{i.name}</span> ({i.type})</p>
                        <p className="text-sm text-gray-500">Eliminado: {i.deletedDate}</p>
                    </div>
                    <div className="space-x-2">
                        <button className="text-indigo-600 hover:underline text-sm">Restaurar</button>
                        <button className="text-red-500 hover:underline text-sm">Eliminar</button>
                    </div>
                </li>
            ))}
        </ul>
    </Card>
);

const SettingsView = () => {
    const [activeTab, setActiveTab] = useState('curso');
    return (
    <Card>
        <div className="mb-6 border-b dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
                <button onClick={() => setActiveTab('curso')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'curso' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Configuración</button>
                <button onClick={() => setActiveTab('usuarios')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'usuarios' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Usuarios</button>
                <button onClick={() => setActiveTab('fechas')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'fechas' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Gestión de Fechas</button>
                 <button onClick={() => setActiveTab('auditoria')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'auditoria' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Log de Auditoría</button>
            </nav>
        </div>

        {activeTab === 'curso' && (
            <form className="space-y-6">
                 <div> <label htmlFor="course-title" className="block text-sm font-medium">Título del Curso</label> <input type="text" id="course-title" defaultValue="Diseño Asistido por Computadora (CAD)" className="mt-1 block w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/> </div> <div> <label htmlFor="course-description" className="block text-sm font-medium">Descripción del Curso</label> <textarea id="course-description" rows={4} className="mt-1 block w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea> </div> <div> <label className="block text-sm font-medium">Imagen de Portada</label> <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md"> <div className="space-y-1 text-center"> <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg> <div className="flex text-sm text-gray-600 dark:text-gray-400"><label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"><span>Subir un archivo</span><input id="file-upload" name="file-upload" type="file" className="sr-only"/></label><p className="pl-1">o arrastrar y soltar</p></div><p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG hasta 10MB</p> </div> </div> </div> <div className="text-right"> <button type="submit" className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors">Guardar</button> </div>
            </form>
        )}
        {activeTab === 'usuarios' && (
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Gestionar Roles de Usuario</h3>
                    <button className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 text-sm transition-colors">Invitar Usuario</button>
                </div>
                <ul className="divide-y dark:divide-gray-700">
                    {MOCK_USERS.map(user => (
                        <li key={user.id} className="py-3 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <img src={user.avatar} className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="font-semibold">{user.name}</p>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                            </div>
                            <div>
                                <select defaultValue={user.role} className="block w-full pl-3 pr-10 py-1 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                                    <option>Profesor</option>
                                    <option>Co-Profesor</option>
                                    <option>Asistente</option>
                                </select>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )}
        {activeTab === 'fechas' && (
            <div>
                 <h3 className="text-lg font-bold mb-4">Gestión de Fechas de Entrega</h3>
                 <p className="text-sm text-gray-500 mb-4">Actualiza todas las fechas de entrega de tu curso desde un solo lugar.</p>
                 <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Elemento</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha de Entrega Actual</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {MOCK_GRADEBOOK_ITEMS.map(item => (
                            <tr key={item.id}>
                                <td className="px-6 py-4 font-medium">{item.title}</td>
                                <td className="px-6 py-4">
                                    <input type="date" defaultValue={item.dueDate} className="block w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
                 <div className="text-right mt-6">
                    <button type="button" className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors">Guardar Todas las Fechas</button>
                 </div>
            </div>
        )}
        {activeTab === 'auditoria' && (
            <div>
                <h3 className="text-lg font-bold mb-4">Log de Auditoría del Curso</h3>
                <p className="text-sm text-gray-500 mb-4">Registro de acciones importantes realizadas por el equipo docente.</p>
                <ul className="divide-y dark:divide-gray-700">
                    {MOCK_AUDIT_LOG.map(log => (
                        <li key={log.id} className="py-4 flex items-center space-x-3">
                            <img src={log.avatar} alt={log.user} className="w-10 h-10 rounded-full"/>
                            <div>
                                <p className="text-sm">{log.action}</p>
                                <p className="text-xs text-gray-500">
                                    <span className="font-semibold">{log.user}</span> - {log.timestamp}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </Card>
    );
};


// --- SUB-VIEWS ---
const StudentDetailView: React.FC<{ studentId: number; onBack: () => void; }> = ({ studentId, onBack }) => {
    const student = MOCK_STUDENTS.find(s => s.id === studentId);
    if (!student) return null;
    return ( <div> <button onClick={onBack} className="mb-4 text-indigo-600 dark:text-indigo-400 hover:underline"><i className="fa-solid fa-arrow-left mr-2"></i>Volver a la lista</button> <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"> <div className="lg:col-span-1 space-y-6"> <Card> <div className="flex flex-col items-center"> <img src={student.avatar} alt={student.name} className="w-32 h-32 rounded-full mb-4"/> <h2 className="text-2xl font-bold">{student.name}</h2> <p className="text-gray-500">{student.email}</p> </div> </Card> <Card> <h3 className="text-lg font-semibold mb-2">Estadísticas</h3> <p>Progreso Total: <span className="font-bold text-indigo-500">{student.progress}%</span></p> <p>Tareas Entregadas: <span className="font-bold">5/8</span></p> </Card> </div> <div className="lg:col-span-2 space-y-6"> <Card> <h3 className="text-lg font-semibold mb-2">Asistencia Detallada</h3> <ul> {MOCK_MODULES.flatMap(m => m.lessons).map(lesson => ( <li key={lesson.id} className="flex items-center py-1"> {student.completedLessons.includes(lesson.id) ? <i className="fa-solid fa-check-circle text-green-500 w-6"></i> : <i className="fa-solid fa-times-circle text-red-500 w-6"></i> } <span>{lesson.title}</span> </li> ))} </ul> </Card> <Card> <h3 className="text-lg font-semibold mb-2">Calificaciones</h3> <table className="min-w-full"> <tbody> {Object.entries(student.grades).map(([key, value]) => ( <tr key={key} className="border-b dark:border-gray-700"> <td className="py-2 font-medium">{key}</td> <td className="py-2 text-right font-bold">{value !== null ? `${value}/100` : 'Sin calificar'}</td> </tr> ))} </tbody> </table> </Card> </div> </div> </div> );};
const ContentFormView: React.FC<{ onBack: () => void; }> = ({ onBack }) => {
    const [contentType, setContentType] = useState<string>('');
    return ( <div> <button onClick={onBack} className="mb-4 text-indigo-600 dark:text-indigo-400 hover:underline"><i className="fa-solid fa-arrow-left mr-2"></i>Volver a Gestión de Contenido</button> <Card> <h2 className="text-xl font-bold mb-6">Crear / Editar Contenido</h2> <form className="space-y-6"> <div> <label htmlFor="content-title" className="block text-sm font-medium">Título</label> <input type="text" id="content-title" className="mt-1 block w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/> </div> <div> <label htmlFor="content-module" className="block text-sm font-medium">Módulo</label> <select id="content-module" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500"> {MOCK_MODULES.map(m => <option key={m.id}>{m.title}</option>)} </select> </div> <div> <label htmlFor="content-type" className="block text-sm font-medium">Tipo</label> <select id="content-type" value={contentType} onChange={(e) => setContentType(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500"> <option value="">Seleccione un tipo</option> {Object.values(ContentType).map(type => <option key={type} value={type}>{type}</option>)} </select> </div> {contentType === ContentType.Video && ( <div> <label htmlFor="video-url" className="block text-sm font-medium">URL de YouTube</label> <input type="url" id="video-url" placeholder="https://www.youtube.com/watch?v=..." className="mt-1 block w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/> </div> )} {contentType === ContentType.Article && ( <div> <label htmlFor="article-content" className="block text-sm font-medium">Contenido</label> <textarea id="article-content" rows={10} className="mt-1 block w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea> </div> )} {(contentType === ContentType.Assignment || contentType === ContentType.Project) && ( <div className="space-y-4 p-4 border dark:border-gray-700 rounded-md"> <h3 className="font-semibold">{contentType}</h3> <div> <label htmlFor="assignment-instructions" className="block text-sm font-medium">Instrucciones</label> <textarea id="assignment-instructions" rows={5} className="mt-1 block w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea> </div> <div className="grid grid-cols-2 gap-4"> <div> <label htmlFor="assignment-points" className="block text-sm font-medium">Puntos</label> <input type="number" id="assignment-points" defaultValue="100" className="mt-1 block w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/> </div> <div> <label htmlFor="assignment-due-date" className="block text-sm font-medium">Fecha de Entrega</label> <input type="date" id="assignment-due-date" className="mt-1 block w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/> </div> </div> </div> )} <div className="text-right"> <button type="button" onClick={onBack} className="mr-2 bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 font-semibold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors">Cancelar</button> <button type="submit" className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors">Guardar</button> </div> </form> </Card> </div> );};

const App: React.FC = () => {
    const [activeView, setActiveView] = useState<View>(View.Dashboard);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
    const [activeSubView, setActiveSubView] = useState<string | null>(null);

    const handleSelectStudent = (id: number) => {
        setSelectedStudentId(id);
        setActiveSubView(null);
    };

    const handleBack = () => {
        setSelectedStudentId(null);
        setActiveSubView(null);
    };

    const handleSetSubView = (subView: string) => {
        setActiveSubView(subView);
        setSelectedStudentId(null);
    };
    
    const renderContent = useCallback(() => {
        if (selectedStudentId) {
            return <StudentDetailView studentId={selectedStudentId} onBack={handleBack} />;
        }
        if (activeSubView === 'ContentForm') {
            return <ContentFormView onBack={handleBack} />;
        }

        switch (activeView) {
            case View.Dashboard: return <DashboardView />;
            case View.Analytics: return <AnalyticsView />;
            case View.Content: return <ContentManagerView setSubView={handleSetSubView} />;
            case View.SpeedGrader: return <SpeedGraderView />;
            case View.Gradebook: return <GradebookView />;
            case View.Students: return <StudentListView onSelectStudent={handleSelectStudent} />;
            case View.Gallery: return <GalleryModerationView />;
            case View.Forum: return <ForumView />;
            case View.Announcements: return <AnnouncementsView />;
            case View.Calendar: return <CalendarView />;
            case View.Settings: return <SettingsView />;
            // New Views
            case View.QuestionBank: return <QuestionBankView />;
            case View.Inbox: return <InboxView />;
            case View.Groups: return <GroupsView />;
            case View.RecycleBin: return <RecycleBinView />;
            default: return <DashboardView />;
        }
    }, [activeView, selectedStudentId, activeSubView]);

    const getTitle = () => {
      if(selectedStudentId) return "Detalle de Alumno";
      if(activeSubView === 'ContentForm') return "Formulario de Contenido";
      return activeView;
    }

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            <Sidebar activeView={activeView} setActiveView={setActiveView} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title={getTitle()} onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                      {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;
