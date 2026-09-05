export const quizQuestions = [
  {
    id: 1,
    question: "Según Edgar Schein, los supuestos básicos subyacentes son:",
    options: [
      {
        id: "A",
        text: "Normas escritas en el manual de convivencia escolar y decretos institucionales."
      },
      {
        id: "B",
        text: "Creencias inconscientes que operan como premisas invisibles de acción y resistencia."
      },
      {
        id: "C",
        text: "Los recursos tecnológicos y dispositivos físicos disponibles en las aulas."
      },
      {
        id: "D",
        text: "Planes operativos anuales diseñados por el equipo directivo."
      }
    ],
    correctAnswer: "B",
    feedback: {
      correct: "¡Exacto! Los supuestos básicos subyacentes son el nivel más profundo de la cultura escolar. Operan como premisas invisibles, inconscientes y dadas por sentadas, determinando la manera en que los docentes perciben, piensan y reaccionan ante cualquier innovación.",
      incorrect: "Incorrecto. Recuerda la pirámide de Edgar Schein (1985): los manuales y decretos son normas o valores declarados, y la tecnología son artefactos visibles. Los supuestos básicos subyacentes son las creencias inconscientes y profundamente arraigadas que orientan la acción cotidiana."
    },
    reference: "Edgar Schein (1985) - Organizational Culture and Leadership."
  },
  {
    id: 2,
    question: "¿Qué tipología cultural (Cameron y Quinn) sostiene el trabajo en equipo rural?",
    options: [
      {
        id: "A",
        text: "Cultura de Mercado, orientada a la competencia individual y cifras de rentabilidad."
      },
      {
        id: "B",
        text: "Cultura Jerárquica, orientada exclusivamente al control burocrático estricto."
      },
      {
        id: "C",
        text: "Cultura Clan."
      },
      {
        id: "D",
        text: "Cultura de Enclave, basada en la fragmentación y el aislamiento gremial."
      }
    ],
    correctAnswer: "C",
    feedback: {
      correct: "¡Correcto! La confianza mutua y el sentido de comunidad veredal constituyen la base de la cultura clan. En la escuela rural, los lazos de parentesco social, la cohesión comunitaria y la cercanía humana funcionan como una familia extendida.",
      incorrect: "Incorrecto. En el modelo de Valores por Competencia de Cameron y Quinn (1999), la cultura que privilegia la cercanía humana, la moral de equipo, la confianza interpersonal y la lealtad comunitaria es la Cultura Clan."
    },
    reference: "Cameron & Quinn (1999) - Diagnosing and Changing Organizational Culture."
  },
  {
    id: 3,
    question: "En el modelo de Kurt Lewin, la resistencia del docente veterano representa:",
    options: [
      {
        id: "A",
        text: "Una falta disciplinaria grave que debe ser sancionada por la rectoría."
      },
      {
        id: "B",
        text: "Una fuerza restrictiva normal motivada por incertidumbre y necesidad de capacitación."
      },
      {
        id: "C",
        text: "Una fuerza impulsora que dinamiza la transformación tecnológica inmediata."
      },
      {
        id: "D",
        text: "Un síntoma de obsolescencia irreparable que requiere su remoción del aula."
      }
    ],
    correctAnswer: "B",
    feedback: {
      correct: "¡Correcto! La resistencia no es indisciplina ni mala voluntad, sino un síntoma natural y comprensible que demanda acompañamiento andragógico y seguridad psicológica. En el análisis de campo de fuerzas, reducir las fuerzas restrictivas mediante el diálogo es mucho más efectivo que imponer presión directiva.",
      incorrect: "Incorrecto. En el enfoque psicosocial de Kurt Lewin (1951), la resistencia al cambio es una fuerza restrictiva normal provocada por la amenaza percibida a la autoeficacia, el miedo al error y la incertidumbre. Exige andamiaje y liderazgo transformacional, no punición."
    },
    reference: "Kurt Lewin (1951) - Field Theory in Social Science."
  },
  {
    id: 4,
    question: "La fase final para hacer sostenible el cambio cultural en la escuela se denomina:",
    options: [
      {
        id: "A",
        text: "Descongelamiento institucional."
      },
      {
        id: "B",
        text: "Ruptura paradigmática."
      },
      {
        id: "C",
        text: "Recongelamiento."
      },
      {
        id: "D",
        text: "Normalización coactiva."
      }
    ],
    correctAnswer: "C",
    feedback: {
      correct: "¡Exacto! El recongelamiento (o refreezing) implica normalizar e institucionalizar las nuevas prácticas pedagógicas en el PEI, los planes de aula y las rutinas institucionales cotidianas, asegurando que el cambio sea permanente y perdurable.",
      incorrect: "Incorrecto. El modelo tripartito de Lewin comprende: 1) Descongelamiento (desarmar defensas), 2) Movimiento/Transición (probar y aprender), y 3) Recongelamiento (asentar y estabilizar las nuevas pautas como parte natural de la cultura escolar)."
    },
    reference: "Lewin (1951); Guízar Montúfar (2013) - Desarrollo Organizacional."
  }
];

export const rubricLevels = [
  {
    score: 4,
    level: "Nivel Superior Alcanzado",
    description: "Comprende con excelencia la articulación entre cultura y cambio organizacional, identificando los supuestos de Schein, la cultura clan de Cameron & Quinn y la dinámica del campo de fuerzas de Lewin con aplicación directa a la escuela rural."
  },
  {
    score: 3,
    level: "Nivel Alto Alcanzado",
    description: "Comprende la mayoría de los conceptos clave de cultura y cambio organizacional. Se sugiere repasar la distinción entre las fases de transición y recongelamiento para una mayor precisión teórica."
  },
  {
    score: 2,
    level: "Nivel Básico",
    description: "Identifica algunos conceptos fundamentales, pero requiere profundizar en la teoría de Kurt Lewin y en los niveles culturales de Edgar Schein para afianzar el análisis pedagógico."
  },
  {
    score: 1,
    level: "Nivel Inicial / Bajo",
    description: "Presenta dificultades para conectar la teoría con las escenas del cómic. Te invitamos a recorrer de nuevo la secuencia y volver a intentarlo."
  },
  {
    score: 0,
    level: "Sin Respuestas Acreditadas",
    description: "Responde el cuestionario seleccionando una de las alternativas para cada pregunta para conocer tu nivel de apropiación conceptual."
  }
];
