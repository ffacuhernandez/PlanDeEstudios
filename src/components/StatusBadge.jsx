const StatusBadge = ({ status }) => {
    const styles = {
        libre: "bg-gray-700 text-gray-400 border-gray-600",
        regular: "bg-yellow-900/40 text-yellow-400 border-yellow-700/50",
        aprobada: "bg-green-900/40 text-green-400 border-green-700/50"
    };
    
    const labels = {
        libre: "Pendiente",
        regular: "Regularizada",
        aprobada: "Aprobada"
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status]} uppercase tracking-wide`}>
            {labels[status]}
        </span>
    );
};
export default StatusBadge;