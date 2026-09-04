export const comicStrips = [
  {
    id: 1,
    act: "Acto 1",
    title: "La Tradición y la Cultura Clan",
    subtitle: "Artefactos visibles, rutinas arraigadas y la escuela como familia",
    image: "/tira-1.jpg",
    fallbackImage: "/1.jpg",
    alt: "Tira cómica 1: Docente Laura y Profesor Jorge conversando sobre la cultura de cercanía, tiza y tablero en la escuela rural multigrado, cuando la rectora plantea la necesidad de avanzar.",
    sceneDescription: "En el aula multigrado de la escuela rural, los docentes reflexionan sobre su identidad pedagógica antes de que se plantee la necesidad de una transformación.",
    dialogues: [
      {
        speaker: "Docente Laura",
        role: "Docente de aula",
        text: "En nuestra escuela rural, educar siempre ha sido cercanía, tiza y tablero.",
        tone: "Serena, nostálgica y reflexiva frente al pizarrón."
      },
      {
        speaker: "Profesor Jorge",
        role: "Docente veterano",
        text: "Aquí somos como una familia... Esa es nuestra cultura.",
        tone: "Cálido, protector y convencido de la tradición comunitaria."
      },
      {
        speaker: "Rectora Carmen",
        role: "Líder directiva",
        text: "Compartimos valores y rutinas... pero el entorno nos exige avanzar.",
        tone: "Visionaria, empática pero firme sobre los retos del contexto."
      },
      {
        speaker: "Profesor Jorge",
        role: "Docente veterano",
        text: "¿Avanzar hacia dónde, rectora?",
        tone: "Inquieto, con gesto de incertidumbre y cautela ante lo desconocido."
      }
    ],
    panoramicView: {
      title: "Plano General Panorámico",
      x: 50,
      y: 50,
      zoom: 1.0,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
    },
    panels: [
      {
        id: 1,
        dialogueIndex: 0,
        title: "La Tradición y el Pizarrón",
        speaker: "Docente Laura",
        role: "Docente de aula",
        text: "En nuestra escuela rural, educar siempre ha sido cercanía, tiza y tablero.",
        tone: "Serena, nostálgica y reflexiva frente al pizarrón.",
        x: 25.3,
        y: 25.3,
        zoom: 1.8,
        rotateX: 1.5,
        rotateY: -2.5,
        rotateZ: -0.5
      },
      {
        id: 2,
        dialogueIndex: 1,
        title: "La Escuela como Familia",
        speaker: "Profesor Jorge",
        role: "Docente veterano",
        text: "Aquí somos como una familia... Esa es nuestra cultura.",
        tone: "Cálido, protector y convencido de la tradición comunitaria.",
        x: 74.3,
        y: 25.3,
        zoom: 1.8,
        rotateX: 1.5,
        rotateY: 2.5,
        rotateZ: 0.5
      },
      {
        id: 3,
        dialogueIndex: 2,
        title: "La Demanda del Entorno",
        speaker: "Rectora Carmen",
        role: "Líder directiva",
        text: "Compartimos valores y rutinas... pero el entorno nos exige avanzar.",
        tone: "Visionaria, empática pero firme sobre los retos del contexto.",
        x: 25.3,
        y: 75.3,
        zoom: 1.8,
        rotateX: -1.5,
        rotateY: -2.5,
        rotateZ: 0.5
      },
      {
        id: 4,
        dialogueIndex: 3,
        title: "Incertidumbre Docente",
        speaker: "Profesor Jorge",
        role: "Docente veterano",
        text: "¿Avanzar hacia dónde, rectora?",
        tone: "Inquieto, con gesto de incertidumbre y cautela ante lo desconocido.",
        x: 74.3,
        y: 75.3,
        zoom: 1.8,
        rotateX: -1.5,
        rotateY: 2.5,
        rotateZ: -0.5
      }
    ],
    narrationScript: "Tira cómica número uno: La Tradición y la Cultura Clan. En el aula de la escuela rural, la profesora Laura contempla el pizarrón y afirma: 'En nuestra escuela rural, educar siempre ha sido cercanía, tiza y tablero'. A su lado, el profesor Jorge, con más de dos décadas de trayectoria, refuerza con convicción: 'Aquí somos como una familia... Esa es nuestra cultura'. Entonces interviene la rectora Carmen, señalando: 'Compartimos valores y rutinas... pero el entorno nos exige avanzar'. Con evidente preocupación e incertidumbre, el profesor Jorge le pregunta: '¿Avanzar hacia dónde, rectora?'.",
    theory: {
      author: "Edgar Schein (1985) & Cameron y Quinn (1999)",
      title: "Artefactos Visibles y Tipología de Cultura Clan",
      keyConcepts: ["Artefactos y Creaciones", "Supuestos Básicos Subyacentes", "Cultura Clan", "Cohesión Comunitaria"],
      summary: "La primera tira retrata el nivel más evidente y el nivel más profundo de la cultura escolar rural, así como el modelo relacional que le da sentido.",
      breakdown: [
        {
          concept: "Artefactos Visibles (Edgar Schein, 1985)",
          description: "Constituyen el primer nivel visible de la cultura: el pizarrón verde, la tiza, el mobiliario del aula multigrado, la disposición física y los rituales cotidianos de saludo y cercanía. Aunque son fácilmente perceptibles, su verdadero significado solo se comprende al indagar los niveles más profundos de la organización."
        },
        {
          concept: "Supuestos Básicos Subyacentes (Schein)",
          description: "Premisas inconscientes asumidas como verdades absolutas por el colectivo docente: 'la verdadera enseñanza rural solo existe cuando hay presencia física y mediación con tiza y tablero'. Cualquier intento de cambio que amenace este supuesto genera resistencia no consciente."
        },
        {
          concept: "Cultura Clan (Cameron & Quinn, 1999)",
          description: "La escuela rural pública opera como una extensión del hogar y de la vereda: prevalecen la lealtad, la confianza mutua, el trabajo en equipo, la moral comunitaria y el sentido de pertenencia ('Aquí somos como una familia'). La toma de decisiones está mediada por la empatía y la historia compartida."
        },
        {
          concept: "Desafío de Gestión",
          description: "Cualquier proceso de modernización o transformación no puede entrar a demoler la cultura clan; debe enraizarse en su afecto y cohesión para tener viabilidad."
        }
      ],
      quote: "«La cultura organizacional es el patrón de supuestos básicos que un grupo aprende a medida que resuelve sus problemas de adaptación externa e integración interna.» — Edgar Schein"
    }
  },
  {
    id: 2,
    act: "Acto 2",
    title: "El Choque y las Fuerzas Restrictivas",
    subtitle: "Dotación tecnológica ministerial vs. miedo a la obsolescencia y el error",
    image: "/tira-2.jpg",
    fallbackImage: "/2.jpg",
    alt: "Tira cómica 2: La rectora entrega tabletas electrónicas; el profesor Jorge siente miedo e impotencia al experimentar un mensaje de ERROR en la pantalla.",
    sceneDescription: "La llegada inesperada de dispositivos tecnológicos altera el equilibrio homeostático de la institución, detonando ansiedad técnica en los docentes de mayor antigüedad.",
    dialogues: [
      {
        speaker: "Rectora Carmen",
        role: "Líder directiva",
        text: "El ministerio envió estas tabletas para innovar en el aula.",
        tone: "Entusiasta al presentar la caja con los dispositivos."
      },
      {
        speaker: "Profesor Jorge",
        role: "Docente veterano",
        text: "¿Tabletas? Llevo 25 años con tiza. Esto me da miedo. No sabré usarlas.",
        tone: "Angustiado, con los brazos cruzados y actitud defensiva."
      },
      {
        speaker: "Docente Laura",
        role: "Docente de aula",
        text: "Jorge, el cambio no borra tu experiencia. Quizás podemos aprender juntos.",
        tone: "Solidaria, colocando una mano fraternal en su hombro."
      },
      {
        speaker: "Rectora Carmen",
        role: "Líder directiva",
        text: "Es una oportunidad, no una amenaza. Debemos intentarlo por los estudiantes.",
        tone: "Motivadora, intentando persuadir desde la misión educativa."
      },
      {
        speaker: "Profesor Jorge",
        role: "Docente veterano",
        text: "Esto es imposible. ¡Lo sabía!",
        tone: "Frustrado e impotente al ver la palabra ERROR en el monitor de la tableta."
      }
    ],
    panoramicView: {
      title: "Plano General Panorámico",
      x: 50,
      y: 50,
      zoom: 1.0,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
    },
    panels: [
      {
        id: 1,
        dialogueIndex: 0,
        title: "La Dotación Ministerial",
        speaker: "Rectora Carmen",
        role: "Líder directiva",
        text: "El ministerio envió estas tabletas para innovar en el aula.",
        tone: "Entusiasta al presentar la caja con los dispositivos.",
        x: 17.3,
        y: 25.6,
        zoom: 2.1,
        rotateX: 2.0,
        rotateY: -3.0,
        rotateZ: -0.6
      },
      {
        id: 2,
        dialogueIndex: 1,
        title: "El Miedo a la Obsolescencia",
        speaker: "Profesor Jorge",
        role: "Docente veterano",
        text: "¿Tabletas? Llevo 25 años con tiza. Esto me da miedo. No sabré usarlas.",
        tone: "Angustiado, con los brazos cruzados y actitud defensiva.",
        x: 49.6,
        y: 25.6,
        zoom: 2.1,
        rotateX: 2.0,
        rotateY: 0,
        rotateZ: 0.4
      },
      {
        id: 3,
        dialogueIndex: 2,
        title: "Solidaridad y Apoyo Entre Pares",
        speaker: "Docente Laura",
        role: "Docente de aula",
        text: "Jorge, el cambio no borra tu experiencia. Quizás podemos aprender juntos.",
        tone: "Solidaria, colocando una mano fraternal en su hombro.",
        x: 82.3,
        y: 25.6,
        zoom: 2.1,
        rotateX: 2.0,
        rotateY: 3.0,
        rotateZ: -0.5
      },
      {
        id: 4,
        dialogueIndex: 3,
        title: "Oportunidad y Sentido",
        speaker: "Rectora Carmen",
        role: "Líder directiva",
        text: "Es una oportunidad, no una amenaza. Debemos intentarlo por los estudiantes.",
        tone: "Motivadora, intentando persuadir desde la misión educativa.",
        x: 49.6,
        y: 75.5,
        zoom: 2.1,
        rotateX: -2.0,
        rotateY: 0,
        rotateZ: 0.5
      },
      {
        id: 5,
        dialogueIndex: 4,
        title: "El Error y la Confirmación del Temor",
        speaker: "Profesor Jorge",
        role: "Docente veterano",
        text: "Esto es imposible. ¡Lo sabía!",
        tone: "Frustrado e impotente al ver la palabra ERROR en el monitor de la tableta.",
        x: 82.3,
        y: 75.5,
        zoom: 2.1,
        rotateX: -2.0,
        rotateY: 3.0,
        rotateZ: -0.8
      }
    ],
    narrationScript: "Tira cómica número dos: El Choque y las Fuerzas Restrictivas. La rectora Carmen muestra una nueva tableta electrónica y anuncia: 'El ministerio envió estas tabletas para innovar en el aula'. El profesor Jorge, cruzándose de brazos, responde alarmado: '¿Tabletas? Llevo veinticinco años con tiza. Esto me da miedo. No sabré usarlas'. Laura lo reconforta diciendo: 'Jorge, el cambio no borra tu experiencia. Quizás podemos aprender juntos'. La rectora insiste con optimismo: 'Es una oportunidad, no una amenaza. Debemos intentarlo por los estudiantes'. Sin embargo, al tocar el dispositivo aparece un letrero de ERROR, y Jorge exclama descorazonado: 'Esto es imposible. ¡Lo sabía!'.",
    theory: {
      author: "Kurt Lewin (1951) - Campo de Fuerzas",
      title: "Campo de Fuerzas: Fuerzas Impulsoras vs. Fuerzas Restrictivas",
      keyConcepts: ["Fuerzas Impulsoras (Driving Forces)", "Fuerzas Restrictivas (Restraining Forces)", "Equilibrio Cuasi-Estacionario", "Resistencia Psicológica"],
      summary: "La escena ejemplifica la tensión dialéctica de Lewin entre una fuerza externa que empuja hacia el cambio y las resistencias internas que buscan preservar el equilibrio anterior.",
      breakdown: [
        {
          concept: "Fuerzas Impulsoras Externas (+)",
          description: "La dotación ministerial de herramientas digitales, las exigencias curriculares nacionales y la demanda contemporánea de competencias TIC actúan como presiones exógenas que rompen la inercia institucional."
        },
        {
          concept: "Fuerzas Restrictivas Internas (-)",
          description: "El miedo al ridículo y al error profesional, la amenaza percibida a la autoeficacia pedagógica de 25 años, y la falta de formación previa generan barreras psicológicas y culturales ('No sabré usarlas')."
        },
        {
          concept: "El Mensaje de ERROR como Disparador Simbólico",
          description: "La pantalla de fallo no es un simple incidente técnico; representa la confirmación del sesgo de confirmación del profesor Jorge ('¡Lo sabía!'), reafirmando su creencia de que la tecnología invalida su saber pedagógico acumulado."
        },
        {
          concept: "Principio de Kurt Lewin",
          description: "Aumentar la presión de las fuerzas impulsoras (imponer más tabletas o exigir resultados a la fuerza) solo incrementa la resistencia y la tensión destructiva. El cambio efectivo requiere debilitar las fuerzas restrictivas."
        }
      ],
      quote: "«Un sistema social se encuentra en un estado de equilibrio cuasi-estacionario; para cambiarlo se debe alterar el balance entre las fuerzas que impulsan el cambio y las que lo resisten.» — Kurt Lewin"
    }
  },
  {
    id: 3,
    act: "Acto 3",
    title: "El Descongelamiento y el Liderazgo Coactivo vs. Mediador",
    subtitle: "Co-enseñanza entre pares, empatía directiva y reducción de la ansiedad",
    image: "/tira-3.jpg",
    fallbackImage: "/3.jpg",
    alt: "Tira cómica 3: Laura y la rectora Carmen se sientan junto a Jorge para acompañarlo paso a paso, logrando que dibuje una carita feliz en la pantalla.",
    sceneDescription: "El equipo directivo y docente cambia la estrategia: en vez de imponer el uso del dispositivo, ofrecen acompañamiento andragógico y co-enseñanza horizontal.",
    dialogues: [
      {
        speaker: "Docente Laura",
        role: "Docente de aula",
        text: "No podemos imponer esto. Jorge necesita apoyo, no presión. Cambiemos la estrategia.",
        tone: "Crítica constructiva y orientadora hacia la dirección escolar."
      },
      {
        speaker: "Rectora Carmen",
        role: "Líder transformacional",
        text: "Jorge, ¿y si trabajamos juntos? Tú pones la experiencia pedagógica y yo te ayudo con la tableta.",
        tone: "Humilde, accesible y facilitadora de alianzas."
      },
      {
        speaker: "Rectora Carmen",
        role: "Líder transformacional",
        text: "Mira, es como el pizarrón, pero digital. Vamos paso a paso. ¿Ves este ícono?",
        tone: "Didáctica y paciente, desmitificando la dificultad."
      },
      {
        speaker: "Profesor Jorge",
        role: "Docente veterano",
        text: "¡Ah! ¡Pude dibujar algo! No explotó.",
        tone: "Sorprendido y aliviado, mirando una carita feliz en la tableta."
      },
      {
        speaker: "Docente Laura",
        role: "Docente de aula",
        text: "El verdadero cambio no es la tecnología, es la gente trabajando unida y perdiendo el miedo.",
        tone: "Iluminadora, contemplando el poder de la mediación humana."
      }
    ],
    panoramicView: {
      title: "Plano General Panorámico",
      x: 50,
      y: 50,
      zoom: 1.0,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
    },
    panels: [
      {
        id: 1,
        dialogueIndex: 0,
        title: "Replanteamiento Estratégico",
        speaker: "Docente Laura",
        role: "Docente de aula",
        text: "No podemos imponer esto. Jorge necesita apoyo, no presión. Cambiemos la estrategia.",
        tone: "Crítica constructiva y orientadora hacia la dirección escolar.",
        x: 17.3,
        y: 25.6,
        zoom: 2.1,
        rotateX: 2.0,
        rotateY: -3.0,
        rotateZ: -0.5
      },
      {
        id: 2,
        dialogueIndex: 1,
        title: "Alianza Pedagógica Horizontal",
        speaker: "Rectora Carmen",
        role: "Líder transformacional",
        text: "Jorge, ¿y si trabajamos juntos? Tú pones la experiencia pedagógica y yo te ayudo con la tableta.",
        tone: "Humilde, accesible y facilitadora de alianzas.",
        x: 49.6,
        y: 25.6,
        zoom: 2.1,
        rotateX: 2.0,
        rotateY: 0,
        rotateZ: 0.5
      },
      {
        id: 3,
        dialogueIndex: 2,
        title: "Puente Metafórico: Tiza Digital",
        speaker: "Rectora Carmen",
        role: "Líder transformacional",
        text: "Mira, es como el pizarrón, pero digital. Vamos paso a paso. ¿Ves este ícono?",
        tone: "Didáctica y paciente, desmitificando la dificultad.",
        x: 82.3,
        y: 25.6,
        zoom: 2.1,
        rotateX: 2.0,
        rotateY: 3.0,
        rotateZ: -0.5
      },
      {
        id: 4,
        dialogueIndex: 3,
        title: "El Descongelamiento Emocional",
        speaker: "Profesor Jorge",
        role: "Docente veterano",
        text: "¡Ah! ¡Pude dibujar algo! No explotó.",
        tone: "Sorprendido y aliviado, mirando una carita feliz en la tableta.",
        x: 49.6,
        y: 75.5,
        zoom: 2.1,
        rotateX: -2.0,
        rotateY: 0,
        rotateZ: 0.6
      },
      {
        id: 5,
        dialogueIndex: 4,
        title: "La Esencia Humana del Cambio",
        speaker: "Docente Laura",
        role: "Docente de aula",
        text: "El verdadero cambio no es la tecnología, es la gente trabajando unida y perdiendo el miedo.",
        tone: "Iluminadora, contemplando el poder de la mediación humana.",
        x: 82.3,
        y: 75.5,
        zoom: 2.1,
        rotateX: -2.0,
        rotateY: 3.0,
        rotateZ: -0.5
      }
    ],
    narrationScript: "Tira cómica número tres: El Descongelamiento y la Co-enseñanza. Tras el momento de angustia, la docente Laura le sugiere a la rectora: 'No podemos imponer esto. Jorge necesita apoyo, no presión. Cambiemos la estrategia'. La rectora Carmen escucha con sabiduría, se sienta junto a Jorge y le propone: 'Jorge, ¿y si trabajamos juntos? Tú pones la experiencia pedagógica y yo te ayudo con la tableta. Mira, es como el pizarrón, pero digital. Vamos paso a paso. ¿Ves este ícono?'. Jorge se atreve a pulsar la pantalla y sonríe asombrado: '¡Ah! ¡Pude dibujar algo! No explotó'. Desde la puerta, Laura concluye con emoción: 'El verdadero cambio no es la tecnología, es la gente trabajando unida y perdiendo el miedo'.",
    theory: {
      author: "Kurt Lewin (1951) & Pérez Uribe (2018)",
      title: "Estrategia de Descongelamiento y Liderazgo Transformacional",
      keyConcepts: ["Descongelamiento (Unfreezing)", "Liderazgo No Coactivo", "Co-enseñanza entre Pares", "Seguridad Psicológica"],
      summary: "Muestra cómo el cambio cultural se vuelve factible cuando los líderes reducen las fuerzas restrictivas brindando acompañamiento seguro y valorando el saber previo.",
      breakdown: [
        {
          concept: "Fase 1: Descongelamiento (Kurt Lewin, 1951)",
          description: "Consiste en desarticular las certezas y defensas iniciales mediante la creación de un entorno de seguridad psicológica. Se ayuda al individuo a reconocer que aprender algo nuevo no descalifica su trayectoria pasada."
        },
        {
          concept: "Liderazgo Transformacional y No Coactivo (Pérez Uribe, 2018)",
          description: "La rectora Carmen no ejerce poder jerárquico sancionador ni emite circulares punitivas. En su lugar, practica un liderazgo servidor: modela la conducta, escucha la advertencia de Laura y co-crea una solución compartida."
        },
        {
          concept: "Co-enseñanza y Andamiaje Intergeneracional",
          description: "Se produce una sinergia pedagógica perfecta: el docente veterano aporta la pedagogía contextualizada y la docente joven aporta la fluidez instrumental. Ambos son maestros y aprendices al mismo tiempo."
        },
        {
          concept: "Resignificación del Artefacto",
          description: "La frase 'es como el pizarrón, pero digital' enlaza el nuevo artefacto (tableta) con el artefacto cultural histórico y familiar (tablero), tendiendo un puente cognitivo que disminuye el estrés."
        }
      ],
      quote: "«El liderazgo estratégico transformacional en educación no consiste en forzar obediencia, sino en construir capacidades colectivas basadas en la confianza y el sentido compartido.» — Pérez Uribe (2018)"
    }
  },
  {
    id: 4,
    act: "Acto 4",
    title: "La Transición y la Cultura Adhocrática",
    subtitle: "Experimentación protegida en el aula y metamorfosis del miedo en curiosidad",
    image: "/tira-4.jpg",
    fallbackImage: "/4.jpg",
    alt: "Tira cómica 4: El profesor Jorge abre una presentación interactiva por sí mismo; Laura celebra su avance y destaca que el cambio empieza por uno mismo.",
    sceneDescription: "Durante la etapa de movimiento o cambio, el profesor Jorge experimenta con autonomía guiada, reconfigurando su rol pedagógico.",
    dialogues: [
      {
        speaker: "Profesor Jorge",
        role: "Docente empoderado",
        text: "¡Mira Laura! Pude abrir una presentación. No era tan difícil.",
        tone: "Orgulloso, entusiasmado señalando la pantalla que dice 'MI CLASE'."
      },
      {
        speaker: "Docente Laura",
        role: "Docente de aula",
        text: "¡Excelente, Jorge! Tu experiencia es la clave. La tecnología solo es la herramienta.",
        tone: "Alentadora, con pulgar arriba y convicción pedagógica."
      },
      {
        speaker: "Docente Laura",
        role: "Docente de aula",
        text: "El miedo se está transformando en curiosidad. Eso es el cambio cultural.",
        tone: "Reflexiva, presenciando la transición cognitiva y anímica de su compañero."
      },
      {
        speaker: "Rectora Carmen",
        role: "Líder directiva",
        text: "¡Muy bien, Jorge! Tu ejemplo inspirará a toda la escuela. El cambio empieza por nosotros.",
        tone: "Inspiradora y con visión comunitaria expansiva."
      }
    ],
    panoramicView: {
      title: "Plano General Panorámico",
      x: 50,
      y: 50,
      zoom: 1.0,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
    },
    panels: [
      {
        id: 1,
        dialogueIndex: 0,
        title: "Autonomía e Iniciativa",
        speaker: "Profesor Jorge",
        role: "Docente empoderado",
        text: "¡Mira Laura! Pude abrir una presentación. No era tan difícil.",
        tone: "Orgulloso, entusiasmado señalando la pantalla que dice 'MI CLASE'.",
        x: 17.3,
        y: 25.6,
        zoom: 2.1,
        rotateX: 2.0,
        rotateY: -3.0,
        rotateZ: -0.5
      },
      {
        id: 2,
        dialogueIndex: 1,
        title: "La Tecnología como Herramienta",
        speaker: "Docente Laura",
        role: "Docente de aula",
        text: "¡Excelente, Jorge! Tu experiencia es la clave. La tecnología solo es la herramienta.",
        tone: "Alentadora, con pulgar arriba y convicción pedagógica.",
        x: 49.6,
        y: 25.6,
        zoom: 2.1,
        rotateX: 2.0,
        rotateY: 0,
        rotateZ: 0.5
      },
      {
        id: 3,
        dialogueIndex: 2,
        title: "Metamorfosis: Miedo a Curiosidad",
        speaker: "Docente Laura",
        role: "Docente de aula",
        text: "El miedo se está transformando en curiosidad. Eso es el cambio cultural.",
        tone: "Reflexiva, presenciando la transición cognitiva y anímica de su compañero.",
        x: 82.3,
        y: 25.6,
        zoom: 2.1,
        rotateX: 2.0,
        rotateY: 3.0,
        rotateZ: 0.5
      },
      {
        id: 4,
        dialogueIndex: 3,
        title: "Efecto Faro Comunitario",
        speaker: "Rectora Carmen",
        role: "Líder directiva",
        text: "¡Muy bien, Jorge! Tu ejemplo inspirará a toda la escuela. El cambio empieza por nosotros.",
        tone: "Inspiradora y con visión comunitaria expansiva.",
        x: 82.3,
        y: 75.5,
        zoom: 2.1,
        rotateX: -2.0,
        rotateY: 3.0,
        rotateZ: 0.5
      }
    ],
    narrationScript: "Tira cómica número cuatro: La Transición y la Cultura Adhocrática. El profesor Jorge experimenta en la tableta y llama con alegría a su compañera: '¡Mira Laura! Pude abrir una presentación. No era tan difícil'. Laura le responde con orgullo: '¡Excelente, Jorge! Tu experiencia es la clave. La tecnología solo es la herramienta'. Mientras lo observa practicar con soltura, Laura medita: 'El miedo se está transformando en curiosidad. Eso es el cambio cultural'. Finalmente, la rectora Carmen le expresa con entusiasmo: '¡Muy bien, Jorge! Tu ejemplo inspirará a toda la escuela. El cambio empieza por nosotros'.",
    theory: {
      author: "Kurt Lewin (1951) & Cameron y Quinn (1999)",
      title: "Fase de Movimiento / Transición y Cultura Adhocrática",
      keyConcepts: ["Fase de Movimiento (Changing / Moving)", "Cultura Adhocrática", "Experimentación Protegida", "Tecnología como Medio"],
      summary: "Representa el desplazamiento dinámico hacia nuevas prácticas mediante el ensayo y error en un ambiente de apoyo pedagógico.",
      breakdown: [
        {
          concept: "Fase 2: Movimiento o Transición (Kurt Lewin, 1951)",
          description: "Es el trayecto donde las personas exploran activamente nuevos comportamientos, valores y procedimientos. Jorge transita de la parálisis defensiva a la indagación propositiva."
        },
        {
          concept: "Cultura Adhocrática (Cameron & Quinn, 1999)",
          description: "A diferencia de la rigidez burocrática, la escuela adopta rasgos de cultura adhocrática: flexibilidad, disposición a correr riesgos calculados, innovación en el aula y fomento de la iniciativa individual sin castigo al error."
        },
        {
          concept: "Resignificación Instrumental de la Tecnología",
          description: "La tecnología deja de percibirse como un fin tecnocrático impuesto para asumirse como un instrumento subordinado al propósito pedagógico superior: 'Tu experiencia es la clave. La tecnología solo es la herramienta'."
        },
        {
          concept: "Efecto Faro o Modelado Social (Bandura)",
          description: "La transformación del docente de mayor antigüedad ejerce una fuerza tractora sobre el resto del colectivo docente, derrumbando las resistencias de los pares renuentes."
        }
      ],
      quote: "«En la cultura adhocrática, el éxito se mide por la producción de servicios únicos y originales, y la capacidad de adaptarse rápidamente a los nuevos desafíos pedagógicos.» — Cameron & Quinn (1999)"
    }
  },
  {
    id: 5,
    act: "Acto 5",
    title: "El Recongelamiento y la Síntesis Cultural",
    subtitle: "Integración con el PEI, hibridación comunitaria y eficacia escolar",
    image: "/tira-5.jpg",
    fallbackImage: "/5.jpg",
    alt: "Tira cómica 5: Docentes y estudiantes rurales combinan el pizarrón de Historia Local con tabletas para investigar la flora veredal en armonía comunitaria.",
    sceneDescription: "El cambio se consolida en la cotidianidad escolar: la tecnología y la tradición rural conviven de forma virtuosa en el proyecto educativo institucional.",
    dialogues: [
      {
        speaker: "Docente Laura",
        role: "Docente de aula",
        text: "Hoy iniciamos un proyecto nuevo. Combinaremos nuestra tradición con nuevas herramientas digitales.",
        tone: "Motivadora frente a los niños del aula multigrado."
      },
      {
        speaker: "Profesor Jorge",
        role: "Docente innovador",
        text: "Usaremos las tabletas para investigar, pero la tiza seguirá contando nuestras historias.",
        tone: "Seguro de sí mismo, escribiendo 'HISTORIA LOCAL' en el pizarrón."
      },
      {
        speaker: "Rectora Carmen",
        role: "Líder directiva",
        text: "¡Exacto! La tecnología nos ayuda a capturar, y el cuaderno a procesar.",
        tone: "Didáctica y articuladora de los recursos pedagógicos."
      },
      {
        speaker: "Docente Laura",
        role: "Docente de aula",
        text: "El cambio no es reemplazar, es enriquecer. Nuestra cultura escolar está evolucionando.",
        tone: "Plena, satisfecha al ver a los niños y al profesor Jorge investigando la flora local."
      }
    ],
    panoramicView: {
      title: "Plano General Panorámico",
      x: 50,
      y: 50,
      zoom: 1.0,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
    },
    panels: [
      {
        id: 1,
        dialogueIndex: 0,
        title: "Hibridación Tradición y Digitalidad",
        speaker: "Docente Laura",
        role: "Docente de aula",
        text: "Hoy iniciamos un proyecto nuevo. Combinaremos nuestra tradición con nuevas herramientas digitales.",
        tone: "Motivadora frente a los niños del aula multigrado.",
        x: 17.3,
        y: 25.6,
        zoom: 2.1,
        rotateX: 2.0,
        rotateY: -3.0,
        rotateZ: -0.5
      },
      {
        id: 2,
        dialogueIndex: 1,
        title: "Historia Local y Pizarrón Vivo",
        speaker: "Profesor Jorge",
        role: "Docente innovador",
        text: "Usaremos las tabletas para investigar, pero la tiza seguirá contando nuestras historias.",
        tone: "Seguro de sí mismo, escribiendo 'HISTORIA LOCAL' en el pizarrón.",
        x: 49.6,
        y: 25.6,
        zoom: 2.1,
        rotateX: 2.0,
        rotateY: 0,
        rotateZ: 0.5
      },
      {
        id: 3,
        dialogueIndex: 2,
        title: "Captura Digital y Procesamiento Crítico",
        speaker: "Rectora Carmen",
        role: "Líder directiva",
        text: "¡Exacto! La tecnología nos ayuda a capturar, y el cuaderno a procesar.",
        tone: "Didáctica y articuladora de los recursos pedagógicos.",
        x: 82.3,
        y: 25.6,
        zoom: 2.1,
        rotateX: 2.0,
        rotateY: 3.0,
        rotateZ: -0.5
      },
      {
        id: 4,
        dialogueIndex: 3,
        title: "Síntesis Cultural Sostenible",
        speaker: "Docente Laura",
        role: "Docente de aula",
        text: "El cambio no es reemplazar, es enriquecer. Nuestra cultura escolar está evolucionando.",
        tone: "Plena, satisfecha al ver a los niños y al profesor Jorge investigando la flora local.",
        x: 82.3,
        y: 75.5,
        zoom: 2.1,
        rotateX: -2.0,
        rotateY: 3.0,
        rotateZ: 0.5
      }
    ],
    narrationScript: "Tira cómica número cinco: El Recongelamiento y la Síntesis Cultural. En el aula abierta a la comunidad veredal, la profesora Laura le anuncia a los estudiantes: 'Hoy iniciamos un proyecto nuevo. Combinaremos nuestra tradición con nuevas herramientas digitales'. El profesor Jorge, mientras escribe en el tablero 'HISTORIA LOCAL', agrega con sabiduría: 'Usaremos las tabletas para investigar, pero la tiza seguirá contando nuestras historias'. La rectora Carmen complementa: '¡Exacto! La tecnología nos ayuda a capturar, y el cuaderno a procesar'. Finalmente, al observar a los niños registrando la flora del campo junto al profesor Jorge, Laura concluye sonriente: 'El cambio no es reemplazar, es enriquecer. Nuestra cultura escolar está evolucionando'.",
    theory: {
      author: "Kurt Lewin (1951) & Guízar Montúfar (2013)",
      title: "Fase de Recongelamiento, Institucionalización y Eficacia Escolar",
      keyConcepts: ["Recongelamiento (Refreezing)", "Institucionalización en el PEI", "Eficacia Escolar Sostenible", "Hibridación Cultural"],
      summary: "Culminación del proceso de transformación: las nuevas prácticas se asientan como rutinas estables, respetando y enriqueciendo la identidad comunitaria rural.",
      breakdown: [
        {
          concept: "Fase 3: Recongelamiento (Kurt Lewin, 1951)",
          description: "Estabilización del cambio en un nuevo nivel de equilibrio cuasi-estacionario. Las nuevas pautas de acción se incorporan de manera permanente a las costumbres, criterios de evaluación y planes de aula."
        },
        {
          concept: "Institucionalización en el PEI (Guízar Montúfar, 2013)",
          description: "El uso pedagógico de las TIC ya no depende de la voluntad aislada de un docente, sino que queda plasmado formalmente en el Proyecto Educativo Institucional (PEI) y en el plan curricular veredal."
        },
        {
          concept: "Hibridación Cultural y Respeto a la Identidad Rural",
          description: "No hubo aculturación forzada ni desplazamiento destructivo de la memoria veredal. La tableta registra la biodiversidad de la vereda, mientras la tiza y el cuaderno salvaguardan la reflexión crítica ('La tecnología captura, el cuaderno procesa')."
        },
        {
          concept: "Eficacia Escolar y Sentido Humano",
          description: "La escuela alcanza su objetivo misional: formar estudiantes rurales con altas competencias investigativas y afectivas, comprobando que las organizaciones cambian cuando sus actores le encuentran sentido vital al cambio."
        }
      ],
      quote: "«El cambio organizacional exitoso no consiste en borrar el pasado, sino en enriquecer el presente para hacer posible un futuro más equitativo y humano.» — Guízar Montúfar (2013)"
    }
  }
];
