import React from 'react';
import { ArrowDown } from 'lucide-react';

const AUTHORS = 'Ingrid Yuliana González Flores · Luz Marina Castillo';

const REFERENCES = [
  'Cameron, K. S., & Quinn, R. E. (1999). Diagnosing and changing organizational culture: Based on the competing values framework. Addison-Wesley.',
  'Guízar Montúfar, R. (2013). Desarrollo organizacional: Principios y aplicaciones (4.ª ed.). McGraw-Hill Interamericana.',
  'Lewin, K. (1951). Field theory in social science: Selected theoretical papers. Harper & Row.',
  'Pérez Uribe, R. I. (2018). Gerencia estratégica corporativa. Ecoe Ediciones.',
  'Schein, E. H. (1985). Organizational culture and leadership. Jossey-Bass.'
];

export default function Intro({ onStart }) {
  return (
    <section className="flex min-h-screen flex-col justify-between bg-night px-6 py-12 sm:px-10 sm:py-16">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">
        Universidad Santo Tomás · Maestría en Innovación Educativa
      </p>

      <div className="mx-auto w-full max-w-2xl py-12">
        <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl">
          Cuando la escuela rural cambia
        </h1>

        <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
          Analizar la articulación entre cultura organizacional y gestión del cambio en una
          institución educativa rural.
        </p>

        <p className="mt-8 text-sm font-medium text-white/75">{AUTHORS}</p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={onStart}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
          >
            Comenzar
            <ArrowDown className="h-4 w-4" />
          </button>
          <p className="text-sm text-white/60">
            Desliza hacia abajo o haz clic para avanzar viñeta por viñeta.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-2xl">
        <h2 className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">
          Referencias (APA 7)
        </h2>
        <ul className="mt-4 space-y-2 text-[12px] leading-relaxed text-white/55">
          {REFERENCES.map((reference) => (
            <li key={reference}>{reference}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
