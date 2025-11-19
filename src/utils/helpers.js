import { curriculum } from '../data/curriculum';

export const getSubjectName = (id) => {
    for (const year of curriculum) {
        const found = year.subjects.find(s => s.id === id);
        if (found) return found.name;
    }
    return id;
};

export const groupSubjectsByPeriod = (subjects) => {
    const periods = { "Anual": [], "1er Cuatrimestre": [], "2do Cuatrimestre": [] };
    subjects.forEach(s => {
        if (periods[s.period]) periods[s.period].push(s);
        else periods[s.period] = [s]; 
    });
    return periods;
};