import React from 'react';
import { AlertTriangle, RotateCcw, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('USTA ErrorBoundary detectó una excepción en renderizado:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-studio-off-white text-ink flex items-center justify-center p-6 selection:bg-lavender-mist selection:text-deep-plum">
          <div className="max-w-lg w-full bg-pure-white rounded-card p-8 sm:p-10 border border-hairline-gray shadow-jitter-xl text-center">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mx-auto mb-5 shadow-sm">
              <AlertTriangle className="w-8 h-8" />
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-badge bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-bold uppercase tracking-wider mb-3">
              Módulo 1 USTA · Recuperación de Sistema
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-ink tracking-tight-title mb-3">
              Interrupción en la Carga del Recurso
            </h2>

            <p className="text-xs sm:text-sm text-slate leading-relaxed mb-6">
              Ocurrió una interrupción al procesar un componente interactivo. La aplicación ha protegido la sesión impidiendo que la pantalla quede en blanco.
            </p>

            {this.state.error?.message && (
              <div className="p-3.5 mb-6 rounded-2xl bg-studio-off-white border border-hairline-gray text-left text-xs font-mono text-slate-700 overflow-x-auto">
                <p className="text-[10px] font-bold uppercase text-soft-mist mb-1">Detalle del error técnico:</p>
                <code>{this.state.error.message}</code>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={this.handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-button bg-studio-off-white hover:bg-hairline-gray text-ink border border-hairline-gray text-xs font-semibold shadow-sm transition-all"
              >
                <RefreshCw className="w-4 h-4 text-eclipse-violet" />
                Reintentar Render
              </button>
              <button
                onClick={this.handleReload}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-button bg-deep-plum hover:bg-ink text-pure-white text-xs font-semibold shadow-sm transition-all"
              >
                <RotateCcw className="w-4 h-4 text-volt" />
                Recargar Recurso
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
