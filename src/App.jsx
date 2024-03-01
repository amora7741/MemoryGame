import React, { useState, useEffect, useCallback } from 'react';
import { BounceLoader } from 'react-spinners';

import './App.css';
import StartScreen from './components/StartScreen';
import Header from './components/Header';
import GameScreen from './components/GameScreen';

function App() {
  const [difficulty, setDifficulty] = useState('');
  const [gameState, setGameState] = useState('start');
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [cards, setCards] = useState([]);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchRandomCard = useCallback(async () => {
    const randomId = Math.floor(Math.random() * 1000) + 1;

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomId}`
    );
    const data = await response.json();

    let imageUrl;

    if (data.sprites.other.dream_world.front_default) {
      imageUrl = data.sprites.other.dream_world.front_default;
    } else if (data.sprites.front_default) {
      imageUrl = data.sprites.front_default;
    } else {
      imageUrl =
        'https://thumbs.dreamstime.com/b/no-pokemon-here-sign-riga-latvia-july-restricted-area-over-white-background-go-very-popular-virtual-74549871.jpg';
    }

    return {
      id: data.id,
      name: data.name,
      imageUrl: imageUrl,
    };
  }, []);

  const fetchCards = useCallback(async () => {
    try {
      setLoading(true);
      const promises = [];
      for (let i = 0; i < 15; i++) {
        promises.push(fetchRandomCard());
      }

      const resolvedCards = await Promise.all(promises);
      setCards(resolvedCards);
      console.log(resolvedCards);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch cards: ', error);
    }
  }, [fetchRandomCard]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const handleRetry = () => {
    setGameState('start');
    fetchCards();
  };

  return (
    <>
      <div className='container'>
        <Header currentScore={currentScore} highScore={highScore}></Header>
        {gameState === 'start' && (
          <StartScreen
            setDifficulty={setDifficulty}
            setGameState={setGameState}
          ></StartScreen>
        )}
        {gameState === 'playing' &&
          (loading ? (
            <BounceLoader color='#fff' />
          ) : (
            <GameScreen
              setGameState={setGameState}
              cards={cards}
              setCurrentScore={setCurrentScore}
              setHighScore={setHighScore}
            ></GameScreen>
          ))}
      </div>
    </>
  );
}

export default App;
