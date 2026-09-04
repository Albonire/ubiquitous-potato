import React from 'react';
import { ArrowDown, BookOpen, Award } from 'lucide-react';

export default function Header() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="pt-6 sm:pt-10 pb-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-ink">
      {/* Discreet Institutional Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-hairline-gray">
        <div className="space-y-0.5">
          <p className="text-xs font-bold tracking-wide text-deep-plum">
            Universidad Santo Tomás · Colombia
          </p>
          <p className="text-[12px] text-slate font-medium">
            Maestría en Educación · Módulo 1: Cultura y cambio educativo
          </p>
        </div>

        {/* Clean Two-Section Nav & Authors */}
        <div className="flex flex-wrap items-center gap-3">
          <nav aria-label="Navegación principal" className="flex items-center gap-1.5 bg-pure-white p-1 rounded-full border border-hairline-gray shadow-sm">
            <button
              onClick={() => scrollToSection('comic-section')}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-ink hover:text-eclipse-violet hover:bg-studio-off-white transition-colors"
            >
              1. Cómic Interactivo
            </button>
            <button
              onClick={() => scrollToSection('quiz-section')}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-ink hover:text-eclipse-violet hover:bg-studio-off-white transition-colors"
            >
              2. Evaluación Formativa
            </button>
          </nav>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pure-white border border-hairline-gray text-[11px] text-slate font-medium shadow-xs">
            <span>Autoras: <strong className="text-deep-plum font-semibold">Ingrid González & Luz Marina Castillo</strong></span>
          </div>
        </div>
      </div>

      {/* Editorial Hero Presentation */}
      <div className="bg-pure-white rounded-3xl p-7 sm:p-12 border border-hairline-gray shadow-sm relative">
        <div className="max-w-3xl">
          {/* Module Eyebrow */}
          <p className="text-xs font-bold uppercase tracking-widest text-eclipse-violet mb-4">
            Recurso Educativo Digital · Accesibilidad DUA
          </p>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight leading-[1.12] mb-5">
            Cuando la escuela rural cambia:{' '}
            <span className="text-eclipse-violet font-extrabold">una historia sobre cultura y transformación</span>
          </h1>

          {/* Narrative Setup */}
          <p className="text-base sm:text-lg text-slate leading-relaxed font-normal mb-8">
            Acompaña al profesor Jorge, la docente Laura y la rectora Carmen en el dilema de integrar herramientas digitales en la escuela veredal sin fracturar su identidad comunitaria ni desvalorizar 25 años de sabiduría pedagógica.
          </p>

          {/* Core Pedagogical Objective Box */}
          <div className="bg-studio-off-white rounded-2xl p-6 sm:p-7 border border-hairline-gray/90 mb-8">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate mb-2">
              Objetivo Pedagógico Central
            </p>
            <blockquote className="text-sm sm:text-base text-deep-plum font-medium leading-relaxed italic border-l-2 border-eclipse-violet pl-4 my-1">
              «Analizar la articulación entre cultura organizacional y gestión del cambio en una institución educativa rural pública, reconociendo fuerzas impulsoras, resistencias humanas y estrategias de liderazgo transformacional.»
            </blockquote>
            <div className="mt-4 pt-3 border-t border-hairline-gray flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate">
              <span className="font-semibold text-deep-plum">Fundamentos teóricos:</span>
              <span>Edgar Schein (1985)</span>
              <span>·</span>
              <span>Kurt Lewin (1951)</span>
              <span>·</span>
              <span>Cameron & Quinn (1999)</span>
              <span>·</span>
              <span>Pérez Uribe (2018)</span>
            </div>
          </div>

          {/* Clean Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollToSection('comic-section')}
              className="inline-flex items-center gap-2 bg-eclipse-violet hover:bg-deep-plum text-pure-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explorar el Cómic en 5 Actos</span>
              <ArrowDown className="w-3.5 h-3.5 ml-0.5 opacity-80" />
            </button>

            <button
              onClick={() => scrollToSection('quiz-section')}
              className="inline-flex items-center gap-2 bg-pure-white hover:bg-studio-off-white text-ink border border-hairline-gray font-semibold text-xs sm:text-sm px-5 py-3 rounded-full transition-colors"
            >
              <Award className="w-4 h-4 text-eclipse-violet" />
              <span>Ir a la Evaluación</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
