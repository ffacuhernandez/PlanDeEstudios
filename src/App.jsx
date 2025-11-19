import { useState, useEffect, useMemo } from 'react';
import { curriculum } from './data/curriculum';
import { groupSubjectsByPeriod } from './utils/helpers';
import SubjectCard from './components/SubjectCard';
import ProgressBar from './components/ProgressBar';

function App() {
    // --- ESTADO DE MATERIAS ---
    const [subjectStates, setSubjectStates] = useState(() => {
        const saved = localStorage.getItem('curriculumTrackerv1');
        return saved ? JSON.parse(saved) : {};
    });

    // --- ESTADO DEL TEMA (OSCURO/CLARO) ---
    const [theme, setTheme] = useState(() => {
        // 1. Revisamos si el usuario ya guardó una preferencia antes
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme;
        // 2. Si no, revisamos la preferencia de su computadora (Windows/Mac)
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
        return 'light'; // Por defecto
    });

    const [expandedYears, setExpandedYears] = useState({ 0: true, 1: false, 2: false });

    // --- EFECTOS (Lo que pasa cuando algo cambia) ---
    
    // Guardar materias automáticamente
    useEffect(() => {
        localStorage.setItem('curriculumTrackerv1', JSON.stringify(subjectStates));
    }, [subjectStates]);

    // Aplicar Tema (La magia del modo oscuro)
    // Esto busca la etiqueta <html> y le pone o saca la clase "dark"
    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    // --- MANEJADORES (Funciones) ---
    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const handleStatusChange = (id, newStatus) => {
        setSubjectStates(prev => ({ ...prev, [id]: newStatus }));
    };

    const toggleYear = (index) => {
        setExpandedYears(prev => ({ ...prev, [index]: !prev[index] }));
    };

    // --- CÁLCULOS ---
    const allSubjects = useMemo(() => curriculum.flatMap(y => y.subjects), []);
    const totalSubjects = allSubjects.length;
    const approvedSubjects = allSubjects.filter(s => (subjectStates[s.id] === 'aprobada')).length;

    return (
        // El div principal ahora tiene colores dinámicos (bg-gray-50 vs dark:bg-gray-900)
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300 text-gray-900 dark:text-gray-100 relative">
            
            {/* --- BOTÓN FLOTANTE PARA EL TEMA (SOL/LUNA) --- */}
            <button 
                onClick={toggleTheme}
                className="fixed top-4 right-4 z-50 p-3 rounded-full shadow-xl bg-white dark:bg-gray-800 text-amber-500 dark:text-blue-400 border border-gray-200 dark:border-gray-700 hover:scale-110 transition-transform duration-200"
                title="Cambiar tema"
            >
                {theme === 'dark' ? (
                    <i className="ph-fill ph-sun text-xl"></i>
                ) : (
                    <i className="ph-fill ph-moon-stars text-xl"></i>
                )}
            </button>

            <div className="max-w-3xl mx-auto w-full px-4 py-10 flex flex-col flex-grow">
                
                {/* --- ENCABEZADO --- */}
                <div className="mb-8 text-center">
                    <p className="text-blue-600 dark:text-blue-400 text-sm font-bold tracking-widest uppercase mb-2">Plan de Estudios · UADER FCyT</p>
                    <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-gray-900 dark:text-white">
                        Licenciatura en <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500">Sistemas</span>
                    </h1>
                </div>
                
                {/* --- BARRA DE PROGRESO --- */}
                <ProgressBar total={totalSubjects} approved={approvedSubjects} />

                {/* --- LISTA DE AÑOS Y MATERIAS --- */}
                <div className="space-y-6 flex-grow">
                    {curriculum.map((yearGroup, idx) => {
                        const periods = groupSubjectsByPeriod(yearGroup.subjects);
                        const isExpanded = expandedYears[idx];
                        
                        const yearTotal = yearGroup.subjects.length;
                        const yearApproved = yearGroup.subjects.filter(s => subjectStates[s.id] === 'aprobada').length;
                        const isYearComplete = yearTotal === yearApproved;

                        return (
                            <div key={idx} className="bg-white dark:bg-gray-900/50 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm dark:shadow-none transition-colors duration-300">
                                <button 
                                    onClick={() => toggleYear(idx)}
                                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-100 dark:border-gray-800"
                                >
                                    <div className="flex items-center gap-3">
                                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">{yearGroup.year}</h2>
                                        {isYearComplete ? (
                                            <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400 text-xs font-bold rounded border border-green-200 dark:border-green-800">COMPLETO</span>
                                        ) : (
                                            <span className="text-gray-500 text-sm font-normal">
                                                {yearApproved}/{yearTotal} materias
                                            </span>
                                        )}
                                    </div>
                                    <i className={`ph ph-caret-down text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}></i>
                                </button>

                                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="p-4 space-y-6">
                                        {Object.entries(periods).map(([periodName, subjects]) => (
                                            subjects.length > 0 && (
                                                <div key={periodName}>
                                                    <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 pl-1 border-l-2 border-gray-300 dark:border-gray-700">
                                                        {periodName}
                                                    </h3>
                                                    <div className="grid gap-4">
                                                        {subjects.map(subject => (
                                                            <SubjectCard 
                                                                key={subject.id} 
                                                                subject={subject} 
                                                                status={subjectStates[subject.id] || 'libre'}
                                                                allStates={subjectStates}
                                                                onStatusChange={handleStatusChange}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* --- FOOTER --- */}
                <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800/50 text-center">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} Diseñado y desarrollado por 
                        <a 
                            href="https://github.com/ffacuhernandez" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-500 dark:hover:text-blue-300 transition-colors ml-1"
                        >
                            ffacuhernandez
                        </a>
                    </p>
                    <p className="text-gray-400 dark:text-gray-600 text-xs mt-2 flex justify-center items-center gap-1">
                        Hecho con todo el amor para los sistematicos ❤️‍🔥
                    </p>
                </footer>
            </div>
        </div>
    );
}

export default App;