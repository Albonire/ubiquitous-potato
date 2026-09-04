import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Volume2,
  VolumeX,
  Copy,
  Check,
  ZoomIn,
  ZoomOut,
  Move,
  Sparkles
} from 'lucide-react';
import { comicStrips } from '../data/comicData';
import TheoryModal from './TheoryModal';
import CinematicPresentationViewer from './CinematicPresentationViewer';

const characterProfiles = {
  "Profesor Jorge": {
    role: "Docente veterano (25 años en aula multigrado)",
    archetype: "Memoria pedagógica rural · Cultura Clan",
    insight: "Defensa legítima de la competencia profesional y la identidad comunitaria ante la incertidumbre tecnológica.",
    voiceConfig: { pitch: 0.84, rate: 0.94 }
  },
  "Docente Laura": {
    role: "Docente de aula",
    archetype: "Puente intergeneracional · Cultura Adhocrática",
    insight: "Promueve la experimentación protegida y la co-enseñanza horizontal para disipar la ansiedad técnica entre pares.",
    voiceConfig: { pitch: 1.14, rate: 1.04 }
  },
  "Rectora Carmen": {
    role: "Líder directiva escolar",
    archetype: "Liderazgo transformacional y facilitador",
    insight: "Sustituye la directriz punitiva por el acompañamiento empático, desmitificando la herramienta junto al maestro.",
    voiceConfig: { pitch: 1.0, rate: 0.98 }
  }
};

