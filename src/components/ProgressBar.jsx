const ProgressBar = ({ total, approved }) => {
    const percentage = Math.round((approved / total) * 100);
    return (
        <div className="mb-8 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg transition-colors duration-300">
            <div className="flex justify-between items-end mb-2">
                <div>
                    <h2 className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Progreso de la Carrera</h2>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{percentage}% <span className="text-base font-normal text-gray-500">({approved} de {total} materias)</span></p>
                </div>
                <div className="text-right">
                    <span className="text-xs px-2 py-1 rounded bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">Analista en proceso</span>
                </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-400 h-3 rounded-full transition-all duration-700 ease-out" 
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};
export default ProgressBar;