import React, { useState, useEffect } from 'react';
import {
  Compass,
  Plus,
  Trash2,
  Printer,
  Download,
  RotateCcw,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  Lightbulb,
  CheckCircle,
  FileText,
  Info,
  Sliders,
  Play,
  Pause,
  Layers,
  ArrowLeftRight
} from 'lucide-react';

const scenarioPresets = [
  {
    id: "rural-baseline",
    label: "Caso 1: Estado Inicial (Resistencia Activa)",
    badge: "Fase 1: Pre-Descongelamiento",
    badgeColor: "bg-rose-50 text-rose-800 border-rose-200",
    institution: "Institución Educativa Rural La Esperanza (Sede Multigrado)",
    desiredChange: "Integrar dispositivos tecnológicos (tabletas digitales) en la enseñanza rural sin perder la identidad ni la memoria de la comunidad.",
    targetActors: "Profesor Jorge (docente veterano), rectora Carmen, docente Laura y estudiantes multigrado.",
    drivingForces: [
      { id: 1, name: "Dotación ministerial de tabletas digitales", origin: "Externa (Políticas TIC)", score: 4 },
      { id: 2, name: "Curiosidad de los niños por herramientas visuales", origin: "Interna (Estudiantes)", score: 4 },
      { id: 3, name: "Liderazgo facilitador de la rectora", origin: "Interna (Directivos)", score: 3 }
    ],
    restrainingForces: [
      { id: 101, name: "Miedo al ridículo y pérdida de competencia pedagógica de 25 años", type: "Psicológica / Identidad", score: 5 },
      { id: 102, name: "Arraigo al supuesto de que la tiza es el único medio válido", type: "Supuestos Subyacentes", score: 5 },
      { id: 103, name: "Falta de conectividad y señal eléctrica estable", type: "Infraestructura", score: 4 },
      { id: 104, name: "Parálisis ante mensajes técnicos de ERROR", type: "Experiencia técnica", score: 4 }
    ],
    mediationStrategy: "Identificar las ansiedades docentes sin imponer decretos coactivos; abrir espacios de diálogo sobre el temor a la obsolescencia.",
    transitionPlan: "Acompañamiento personalizado y validación del saber pedagógico tradicional.",
    refreezingPlan: "Proyectar la tecnología como aliada del cuaderno y de la memoria comunitaria veredal."
  },
  {
    id: "rural-transition",
    label: "Caso 2: Fase de Transición y Co-enseñanza",
    badge: "Fase 2: Movimiento y Co-diseño",
    badgeColor: "bg-sky-tint text-deep-plum border-ice-blue",
    institution: "Institución Educativa Rural La Esperanza (Sede Multigrado)",
    desiredChange: "Experimentación protegida en aula multigrado con co-enseñanza intergeneracional (Laura + Jorge).",
    targetActors: "Docentes multigrado en parejas pedagógicas, estudiantes de básica primaria.",
    drivingForces: [
      { id: 1, name: "Co-enseñanza horizontal y apoyo mutuo entre Laura y Jorge", origin: "Interna (Docentes)", score: 5 },
      { id: 2, name: "Entusiasmo de los estudiantes al investigar flora veredal", origin: "Interna (Estudiantes)", score: 5 },
      { id: 3, name: "Seguridad psicológica brindada por la rectora", origin: "Interna (Directivos)", score: 4 },
      { id: 4, name: "Dotación ministerial de tabletas activas", origin: "Externa (Políticas TIC)", score: 4 }
    ],
    restrainingForces: [
      { id: 101, name: "Inseguridad residual en el manejo autónomo de la tableta", type: "Psicológica / Identidad", score: 3 },
      { id: 102, name: "Intermitencia ocasional de señal eléctrica", type: "Infraestructura", score: 3 }
    ],
    mediationStrategy: "Descongelamiento consolidado: la rectora modela y desmitifica el error técnico ('es como el pizarrón, pero digital').",
    transitionPlan: "Aula protegida: proyectos integrados donde la tableta fotografía y el cuaderno reflexiona.",
    refreezingPlan: "Documentación de lecciones aprendidas y socialización en consejo académico."
  },
  {
    id: "rural-refreezing",
    label: "Caso 3: Recongelamiento y Síntesis en PEI",
    badge: "Fase 3: Recongelamiento y Hibridación",
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    institution: "Institución Educativa Rural La Esperanza (Sede Multigrado)",
    desiredChange: "Hibridación cultural consolidada en el Proyecto Educativo Institucional (PEI) y en la práctica cotidiana.",
    targetActors: "Toda la comunidad educativa veredal (docentes, estudiantes, directivos y familias campesinas).",
    drivingForces: [
      { id: 1, name: "Institucionalización en el PEI y mallas curriculares rurales", origin: "Interna (Directivos)", score: 5 },
      { id: 2, name: "Jorge como líder y mentor tecnológico entre pares", origin: "Interna (Docentes)", score: 5 },
      { id: 3, name: "Apropiación comunitaria: investigación del territorio", origin: "Comunitaria (Familias)", score: 5 },
      { id: 4, name: "Integración equilibrada: tableta + cuaderno + tiza", origin: "Pedagógica", score: 5 }
    ],
    restrainingForces: [
      { id: 101, name: "Mantenimiento periódico de baterías y equipos", type: "Infraestructura", score: 2 }
    ],
    mediationStrategy: "Sostenibilidad mediante comités de innovación pedagógica rural y reconocimiento docente.",
    transitionPlan: "Práctica pedagógica regular sin estrés ni coacción.",
    refreezingPlan: "Nuevo equilibrio cuasi-estacionario: cultura de aprendizaje continuo y eficacia escolar compartida."
  }
];

