import React, { useRef } from 'react';
import Intro from './components/Intro';
import ComicSequence from './components/ComicSequence';
import Quiz from './components/Quiz';

export default function App() {
  const sequenceRef = useRef(null);

  return (
    <main className="bg-night text-white">
      <Intro onStart={() => sequenceRef.current?.goToBeat(0)} />
      <ComicSequence ref={sequenceRef} />
      <Quiz />
    </main>
  );
}
