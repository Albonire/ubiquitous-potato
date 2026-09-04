import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState
} from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { strips, beats } from '../data/comicData';

const IMAGE_RATIO = 2176 / 1152;
const CELL_FILL = 0.92;

// Color de cada voz, tomado de la ropa y el cabello con que estan dibujados.
const SPEAKER_COLOR = {
  Laura: '#ff9d7a',
  Jorge: '#9fd88a',
  Carmen: '#f0c86a'
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Encuadra la vineta indicada: la celda de la rejilla llena el escenario.
function cameraFor(beat, stageW, stageH) {
  if (!stageW || !stageH) return { imgW: 0, imgH: 0, cellW: 0, cellH: 0, transform: 'none' };

  const imgW = stageW / stageH > IMAGE_RATIO ? stageH * IMAGE_RATIO : stageW;
  const imgH = imgW / IMAGE_RATIO;

  const strip = strips[beat.stripIndex];
  const cellW = imgW / strip.cols;
  const cellH = imgH / strip.rows;
  const scale = Math.max(1, CELL_FILL * Math.min(stageW / cellW, stageH / cellH));

  const tx = (0.5 - beat.x / 100) * imgW * scale;
  const ty = (0.5 - beat.y / 100) * imgH * scale;

  return {
    imgW,
    imgH,
    cellW: cellW * scale,
    cellH: cellH * scale,
    transform: `translate(${tx}px, ${ty}px) scale(${scale})`
  };
}

const ComicSequence = forwardRef(function ComicSequence(_, ref) {
  const scrollerRef = useRef(null);
  const stageRef = useRef(null);
  const frameRef = useRef(0);

  const [index, setIndex] = useState(0);
  const [viewportH, setViewportH] = useState(() =>
    typeof window === 'undefined' ? 800 : window.innerHeight
  );
  const [stage, setStage] = useState({ width: 0, height: 0 });

  // La altura de la secuencia se calcula en px, no en vh: asi la formula del
  // scroll y el alto real del escenario coinciden aunque el navegador movil
  // esconda la barra de direcciones.
  useLayoutEffect(() => {
    let last = window.innerHeight;
    let lastWidth = window.innerWidth;
    setViewportH(last);

    const onResize = () => {
      const h = window.innerHeight;
      const w = window.innerWidth;
      // Se ignoran los cambios pequenos de alto (barra del navegador al
      // desplazarse) para no rehacer el layout en mitad del scroll.
      if (w !== lastWidth || Math.abs(h - last) > 120) {
        last = h;
        lastWidth = w;
        setViewportH(h);
      }
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, []);

  useLayoutEffect(() => {
    const node = stageRef.current;
    if (!node) return undefined;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setStage({ width, height });
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // El scroll es la unica fuente de verdad del tiempo activo.
  useEffect(() => {
    const readScroll = () => {
      frameRef.current = 0;
      const node = scrollerRef.current;
      if (!node) return;
      const top = node.getBoundingClientRect().top;
      setIndex(clamp(Math.floor(-top / viewportH), 0, beats.length - 1));
    };

    const onScroll = () => {
      if (frameRef.current) return;
      frameRef.current = requestAnimationFrame(readScroll);
    };

    readScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [viewportH]);

  const goToBeat = useCallback(
    (target) => {
      const node = scrollerRef.current;
      if (!node) return;
      const scrollerTop = node.getBoundingClientRect().top + window.scrollY;
      const beatIndex = clamp(target, 0, beats.length - 1);
      window.scrollTo({
        top: scrollerTop + beatIndex * viewportH + 1,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth'
      });
    },
    [viewportH]
  );

  useImperativeHandle(ref, () => ({ goToBeat }), [goToBeat]);

  // El ultimo clic sale de la secuencia hacia el cuestionario.
  const advance = useCallback(() => {
    if (index < beats.length - 1) {
      goToBeat(index + 1);
      return;
    }
    const node = scrollerRef.current;
    if (!node) return;
    const bottom = node.getBoundingClientRect().bottom + window.scrollY;
    window.scrollTo({
      top: bottom,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth'
    });
  }, [index, goToBeat]);

  useEffect(() => {
    const onKeyDown = (event) => {
      const node = scrollerRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const isOnStage = rect.top <= 0 && rect.bottom > viewportH;
      if (!isOnStage) return;

      if (event.key === 'ArrowRight' || event.key === ' ' || event.key === 'PageDown') {
        event.preventDefault();
        advance();
      } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        goToBeat(index - 1);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [advance, goToBeat, index, viewportH]);

  const beat = beats[index];
  const strip = strips[beat.stripIndex];
  const { imgW, imgH, cellW, cellH, transform } = cameraFor(beat, stage.width, stage.height);
  const progress = ((index + 1) / beats.length) * 100;

  return (
    <section
      ref={scrollerRef}
      aria-label="Secuencia narrativa en cinco tiras"
      style={{ height: viewportH * beats.length }}
      className="relative bg-night"
    >
      <div
        ref={stageRef}
        style={{ height: viewportH }}
        className="sticky top-0 overflow-hidden bg-night cursor-pointer select-none"
        onClick={advance}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            style={{
              width: imgW || undefined,
              height: imgH || undefined,
              transform,
              transitionProperty: 'transform',
              transitionDuration: '900ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className="relative motion-reduce:transition-none"
          >
            {strips.map((item, itemIndex) => {
              const isActive = itemIndex === beat.stripIndex;
              return (
                <img
                  key={item.id}
                  src={item.image}
                  alt={isActive ? item.alt : ''}
                  aria-hidden={!isActive}
                  draggable={false}
                  fetchPriority={itemIndex === 0 ? 'high' : 'auto'}
                  style={{ opacity: isActive ? 1 : 0 }}
                  className="absolute inset-0 h-full w-full object-contain transition-opacity duration-500 motion-reduce:transition-none"
                />
              );
            })}
          </div>
        </div>

        {/* Mascara rectangular ajustada a la vineta enfocada: oscurece las
            vinetas vecinas que asoman por los bordes sin apagar los extremos
            de la que se esta leyendo. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: cellW * 1.02,
            height: cellH * 1.02,
            boxShadow: '0 0 48px 100vmax rgba(11, 11, 15, 0.72)',
            transitionProperty: 'width, height',
            transitionDuration: '900ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-black/30">
          <div
            className="h-full bg-accent transition-[width] duration-500 ease-out motion-reduce:transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="pointer-events-none absolute left-4 top-5 rounded-full bg-black/65 px-3 py-1.5 text-[11px] font-medium tracking-wide text-white/70 backdrop-blur-sm sm:left-6">
          {strip.act} <span className="mx-1 text-white/30">/</span> {index + 1} de {beats.length}
        </p>

        <div
          aria-live="polite"
          className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center px-4 pb-20 sm:pb-24"
        >
          {beat.text ? (
            <p key={index} className="beat-in rounded-full bg-black/70 px-4 py-1.5 backdrop-blur-sm">
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: SPEAKER_COLOR[beat.speaker] }}
              >
                {beat.speaker}
              </span>
              <span className="sr-only">: {beat.text}</span>
            </p>
          ) : null}
        </div>

        <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-3 sm:bottom-8">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goToBeat(index - 1);
            }}
            disabled={index === 0}
            aria-label="Viñeta anterior"
            className="rounded-full bg-black/65 p-2.5 text-white/75 backdrop-blur-sm transition-colors hover:bg-black/85 hover:text-white disabled:pointer-events-none disabled:opacity-25"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              advance();
            }}
            aria-label={index === beats.length - 1 ? 'Ir al cuestionario' : 'Viñeta siguiente'}
            className="rounded-full bg-black/65 p-2.5 text-white/75 backdrop-blur-sm transition-colors hover:bg-black/85 hover:text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
});

export default ComicSequence;
