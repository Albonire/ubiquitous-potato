import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Volume2,
  VolumeX,
  Award,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  LayoutList
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { quizQuestions, rubricLevels } from '../data/quizData';

export default function DUAQuiz() {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [readingQuestionId, setReadingQuestionId] = useState(null);
  const [viewAll, setViewAll] = useState(false);
  const utteranceRef = useRef(null);

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const stopAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setReadingQuestionId(null);
    utteranceRef.current = null;
    if (typeof window !== 'undefined') {
      window.__quizUtterance = null;
    }
  };

  // Keyboard shortcut listener: A, B, C, D to answer active question, ArrowLeft/Right to navigate
  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeEl = document.activeElement;
      const tag = activeEl ? activeEl.tagName.toUpperCase() : '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || activeEl?.isContentEditable) {
        return;
      }

      const key = e.key.toUpperCase();
      const currentQ = quizQuestions[activeQuestionIndex];

      if (['A', 'B', 'C', 'D'].includes(key)) {
        if (!selectedAnswers[currentQ.id]) {
          const validOpt = currentQ.options.find((opt) => opt.id === key);
          if (validOpt) {
            handleSelectOption(currentQ.id, key);
          }
        }
      } else if (e.key === 'ArrowRight' && !viewAll && activeQuestionIndex < quizQuestions.length - 1) {
        setActiveQuestionIndex((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft' && !viewAll && activeQuestionIndex > 0) {
        setActiveQuestionIndex((prev) => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeQuestionIndex, selectedAnswers, viewAll]);

  const getSpanishVoice = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices() || [];
    const coVoice = voices.find((v) => v.lang && (v.lang.toLowerCase() === 'es-co' || v.lang.toLowerCase() === 'es-419' || v.lang.toLowerCase() === 'es-mx'));
    if (coVoice) return coVoice;
    return voices.find((v) => v.lang && v.lang.toLowerCase().startsWith('es'));
  };

  const handleReadQuestion = (q) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Tu navegador no cuenta con soporte nativo para síntesis de voz.');
      return;
    }

    if (readingQuestionId === q.id) {
      stopAudio();
      return;
    }

    stopAudio();

    const text = `Pregunta ${q.id}: ${q.question}. Opciones: ${q.options.map((o) => `Opción ${o.id}: ${o.text}`).join('. ')}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    if (typeof window !== 'undefined') window.__quizUtterance = utterance;

    const spanishVoice = getSpanishVoice();
    if (spanishVoice) utterance.voice = spanishVoice;
    utterance.lang = 'es-ES';
    utterance.rate = 1.0;

    utterance.onstart = () => setReadingQuestionId(q.id);
    utterance.onend = () => {
      setReadingQuestionId(null);
      utteranceRef.current = null;
      if (typeof window !== 'undefined') window.__quizUtterance = null;
    };
    utterance.onerror = (e) => {
      if (e.error === 'interrupted' || e.error === 'canceled') return;
      setReadingQuestionId(null);
      utteranceRef.current = null;
      if (typeof window !== 'undefined') window.__quizUtterance = null;
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleSelectOption = (questionId, optionId) => {
    if (selectedAnswers[questionId]) return;

    const newAnswers = { ...selectedAnswers, [questionId]: optionId };
    setSelectedAnswers(newAnswers);

    // If all questions are answered, trigger celebratory confetti
    if (Object.keys(newAnswers).length === quizQuestions.length) {
      const score = Object.entries(newAnswers).filter(
        ([qId, ans]) => quizQuestions.find((q) => q.id === Number(qId)).correctAnswer === ans
      ).length;

      if (score >= 3) {
        try {
          confetti({
            particleCount: 75,
            spread: 55,
            origin: { y: 0.65 }
          });
        } catch (e) {
          // ignore
        }
      }
    }
  };

  const handleReset = () => {
    stopAudio();
    setSelectedAnswers({});
    setActiveQuestionIndex(0);
  };

  const totalAnswered = Object.keys(selectedAnswers).length;
  const currentScore = Object.entries(selectedAnswers).filter(
    ([qId, ans]) => quizQuestions.find((q) => q.id === Number(qId)).correctAnswer === ans
  ).length;

  const isCompleted = totalAnswered === quizQuestions.length;
  const currentRubric = rubricLevels.find((r) => r.score === currentScore) || rubricLevels[4];

  const renderQuestionCard = (q, qIndex) => {
    const userAnswer = selectedAnswers[q.id];
    const isAnswered = Boolean(userAnswer);
    const isCorrect = userAnswer === q.correctAnswer;
    const isReadingThis = readingQuestionId === q.id;

    return (
      <div
        key={q.id}
        className={`bg-pure-white rounded-3xl p-6 sm:p-8 border transition-all shadow-sm ${
          isAnswered
            ? isCorrect
              ? 'border-emerald-300/80 bg-emerald-50/[0.08]'
              : 'border-rose-300/80 bg-rose-50/[0.08]'
            : 'border-hairline-gray'
        }`}
      >
        {/* Question Top Bar */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-eclipse-violet">
                Pregunta {qIndex + 1} de {quizQuestions.length}
              </span>
              <span className="text-soft-mist text-xs">·</span>
              <span className="text-[11px] text-slate font-medium">{q.reference}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-ink leading-snug">
              {q.question}
            </h3>
          </div>

          <button
            type="button"
            onClick={() => handleReadQuestion(q)}
            className={`p-2 rounded-full border transition-all shrink-0 ${
              isReadingThis
                ? 'bg-deep-plum text-pure-white border-deep-plum'
                : 'bg-studio-off-white hover:bg-hairline-gray text-slate hover:text-ink border-hairline-gray'
            }`}
            title={isReadingThis ? 'Detener lectura' : 'Escuchar pregunta y opciones (DUA)'}
            aria-label={`Escuchar pregunta ${qIndex + 1}`}
          >
            {isReadingThis ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-eclipse-violet" />}
          </button>
        </div>

        {/* Options */}
        <div className="space-y-2.5 mb-4">
          {q.options.map((opt) => {
            const isSelected = userAnswer === opt.id;
            const isOptionCorrect = opt.id === q.correctAnswer;

            let optionStyle = 'bg-studio-off-white hover:bg-hairline-gray/60 text-ink border-hairline-gray';
            let icon = null;

            if (isAnswered) {
              if (isOptionCorrect) {
                optionStyle = 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold ring-1 ring-emerald-300';
                icon = <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />;
              } else if (isSelected && !isCorrect) {
                optionStyle = 'bg-rose-50 border-rose-300 text-rose-950 font-semibold';
                icon = <XCircle className="w-4 h-4 text-rose-600 shrink-0" />;
              } else {
                optionStyle = 'bg-studio-off-white/40 text-soft-mist border-hairline-gray/40 opacity-60 cursor-not-allowed';
              }
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(q.id, opt.id)}
                disabled={isAnswered}
                className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border text-xs sm:text-sm flex items-center justify-between gap-3 transition-all ${optionStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                      isSelected
                        ? isCorrect
                          ? 'bg-emerald-600 text-pure-white'
                          : 'bg-rose-600 text-pure-white'
                        : isOptionCorrect && isAnswered
                        ? 'bg-emerald-600 text-pure-white'
                        : 'bg-pure-white text-slate border border-hairline-gray'
                    }`}
                  >
                    {opt.id}
                  </span>
                  <span className="leading-snug">{opt.text}</span>
                </div>
                {icon}
              </button>
            );
          })}
        </div>

        {/* Immediate Conceptual Feedback */}
        {isAnswered && (
          <div
            className={`mt-4 p-4 rounded-2xl border text-xs sm:text-sm animate-in fade-in duration-150 ${
              isCorrect
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                : 'bg-rose-50/80 border-rose-200 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5 font-bold">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Respuesta Correcta</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Respuesta Incorrecta</span>
                </>
              )}
            </div>
            <p className="leading-relaxed text-slate font-normal">
              {isCorrect ? q.feedback.correct : q.feedback.incorrect}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="quiz-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto scroll-mt-6 text-ink">
      {/* Editorial Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-4 border-b border-hairline-gray">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-eclipse-violet">
            Evaluación Formativa · Principios DUA
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight mt-0.5">
            Cuestionario de Comprensión Conceptual
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* View mode toggle: Step-by-step vs View all */}
          <button
            onClick={() => setViewAll(!viewAll)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-pure-white hover:bg-studio-off-white text-ink border border-hairline-gray transition-colors shadow-xs"
            title="Alternar entre modo paso a paso o ver todas"
          >
            {viewAll ? <Layers className="w-3.5 h-3.5 text-eclipse-violet" /> : <LayoutList className="w-3.5 h-3.5 text-eclipse-violet" />}
            <span>{viewAll ? 'Modo paso a paso' : 'Ver todas'}</span>
          </button>
        </div>
      </div>

      {/* Progress & Quick Stepper Bar */}
      <div className="bg-pure-white rounded-3xl p-5 sm:p-6 border border-hairline-gray shadow-sm mb-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-studio-off-white border border-hairline-gray flex items-center justify-center text-deep-plum font-extrabold text-sm shrink-0">
              {currentScore}/{quizQuestions.length}
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate">
                {isCompleted ? 'Evaluación completada' : 'Progreso de la evaluación'}
              </p>
              <h3 className="text-sm sm:text-base font-bold text-ink">
                {isCompleted
                  ? `${currentScore} de ${quizQuestions.length} aciertos — ${currentRubric.level}`
                  : `${totalAnswered} de ${quizQuestions.length} preguntas respondidas`}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-[11px] text-soft-mist">
              Responde con clic o teclas A, B, C, D
            </span>
            {totalAnswered > 0 && (
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate hover:text-ink bg-studio-off-white hover:bg-hairline-gray transition-colors border border-hairline-gray"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar</span>
              </button>
            )}
          </div>
        </div>

        {/* Minimalist Progress Line */}
        <div className="w-full bg-hairline-gray/80 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-eclipse-violet h-full rounded-full transition-all duration-300"
            style={{ width: `${(totalAnswered / quizQuestions.length) * 100}%` }}
          />
        </div>

        {/* Question Selector Tabs (in Stepper Mode) */}
        {!viewAll && (
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5">
              {quizQuestions.map((q, idx) => {
                const isCurrent = idx === activeQuestionIndex;
                const ans = selectedAnswers[q.id];
                const isAnswered = Boolean(ans);
                const isRight = ans === q.correctAnswer;

                return (
                  <button
                    key={q.id}
                    onClick={() => setActiveQuestionIndex(idx)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isCurrent
                        ? 'bg-deep-plum text-pure-white shadow-xs'
                        : 'bg-studio-off-white hover:bg-hairline-gray text-slate hover:text-ink'
                    }`}
                  >
                    <span>P{idx + 1}</span>
                    {isAnswered && (
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isRight ? 'bg-emerald-500' : 'bg-rose-500'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveQuestionIndex((prev) => Math.max(0, prev - 1))}
                disabled={activeQuestionIndex === 0}
                className="p-1.5 rounded-lg bg-studio-off-white hover:bg-hairline-gray disabled:opacity-30 disabled:cursor-not-allowed text-ink border border-hairline-gray transition-colors"
                title="Pregunta anterior (←)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveQuestionIndex((prev) => Math.min(quizQuestions.length - 1, prev + 1))}
                disabled={activeQuestionIndex === quizQuestions.length - 1}
                className="p-1.5 rounded-lg bg-studio-off-white hover:bg-hairline-gray disabled:opacity-30 disabled:cursor-not-allowed text-ink border border-hairline-gray transition-colors"
                title="Pregunta siguiente (→)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Institutional Rubric Card upon completion */}
        {isCompleted && (
          <div className="mt-4 pt-4 border-t border-hairline-gray text-xs sm:text-sm text-slate space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 font-bold text-deep-plum">
              <Sparkles className="w-4 h-4 text-eclipse-violet" />
              <span>{currentRubric.badge} — {currentRubric.level}</span>
            </div>
            <p className="leading-relaxed">
              {currentRubric.description}
            </p>
          </div>
        )}
      </div>

      {/* Questions Display */}
      {viewAll ? (
        <div className="space-y-6">
          {quizQuestions.map((q, idx) => renderQuestionCard(q, idx))}
        </div>
      ) : (
        <div className="space-y-4">
          {renderQuestionCard(quizQuestions[activeQuestionIndex], activeQuestionIndex)}

          {/* Stepper Navigation Footer */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setActiveQuestionIndex((prev) => Math.max(0, prev - 1))}
              disabled={activeQuestionIndex === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-pure-white hover:bg-studio-off-white disabled:opacity-30 disabled:cursor-not-allowed text-ink border border-hairline-gray transition-colors shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Pregunta anterior</span>
            </button>

            <span className="text-xs text-soft-mist">
              Pregunta {activeQuestionIndex + 1} de {quizQuestions.length}
            </span>

            <button
              onClick={() => setActiveQuestionIndex((prev) => Math.min(quizQuestions.length - 1, prev + 1))}
              disabled={activeQuestionIndex === quizQuestions.length - 1}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-deep-plum hover:bg-ink disabled:opacity-30 disabled:cursor-not-allowed text-pure-white transition-colors shadow-xs"
            >
              <span>Pregunta siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
