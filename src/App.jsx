import React from 'react';
import Header from './components/Header';
import ComicViewer from './components/ComicViewer';
import DUAQuiz from './components/DUAQuiz';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-studio-off-white text-ink flex flex-col justify-between selection:bg-lavender-mist selection:text-deep-plum">
      <main className="flex-grow">
        {/* 1. Cabecera Institucional y Fin Pedagógico USTA */}
        <Header />

        {/* 2. Visor Interactivo de las 5 Tiras Cómicas con DUA y Fundamento Teórico */}
        <ComicViewer />

        {/* 3. Cuestionario de Evaluación Formativa con Feedback Inmediato */}
        <DUAQuiz />
      </main>

      {/* 4. Pie de Página Académico y Citación Formal APA 7 */}
      <Footer />
    </div>
  );
}