export default function ComicViewer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTheoryOpen, setIsTheoryOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isCinematicOpen, setIsCinematicOpen] = useState(false);
  const [lightboxZoom, setLightboxZoom] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const dragStartPosRef = useRef({ x: 0, y: 0 });
  const hasDraggedRef = useRef(false);

  // Audio DUA state
  const [isNarrating, setIsNarrating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speakingDialogueIndex, setSpeakingDialogueIndex] = useState(null);
  const [highlightedDialogueIndex, setHighlightedDialogueIndex] = useState(null);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [voices, setVoices] = useState([]);
  const [selectedCharacterFilter, setSelectedCharacterFilter] = useState('ALL');
  const [copiedTranscript, setCopiedTranscript] = useState(false);
  const utteranceRef = useRef(null);

  const currentStrip = comicStrips[currentIndex];

  const getAssetUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const base = import.meta.env.BASE_URL || '/';
    return base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
  };

  // Check speech synthesis support & load voices
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSupported(true);
      const updateVoices = () => {
        try {
          const avail = window.speechSynthesis.getVoices();
          if (avail && avail.length > 0) {
            setVoices(avail);
          }
        } catch (e) {
          // ignore
        }
      };
      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
      return () => {
        window.speechSynthesis.onvoiceschanged = null;
        stopAllAudio();
      };
    } else {
      setSpeechSupported(false);
    }
  }, []);

  const stopAllAudio = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsNarrating(false);
    setIsPaused(false);
    setSpeakingDialogueIndex(null);
    setHighlightedDialogueIndex(null);
    utteranceRef.current = null;
    if (typeof window !== 'undefined') {
      window.__comicUtterance = null;
    }
  }, []);

  // Stop audio whenever strip changes
  useEffect(() => {
    stopAllAudio();
  }, [currentIndex, stopAllAudio]);

  // Handle body scroll locking & reset pan on Lightbox
  useEffect(() => {
    if (isLightboxOpen || isCinematicOpen) {
      document.body.style.overflow = 'hidden';
      if (isLightboxOpen) {
        setLightboxZoom(1);
        setPanPosition({ x: 0, y: 0 });
      }
    } else if (!isTheoryOpen) {
      document.body.style.overflow = 'unset';
    }
    return () => {
      if (!isTheoryOpen) document.body.style.overflow = 'unset';
    };
  }, [isLightboxOpen, isCinematicOpen, isTheoryOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isTheoryOpen || isCinematicOpen) return;

      const activeEl = document.activeElement;
      const tag = activeEl ? activeEl.tagName.toUpperCase() : '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || activeEl?.isContentEditable) {
        return;
      }

      if ((e.key === 'p' || e.key === 'P') && !isLightboxOpen) {
        e.preventDefault();
        stopAllAudio();
        setIsCinematicOpen(true);
        return;
      }

      if (isLightboxOpen) {
        if (e.key === 'Escape') {
          if (lightboxZoom > 1) {
            setLightboxZoom(1);
            setPanPosition({ x: 0, y: 0 });
            return;
          }
          setIsLightboxOpen(false);
          return;
        }
        if (e.key === 'ArrowRight' && currentIndex < comicStrips.length - 1) {
          setCurrentIndex((prev) => prev + 1);
          setPanPosition({ x: 0, y: 0 });
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
          setCurrentIndex((prev) => prev - 1);
          setPanPosition({ x: 0, y: 0 });
        }
        return;
      }

      if (e.key === 'ArrowRight' && currentIndex < comicStrips.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isTheoryOpen, isLightboxOpen, isCinematicOpen, stopAllAudio]);

  const getSpanishVoice = () => {
    const availVoices = voices.length > 0 ? voices : (typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis.getVoices() : []);
    const coVoice = availVoices.find((v) => v.lang && (v.lang.toLowerCase() === 'es-co' || v.lang.toLowerCase() === 'es-419' || v.lang.toLowerCase() === 'es-mx'));
    if (coVoice) return coVoice;
    return availVoices.find((v) => v.lang && v.lang.toLowerCase().startsWith('es'));
  };

  // Play full act narration
  const handleToggleNarration = () => {
    if (!speechSupported) {
      alert('Tu navegador no cuenta con soporte nativo para síntesis de voz.');
      return;
    }

    if (isNarrating && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      return;
    }

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      return;
    }

    stopAllAudio();

    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(currentStrip.narrationScript);
      utteranceRef.current = utterance;
      if (typeof window !== 'undefined') window.__comicUtterance = utterance;

      const spanishVoice = getSpanishVoice();
      if (spanishVoice) utterance.voice = spanishVoice;
      utterance.lang = 'es-ES';
      utterance.rate = speechRate;
      utterance.pitch = 1.0;

      // Sequential dialogue highlights during narration
      const totalDialogues = currentStrip.dialogues.length;
      const scriptLength = currentStrip.narrationScript.length;

      utterance.onboundary = (e) => {
        if (e.name === 'word' || e.name === 'sentence') {
          const progress = e.charIndex / scriptLength;
          const targetIndex = Math.min(
            totalDialogues - 1,
            Math.floor(progress * totalDialogues)
          );
          setHighlightedDialogueIndex(targetIndex);
        }
      };

      utterance.onstart = () => {
        setIsNarrating(true);
        setIsPaused(false);
      };
      utterance.onend = () => {
        setIsNarrating(false);
        setIsPaused(false);
        setHighlightedDialogueIndex(null);
        utteranceRef.current = null;
        if (typeof window !== 'undefined') window.__comicUtterance = null;
      };
      utterance.onerror = (e) => {
        if (e.error === 'interrupted' || e.error === 'canceled') return;
        setIsNarrating(false);
        setIsPaused(false);
        setHighlightedDialogueIndex(null);
        utteranceRef.current = null;
        if (typeof window !== 'undefined') window.__comicUtterance = null;
      };

      window.speechSynthesis.speak(utterance);
    }, 40);
  };

  // Speak a single dialogue with character-specific pitch/rate
  const handleSpeakDialogue = (dlg, originalIndex) => {
    if (!speechSupported) return;

    if (speakingDialogueIndex === originalIndex) {
      stopAllAudio();
      return;
    }

    stopAllAudio();
    setSpeakingDialogueIndex(originalIndex);
    setHighlightedDialogueIndex(originalIndex);

    setTimeout(() => {
      const text = `${dlg.speaker}: ${dlg.text}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance;
      if (typeof window !== 'undefined') window.__comicUtterance = utterance;

      const spanishVoice = getSpanishVoice();
      if (spanishVoice) utterance.voice = spanishVoice;
      utterance.lang = 'es-ES';

      const profile = characterProfiles[dlg.speaker];
      const customPitch = profile?.voiceConfig?.pitch || 1.0;
      const customRate = (profile?.voiceConfig?.rate || 1.0) * speechRate;

      utterance.pitch = customPitch;
      utterance.rate = customRate;

      utterance.onstart = () => {
        setSpeakingDialogueIndex(originalIndex);
      };
      utterance.onend = () => {
        setSpeakingDialogueIndex(null);
        setHighlightedDialogueIndex(null);
        utteranceRef.current = null;
        if (typeof window !== 'undefined') window.__comicUtterance = null;
      };
      utterance.onerror = (e) => {
        if (e.error === 'interrupted' || e.error === 'canceled') return;
        setSpeakingDialogueIndex(null);
        setHighlightedDialogueIndex(null);
        utteranceRef.current = null;
        if (typeof window !== 'undefined') window.__comicUtterance = null;
      };

      window.speechSynthesis.speak(utterance);
    }, 40);
  };

  const handleCopyTranscript = async () => {
    const fullText = `Tira Cómica ${currentStrip.id}: ${currentStrip.title}\n${currentStrip.subtitle}\n\nDiálogos:\n` +
      currentStrip.dialogues.map((d) => `${d.speaker} (${d.role}): "${d.text}"`).join('\n') +
      `\n\nNarración Oral:\n${currentStrip.narrationScript}\n\nFundamento Teórico: ${currentStrip.theory.title} (${currentStrip.theory.author})`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(fullText);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = fullText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedTranscript(true);
      setTimeout(() => setCopiedTranscript(false), 2000);
    } catch (e) {
      console.warn('Error copiando transcripción:', e);
    }
  };

  // Lightbox Pan & Tactile RevealZoom handlers
  const handleMouseDown = (e) => {
    dragStartPosRef.current = { x: e.clientX, y: e.clientY };
    hasDraggedRef.current = false;
    if (lightboxZoom > 1) {
      setIsDragging(true);
      dragStartRef.current = { x: e.clientX - panPosition.x, y: e.clientY - panPosition.y };
    }
  };

  const handleMouseMove = (e) => {
    const dist = Math.hypot(e.clientX - dragStartPosRef.current.x, e.clientY - dragStartPosRef.current.y);
    if (dist > 5) {
      hasDraggedRef.current = true;
    }

    if (!isDragging || lightboxZoom <= 1) return;
    const container = e.currentTarget.getBoundingClientRect();
    const maxPanX = Math.max(0, (container.width * (lightboxZoom - 1)) / 2);
    const maxPanY = Math.max(0, (container.height * (lightboxZoom - 1)) / 2);
    const rawX = e.clientX - dragStartRef.current.x;
    const rawY = e.clientY - dragStartRef.current.y;
    setPanPosition({
      x: Math.max(-maxPanX, Math.min(maxPanX, rawX)),
      y: Math.max(-maxPanY, Math.min(maxPanY, rawY))
    });
  };

  const handleMouseUp = (e) => {
    setIsDragging(false);
    // If clicked without dragging, toggle tactile RevealZoom
    if (!hasDraggedRef.current) {
      if (lightboxZoom > 1) {
        setLightboxZoom(1);
        setPanPosition({ x: 0, y: 0 });
      } else {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left - rect.width / 2;
        const clickY = e.clientY - rect.top - rect.height / 2;
        const newZoom = 2.2;
        const maxPanX = Math.max(0, (rect.width * (newZoom - 1)) / 2);
        const maxPanY = Math.max(0, (rect.height * (newZoom - 1)) / 2);
        setLightboxZoom(newZoom);
        setPanPosition({
          x: Math.max(-maxPanX, Math.min(maxPanX, -clickX * (newZoom - 1))),
          y: Math.max(-maxPanY, Math.min(maxPanY, -clickY * (newZoom - 1)))
        });
      }
    }
  };

  const filteredDialogues = currentStrip.dialogues.filter((dlg) => {
    if (selectedCharacterFilter === 'ALL') return true;
    return dlg.speaker.toLowerCase().includes(selectedCharacterFilter.toLowerCase());
  });

  const shortTitles = [
    "1. Tradición",
    "2. Choque",
    "3. Descongelamiento",
    "4. Experimentación",
    "5. Síntesis"
  ];

  return (
    <section id="comic-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto scroll-mt-6 text-ink">
      {/* Editorial Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-4 border-b border-hairline-gray">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-eclipse-violet">
            Narrativa Gráfica en 5 Actos
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight mt-0.5">
            Visor Interactivo del Cómic Escolar
          </h2>
        </div>

        <p className="text-xs text-slate max-w-sm font-normal leading-relaxed">
          Haz clic en cualquier diálogo para escuchar la voz del personaje (DUA) o activa la narración continua del acto.
        </p>
      </div>

      {/* 5-Act Segmented Navigation Bar */}
      <div className="mb-6">
        <div className="grid grid-cols-5 gap-1.5 p-1.5 bg-pure-white rounded-2xl border border-hairline-gray shadow-xs">
          {comicStrips.map((strip, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={strip.id}
                onClick={() => setCurrentIndex(idx)}
                className={`flex items-center justify-center gap-1.5 px-2 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-deep-plum text-pure-white shadow-xs'
                    : 'text-slate hover:text-ink hover:bg-studio-off-white'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                    isActive ? 'bg-eclipse-violet text-pure-white' : 'bg-studio-off-white text-slate'
                  }`}
                >
                  {strip.id}
                </span>
                <span className="hidden md:inline truncate">{shortTitles[idx].replace(/^\d+\.\s*/, '')}</span>
                <span className="md:hidden text-[11px]">Tira {strip.id}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-[11px] text-soft-mist mt-2 px-1">
          <span className="text-slate font-medium">
            Acto {currentIndex + 1} de {comicStrips.length}: <strong className="text-deep-plum font-semibold">{currentStrip.title}</strong>
          </span>
          <span className="hidden sm:inline">Navegación por teclado: ← / →</span>
        </div>
      </div>

      {/* Main Comic Presentation Card */}
      <div className="bg-pure-white rounded-3xl p-5 sm:p-8 border border-hairline-gray shadow-sm space-y-6">
        {/* Strip Header Info & Theory Action */}
        <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-hairline-gray">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-eclipse-violet">
                {currentStrip.act}
              </span>
              <span className="text-soft-mist text-xs">·</span>
              <span className="text-xs text-slate font-medium">{currentStrip.subtitle}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-ink tracking-tight mt-1">
              {currentStrip.title}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                stopAllAudio();
                setIsCinematicOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-deep-plum hover:bg-ink text-pure-white transition-all shadow-xs hover:scale-105"
              title="Iniciar recorrido cinemático 3D guiado por viñetas (Tecla P)"
            >
              <Sparkles className="w-3.5 h-3.5 text-lavender-mist" />
              <span>Presentación 3D Cinemática</span>
            </button>

            <button
              onClick={() => setIsTheoryOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-studio-off-white hover:bg-hairline-gray text-deep-plum border border-hairline-gray transition-colors shadow-xs"
              title="Abrir panel con modelo teórico y autores"
            >
              <BookOpen className="w-3.5 h-3.5 text-eclipse-violet" />
              <span>Fundamento Teórico</span>
            </button>
          </div>
        </div>

        {/* Comic Strip Image Canvas */}
        <div
          className="relative group bg-studio-off-white rounded-2xl p-2 sm:p-4 border border-hairline-gray/80 flex flex-col items-center justify-center overflow-hidden cursor-pointer"
          onClick={() => setIsLightboxOpen(true)}
          title="Haz clic para ampliar la tira cómica a pantalla completa"
        >
          <img
            src={getAssetUrl(currentStrip.image)}
            onError={(e) => {
              if (!e.target.dataset.triedFallback) {
                e.target.dataset.triedFallback = 'true';
                e.target.src = getAssetUrl(currentStrip.fallbackImage);
              }
            }}
            alt={currentStrip.alt}
            className="w-full max-h-[580px] object-contain rounded-xl transition-transform duration-200 group-hover:scale-[1.006]"
            loading="eager"
          />

          {/* Discreet Hover Buttons */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                stopAllAudio();
                setIsCinematicOpen(true);
              }}
              aria-label="Iniciar Modo Presentación 3D"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-deep-plum/90 hover:bg-deep-plum text-pure-white shadow-sm border border-white/20 text-xs font-semibold transition-transform hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5 text-lavender-mist" />
              <span className="hidden sm:inline">Presentación 3D (P)</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsLightboxOpen(true);
              }}
              aria-label="Ver a pantalla completa"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pure-white/95 hover:bg-pure-white text-deep-plum shadow-sm border border-hairline-gray text-xs font-semibold transition-transform hover:scale-105"
            >
              <Maximize2 className="w-3.5 h-3.5 text-eclipse-violet" />
              <span className="hidden sm:inline">Ampliar detalle</span>
            </button>
          </div>
        </div>

        {/* Audio DUA Narration Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-studio-off-white border border-hairline-gray">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleToggleNarration}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                isNarrating && !isPaused
                  ? 'bg-deep-plum text-pure-white shadow-xs'
                  : 'bg-eclipse-violet hover:bg-deep-plum text-pure-white shadow-xs'
              }`}
            >
              {isNarrating && !isPaused ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Pausar narración oral</span>
                  <span className="flex items-center gap-0.5 ml-1">
                    <span className="wave-bar w-1 bg-pure-white rounded-full" />
                    <span className="wave-bar w-1 bg-pure-white rounded-full" />
                    <span className="wave-bar w-1 bg-pure-white rounded-full" />
                  </span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isPaused ? 'Reanudar narración' : 'Escuchar narración del acto'}</span>
                </>
              )}
            </button>

            {(isNarrating || isPaused) && (
              <button
                onClick={stopAllAudio}
                className="p-2 rounded-full bg-pure-white hover:bg-hairline-gray text-slate hover:text-ink border border-hairline-gray transition-colors"
                title="Detener reproducción"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Playback speed selector */}
            <div className="hidden sm:flex items-center gap-1 pl-2 border-l border-hairline-gray text-xs text-slate">
              <span className="text-[11px] text-soft-mist mr-1">Velocidad:</span>
              {[1.0, 1.2, 1.5].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setSpeechRate(rate)}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-colors ${
                    speechRate === rate
                      ? 'bg-pure-white text-deep-plum shadow-xs border border-hairline-gray'
                      : 'text-slate hover:text-ink'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handleCopyTranscript}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate hover:text-ink bg-pure-white border border-hairline-gray transition-colors"
              title="Copiar texto y diálogos del acto al portapapeles"
            >
              {copiedTranscript ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copiedTranscript ? '¡Copiado!' : 'Copiar texto'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Character Dialogue Section */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-deep-plum">
                Diálogos e Interacción Pedagógica (DUA)
              </h4>
              <p className="text-[11px] text-slate mt-0.5">
                Haz clic en cualquier parlamento para escuchar la voz sintetizada del personaje
              </p>
            </div>

            {/* Perspective Filter Pills */}
            <div className="flex items-center gap-1 bg-studio-off-white p-1 rounded-full border border-hairline-gray text-xs">
              <button
                onClick={() => setSelectedCharacterFilter('ALL')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                  selectedCharacterFilter === 'ALL'
                    ? 'bg-pure-white text-deep-plum shadow-xs'
                    : 'text-slate hover:text-ink'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setSelectedCharacterFilter('Jorge')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                  selectedCharacterFilter === 'Jorge'
                    ? 'bg-pure-white text-deep-plum shadow-xs'
                    : 'text-slate hover:text-ink'
                }`}
              >
                Prof. Jorge
              </button>
              <button
                onClick={() => setSelectedCharacterFilter('Laura')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                  selectedCharacterFilter === 'Laura'
                    ? 'bg-pure-white text-deep-plum shadow-xs'
                    : 'text-slate hover:text-ink'
                }`}
              >
                Doc. Laura
              </button>
              <button
                onClick={() => setSelectedCharacterFilter('Carmen')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                  selectedCharacterFilter === 'Carmen'
                    ? 'bg-pure-white text-deep-plum shadow-xs'
                    : 'text-slate hover:text-ink'
                }`}
              >
                Rectora Carmen
              </button>
            </div>
          </div>

          {/* Contextual insight banner when character is filtered */}
          {selectedCharacterFilter !== 'ALL' && (
            <div className="p-3.5 rounded-2xl bg-studio-off-white border border-hairline-gray text-xs text-slate space-y-1 animate-in fade-in duration-150">
              <p className="font-bold text-deep-plum">
                Perspectiva: {selectedCharacterFilter === 'Jorge' ? characterProfiles['Profesor Jorge'].archetype : selectedCharacterFilter === 'Laura' ? characterProfiles['Docente Laura'].archetype : characterProfiles['Rectora Carmen'].archetype}
              </p>
              <p className="text-[11px] leading-relaxed">
                {selectedCharacterFilter === 'Jorge' ? characterProfiles['Profesor Jorge'].insight : selectedCharacterFilter === 'Laura' ? characterProfiles['Docente Laura'].insight : characterProfiles['Rectora Carmen'].insight}
              </p>
            </div>
          )}

          {/* Dialogues Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredDialogues.map((dlg, idx) => {
              const originalIndex = currentStrip.dialogues.indexOf(dlg);
              const isCurrentlySpeaking = speakingDialogueIndex === originalIndex;
              const isHighlighted = highlightedDialogueIndex === originalIndex;

              return (
                <div
                  key={idx}
                  onClick={() => handleSpeakDialogue(dlg, originalIndex)}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                    isCurrentlySpeaking || isHighlighted
                      ? 'bg-pure-white border-eclipse-violet shadow-sm ring-2 ring-eclipse-violet/20'
                      : 'bg-studio-off-white/60 hover:bg-pure-white border-hairline-gray hover:shadow-xs'
                  }`}
                  title="Haz clic para escuchar este diálogo"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-deep-plum">
                      {dlg.speaker}
                    </span>
                    <span className="text-[10px] text-slate bg-pure-white px-2 py-0.5 rounded-full border border-hairline-gray/60">
                      {dlg.role}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-ink font-medium leading-relaxed mb-2">
                    «{dlg.text}»
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-hairline-gray/60 text-[11px]">
                    <span className="text-soft-mist italic line-clamp-1">{dlg.tone}</span>
                    <span className="text-eclipse-violet font-semibold flex items-center gap-1 shrink-0 ml-2">
                      {isCurrentlySpeaking ? (
                        <>
                          <span className="flex items-center gap-0.5 mr-1">
                            <span className="wave-bar w-1 bg-eclipse-violet rounded-full" />
                            <span className="wave-bar w-1 bg-eclipse-violet rounded-full" />
                            <span className="wave-bar w-1 bg-eclipse-violet rounded-full" />
                          </span>
                          <span>Escuchando</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3 h-3" />
                          <span>Escuchar</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Act Navigation Footer (Anterior / Siguiente) */}
        <div className="pt-6 border-t border-hairline-gray flex items-center justify-between">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-studio-off-white hover:bg-hairline-gray disabled:opacity-40 disabled:cursor-not-allowed text-ink border border-hairline-gray transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Acto Anterior</span>
          </button>

          <span className="text-xs font-bold text-slate">
            Tira {currentIndex + 1} de {comicStrips.length}
          </span>

          <button
            onClick={() => setCurrentIndex((prev) => Math.min(comicStrips.length - 1, prev + 1))}
            disabled={currentIndex === comicStrips.length - 1}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-deep-plum hover:bg-ink disabled:opacity-40 disabled:cursor-not-allowed text-pure-white transition-colors shadow-xs"
          >
            <span>Acto Siguiente</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tactile Lightbox Modal with Zoom & Pan */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ink/85 backdrop-blur-sm select-none"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full h-[90vh] flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Top Bar */}
            <div className="flex items-center justify-between text-pure-white mb-2 px-2 bg-black/40 backdrop-blur-md p-2.5 rounded-2xl border border-white/10">
              <div className="text-xs flex items-center gap-2">
                <span className="font-bold text-lavender-mist">{currentStrip.act}</span>
                <span>·</span>
                <span className="font-medium truncate max-w-[240px] sm:max-w-md">{currentStrip.title}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setLightboxZoom((z) => Math.min(2.2, z + 0.25))}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-pure-white transition-colors"
                  title="Aumentar zoom"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setLightboxZoom((z) => {
                      const next = Math.max(0.75, z - 0.25);
                      if (next <= 1) setPanPosition({ x: 0, y: 0 });
                      return next;
                    });
                  }}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-pure-white transition-colors"
                  title="Reducir zoom"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setLightboxZoom(1);
                    setPanPosition({ x: 0, y: 0 });
                  }}
                  className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-semibold text-pure-white transition-colors"
                  title="Restablecer tamaño (100%)"
                >
                  100%
                </button>

                <div className="w-px h-4 bg-white/20 mx-1" />

                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-pure-white transition-colors"
                  aria-label="Cerrar vista completa"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tactile Image Viewport */}
            <div
              className={`relative flex-grow flex items-center justify-center rounded-2xl bg-black/40 overflow-hidden ${
                lightboxZoom > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'
              }`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <img
                src={getAssetUrl(currentStrip.image)}
                onError={(e) => {
                  if (!e.target.dataset.triedFallback) {
                    e.target.dataset.triedFallback = 'true';
                    e.target.src = getAssetUrl(currentStrip.fallbackImage);
                  }
                }}
                alt={currentStrip.alt}
                draggable={false}
                style={{
                  transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${lightboxZoom})`,
                  transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                  transformOrigin: 'center center'
                }}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg select-none shadow-2xl pointer-events-none"
              />

              {/* Strip Switchers Inside Lightbox */}
              <button
                onClick={() => {
                  setCurrentIndex((prev) => Math.max(0, prev - 1));
                  setPanPosition({ x: 0, y: 0 });
                }}
                disabled={currentIndex === 0}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-pure-white disabled:opacity-20 disabled:cursor-not-allowed border border-white/10 transition-colors shadow-lg"
                title="Tira anterior (←)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  setCurrentIndex((prev) => Math.min(comicStrips.length - 1, prev + 1));
                  setPanPosition({ x: 0, y: 0 });
                }}
                disabled={currentIndex === comicStrips.length - 1}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-pure-white disabled:opacity-20 disabled:cursor-not-allowed border border-white/10 transition-colors shadow-lg"
                title="Tira siguiente (→)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Footer & Gestures Hint */}
            <div className="flex items-center justify-between text-[11px] text-soft-mist mt-2 px-3">
              <span className="flex items-center gap-1.5">
                <Move className="w-3.5 h-3.5" />
                <span>{lightboxZoom > 1 ? 'Haz clic para alejar · Arrastra para desplazar' : 'Haz clic en cualquier punto para zoom táctil (RevealZoom)'}</span>
              </span>
              <span>Usa ← / → para cambiar de tira · ESC para alejar/cerrar</span>
            </div>
          </div>
        </div>
      )}

      {/* Theoretical Foundation Slide-over Drawer */}
      <TheoryModal
        isOpen={isTheoryOpen}
        onClose={() => setIsTheoryOpen(false)}
        strip={currentStrip}
      />

      {/* Cinematic Presentation & Spatial Camera Viewer (Impress.js & Reveal.js inspired) */}
      <CinematicPresentationViewer
        isOpen={isCinematicOpen}
        onClose={() => setIsCinematicOpen(false)}
        comicStrips={comicStrips}
        initialActIndex={currentIndex}
        onActChange={(idx) => setCurrentIndex(idx)}
        characterProfiles={characterProfiles}
      />
    </section>
  );
}
