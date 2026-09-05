// Cinco tiras comicas. Cada tira es una rejilla de vinetas (cols x rows) y cada
// vineta se ubica por el centro de su celda en porcentaje sobre la imagen.
// Las vinetas sin dialogo se marcan como silent: la camara se detiene en ellas
// como pausa narrativa, sin subtitulo.

export const strips = [
  {
    id: 1,
    act: 'Acto 1',
    image: '/tira-1.jpg',
    alt: 'Tira 1: Laura y Jorge conversan sobre la cultura de cercania, tiza y tablero en la escuela rural, cuando la rectora plantea la necesidad de avanzar.',
    cols: 2,
    rows: 2,
    panels: [
      { x: 25.3, y: 25.3, speaker: 'Laura', text: 'En nuestra escuela rural, educar siempre ha sido cercanía, tiza y tablero.' },
      { x: 74.3, y: 25.3, speaker: 'Jorge', text: 'Aquí somos como una familia... Esa es nuestra cultura.' },
      { x: 25.3, y: 75.3, speaker: 'Carmen', text: 'Compartimos valores y rutinas... pero el entorno nos exige avanzar.' },
      { x: 74.3, y: 75.3, speaker: 'Jorge', text: '¿Avanzar hacia dónde, rectora?' }
    ]
  },
  {
    id: 2,
    act: 'Acto 2',
    image: '/tira-2.jpg',
    alt: 'Tira 2: la rectora entrega tabletas electronicas y Jorge siente miedo e impotencia al ver un mensaje de ERROR en la pantalla.',
    cols: 3,
    rows: 2,
    panels: [
      { x: 17.3, y: 25.6, speaker: 'Carmen', text: 'El ministerio envió estas tabletas para innovar en el aula.' },
      { x: 49.6, y: 25.6, speaker: 'Jorge', text: '¿Tabletas? Llevo 25 años con tiza. Esto me da miedo. No sabré usarlas.' },
      { x: 82.3, y: 25.6, speaker: 'Laura', text: 'Jorge, el cambio no borra tu experiencia. Quizás podemos aprender juntos.' },
      { x: 17.3, y: 75.5, silent: true },
      { x: 49.6, y: 75.5, speaker: 'Carmen', text: 'Es una oportunidad, no una amenaza. Debemos intentarlo por los estudiantes.' },
      { x: 82.3, y: 75.5, speaker: 'Jorge', text: 'Esto es imposible. ¡Lo sabía!' }
    ]
  },
  {
    id: 3,
    act: 'Acto 3',
    image: '/tira-3.jpg',
    alt: 'Tira 3: Laura y Carmen acompanan a Jorge paso a paso hasta que logra dibujar una carita feliz en la tableta.',
    cols: 3,
    rows: 2,
    panels: [
      { x: 17.3, y: 25.6, speaker: 'Laura', text: 'No podemos imponer esto. Jorge necesita apoyo, no presión. Cambiemos la estrategia.' },
      { x: 49.6, y: 25.6, speaker: 'Carmen', text: 'Jorge, ¿y si trabajamos juntos? Tú pones la experiencia pedagógica y yo te ayudo con la tableta.' },
      { x: 82.3, y: 25.6, speaker: 'Carmen', text: 'Mira, es como el pizarrón, pero digital. Vamos paso a paso. ¿Ves este ícono?' },
      { x: 17.3, y: 75.5, silent: true },
      { x: 49.6, y: 75.5, speaker: 'Jorge', text: '¡Ah! ¡Pude dibujar algo! No explotó.' },
      { x: 82.3, y: 75.5, speaker: 'Laura', text: 'El verdadero cambio no es la tecnología, es la gente trabajando unida y perdiendo el miedo.' }
    ]
  },
  {
    id: 4,
    act: 'Acto 4',
    image: '/tira-4.jpg',
    alt: 'Tira 4: Jorge abre una presentacion por si mismo, sus companeras celebran el avance y la rectora destaca que el cambio empieza por uno mismo.',
    cols: 3,
    rows: 2,
    panels: [
      { x: 17.3, y: 25.6, speaker: 'Jorge', text: '¡Mira Laura! Pude abrir una presentación. No era tan difícil.' },
      { x: 49.6, y: 25.6, speaker: 'Laura', text: '¡Excelente, Jorge! Tu experiencia es la clave. La tecnología solo es la herramienta.' },
      { x: 82.3, y: 25.6, speaker: 'Laura', text: 'El miedo se está transformando en curiosidad. Eso es el cambio cultural.' },
      { x: 17.3, y: 75.5, silent: true },
      { x: 49.6, y: 75.5, silent: true },
      { x: 82.3, y: 75.5, speaker: 'Carmen', text: '¡Muy bien, Jorge! Tu ejemplo inspirará a toda la escuela. El cambio empieza por nosotros.' }
    ]
  },
  {
    id: 5,
    act: 'Acto 5',
    image: '/tira-5.jpg',
    alt: 'Tira 5: docentes y estudiantes combinan el pizarron de Historia Local con tabletas para investigar la flora de la vereda.',
    cols: 3,
    rows: 2,
    panels: [
      { x: 17.3, y: 25.6, speaker: 'Laura', text: 'Hoy iniciamos un proyecto nuevo. Combinaremos nuestra tradición con nuevas herramientas digitales.' },
      { x: 49.6, y: 25.6, speaker: 'Jorge', text: 'Usaremos las tabletas para investigar, pero la tiza seguirá contando nuestras historias.' },
      { x: 82.3, y: 25.6, speaker: 'Carmen', text: '¡Exacto! La tecnología nos ayuda a capturar, y el cuaderno a procesar.' },
      { x: 17.3, y: 75.5, silent: true },
      { x: 49.6, y: 75.5, silent: true },
      { x: 82.3, y: 75.5, speaker: 'Laura', text: 'El cambio no es reemplazar, es enriquecer. Nuestra cultura escolar está evolucionando.' }
    ]
  }
];

// Secuencia plana de tiempos: un tiempo por vineta, en orden de lectura.
export const beats = strips.flatMap((strip, stripIndex) =>
  strip.panels.map((panel, panelIndex) => ({ ...panel, stripIndex, panelIndex }))
);
