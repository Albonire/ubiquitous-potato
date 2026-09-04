import React, { useState } from 'react';
import { BookOpen, Copy, Check } from 'lucide-react';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const apaCitation = `González Flores, I. Y., & Castillo, L. M. (2026). Cuando la escuela rural cambia: una historia sobre cultura y transformación. Recurso pedagógico digital e interactivo DUA para el Módulo 1: Cultura y cambio organizacional y educativo. Universidad Santo Tomás (USTA).`;

  const handleCopyCitation = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(apaCitation);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = apaCitation;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch (e) {
      console.warn('No se pudo copiar la cita:', e);
    }
  };

  const references = [
    {
      citation: 'Cameron, K. S., & Quinn, R. E. (1999).',
      title: 'Diagnosing and Changing Organizational Culture: Based on the Competing Values Framework.',
      publisher: 'Addison-Wesley.'
    },
    {
      citation: 'Guízar Montúfar, R. (2013).',
      title: 'Desarrollo organizacional: Principios y aplicaciones (4.ª ed.).',
      publisher: 'McGraw-Hill Interamericana.'
    },
    {
      citation: 'Lewin, K. (1951).',
      title: 'Field theory in social science: Selected theoretical papers.',
      publisher: 'Harper & Row.'
    },
    {
      citation: 'Pérez Uribe, R. I. (2018).',
      title: 'Gerencia estratégica corporativa (Capítulo 3: Cambio y liderazgo).',
      publisher: 'Ecoe Ediciones.'
    },
    {
      citation: 'Schein, E. H. (1985).',
      title: 'Organizational Culture and Leadership.',
      publisher: 'Jossey-Bass Publishers.'
    }
  ];

  return (
    <footer className="mt-20 border-t border-[#e5e4e7] bg-[#ffffff] py-16 px-4 sm:px-6 lg:px-8 text-ink">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Academic Colophon Top */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-deep-plum tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-eclipse-violet" />
              <span>Universidad Santo Tomás · Colombia</span>
            </div>
            <h3 className="text-xl font-bold text-ink tracking-tight">
              Cuando la escuela rural cambia: una historia sobre cultura y transformación
            </h3>
            <p className="text-xs text-slate leading-relaxed">
              Recurso educativo digital diseñado para el análisis reflexivo de la gestión del cambio, la cultura escolar multigrado y el liderazgo pedagógico bajo principios de Diseño Universal para el Aprendizaje (DUA).
            </p>
          </div>

          <div className="md:col-span-6 space-y-4 md:pl-6 md:border-l md:border-hairline-gray">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate">Equipo de Autoras</p>
              <p className="text-sm font-semibold text-ink mt-0.5">
                Ingrid Yuliana González Flores · Luz Marina Castillo
              </p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate">Programa Académico</p>
              <p className="text-xs text-ink mt-0.5">
                Maestría en Educación · Módulo 1: Cultura y cambio organizacional y educativo
              </p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate">División</p>
              <p className="text-xs text-slate mt-0.5">
                División de Educación Abierta y a Distancia (DUAD) — Primer Claustro Universitario de Colombia
              </p>
            </div>
          </div>
        </div>

        {/* References and Citation */}
        <div className="pt-8 border-t border-hairline-gray space-y-6">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-deep-plum flex items-center gap-2 mb-3">
              <BookOpen className="w-3.5 h-3.5 text-eclipse-violet" />
              Referencias Teóricas Canónicas
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[12px] text-slate leading-relaxed">
              {references.map((ref, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-eclipse-violet select-none">•</span>
                  <span>
                    <strong>{ref.citation}</strong> <em>{ref.title}</em> {ref.publisher}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* APA Citation box */}
          <div className="bg-studio-off-white rounded-2xl p-4 sm:p-5 border border-hairline-gray flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-xs">
              <span className="font-bold text-deep-plum block mb-0.5">Citación recomendada (Normas APA 7.ª ed.):</span>
              <p className="text-[11px] text-slate italic leading-relaxed">{apaCitation}</p>
            </div>
            <button
              onClick={handleCopyCitation}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-button text-xs font-semibold bg-deep-plum hover:bg-ink text-pure-white transition-colors shrink-0 shadow-sm"
              title="Copiar cita en formato APA 7"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>¡Copiada!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-lavender-mist" />
                  <span>Copiar Cita</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="pt-6 border-t border-hairline-gray flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-soft-mist">
          <p>© 2026 Universidad Santo Tomás · Fines formativos y pedagógicos.</p>
          <div className="flex items-center gap-4 text-slate">
            <span>Accesibilidad DUA</span>
            <span>·</span>
            <span>Edgar Schein</span>
            <span>·</span>
            <span>Kurt Lewin</span>
            <span>·</span>
            <span>Cameron & Quinn</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
