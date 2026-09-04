import React, { useState, useEffect, useRef } from 'react';
import { X, Volume2, VolumeX, BookOpen, Quote, ChevronRight } from 'lucide-react';

export default function TheoryModal({ isOpen, onClose, strip }) {
  const [isSpeakingTheory, setIsSpeakingTheory] = useState(false);
  const utteranceRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
      stopSpeaking();
    };
  }, [isOpen]);

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeakingTheory(false);
    utteranceRef.current = null;
    if (typeof window !== 'undefined') {
      window.__theoryUtterance = null;
    }
  };

  const handleClose = () => {
    stopSpeaking();
    onClose();
  };

  const getSpanishVoice = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices() || [];
    // Prioritize Latin American / Colombian Spanish if available
    const coVoice = voices.find((v) => v.lang && (v.lang.toLowerCase() === 'es-co' || v.lang.toLowerCase() === 'es-419' || v.lang.toLowerCase() === 'es-mx'));
    if (coVoice) return coVoice;
    return voices.find((v) => v.lang && v.lang.toLowerCase().startsWith('es'));
  };

  const handleToggleSpeakTheory = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Tu navegador no cuenta con soporte para síntesis de voz (Web Speech API).');
      return;
    }

    if (isSpeakingTheory) {
      stopSpeaking();
      return;
    }

    stopSpeaking();

    const text = `${strip.theory.title}. Marco Teórico: ${strip.theory.author}. Articulación con la escena: ${strip.theory.summary}. ${strip.theory.breakdown.map((b) => `${b.concept}: ${b.description}`).join('. ')}. ${strip.theory.quote || ''}`;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    // Keep global reference to avoid Chromium garbage collection bug during long speech
    if (typeof window !== 'undefined') {
      window.__theoryUtterance = utterance;
    }

    const spanishVoice = getSpanishVoice();
    if (spanishVoice) utterance.voice = spanishVoice;
    utterance.lang = 'es-ES';
    utterance.rate = 1.0;

    utterance.onstart = () => setIsSpeakingTheory(true);
    utterance.onend = () => {
      setIsSpeakingTheory(false);
      utteranceRef.current = null;
      if (typeof window !== 'undefined') window.__theoryUtterance = null;
    };
    utterance.onerror = (e) => {
      if (e.error === 'interrupted' || e.error === 'canceled') return;
      setIsSpeakingTheory(false);
      utteranceRef.current = null;
      if (typeof window !== 'undefined') window.__theoryUtterance = null;
    };

    window.speechSynthesis.speak(utterance);
  };

  if (!isOpen || !strip) return null;

  const { theory, act, title, id } = strip;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="theory-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-ink/40 backdrop-blur-xs transition-opacity duration-200"
      onClick={handleClose}
    >
      <div
        className="bg-pure-white w-full max-w-xl h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-hairline-gray animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 sm:p-7 border-b border-hairline-gray bg-pure-white sticky top-0 z-10">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-eclipse-violet bg-studio-off-white px-2.5 py-1 rounded-full border border-hairline-gray">
                {act} · Tira {id}
              </span>
              <span className="text-xs text-slate font-medium truncate max-w-[200px]">
                {title}
              </span>
            </div>

            <button
              onClick={handleClose}
              aria-label="Cerrar panel teórico"
              className="p-2 rounded-full bg-studio-off-white hover:bg-hairline-gray text-slate hover:text-ink transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h3 id="theory-drawer-title" className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
            {theory.title}
          </h3>
          <p className="text-xs font-semibold text-deep-plum mt-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-eclipse-violet" />
            {theory.author}
          </p>

          {/* Accessible Audio Synthesis Trigger */}
          <div className="mt-4 flex items-center justify-between gap-3 p-3 rounded-2xl bg-studio-off-white border border-hairline-gray">
            <div className="text-xs text-slate flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-eclipse-violet shrink-0" />
              <span>Lectura oral del fundamento (DUA)</span>
            </div>

            <button
              type="button"
              onClick={handleToggleSpeakTheory}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                isSpeakingTheory
                  ? 'bg-deep-plum text-pure-white shadow-sm'
                  : 'bg-pure-white hover:bg-studio-off-white text-ink border border-hairline-gray'
              }`}
            >
              {isSpeakingTheory ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Detener</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-eclipse-violet" />
                  <span>Escuchar</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-7 space-y-6 overflow-y-auto flex-grow text-ink">
          {/* Key Concept Pills */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate mb-2">
              Ejes Conceptuales
            </p>
            <div className="flex flex-wrap gap-1.5">
              {theory.keyConcepts.map((kc, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-studio-off-white text-deep-plum border border-hairline-gray"
                >
                  {kc}
                </span>
              ))}
            </div>
          </div>

          {/* Scene Articulation Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-studio-off-white/80 border border-hairline-gray space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-deep-plum uppercase tracking-wider">
              <span>Articulación con el Dilema Escolar</span>
            </div>
            <p className="text-xs sm:text-sm text-slate leading-relaxed font-normal">
              {theory.summary}
            </p>
          </div>

          {/* Conceptual Breakdown */}
          <div className="space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate">
              Desglose Conceptual Aplicado
            </p>
            {theory.breakdown.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-pure-white border border-hairline-gray hover:border-hairline-gray/80 transition-colors space-y-1 shadow-xs"
              >
                <h5 className="text-xs font-bold text-deep-plum flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-eclipse-violet shrink-0" />
                  <span>{item.concept}</span>
                </h5>
                <p className="text-xs text-slate leading-relaxed pl-5 font-normal">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Canonical Quote */}
          {theory.quote && (
            <div className="p-4 sm:p-5 rounded-2xl bg-studio-off-white border border-hairline-gray relative">
              <Quote className="w-5 h-5 text-eclipse-violet/30 absolute top-4 right-4" />
              <blockquote className="text-xs sm:text-sm italic text-deep-plum font-medium pr-6 leading-relaxed">
                {theory.quote}
              </blockquote>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 sm:p-5 border-t border-hairline-gray bg-pure-white flex items-center justify-between">
          <span className="text-[11px] text-soft-mist">
            Presiona ESC para volver al cómic
          </span>
          <button
            onClick={handleClose}
            className="px-5 py-2 rounded-full bg-deep-plum hover:bg-ink text-pure-white text-xs font-semibold transition-colors shadow-sm"
          >
            Cerrar panel
          </button>
        </div>
      </div>
    </div>
  );
}
