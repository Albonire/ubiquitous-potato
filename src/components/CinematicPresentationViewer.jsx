import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  X,
  HelpCircle,
  Eye,
  Crosshair,
  Sparkles,
  Layers
} from 'lucide-react';

export default function CinematicPresentationViewer({
  isOpen,
  onClose,
  comicStrips,
  initialActIndex = 0,
  onActChange,
  characterProfiles = {}
}) {
  const [currentActIndex, setCurrentActIndex] = useState(initialActIndex);
  // -1 represents the full panoramic overview; 0..N-1 represent specific vignette panels
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [revealZoom, setRevealZoom] = useState(null); // { x: number, y: number, scale: number } | null
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [voices, setVoices] = useState([]);

  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const autoPlayTimerRef = useRef(null);
  const speechStartTimerRef = useRef(null);
  const utteranceRef = useRef(null);
  const isAutoPlayRef = useRef(false);
  const advanceNextRef = useRef(null);

  useEffect(() => {
    isAutoPlayRef.current = isAutoPlay;
  }, [isAutoPlay]);

  const currentStrip = comicStrips[currentActIndex] || comicStrips[0];
  const panels = currentStrip?.panels || [];
  const totalPanels = panels.length;
  const isOverview = currentPanelIndex === -1;
  const currentPanel = !isOverview && panels[currentPanelIndex] ? panels[currentPanelIndex] : null;

  const getAssetUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const base = import.meta.env.BASE_URL || '/';
    return base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
  };

  // Sync initial act index when opened
  useEffect(() => {
    if (isOpen) {
      setCurrentActIndex(initialActIndex);
      setCurrentPanelIndex(0);
      setRevealZoom(null);
    }
  }, [isOpen, initialActIndex]);

  // Load available speech synthesis voices
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const updateVoices = () => {
        try {
          const avail = window.speechSynthesis.getVoices();
          if (avail && avail.length > 0) setVoices(avail);
        } catch {
          // ignore
        }
      };
      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  }, []);

  const getSpanishVoice = useCallback(() => {
    const availVoices = voices.length > 0 ? voices : (typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis.getVoices() : []);
    const coVoice = availVoices.find((v) => v.lang && (v.lang.toLowerCase() === 'es-co' || v.lang.toLowerCase() === 'es-419' || v.lang.toLowerCase() === 'es-mx'));
    if (coVoice) return coVoice;
    return availVoices.find((v) => v.lang && v.lang.toLowerCase().startsWith('es'));
  }, [voices]);

  const stopAudio = useCallback(() => {
    if (speechStartTimerRef.current) {
      clearTimeout(speechStartTimerRef.current);
      speechStartTimerRef.current = null;
    }
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    utteranceRef.current = null;
    if (typeof window !== 'undefined') {
      window.__cinematicUtterance = null;
    }
  }, []);

  // Stop auto-play and audio when closing or changing act
  useEffect(() => {
    if (!isOpen) {
      stopAudio();
      setIsAutoPlay(false);
    }
  }, [isOpen, stopAudio]);

  // Stop speech when changing act or strip
  useEffect(() => {
    stopAudio();
  }, [currentActIndex, stopAudio]);

  // Advance to next panel or next act
  const advanceNext = useCallback(() => {
    stopAudio();
    setRevealZoom(null);

    if (isOverview) {
      setCurrentPanelIndex(0);
      return;
    }

    if (currentPanelIndex < totalPanels - 1) {
      setCurrentPanelIndex((prev) => prev + 1);
    } else {
      // Reached the end of panels for this act
      if (currentActIndex < comicStrips.length - 1) {
        const nextAct = currentActIndex + 1;
        setCurrentActIndex(nextAct);
        setCurrentPanelIndex(0);
        if (onActChange) onActChange(nextAct);
      } else {
        // Loop back or show overview
        setCurrentPanelIndex(-1);
        setIsAutoPlay(false);
      }
    }
  }, [isOverview, currentPanelIndex, totalPanels, currentActIndex, comicStrips.length, onActChange, stopAudio]);

  useEffect(() => {
    advanceNextRef.current = advanceNext;
  }, [advanceNext]);

  // Go to previous panel or previous act
  const stepBack = useCallback(() => {
    stopAudio();
    setRevealZoom(null);

    if (isOverview) {
      setCurrentPanelIndex(totalPanels - 1);
      return;
    }

    if (currentPanelIndex > 0) {
      setCurrentPanelIndex((prev) => prev - 1);
    } else {
      if (currentActIndex > 0) {
        const prevAct = currentActIndex - 1;
        setCurrentActIndex(prevAct);
        const prevPanels = comicStrips[prevAct]?.panels || [];
        setCurrentPanelIndex(Math.max(0, prevPanels.length - 1));
        if (onActChange) onActChange(prevAct);
      } else {
        setCurrentPanelIndex(-1);
      }
    }
  }, [isOverview, currentPanelIndex, totalPanels, currentActIndex, comicStrips, onActChange, stopAudio]);

  // Voice narration for active panel
  const speakActivePanel = useCallback(() => {
    if (speechStartTimerRef.current) {
      clearTimeout(speechStartTimerRef.current);
      speechStartTimerRef.current = null;
    }

    if (isMuted || !currentPanel || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (isAutoPlayRef.current) {
        if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
        autoPlayTimerRef.current = setTimeout(() => {
          advanceNextRef.current?.();
        }, 5000);
      }
      return;
    }

    stopAudio();

    // Short buffer before speaking to allow camera transition to start
    speechStartTimerRef.current = setTimeout(() => {
      const textToSpeak = `${currentPanel.speaker}: ${currentPanel.text}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utteranceRef.current = utterance;
      if (typeof window !== 'undefined') {
        window.__cinematicUtterance = utterance;
      }

      const spVoice = getSpanishVoice();
      if (spVoice) utterance.voice = spVoice;
      utterance.lang = 'es-ES';

      const profile = characterProfiles[currentPanel.speaker];
      utterance.pitch = profile?.voiceConfig?.pitch || 1.0;
      utterance.rate = (profile?.voiceConfig?.rate || 1.0);

      utterance.onstart = () => {
        if (utteranceRef.current === utterance) {
          setIsSpeaking(true);
        }
      };

      utterance.onend = () => {
        if (utteranceRef.current !== utterance) return;
        setIsSpeaking(false);
        utteranceRef.current = null;
        if (typeof window !== 'undefined') window.__cinematicUtterance = null;
        if (isAutoPlayRef.current) {
          if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
          autoPlayTimerRef.current = setTimeout(() => {
            advanceNextRef.current?.();
          }, 2200);
        }
      };

      utterance.onerror = (err) => {
        if (err.error === 'interrupted' || err.error === 'canceled') return;
        if (utteranceRef.current !== utterance) return;
        setIsSpeaking(false);
        utteranceRef.current = null;
        if (typeof window !== 'undefined') window.__cinematicUtterance = null;
        if (isAutoPlayRef.current) {
          if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
          autoPlayTimerRef.current = setTimeout(() => {
            advanceNextRef.current?.();
          }, 3000);
        }
      };

      try {
        window.speechSynthesis.speak(utterance);
      } catch {
        setIsSpeaking(false);
      }
    }, 250);
  }, [isMuted, currentPanel, stopAudio, getSpanishVoice, characterProfiles]);

  // Trigger speech when active panel changes
  useEffect(() => {
    if (!isOpen) return;

    if (currentPanelIndex >= 0 && !revealZoom) {
      speakActivePanel();
    } else {
      stopAudio();
    }

    return () => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    };
  }, [currentPanelIndex, currentActIndex, revealZoom, isOpen, speakActivePanel, stopAudio]);

  // Handle autoPlay toggle
  const toggleAutoPlay = () => {
    const nextState = !isAutoPlay;
    setIsAutoPlay(nextState);
    if (!nextState) {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    } else {
      if (isOverview) {
        setCurrentPanelIndex(0);
      } else {
        speakActivePanel();
      }
    }
  };

  // RevealZoom click handler: Clicking anywhere zooms to that exact coordinate
  const handleImageClick = (e) => {
    if (revealZoom) {
      // Second click returns to normal
      setRevealZoom(null);
      return;
    }

    const targetEl = imageRef.current || e.currentTarget;
    const rect = targetEl.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    setRevealZoom({
      x: Math.max(5, Math.min(95, clickX)),
      y: Math.max(5, Math.min(95, clickY)),
      scale: 2.5
    });
  };

  // Keyboard navigation & shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      // Escape
      if (e.key === 'Escape') {
        if (revealZoom) {
          setRevealZoom(null);
        } else if (showShortcuts) {
          setShowShortcuts(false);
        } else {
          onClose();
        }
        return;
      }

      // Space / Right arrow: Advance
      if (e.key === ' ' || e.key === 'ArrowRight') {
        e.preventDefault();
        advanceNext();
        return;
      }

      // Left arrow: Step back
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        stepBack();
        return;
      }

      // Up arrow / Down arrow: Switch acts
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        if (currentActIndex < comicStrips.length - 1) {
          const next = currentActIndex + 1;
          setCurrentActIndex(next);
          setCurrentPanelIndex(0);
          if (onActChange) onActChange(next);
        }
        return;
      }

      if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentActIndex > 0) {
          const prev = currentActIndex - 1;
          setCurrentActIndex(prev);
          setCurrentPanelIndex(0);
          if (onActChange) onActChange(prev);
        }
        return;
      }

      // Z key: Toggle Overview / Active Vignette
      if (e.key === 'z' || e.key === 'Z') {
        e.preventDefault();
        if (revealZoom) {
          setRevealZoom(null);
        } else if (isOverview) {
          setCurrentPanelIndex(0);
        } else {
          setCurrentPanelIndex(-1);
        }
        return;
      }

      // M key: Mute / Unmute
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        setIsMuted((prev) => !prev);
        return;
      }

      // F key: Fullscreen
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
        return;
      }

      // ? key: Shortcuts
      if (e.key === '?') {
        e.preventDefault();
        setShowShortcuts((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, revealZoom, showShortcuts, onClose, advanceNext, stepBack, currentActIndex, comicStrips.length, onActChange, isOverview]);

  // Fullscreen helper
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  if (!isOpen) return null;

  // Compute Spatial Camera Transform (impress.js & reveal.js style)
  let targetX = 50;
  let targetY = 50;
  let scale = 1.0;
  let rotateX = 0;
  let rotateY = 0;
  let rotateZ = 0;

  if (revealZoom) {
    targetX = revealZoom.x;
    targetY = revealZoom.y;
    scale = revealZoom.scale;
    // Dynamic perspective tilt toward clicked quadrant
    rotateY = (50 - targetX) * 0.08;
    rotateX = (targetY - 50) * 0.08;
    rotateZ = 0;
  } else if (!isOverview && currentPanel) {
    targetX = currentPanel.x;
    targetY = currentPanel.y;
    scale = currentPanel.zoom || 1.9;
    rotateX = currentPanel.rotateX || 0;
    rotateY = currentPanel.rotateY || 0;
    rotateZ = currentPanel.rotateZ || 0;
  }

  // Exact centering percentage
  const translateX = (50 - targetX) * scale;
  const translateY = (50 - targetY) * scale;

  const cameraTransform = `translate3d(${translateX}%, ${translateY}%, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;

  const characterColor = (speaker) => {
    if (speaker?.includes('Jorge')) return 'text-amber-300 border-amber-400/40 bg-amber-950/30';
    if (speaker?.includes('Laura')) return 'text-sky-300 border-sky-400/40 bg-sky-950/30';
    if (speaker?.includes('Carmen')) return 'text-purple-300 border-purple-400/40 bg-purple-950/30';
    return 'text-white border-white/20 bg-white/10';
  };

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Modo Presentación Cinemática 3D"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0e0a14] text-pure-white select-none overflow-hidden font-sans"
    >
      {/* Background theatrical ambient vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(122,64,237,0.08)_0%,rgba(14,10,20,0.92)_80%)]" />

      {/* Top Header Bar: Clean Swiss Editorial Layout */}
      <header className="relative z-30 flex items-center justify-between px-4 sm:px-8 py-3.5 bg-[#17082c]/80 backdrop-blur-md border-b border-white/10 shadow-xs">
        {/* Left: Act Navigator & Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-white/5 rounded-full border border-white/10">
            {comicStrips.map((strip, idx) => {
              const isActActive = idx === currentActIndex;
              return (
                <button
                  key={strip.id}
                  onClick={() => {
                    setCurrentActIndex(idx);
                    setCurrentPanelIndex(0);
                    setRevealZoom(null);
                    if (onActChange) onActChange(idx);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    isActActive
                      ? 'bg-eclipse-violet text-pure-white shadow-xs'
                      : 'text-slate hover:text-pure-white hover:bg-white/10'
                  }`}
                  title={`Acto ${strip.id}: ${strip.title}`}
                >
                  <span>Acto {strip.id}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden md:flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-lavender-mist">
              {currentStrip.act} · {currentStrip.subtitle}
            </span>
            <h1 className="text-sm font-bold text-pure-white tracking-tight truncate max-w-sm lg:max-w-md">
              {currentStrip.title}
            </h1>
          </div>
        </div>

        {/* Center: Vignette Status Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs">
          {revealZoom ? (
            <span className="flex items-center gap-1.5 text-volt font-medium">
              <Crosshair className="w-3.5 h-3.5 animate-spin" />
              <span>RevealZoom Focal: {Math.round(revealZoom.x)}%, {Math.round(revealZoom.y)}%</span>
            </span>
          ) : isOverview ? (
            <span className="flex items-center gap-1.5 text-lavender-mist font-medium">
              <Eye className="w-3.5 h-3.5" />
              <span>Plano General Panorámico (Vista 100%)</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-pure-white font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Viñeta {currentPanelIndex + 1} de {totalPanels}: <strong>{currentPanel?.title}</strong></span>
            </span>
          )}
        </div>

        {/* Right: Actions (Auto-Play, Overview, Audio, Help, Close) */}
        <div className="flex items-center gap-2">
          {/* Overview Toggle */}
          <button
            onClick={() => {
              if (revealZoom) {
                setRevealZoom(null);
              } else if (isOverview) {
                setCurrentPanelIndex(0);
              } else {
                setCurrentPanelIndex(-1);
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              isOverview
                ? 'bg-white/20 border-white/30 text-pure-white'
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate hover:text-pure-white'
            }`}
            title="Alternar vista panorámica y viñeta activa (Tecla Z)"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isOverview ? 'Enfocar Viñeta' : 'Plano General'}</span>
          </button>

          {/* Auto-advance Play/Pause */}
          <button
            onClick={toggleAutoPlay}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              isAutoPlay
                ? 'bg-emerald-600 hover:bg-emerald-500 border-emerald-400/30 text-pure-white shadow-xs'
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate hover:text-pure-white'
            }`}
            title={isAutoPlay ? "Pausar tour automático" : "Iniciar reproducción automática (Auto-Play)"}
          >
            {isAutoPlay ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span className="hidden sm:inline">{isAutoPlay ? 'Pausar Tour' : 'Auto-Play'}</span>
          </button>

          {/* Mute Audio */}
          <button
            onClick={() => setIsMuted((m) => !m)}
            className={`p-2 rounded-full border transition-all ${
              isMuted
                ? 'bg-rose-950/40 border-rose-500/30 text-rose-300'
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate hover:text-pure-white'
            }`}
            title={isMuted ? 'Activar voz DUA (Tecla M)' : 'Silenciar voz DUA (Tecla M)'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="hidden sm:inline-flex p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate hover:text-pure-white transition-colors"
            title="Pantalla completa (Tecla F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Shortcuts Help */}
          <button
            onClick={() => setShowShortcuts((s) => !s)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate hover:text-pure-white transition-colors"
            title="Ver atajos de teclado (?)"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Exit Button */}
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-pure-white transition-colors ml-1"
            aria-label="Salir del modo presentación (ESC)"
            title="Salir del modo presentación (ESC)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main 3D Spatial Canvas Viewport */}
      <main
        className="relative flex-1 w-full h-full perspective-viewport flex items-center justify-center overflow-hidden cursor-crosshair"
        onClick={handleImageClick}
        title="Haz clic en cualquier punto del cómic para hacer RevealZoom, o usa las flechas para navegar viñetas"
      >
        {/* 3D Camera Stage Element */}
        <div
          className="relative max-w-[94vw] max-h-[74vh] flex items-center justify-center cinematic-camera-stage cinematic-camera-transition"
          style={{
            transform: cameraTransform,
            transformOrigin: '50% 50%'
          }}
        >
          <img
            ref={imageRef}
            src={getAssetUrl(currentStrip.image)}
            onError={(e) => {
              if (!e.target.dataset.triedFallback) {
                e.target.dataset.triedFallback = 'true';
                e.target.src = getAssetUrl(currentStrip.fallbackImage);
              }
            }}
            alt={currentStrip.alt}
            draggable={false}
            className="max-h-[74vh] w-auto max-w-full object-contain rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] border border-white/10 select-none pointer-events-none"
          />

          {/* RevealZoom Click Reticle */}
          {revealZoom && (
            <div
              className="absolute pointer-events-none w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-volt/80 shadow-[0_0_20px_rgba(245,255,99,0.5)] reticle-pulse"
              style={{
                left: `${revealZoom.x}%`,
                top: `${revealZoom.y}%`
              }}
            >
              <div className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-volt" />
            </div>
          )}
        </div>

        {/* Tactile Gestures / Interaction Overlay Hints */}
        {revealZoom && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-volt/30 text-xs font-semibold text-volt flex items-center gap-2 shadow-lg animate-in fade-in duration-200">
            <Crosshair className="w-3.5 h-3.5 animate-spin" />
            <span>RevealZoom Activo · Haz clic en cualquier lugar o presiona ESC para alejar</span>
          </div>
        )}
      </main>

      {/* Cinematic Dialogue Subtitle (Minimalist Swiss Typography) */}
      <footer className="relative z-30 px-4 sm:px-8 pb-4 flex flex-col gap-3">
        {/* Floating Subtitle Box */}
        {currentPanel && !isOverview && (
          <div className="max-w-4xl mx-auto w-full p-4 sm:p-5 rounded-2xl bg-[#17082c]/85 backdrop-blur-md border border-white/15 shadow-xl cinematic-subtitle-anim space-y-2">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${characterColor(currentPanel.speaker)}`}
                >
                  {currentPanel.speaker}
                </span>
                <span className="text-xs text-lavender-mist font-medium hidden sm:inline">
                  {currentPanel.role}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                {isSpeaking && (
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold text-[11px]">
                    <span className="flex items-center gap-0.5">
                      <span className="wave-bar w-0.5 bg-emerald-400 rounded-full" />
                      <span className="wave-bar w-0.5 bg-emerald-400 rounded-full" />
                      <span className="wave-bar w-0.5 bg-emerald-400 rounded-full" />
                    </span>
                    <span>Voz DUA Activa</span>
                  </span>
                )}
                <span className="text-[11px] text-soft-mist italic hidden md:inline truncate max-w-xs">
                  {currentPanel.tone}
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base md:text-lg font-medium text-pure-white leading-relaxed tracking-tight">
              «{currentPanel.text}»
            </p>
          </div>
        )}

        {/* Overview Banner when in panoramic mode */}
        {isOverview && (
          <div className="max-w-xl mx-auto w-full p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center text-xs text-lavender-mist animate-in fade-in duration-200">
            <span>Plano General Panorámico · Usa las flechas o los puntos para explorar las viñetas en 3D</span>
          </div>
        )}

        {/* Presenter Dock Controls (Keynote / Reveal.js style) */}
        <div className="max-w-2xl mx-auto w-full flex items-center justify-between gap-3 px-4 py-2 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 shadow-lg">
          {/* Previous Button */}
          <button
            onClick={stepBack}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/15 text-pure-white border border-white/10 transition-colors"
            title="Viñeta anterior (←)"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Anterior</span>
          </button>

          {/* Vignette Step Dots / Numbers */}
          <div className="flex items-center gap-1.5">
            {/* Overview Dot */}
            <button
              onClick={() => {
                setCurrentPanelIndex(-1);
                setRevealZoom(null);
              }}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all ${
                isOverview
                  ? 'bg-pure-white text-deep-plum border-pure-white shadow-xs'
                  : 'bg-white/5 hover:bg-white/15 text-slate border-white/10'
              }`}
              title="Ver plano general completo (Tecla Z)"
            >
              <Eye className="w-3 h-3" />
            </button>

            {/* Vignette Dots */}
            {panels.map((p, idx) => {
              const isActive = !isOverview && idx === currentPanelIndex;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setCurrentPanelIndex(idx);
                    setRevealZoom(null);
                  }}
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
                    isActive
                      ? 'bg-eclipse-violet text-pure-white border-eclipse-violet shadow-xs scale-105'
                      : 'bg-white/5 hover:bg-white/15 text-slate border-white/10 hover:text-pure-white'
                  }`}
                  title={`${p.speaker}: ${p.title}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={advanceNext}
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-eclipse-violet hover:bg-deep-plum text-pure-white border border-eclipse-violet/50 shadow-xs transition-colors"
            title="Siguiente viñeta (→ o Espacio)"
          >
            <span className="hidden sm:inline">Siguiente</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar of Tour */}
        <div className="w-full max-w-2xl mx-auto h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-eclipse-violet transition-all duration-300"
            style={{
              width: isOverview
                ? '0%'
                : `${((currentPanelIndex + 1) / totalPanels) * 100}%`
            }}
          />
        </div>
      </footer>

      {/* Keyboard Shortcuts Overlay Modal */}
      {showShortcuts && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none"
          onClick={() => setShowShortcuts(false)}
        >
          <div
            className="relative max-w-md w-full p-6 rounded-3xl bg-[#17082c] border border-white/20 shadow-2xl text-pure-white space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-eclipse-violet" />
                <h3 className="font-bold text-sm">Atajos del Modo Presentación Cinemática</h3>
              </div>
              <button
                onClick={() => setShowShortcuts(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate hover:text-pure-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate">Avanzar viñeta</span>
                <kbd className="px-2 py-0.5 rounded bg-white/10 font-mono text-[11px]">Espacio / →</kbd>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate">Retroceder</span>
                <kbd className="px-2 py-0.5 rounded bg-white/10 font-mono text-[11px]">←</kbd>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate">Cambiar de Acto</span>
                <kbd className="px-2 py-0.5 rounded bg-white/10 font-mono text-[11px]">↑ / ↓</kbd>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate">Plano / Detalle</span>
                <kbd className="px-2 py-0.5 rounded bg-white/10 font-mono text-[11px]">Z</kbd>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate">RevealZoom</span>
                <kbd className="px-2 py-0.5 rounded bg-white/10 font-mono text-[11px]">Clic libre</kbd>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate">Silenciar voz</span>
                <kbd className="px-2 py-0.5 rounded bg-white/10 font-mono text-[11px]">M</kbd>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate">Pantalla completa</span>
                <kbd className="px-2 py-0.5 rounded bg-white/10 font-mono text-[11px]">F</kbd>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate">Salir / Deshacer zoom</span>
                <kbd className="px-2 py-0.5 rounded bg-white/10 font-mono text-[11px]">ESC</kbd>
              </div>
            </div>

            <p className="text-[11px] text-slate text-center pt-2">
              Inspirado en la spatial camera de <em>impress.js</em> y el zoom dinámico de <em>reveal.js</em>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
