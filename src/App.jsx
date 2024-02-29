import React, { useState } from 'react';

import './App.css';
import StartScreen from './components/StartScreen';
import Header from './components/Header';

function App() {
  const [difficulty, setDifficulty] = useState('');
  const [gameState, setGameState] = useState('start');
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  return (
    <div className='container'>
      <Header currentScore={currentScore} highScore={highScore}></Header>
      {gameState === 'start' && (
        <StartScreen
          setDifficulty={setDifficulty}
          setGameState={setGameState}
        ></StartScreen>
      )}
    </div>
  );
}

export default App;
