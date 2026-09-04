import React, { useState } from 'react';
import { Check, X, RotateCcw } from 'lucide-react';
import { quizQuestions, rubricLevels } from '../data/quizData';

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const question = quizQuestions[index];
  const answer = answers[question.id];
  const isAnswered = Boolean(answer);
  const isCorrect = answer === question.correctAnswer;
  const isLast = index === quizQuestions.length - 1;

  const score = quizQuestions.filter((item) => answers[item.id] === item.correctAnswer).length;
  const rubric = rubricLevels.find((level) => level.score === score);

  const select = (optionId) => {
    if (isAnswered) return;
    setAnswers((previous) => ({ ...previous, [question.id]: optionId }));
  };

  const restart = () => {
    setAnswers({});
    setIndex(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <section id="cuestionario" aria-label="Cuestionario" className="flex min-h-screen items-center bg-night px-6 py-16 sm:px-10">
        <div className="mx-auto w-full max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">
            Resultado
          </p>
          <p className="mt-6 font-display text-6xl font-semibold tracking-tight text-white">
            {score}
            <span className="text-white/40">/{quizQuestions.length}</span>
          </p>
          <h2 className="mt-4 text-xl font-semibold text-white">{rubric.level}</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/55">{rubric.description}</p>
          <button
            type="button"
            onClick={restart}
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <RotateCcw className="h-4 w-4" />
            Responder de nuevo
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="cuestionario" aria-label="Cuestionario" className="flex min-h-screen items-center bg-night px-6 py-16 sm:px-10">
      <div className="mx-auto w-full max-w-2xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">
          Pregunta {index + 1} de {quizQuestions.length}
        </p>

        <h2 className="mt-5 text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl">
          {question.question}
        </h2>

        <ul className="mt-8 space-y-2.5">
          {question.options.map((option) => {
            const isChosen = answer === option.id;
            const isRight = option.id === question.correctAnswer;

            let tone = 'border-white/10 bg-white/[0.04] text-white/80 hover:border-white/25 hover:bg-white/[0.08]';
            if (isAnswered && isRight) {
              tone = 'border-emerald-400/50 bg-emerald-400/10 text-white';
            } else if (isAnswered && isChosen) {
              tone = 'border-rose-400/50 bg-rose-400/10 text-white';
            } else if (isAnswered) {
              tone = 'border-white/5 bg-transparent text-white/45';
            }

            return (
              <li key={option.id}>
                <button
                  type="button"
                  onClick={() => select(option.id)}
                  disabled={isAnswered}
                  className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left text-sm leading-snug transition-colors disabled:cursor-default ${tone}`}
                >
                  <span className="mt-px w-4 shrink-0 text-xs font-semibold text-white/55">
                    {option.id}
                  </span>
                  <span className="flex-1">{option.text}</span>
                  {isAnswered && isRight ? (
                    <Check className="mt-px h-4 w-4 shrink-0 text-emerald-400" />
                  ) : null}
                  {isAnswered && isChosen && !isRight ? (
                    <X className="mt-px h-4 w-4 shrink-0 text-rose-400" />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>

        {isAnswered ? (
          <div className="beat-in mt-6" aria-live="polite">
            <p className="text-sm leading-relaxed text-white/65">
              {isCorrect ? question.feedback.correct : question.feedback.incorrect}
            </p>
            <p className="mt-3 text-[11px] text-white/50">{question.reference}</p>

            <button
              type="button"
              onClick={() => (isLast ? setShowResult(true) : setIndex((previous) => previous + 1))}
              className="mt-8 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
            >
              {isLast ? 'Ver resultado' : 'Siguiente pregunta'}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