export default function ForceFieldCanvas() {
  const [activeScenarioId, setActiveScenarioId] = useState("rural-baseline");
  const [formData, setFormData] = useState(scenarioPresets[0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);

  // Form input states
  const [newDrivingName, setNewDrivingName] = useState('');
  const [newDrivingScore, setNewDrivingScore] = useState(4);
  const [newDrivingOrigin, setNewDrivingOrigin] = useState('Interna (Docente)');

  const [newRestrainingName, setNewRestrainingName] = useState('');
  const [newRestrainingScore, setNewRestrainingScore] = useState(4);
  const [newRestrainingType, setNewRestrainingType] = useState('Resistencia Cultural');

  // Switch scenario
  const handleSelectScenario = (preset) => {
    setActiveScenarioId(preset.id);
    setFormData(JSON.parse(JSON.stringify(preset)));
    setIsSimulating(false);
  };

  // Pause simulation if user manually changes inputs
  const handleInputChange = (field, value) => {
    if (isSimulating) setIsSimulating(false);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Simulation timer
  useEffect(() => {
    let interval = null;
    if (isSimulating) {
      interval = setInterval(() => {
        setSimulationStep((prev) => {
          const next = (prev + 1) % scenarioPresets.length;
          setFormData(JSON.parse(JSON.stringify(scenarioPresets[next])));
          setActiveScenarioId(scenarioPresets[next].id);
          return next;
        });
      }, 3500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSimulating]);

  // Calculate totals
  const totalDriving = formData.drivingForces.reduce((acc, curr) => acc + curr.score, 0);
  const totalRestraining = formData.restrainingForces.reduce((acc, curr) => acc + curr.score, 0);
  const netBalance = totalDriving - totalRestraining;

  const handleAddDriving = (e) => {
    e.preventDefault();
    if (!newDrivingName.trim()) return;
    if (isSimulating) setIsSimulating(false);
    const newForce = {
      id: Date.now(),
      name: newDrivingName.trim(),
      origin: newDrivingOrigin,
      score: Number(newDrivingScore)
    };
    setFormData((prev) => ({
      ...prev,
      drivingForces: [...prev.drivingForces, newForce]
    }));
    setNewDrivingName('');
  };

  const handleRemoveDriving = (id) => {
    if (isSimulating) setIsSimulating(false);
    setFormData((prev) => ({
      ...prev,
      drivingForces: prev.drivingForces.filter((f) => f.id !== id)
    }));
  };

  const handleUpdateDrivingScore = (id, delta) => {
    if (isSimulating) setIsSimulating(false);
    setFormData((prev) => ({
      ...prev,
      drivingForces: prev.drivingForces.map((f) =>
        f.id === id ? { ...f, score: Math.min(5, Math.max(1, f.score + delta)) } : f
      )
    }));
  };

  const handleAddRestraining = (e) => {
    e.preventDefault();
    if (!newRestrainingName.trim()) return;
    if (isSimulating) setIsSimulating(false);
    const newForce = {
      id: Date.now(),
      name: newRestrainingName.trim(),
      type: newRestrainingType,
      score: Number(newRestrainingScore)
    };
    setFormData((prev) => ({
      ...prev,
      restrainingForces: [...prev.restrainingForces, newForce]
    }));
    setNewRestrainingName('');
  };

  const handleRemoveRestraining = (id) => {
    if (isSimulating) setIsSimulating(false);
    setFormData((prev) => ({
      ...prev,
      restrainingForces: prev.restrainingForces.filter((f) => f.id !== id)
    }));
  };

  const handleUpdateRestrainingScore = (id, delta) => {
    if (isSimulating) setIsSimulating(false);
    setFormData((prev) => ({
      ...prev,
      restrainingForces: prev.restrainingForces.map((f) =>
        f.id === id ? { ...f, score: Math.min(5, Math.max(1, f.score + delta)) } : f
      )
    }));
  };

  const handleClear = () => {
    setIsSimulating(false);
    setActiveScenarioId('custom');
    setFormData({
      institution: "",
      desiredChange: "",
      targetActors: "",
      drivingForces: [],
      restrainingForces: [],
      mediationStrategy: "",
      transitionPlan: "",
      refreezingPlan: ""
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    const exportObject = {
      ...formData,
      metadata: {
        exportedAt: new Date().toISOString(),
        totalDriving,
        totalRestraining,
        netBalance,
        framework: "Kurt Lewin (1951) - Universidad Santo Tomás"
      }
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObject, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `diagnostico_fuerzas_lewin_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <section id="lienzo-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-6">
      {/* Print-only Institutional Header */}
      <div className="hidden print:block mb-8 pb-4 border-b-2 border-slate-900">
        <h1 className="text-xl font-bold text-black">Universidad Santo Tomás · Maestría en Educación</h1>
        <p className="text-xs text-slate-700">Módulo 1: Fundamentos de cultura y cambio organizacional y educativo</p>
        <p className="text-xs text-slate-700 font-semibold mt-1">Diagnóstico de Campo de Fuerzas (Kurt Lewin) — {formData.institution || 'Escuela Rural'}</p>
        <p className="text-[10px] text-slate-500 mt-0.5">Fecha de generación: {new Date().toLocaleDateString('es-CO')}</p>
      </div>

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-badge bg-sky-tint border border-ice-blue text-deep-plum text-xs font-semibold uppercase tracking-wider mb-3">
          <Compass className="w-3.5 h-3.5 text-electric-blue" />
          Herramienta Práctica e Interactiva de Diagnóstico
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight-title mb-4">
          Lienzo de Fuerzas en mi Escuela
        </h2>
        <p className="text-sm sm:text-base text-slate">
          Aplica el <strong>Modelo de Campo de Fuerzas de Kurt Lewin (1951)</strong> a tu propia realidad educativa. Diagnostica las fuerzas que impulsan la transformación y las resistencias que la frenan para diseñar una mediación pedagógica asertiva.
        </p>
      </div>

      {/* Preset Scenarios Selector and Simulation Toolbar */}
      <div className="bg-pure-white p-5 sm:p-6 rounded-card border border-hairline-gray shadow-jitter-xl mb-6 no-print">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-hairline-gray">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate flex items-center gap-2">
              <Layers className="w-4 h-4 text-eclipse-violet" />
              Escenarios Pedagógicos Preconfigurados (Guía del Cómic)
            </h3>
            <p className="text-xs text-soft-mist mt-0.5">
              Carga un estado del cambio para explorar cómo evoluciona el campo de fuerzas en la escuela veredal:
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-button text-xs font-semibold transition-all ${
                isSimulating
                  ? 'bg-deep-plum text-volt shadow-md ring-2 ring-eclipse-violet animate-pulse'
                  : 'bg-lavender-mist/40 hover:bg-lavender-mist/70 text-deep-plum border border-lilac-wash/50'
              }`}
              title="Simular paso a paso las 3 fases del cambio de Lewin"
            >
              {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isSimulating ? 'Pausar Simulación Dinámica' : 'Simular Evolución del Cambio'}</span>
            </button>
          </div>
        </div>

        {/* Preset Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
          {scenarioPresets.map((preset) => {
            const isSelected = activeScenarioId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectScenario(preset)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-studio-off-white border-eclipse-violet ring-2 ring-eclipse-violet/30 shadow-sm'
                    : 'bg-pure-white hover:bg-studio-off-white/60 border-hairline-gray'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${preset.badgeColor}`}>
                    {preset.badge}
                  </span>
                  {isSelected && <Sparkles className="w-3.5 h-3.5 text-eclipse-violet" />}
                </div>
                <p className="text-xs font-bold text-ink">{preset.label}</p>
                <p className="text-[11px] text-slate line-clamp-1 mt-0.5">{preset.desiredChange}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Toolbar Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-pure-white p-4 rounded-3xl border border-hairline-gray shadow-sm no-print">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSelectScenario(scenarioPresets[0])}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-button text-xs font-semibold bg-lavender-mist/40 hover:bg-lavender-mist/70 text-deep-plum border border-lilac-wash/50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-eclipse-violet" />
            Restablecer Caso Rural Base
          </button>
          <button
            onClick={handleClear}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-button text-xs font-semibold text-slate hover:text-ink hover:bg-studio-off-white border border-hairline-gray transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Limpiar Lienzo
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportJSON}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-button text-xs font-semibold text-slate hover:text-ink bg-studio-off-white hover:bg-hairline-gray border border-hairline-gray transition-colors"
            title="Descargar datos en formato JSON"
          >
            <Download className="w-3.5 h-3.5" />
            Descargar JSON
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-button text-xs font-semibold bg-deep-plum hover:bg-ink text-pure-white shadow-sm transition-all"
            title="Generar vista de impresión limpia o exportar a PDF"
          >
            <Printer className="w-3.5 h-3.5 text-volt" />
            Exportar o Imprimir Diagnóstico
          </button>
        </div>
      </div>

      {/* Real-Time Lewin Equilibrium Gauge */}
      <div className="bg-pure-white rounded-card p-6 sm:p-8 mb-8 border border-hairline-gray shadow-jitter-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-eclipse-violet animate-pulse" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-ink">
              Termómetro de Equilibrio Cuasi-Estacionario (Kurt Lewin)
            </h3>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 text-xs font-semibold flex-wrap">
            <span className="text-emerald-700 bg-emerald-50 px-3 py-1 rounded-badge border border-emerald-200">
              Fuerzas Impulsoras (+): <strong>{totalDriving} pts</strong>
            </span>
            <span className="text-rose-700 bg-rose-50 px-3 py-1 rounded-badge border border-rose-200">
              Fuerzas Restrictivas (-): <strong>{totalRestraining} pts</strong>
            </span>
            <span className={`px-3 py-1 rounded-badge font-bold border ${
              totalDriving + totalRestraining === 0
                ? 'bg-studio-off-white text-slate border-hairline-gray'
                : netBalance > 0
                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                : netBalance < 0
                ? 'bg-rose-100 text-rose-900 border-rose-300'
                : 'bg-amber-100 text-amber-900 border-amber-300'
            }`}>
              Balance Neto: {totalDriving + totalRestraining === 0 ? '0 pts' : netBalance > 0 ? `+${netBalance}` : netBalance} pts
            </span>
          </div>
        </div>

        {/* Progress Bar Balance with Center Axis Indicator */}
        <div className="relative">
          <div className="w-full bg-hairline-gray rounded-full h-5 overflow-hidden flex">
            {totalDriving + totalRestraining === 0 ? (
              <div className="w-full bg-soft-mist/20 flex items-center justify-center text-[10px] text-slate font-medium">
                Sin fuerzas registradas (Ingresa fuerzas impulsoras o restrictivas)
              </div>
            ) : (
              <>
                <div
                  className="bg-emerald-500 transition-all duration-500 flex items-center justify-center text-[10px] font-bold text-pure-white"
                  style={{
                    width: `${(totalDriving / (totalDriving + totalRestraining)) * 100}%`
                  }}
                  title={`Fuerzas Impulsoras: ${totalDriving} pts`}
                >
                  {Math.round((totalDriving / (totalDriving + totalRestraining)) * 100)}%
                </div>
                <div
                  className="bg-rose-500 transition-all duration-500 flex items-center justify-center text-[10px] font-bold text-pure-white"
                  style={{
                    width: `${(totalRestraining / (totalDriving + totalRestraining)) * 100}%`
                  }}
                  title={`Fuerzas Restrictivas: ${totalRestraining} pts`}
                >
                  {Math.round((totalRestraining / (totalDriving + totalRestraining)) * 100)}%
                </div>
              </>
            )}
          </div>
          {/* 50% Equilibrium Baseline Marker */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-deep-plum/60 pointer-events-none" title="Eje central de equilibrio (50%)" />
        </div>

        {/* Diagnostic Interpretation with Info icon properly imported */}
        <div className="mt-4 p-4 rounded-2xl bg-studio-off-white text-xs text-slate border border-hairline-gray flex items-start gap-2.5">
          <Info className="w-4 h-4 text-eclipse-violet shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            {totalDriving + totalRestraining === 0 ? (
              <p>
                <strong>Lienzo en Blanco:</strong> Ingresa fuerzas impulsoras (+) y restrictivas (-) para calcular en tiempo real el equilibrio cuasi-estacionario según el modelo de Kurt Lewin. También puedes seleccionar cualquiera de los 3 escenarios preconfigurados.
              </p>
            ) : netBalance > 0 ? (
              <p>
                <strong>Diagnóstico Favorable (+{netBalance} pts):</strong> La intensidad de las fuerzas impulsoras supera la resistencia actual. Sin embargo, para no generar tensión destructiva, Lewin recomienda <em>no acelerar coactivamente</em>, sino continuar reduciendo las ansiedades de los docentes veteranos mediante co-enseñanza y seguridad psicológica.
              </p>
            ) : netBalance < 0 ? (
              <p>
                <strong>Alerta de Bloqueo Cultural ({netBalance} pts):</strong> La magnitud de las fuerzas restrictivas supera la capacidad impulsora. Imponer mandatos generará mayor rigidez. Es prioritario <em>descongelar el sistema</em> abriendo espacios de diálogo y formación previa antes de exigir adopción tecnológica.
              </p>
            ) : (
              <p>
                <strong>Equilibrio Homeostático Neutro (0 pts):</strong> Las fuerzas de avance y de preservación están exactamente igualadas ({totalDriving} pts vs {totalRestraining} pts). Es el momento clave para introducir liderazgo transformacional y modelado entre pares para inclinar la balanza hacia la innovación sostenible.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 4 Quadrants Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* CUADRANTE 1: Situación de Cambio Deseada */}
        <div className="bg-pure-white rounded-card p-6 sm:p-8 border border-hairline-gray shadow-jitter-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-hairline-gray">
              <div className="w-9 h-9 rounded-2xl bg-sky-tint flex items-center justify-center text-electric-blue font-bold">
                1
              </div>
              <div>
                <h3 className="text-base font-extrabold text-ink">
                  Situación de Cambio Deseada
                </h3>
                <p className="text-xs text-slate">¿Qué transformación educativa se proyecta?</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate mb-1">
                  Nombre de la Institución o Sede Educativa:
                </label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => handleInputChange('institution', e.target.value)}
                  placeholder="Ej. Institución Educativa Rural..."
                  className="w-full px-4 py-2.5 rounded-input bg-studio-off-white text-xs sm:text-sm text-ink border border-hairline-gray focus:outline-none focus:ring-2 focus:ring-eclipse-violet transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate mb-1">
                  Visión de Transformación Pedagógica (Objetivo del Cambio):
                </label>
                <textarea
                  rows={4}
                  value={formData.desiredChange}
                  onChange={(e) => handleInputChange('desiredChange', e.target.value)}
                  placeholder="Describe la innovación pedagógica o metodológica proyectada..."
                  className="w-full p-4 rounded-2xl bg-studio-off-white text-xs sm:text-sm text-ink border border-hairline-gray focus:outline-none focus:ring-2 focus:ring-eclipse-violet transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate mb-1">
                  Actores Clave Involucrados:
                </label>
                <input
                  type="text"
                  value={formData.targetActors}
                  onChange={(e) => handleInputChange('targetActors', e.target.value)}
                  placeholder="Docentes de aula, directivos, estudiantes, familias veredales..."
                  className="w-full px-4 py-2.5 rounded-input bg-studio-off-white text-xs sm:text-sm text-ink border border-hairline-gray focus:outline-none focus:ring-2 focus:ring-eclipse-violet transition-all"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-hairline-gray/60 flex items-center justify-between text-[11px] text-soft-mist">
            <span>Diagnóstico de Estado Inicial</span>
            <span>Lewin: Descongelamiento previo</span>
          </div>
        </div>

        {/* CUADRANTE 2: Fuerzas Impulsoras (+) */}
        <div className="bg-pure-white rounded-card p-6 sm:p-8 border border-hairline-gray shadow-jitter-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-hairline-gray">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center">
                  +2
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-ink flex items-center gap-1.5">
                    Fuerzas Impulsoras (+)
                    <span className="text-xs font-normal text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {totalDriving} pts
                    </span>
                  </h3>
                  <p className="text-xs text-slate">Factores internos y externos que movilizan el cambio</p>
                </div>
              </div>
            </div>

            {/* List of driving forces with visual vector bars */}
            <div className="space-y-2.5 mb-4 max-h-56 overflow-y-auto pr-1">
              {formData.drivingForces.length === 0 && (
                <p className="text-xs text-soft-mist italic text-center py-4">
                  No hay fuerzas impulsoras registradas. Agrega una abajo.
                </p>
              )}
              {formData.drivingForces.map((force) => (
                <div
                  key={force.id}
                  className="p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-xs transition-all hover:bg-emerald-50"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="pr-2">
                      <p className="font-semibold text-ink">{force.name}</p>
                      <span className="text-[10px] text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full inline-block mt-0.5">
                        {force.origin}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className="flex items-center gap-0.5 no-print">
                        <button
                          type="button"
                          onClick={() => handleUpdateDrivingScore(force.id, -1)}
                          disabled={force.score <= 1}
                          className="w-5 h-5 rounded-full bg-pure-white border border-emerald-300 text-emerald-800 disabled:opacity-30 text-[11px] flex items-center justify-center font-bold hover:bg-emerald-100 transition-colors"
                          title="Disminuir peso"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateDrivingScore(force.id, 1)}
                          disabled={force.score >= 5}
                          className="w-5 h-5 rounded-full bg-pure-white border border-emerald-300 text-emerald-800 disabled:opacity-30 text-[11px] flex items-center justify-center font-bold hover:bg-emerald-100 transition-colors"
                          title="Aumentar peso"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-bold text-emerald-700 px-2 py-1 rounded-lg bg-emerald-100 text-xs">
                        +{force.score}
                      </span>
                      <button
                        onClick={() => handleRemoveDriving(force.id)}
                        className="text-soft-mist hover:text-rose-600 p-1 rounded-full transition-colors no-print"
                        aria-label="Eliminar fuerza"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  {/* Vector visual bar */}
                  <div className="w-full bg-emerald-200/50 rounded-full h-1.5 mt-1 overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${(force.score / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Add driving force form */}
            <form onSubmit={handleAddDriving} className="bg-studio-off-white p-3 rounded-2xl border border-hairline-gray no-print">
              <p className="text-[11px] font-bold text-slate uppercase mb-2">Añadir Nueva Fuerza Impulsora (+):</p>
              <div className="flex flex-col sm:flex-row gap-2 mb-2">
                <input
                  type="text"
                  value={newDrivingName}
                  onChange={(e) => setNewDrivingName(e.target.value)}
                  placeholder="Ej. Capacitación docente en TIC..."
                  className="flex-1 px-3 py-1.5 rounded-input bg-pure-white text-xs border border-hairline-gray focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <select
                  value={newDrivingOrigin}
                  onChange={(e) => setNewDrivingOrigin(e.target.value)}
                  className="px-3 py-1.5 rounded-input bg-pure-white text-xs border border-hairline-gray text-slate focus:outline-none"
                >
                  <option value="Interna (Docente)">Interna (Docente)</option>
                  <option value="Interna (Estudiantes)">Interna (Estudiantes)</option>
                  <option value="Interna (Directivos)">Interna (Directivos)</option>
                  <option value="Externa (Políticas TIC)">Externa (Políticas TIC)</option>
                  <option value="Comunitaria (Familias)">Comunitaria (Familias)</option>
                </select>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-slate font-medium">Peso:</span>
                  <select
                    value={newDrivingScore}
                    onChange={(e) => setNewDrivingScore(e.target.value)}
                    className="px-2 py-1.5 rounded-input bg-pure-white text-xs border border-hairline-gray font-bold text-emerald-700"
                  >
                    {[1, 2, 3, 4, 5].map((val) => (
                      <option key={val} value={val}>{val}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-1.5 rounded-button bg-emerald-600 hover:bg-emerald-700 text-pure-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Agregar Fuerza Impulsora
              </button>
            </form>
          </div>

          <div className="mt-4 pt-3 border-t border-hairline-gray/60 text-[11px] text-soft-mist">
            Presión positiva hacia la nueva cultura escolar
          </div>
        </div>

        {/* CUADRANTE 3: Fuerzas Restrictivas y Resistencias (-) */}
        <div className="bg-pure-white rounded-card p-6 sm:p-8 border border-hairline-gray shadow-jitter-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-hairline-gray">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-rose-50 text-rose-700 font-bold flex items-center justify-center">
                  -3
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-ink flex items-center gap-1.5">
                    Fuerzas Restrictivas (-)
                    <span className="text-xs font-normal text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                      {totalRestraining} pts
                    </span>
                  </h3>
                  <p className="text-xs text-slate">Resistencias culturales, miedos e inercias organizacionales</p>
                </div>
              </div>
            </div>

            {/* List of restraining forces with vector bars */}
            <div className="space-y-2.5 mb-4 max-h-56 overflow-y-auto pr-1">
              {formData.restrainingForces.length === 0 && (
                <p className="text-xs text-soft-mist italic text-center py-4">
                  No hay fuerzas restrictivas registradas. Agrega una abajo.
                </p>
              )}
              {formData.restrainingForces.map((force) => (
                <div
                  key={force.id}
                  className="p-3 rounded-2xl bg-rose-50/50 border border-rose-100 text-xs transition-all hover:bg-rose-50"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="pr-2">
                      <p className="font-semibold text-ink">{force.name}</p>
                      <span className="text-[10px] text-rose-700 bg-rose-100/70 px-2 py-0.5 rounded-full inline-block mt-0.5">
                        {force.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className="flex items-center gap-0.5 no-print">
                        <button
                          type="button"
                          onClick={() => handleUpdateRestrainingScore(force.id, -1)}
                          disabled={force.score <= 1}
                          className="w-5 h-5 rounded-full bg-pure-white border border-rose-300 text-rose-800 disabled:opacity-30 text-[11px] flex items-center justify-center font-bold hover:bg-rose-100 transition-colors"
                          title="Disminuir peso"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateRestrainingScore(force.id, 1)}
                          disabled={force.score >= 5}
                          className="w-5 h-5 rounded-full bg-pure-white border border-rose-300 text-rose-800 disabled:opacity-30 text-[11px] flex items-center justify-center font-bold hover:bg-rose-100 transition-colors"
                          title="Aumentar peso"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-bold text-rose-700 px-2 py-1 rounded-lg bg-rose-100 text-xs">
                        -{force.score}
                      </span>
                      <button
                        onClick={() => handleRemoveRestraining(force.id)}
                        className="text-soft-mist hover:text-rose-600 p-1 rounded-full transition-colors no-print"
                        aria-label="Eliminar fuerza restrictiva"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  {/* Vector visual bar */}
                  <div className="w-full bg-rose-200/50 rounded-full h-1.5 mt-1 overflow-hidden">
                    <div
                      className="bg-rose-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${(force.score / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Add restraining force form */}
            <form onSubmit={handleAddRestraining} className="bg-studio-off-white p-3 rounded-2xl border border-hairline-gray no-print">
              <p className="text-[11px] font-bold text-slate uppercase mb-2">Añadir Nueva Fuerza Restrictiva (-):</p>
              <div className="flex flex-col sm:flex-row gap-2 mb-2">
                <input
                  type="text"
                  value={newRestrainingName}
                  onChange={(e) => setNewRestrainingName(e.target.value)}
                  placeholder="Ej. Temor a cometer errores frente a los alumnos..."
                  className="flex-1 px-3 py-1.5 rounded-input bg-pure-white text-xs border border-hairline-gray focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
                <select
                  value={newRestrainingType}
                  onChange={(e) => setNewRestrainingType(e.target.value)}
                  className="px-3 py-1.5 rounded-input bg-pure-white text-xs border border-hairline-gray text-slate focus:outline-none"
                >
                  <option value="Miedo al error técnico">Miedo al error técnico</option>
                  <option value="Supuestos Subyacentes">Supuestos Subyacentes</option>
                  <option value="Inseguridad / Autoeficacia">Inseguridad / Autoeficacia</option>
                  <option value="Infraestructura y Conectividad">Infraestructura y Conectividad</option>
                  <option value="Sobrecarga Laboral Percibida">Sobrecarga Laboral Percibida</option>
                </select>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-slate font-medium">Peso:</span>
                  <select
                    value={newRestrainingScore}
                    onChange={(e) => setNewRestrainingScore(e.target.value)}
                    className="px-2 py-1.5 rounded-input bg-pure-white text-xs border border-hairline-gray font-bold text-rose-700"
                  >
                    {[1, 2, 3, 4, 5].map((val) => (
                      <option key={val} value={val}>{val}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-1.5 rounded-button bg-rose-600 hover:bg-rose-700 text-pure-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Agregar Fuerza Restrictiva
              </button>
            </form>
          </div>

          <div className="mt-4 pt-3 border-t border-hairline-gray/60 text-[11px] text-soft-mist">
            Inercias culturales a debilitar mediante acompañamiento
          </div>
        </div>

        {/* CUADRANTE 4: Estrategia de Mediación y Liderazgo */}
        <div className="bg-pure-white rounded-card p-6 sm:p-8 border border-hairline-gray shadow-jitter-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-hairline-gray">
              <div className="w-9 h-9 rounded-2xl bg-lavender-mist/50 text-deep-plum font-bold flex items-center justify-center">
                4
              </div>
              <div>
                <h3 className="text-base font-extrabold text-ink">
                  Estrategia de Mediación y Liderazgo Transformacional
                </h3>
                <p className="text-xs text-slate">Acciones para transitar las 3 fases del cambio</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-deep-plum mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-electric-blue" />
                  1. Descongelamiento (Disminución de resistencias & Seguridad psicológica):
                </label>
                <textarea
                  rows={2}
                  value={formData.mediationStrategy}
                  onChange={(e) => handleInputChange('mediationStrategy', e.target.value)}
                  placeholder="Estrategias de escucha, diálogo y co-enseñanza horizontal sin coacción..."
                  className="w-full p-3 rounded-2xl bg-studio-off-white text-xs text-ink border border-hairline-gray focus:outline-none focus:ring-1 focus:ring-eclipse-violet resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-deep-plum mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-eclipse-violet" />
                  2. Transición / Movimiento (Cultura Adhocrática & Aula protegida):
                </label>
                <textarea
                  rows={2}
                  value={formData.transitionPlan}
                  onChange={(e) => handleInputChange('transitionPlan', e.target.value)}
                  placeholder="Talleres de experimentación, proyectos integrados y resignificación de la tecnología..."
                  className="w-full p-3 rounded-2xl bg-studio-off-white text-xs text-ink border border-hairline-gray focus:outline-none focus:ring-1 focus:ring-eclipse-violet resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-deep-plum mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  3. Recongelamiento (Institucionalización en PEI & Sostenibilidad):
                </label>
                <textarea
                  rows={2}
                  value={formData.refreezingPlan}
                  onChange={(e) => handleInputChange('refreezingPlan', e.target.value)}
                  placeholder="Articulación curricular formal, reconocimiento de logros y cultura de aprendizaje continuo..."
                  className="w-full p-3 rounded-2xl bg-studio-off-white text-xs text-ink border border-hairline-gray focus:outline-none focus:ring-1 focus:ring-eclipse-violet resize-none"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-hairline-gray/60 flex items-center justify-between text-[11px] text-soft-mist">
            <span>Liderazgo no coactivo (Pérez Uribe, 2018)</span>
            <span>Eficacia escolar (Schein, 1985)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
