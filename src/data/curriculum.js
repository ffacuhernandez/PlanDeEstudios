export const curriculum = [
  {
    year: "Primer Año",
    subjects: [
      { id: "analisis1", name: "Cálculo Diferencial e Integral", period: "Anual", requiredFor: ["ecuaciones", "proba"], prerequisites: [] },
      { id: "sistemas", name: "Sistemas y Organizaciones", period: "Anual", requiredFor: ["ingSoft1"], prerequisites: [] },
      { id: "fundamentos", name: "Fundamentos de Programación", period: "Anual", requiredFor: ["ingSoft1", "algoritmos", "poo", "arquitectura", "optativa1"], prerequisites: [] },
      { id: "logica", name: "Lógica y Álgebra", period: "Anual", requiredFor: ["algoritmos", "discreta"], prerequisites: [] },
      { id: "ingles", name: "Lecto - Comprensión en Inglés", period: "Anual", requiredFor: ["poo", "optativa1"], prerequisites: [] },
      { id: "ddhh", name: "Derechos Humanos y Tecnología", period: "1er Cuatrimestre", requiredFor: ["etica"], prerequisites: [] },
      { id: "fundComputacion", name: "Fundamentos de Computación", period: "2do Cuatrimestre", requiredFor: ["poo", "arquitectura", "optativa1"], prerequisites: [] }
    ]
  },
  {
    year: "Segundo Año",
    subjects: [
      { id: "ecuaciones", name: "Ecuaciones Diferenciales y Cálculo Multivariado", period: "1er Cuatrimestre", requiredFor: ["proba"], prerequisites: ["analisis1"] },
      { id: "ingSoft1", name: "Ingeniería de Software I", period: "Anual", requiredFor: ["ingSoft2", "etica", "optativa2", "taller"], prerequisites: ["sistemas", "fundamentos"] },
      { id: "algoritmos", name: "Algoritmos y Estructuras de Datos", period: "Anual", requiredFor: ["ingSoft2", "bd", "so", "paradigmas", "progAvanzada", "optativa2", "taller"], prerequisites: ["fundamentos", "logica"] },
      { id: "poo", name: "Programación Orientada a Objetos", period: "Anual", requiredFor: ["ingSoft2", "bd", "paradigmas", "progAvanzada", "optativa2", "taller"], prerequisites: ["fundamentos", "ingles", "fundComputacion"] },
      { id: "discreta", name: "Matemática Discreta", period: "Anual", requiredFor: ["bd", "so", "proba", "taller"], prerequisites: ["logica"] },
      { id: "arquitectura", name: "Arquitectura de Computadoras", period: "2do Cuatrimestre", requiredFor: ["so", "paradigmas", "taller"], prerequisites: ["fundamentos", "fundComputacion"] },
      { id: "optativa1", name: "Optativa I", period: "2do Cuatrimestre", requiredFor: ["taller"], prerequisites: ["fundamentos", "ingles", "fundComputacion"] }
    ]
  },
  {
    year: "Tercer Año (Título: Analista de Sistemas)",
    subjects: [
      { id: "optativa2", name: "Optativa II", period: "1er Cuatrimestre", requiredFor: [], prerequisites: ["ingSoft1", "algoritmos", "poo"] },
      { id: "etica", name: "Ética Profesional", period: "1er Cuatrimestre", requiredFor: [], prerequisites: ["ddhh", "ingSoft1"] },
      { id: "ingSoft2", name: "Ingeniería de Software II", period: "Anual", requiredFor: ["taller"], prerequisites: ["ingSoft1", "algoritmos", "poo"] },
      { id: "bd", name: "Bases de Datos", period: "Anual", requiredFor: ["progAvanzada", "taller"], prerequisites: ["algoritmos", "poo", "discreta"] },
      { id: "so", name: "Sistemas Operativos", period: "Anual", requiredFor: ["taller"], prerequisites: ["algoritmos", "discreta", "arquitectura"] },
      { id: "proba", name: "Probabilidad y Estadística", period: "Anual", requiredFor: ["taller"], prerequisites: ["discreta", "ecuaciones"] },
      { id: "progAvanzada", name: "Programación Avanzada", period: "2do Cuatrimestre", requiredFor: ["taller"], prerequisites: ["algoritmos", "poo"] },
      { id: "paradigmas", name: "Paradigmas y Lenguajes", period: "2do Cuatrimestre", requiredFor: ["taller"], prerequisites: ["algoritmos", "poo", "arquitectura"] },
      { id: "taller", name: "Taller de Integración", period: "2do Cuatrimestre", requiredFor: [], prerequisites: ["ingSoft2", "bd", "so", "proba", "paradigmas", "etica", "progAvanzada", "optativa1", "optativa2"] }
    ]
  }
];