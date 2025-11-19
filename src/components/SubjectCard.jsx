import React from 'react';
import StatusBadge from './StatusBadge';
import { getSubjectName } from '../utils/helpers';

const SubjectCard = ({ subject, status, onStatusChange, allStates }) => {
    
    const missingForCursar = subject.prerequisites.filter(preId => {
        const preStatus = allStates[preId] || 'libre';
        return preStatus === 'libre';
    });
    const canCursar = missingForCursar.length === 0;

    const missingForAprobar = subject.prerequisites.filter(preId => {
        const preStatus = allStates[preId] || 'libre';
        return preStatus !== 'aprobada';
    });
    const canAprobar = missingForAprobar.length === 0;

    const isLocked = !canCursar && status === 'libre';

    const getTooltipContent = () => {
        if (!canCursar) {
            return (
                <div className="space-y-1">
                    <p className="font-bold text-red-400 mb-1">Bloqueada para Cursar</p>
                    <p className="text-xs text-gray-300">Necesitas regularizar o aprobar:</p>
                    <ul className="list-disc list-inside text-xs text-gray-400">
                        {missingForCursar.map(id => <li key={id}>{getSubjectName(id)}</li>)}
                    </ul>
                </div>
            );
        }
        if (!canAprobar && status !== 'aprobada') {
             return (
                <div className="space-y-1">
                    <p className="font-bold text-yellow-400 mb-1">Bloqueada para Aprobar</p>
                    <p className="text-xs text-gray-300">Necesitas final aprobado de:</p>
                    <ul className="list-disc list-inside text-xs text-gray-400">
                        {missingForAprobar.map(id => <li key={id}>{getSubjectName(id)}</li>)}
                    </ul>
                </div>
            );
        }
        return null;
    };

    return (
        <div className={`relative group transition-all duration-300 ease-in-out p-4 rounded-lg border ${
            status === 'aprobada' ? 'bg-green-900/10 border-green-800/50' : 
            status === 'regular' ? 'bg-yellow-900/10 border-yellow-800/50' : 
            isLocked ? 'bg-gray-800/50 border-gray-800 opacity-60' : 'bg-gray-800 border-gray-700 hover:border-gray-600'
        }`}>
            
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        status === 'aprobada' ? 'bg-green-500 text-white' :
                        status === 'regular' ? 'bg-yellow-500 text-black' :
                        isLocked ? 'bg-gray-700 text-gray-500' : 'bg-gray-600 text-gray-300'
                    }`}>
                        {status === 'aprobada' ? <i className="ph ph-check-fat text-lg"></i> :
                         status === 'regular' ? <i className="ph ph-clock text-lg"></i> :
                         isLocked ? <i className="ph ph-lock-key text-lg"></i> : <i className="ph ph-circle text-lg"></i>}
                    </div>
                    <div>
                        <h3 className={`font-medium text-base ${status === 'aprobada' ? 'text-green-100' : 'text-white'}`}>
                            {subject.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                            <i className="ph ph-clock"></i> {subject.period}
                        </p>
                    </div>
                </div>
                <StatusBadge status={status} />
            </div>

            <div className="mt-4 flex items-center gap-2">
                <div className="flex bg-gray-900 rounded-lg p-1 w-full sm:w-auto">
                    <button
                        onClick={() => onStatusChange(subject.id, 'libre')}
                        className={`flex-1 sm:flex-none px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                            status === 'libre' ? 'bg-gray-700 text-white shadow' : 'text-gray-500 hover:text-gray-300'
                        }`}
                    >
                        Libre
                    </button>
                    <button
                        onClick={() => canCursar && onStatusChange(subject.id, 'regular')}
                        disabled={!canCursar}
                        className={`flex-1 sm:flex-none px-3 py-1.5 rounded text-xs font-medium transition-colors relative ${
                            status === 'regular' ? 'bg-yellow-600 text-white shadow' : 
                            !canCursar ? 'text-gray-700 cursor-not-allowed' : 'text-gray-400 hover:text-yellow-400'
                        }`}
                    >
                        Regular
                        {!canCursar && <i className="ph ph-lock-simple ml-1"></i>}
                    </button>
                    <button
                        onClick={() => canAprobar && onStatusChange(subject.id, 'aprobada')}
                        disabled={!canAprobar}
                        className={`flex-1 sm:flex-none px-3 py-1.5 rounded text-xs font-medium transition-colors relative ${
                            status === 'aprobada' ? 'bg-green-600 text-white shadow' : 
                            !canAprobar ? 'text-gray-700 cursor-not-allowed' : 'text-gray-400 hover:text-green-400'
                        }`}
                    >
                        Aprobada
                        {!canAprobar && <i className="ph ph-lock-simple ml-1"></i>}
                    </button>
                </div>
            </div>

            {(!canCursar || !canAprobar) && (
                <div className="absolute top-2 right-2 group-hover:opacity-100 opacity-0 transition-opacity z-10 pointer-events-none">
                    <div className="bg-gray-900 border border-gray-700 text-gray-300 text-xs rounded p-2 shadow-xl w-64">
                        {getTooltipContent()}
                    </div>
                </div>
            )}
            
            {isLocked && (
                <div className="mt-3 p-2 bg-red-900/20 border border-red-900/30 rounded text-xs text-red-300 flex gap-2 items-start">
                    <i className="ph ph-warning-circle mt-0.5"></i>
                    <span>Requiere correlativas anteriores.</span>
                </div>
            )}
        </div>
    );
};
export default SubjectCard;