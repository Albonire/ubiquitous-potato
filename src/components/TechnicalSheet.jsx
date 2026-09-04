import React, { useState } from 'react';
import {
  FileText,
  Users,
  CheckCircle2,
  Wrench,
  BookOpen,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Layers,
  GraduationCap,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export default function TechnicalSheet() {
  const [isOpen, setIsOpen] = useState(true);
  const [showSevenQuestions, setShowSevenQuestions] = useState(true);
  const [copied, setCopied] = useState(false);

  const apaCitation = `González Flores, I. Y., & Castillo, L. M. (2026). Cuando la escuela rural cambia: una historia sobre cultura y transformación. Recurso digital e interactivo DUA para el Módulo 1: Fundamentos de cultura y cambio organizacional y educativo. Universidad Santo Tomás (USTA).`;

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(apaCitation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const projectPhases = [
    { num: "1", name: "Diagnóstico institucional", desc: "Caracterización del aula multigrado rural, sus artefactos y el arraigo a la enseñanza tradicional." },
    { num: "2", name: "Investigación teórica", desc: "Revisión conceptual de Schein (cultura), Lewin (fuerzas), Cameron & Quinn (clan/adhocracia) y Pérez Uribe (liderazgo)." },
    { num: "3", name: "Guionización en 5 actos", desc: "Construcción narrativa del conflicto: tradición, choque tecnológico, descongelamiento, experimentación y síntesis." },
    { num: "4", name: "Ilustración digital 2D", desc: "Creación gráfica de personajes (Jorge, Laura, Carmen, estudiantes), escenarios veredales y viñetas de alta expresividad." },
    { num: "5", name: "Desarrollo de interactividad web y accesibilidad DUA", desc: "Implementación en Vite, React, Tailwind CSS (Jitter), Web Speech API para lectura en voz alta y lienzo de diagnóstico." },
    { num: "6", name: "Evaluación formativa", desc: "Diseño del cuestionario con retroalimentación inmediata, rúbrica de desempeño USTA y balance dinámico de fuerzas." }
  ];

  const toolsList = [
    { name: "Ilustración Digital 2D", role: "Diseño gráfico, personajes y viñetas" },
    { name: "Antigravity CLI", role: "Orquestación de desarrollo y arquitectura" },
    { name: "Web Speech API", role: "Lectura por voz nativa para accesibilidad DUA" },
    { name: "HTML5 / React / Tailwind CSS", role: "Desarrollo frontend editorial bajo Jitter system" },
    { name: "Vercel", role: "Despliegue e infraestructura en la nube" }
  ];

  const ustaSevenQuestions = [
    {
      q: "1. ¿Qué es cultura y qué es cambio organizacional?",
      a: "La cultura organizacional es el patrón de supuestos básicos, valores, creencias y normas compartidas que orientan la conducta cotidiana de una comunidad escolar (Schein, 1985). El cambio organizacional es la transformación planificada de prácticas pedagógicas, relaciones interpersonales y rutinas institucionales para responder a los desafíos contemporáneos sin desintegrar la identidad comunitaria."
    },
    {
      q: "2. ¿Cuáles son los componentes que hacen parte de la cultura y el cambio en la escuela rural elegida?",
      a: "Se evidencian: 1) Artefactos visibles: el pizarrón de tiza, el aula multigrado, las tabletas digitales ministeriales y los cuadernos de apuntes; 2) Valores declarados: la solidaridad vecinal, la lealtad comunitaria y la vocación docente; 3) Supuestos básicos subyacentes: la convicción arraigada de que la verdadera docencia rural exige presencia física exclusiva y tiza; y 4) Agentes de cambio: rectora Carmen (liderazgo facilitador), docente Laura (co-enseñanza) y profesor Jorge (sabiduría pedagógica acumulada)."
    },
    {
      q: "3. ¿Cuáles son los diferentes tipos de cultura presentes (Cameron y Quinn, 1999)?",
      a: "Predomina la Cultura Clan, caracterizada por lazos familiares, confianza recíproca y cohesión social ('aquí somos como una familia'). Durante la intervención emerge la Cultura Adhocrática en el aula, orientada a la experimentación protegida, el aprendizaje mediante el ensayo-error y la innovación curricular flexible."
    },
    {
      q: "4. ¿Cuál es la importancia de la cultura y el cambio para lograr la eficacia organizacional?",
      a: "La tecnología por sí sola no transforma la escuela. La eficacia escolar sostenible se logra cuando el cambio se fundamenta en la cultura existente, construyendo seguridad psicológica para que los docentes pierdan el miedo y doten de sentido pedagógico a las nuevas herramientas dentro del PEI."
    },
    {
      q: "5. ¿Cuáles aspectos impulsan el cambio organizacional en la escuela rural?",
      a: "Fuerzas impulsoras externas: dotación ministerial de tabletas digitales y demandas de alfabetización digital contemporánea. Fuerzas impulsoras internas: la curiosidad activa de los estudiantes, el liderazgo empático de la rectora y la disposición de la docente Laura para el trabajo colaborativo intergeneracional."
    },
    {
      q: "6. ¿Cuáles aspectos representan resistencia para el cambio organizacional?",
      a: "Fuerzas restrictivas: el temor a la pérdida de competencia profesional tras 25 años de docencia con tiza, el miedo al ridículo y al error técnico frente a los estudiantes, la inestabilidad de conectividad rural y la inercia de trabajar de la misma manera tradicional."
    },
    {
      q: "7. ¿Cómo se pueden reducir dichas resistencias?",
      a: "Según Lewin (1951) y Pérez Uribe (2018), debilitando las fuerzas restrictivas mediante: 1) Liderazgo no coactivo que legitima el error como oportunidad; 2) Co-enseñanza horizontal entre pares; 3) Acompañamiento andragógico paso a paso; y 4) Resignificación pedagógica ('la tableta captura, el cuaderno procesa')."
    }
  ];

  return (
    <footer id="ficha-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-6">
      {/* Section Container */}
      <div className="bg-pure-white rounded-card p-6 sm:p-10 border border-hairline-gray shadow-jitter-xl transition-all">
        {/* Header Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-hairline-gray">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-deep-plum text-volt flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-badge bg-studio-off-white text-slate text-[11px] font-semibold uppercase mb-1">
                Paso D · Guía de Actividades USTA
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-ink tracking-tight-title">
                Ficha Técnica y Documentación Formal del Recurso
              </h3>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-button text-xs font-semibold bg-studio-off-white hover:bg-hairline-gray text-ink border border-hairline-gray transition-colors"
          >
            {isOpen ? 'Plegar Ficha Técnica' : 'Desplegar Ficha Técnica'}
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Expandable Technical Content */}
        {isOpen && (
          <div className="pt-8 space-y-8 animate-in fade-in duration-200">
            {/* Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Integrantes y Docencia */}
              <div className="bg-studio-off-white rounded-3xl p-6 border border-hairline-gray">
                <h4 className="text-xs font-bold uppercase tracking-wider text-deep-plum mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-eclipse-violet" />
                  Equipo de Autoras (Estudiantes USTA)
                </h4>
                <ul className="space-y-2 text-sm text-ink">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-volt" />
                    <strong>Ingrid Yuliana González Flores</strong>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-volt" />
                    <strong>Luz Marina Castillo</strong>
                  </li>
                </ul>
                <div className="mt-4 pt-3 border-t border-hairline-gray/80 text-xs text-slate">
                  <p><strong>Programa:</strong> Maestría en Educación</p>
                  <p><strong>Módulo 1:</strong> Fundamentos de cultura y cambio organizacional y educativo</p>
                  <p><strong>Institución:</strong> Universidad Santo Tomás (USTA) — Colombia</p>
                </div>
              </div>

              {/* Público Objetivo */}
              <div className="bg-studio-off-white rounded-3xl p-6 border border-hairline-gray">
                <h4 className="text-xs font-bold uppercase tracking-wider text-deep-plum mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-electric-blue" />
                  Público Objetivo
                </h4>
                <p className="text-xs sm:text-sm text-slate leading-relaxed mb-3">
                  Este recurso interactivo ha sido concebido para su uso en entornos académicos presenciales, híbridos y a distancia:
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-badge text-xs font-medium bg-pure-white text-ink border border-hairline-gray">
                    Docentes en formación
                  </span>
                  <span className="px-3 py-1 rounded-badge text-xs font-medium bg-pure-white text-ink border border-hairline-gray">
                    Directivos docentes y rectores
                  </span>
                  <span className="px-3 py-1 rounded-badge text-xs font-medium bg-pure-white text-ink border border-hairline-gray">
                    Estudiantes universitarios
                  </span>
                  <span className="px-3 py-1 rounded-badge text-xs font-medium bg-pure-white text-ink border border-hairline-gray">
                    Líderes de innovación educativa rural
                  </span>
                </div>
              </div>
            </div>

            {/* Respuestas a las 7 Preguntas Orientadoras de la Guía USTA */}
            <div className="bg-pure-white rounded-card p-6 sm:p-8 border border-hairline-gray shadow-jitter-xl">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-hairline-gray">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-badge bg-sky-tint text-deep-plum text-xs font-semibold uppercase mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-electric-blue" />
                    Criterio de Evaluación USTA (Págs. 3 y 6)
                  </div>
                  <h4 className="text-base sm:text-lg font-extrabold text-ink">
                    Respuestas a las 7 Preguntas Orientadoras de la Guía de Actividades
                  </h4>
                  <p className="text-xs text-slate mt-0.5">
                    Articulación conceptual y evidencia requerida para la máxima calificación (0.556 pts en Contenido Temático y Pedagógico)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSevenQuestions(!showSevenQuestions)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-button text-xs font-semibold bg-studio-off-white hover:bg-hairline-gray text-ink border border-hairline-gray transition-colors"
                >
                  {showSevenQuestions ? 'Ocultar preguntas' : 'Ver 7 respuestas'}
                  {showSevenQuestions ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {showSevenQuestions && (
                <div className="mt-6 space-y-4 animate-in fade-in duration-200">
                  {ustaSevenQuestions.map((item, idx) => (
                    <div key={idx} className="bg-studio-off-white/80 p-4 sm:p-5 rounded-2xl border border-hairline-gray">
                      <h5 className="text-xs sm:text-sm font-bold text-deep-plum mb-2 flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-deep-plum text-volt font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{item.q.replace(/^\d+\.\s*/, '')}</span>
                      </h5>
                      <p className="text-xs text-slate leading-relaxed pl-7">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Fases del Proyecto */}
            <div className="bg-studio-off-white rounded-card p-6 sm:p-8 border border-hairline-gray">
              <h4 className="text-xs font-bold uppercase tracking-wider text-deep-plum mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-eclipse-violet" />
                Fases del Proceso de Diseño y Producción
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projectPhases.map((phase) => (
                  <div key={phase.num} className="bg-pure-white p-4 rounded-2xl border border-hairline-gray shadow-sm">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-6 h-6 rounded-full bg-deep-plum text-volt font-black text-xs flex items-center justify-center">
                        {phase.num}
                      </span>
                      <h5 className="text-xs font-bold text-ink">{phase.name}</h5>
                    </div>
                    <p className="text-[11px] text-slate leading-relaxed">{phase.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Herramientas Utilizadas */}
            <div className="bg-studio-off-white rounded-3xl p-6 sm:p-8 border border-hairline-gray">
              <h4 className="text-xs font-bold uppercase tracking-wider text-deep-plum mb-4 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-emerald-600" />
                Herramientas Tecnológicas y Metodológicas Empleadas
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {toolsList.map((tool, idx) => (
                  <div key={idx} className="bg-pure-white p-3.5 rounded-2xl border border-hairline-gray text-center">
                    <p className="text-xs font-bold text-deep-plum">{tool.name}</p>
                    <p className="text-[10px] text-soft-mist mt-0.5">{tool.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Referencias Bibliográficas Canónicas */}
            <div className="bg-lavender-mist/20 rounded-3xl p-6 sm:p-8 border border-lilac-wash/40">
              <h4 className="text-xs font-bold uppercase tracking-wider text-deep-plum mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-eclipse-violet" />
                Referencias Bibliográficas Principales
              </h4>
              <ul className="space-y-2 text-xs text-slate-700 leading-relaxed pl-2">
                <li>• <strong>Cameron, K. S., & Quinn, R. E. (1999).</strong> <em>Diagnosing and Changing Organizational Culture: Based on the Competing Values Framework</em>. Addison-Wesley.</li>
                <li>• <strong>Guízar Montúfar, R. (2013).</strong> <em>Desarrollo organizacional: Principios y aplicaciones</em> (4.ª ed.). McGraw-Hill Interamericana.</li>
                <li>• <strong>Lewin, K. (1951).</strong> <em>Field theory in social science: Selected theoretical papers</em>. Harper & Row.</li>
                <li>• <strong>Pérez Uribe, R. I. (2018).</strong> <em>Gerencia estratégica corporativa</em> (Capítulo 3). Ecoe Ediciones.</li>
                <li>• <strong>Schein, E. H. (1985).</strong> <em>Organizational Culture and Leadership</em>. Jossey-Bass Publishers.</li>
              </ul>

              {/* APA Citation Copy Box */}
              <div className="mt-5 p-4 rounded-2xl bg-pure-white border border-lilac-wash/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-xs text-ink">
                  <span className="font-bold text-deep-plum block mb-0.5">Citación formal sugerida (APA 7):</span>
                  <span className="text-[11px] text-slate italic">{apaCitation}</span>
                </div>
                <button
                  onClick={handleCopyCitation}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-button text-xs font-semibold bg-deep-plum hover:bg-ink text-pure-white transition-colors shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ¡Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-volt" />
                      Copiar Cita
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Institutional Bottom Sign-off */}
        <div className="mt-8 pt-6 border-t border-hairline-gray flex flex-wrap items-center justify-between gap-4 text-xs text-soft-mist">
          <p>© 2026 Universidad Santo Tomás (USTA) · Primer Claustro Universitario de Colombia</p>
          <p>Diseño Pedagógico y Tecnológico con Accesibilidad DUA</p>
        </div>
      </div>
    </footer>
  );
}
