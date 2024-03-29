import React, { useState, useEffect } from 'react';
import { MoonLoader } from 'react-spinners';

import './App.css';
import StartScreen from './components/StartScreen';
import Header from './components/Header';
import GameScreen from './components/GameScreen';
import GameOver from './components/GameOver';

function App() {
  const [difficulty, setDifficulty] = useState('');
  const [gameState, setGameState] = useState('start');
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [cards, setCards] = useState([]);
  const [playerWon, setPlayerWon] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchCards = async () => {
    try {
      setLoading(true);
      const uniqueIds = new Set();
      let randomId;

      do {
        randomId = Math.floor(Math.random() * 1000) + 1;
        uniqueIds.add(randomId);
      } while (uniqueIds.has(randomId) && uniqueIds.size < 15);

      const promises = Array.from(uniqueIds).map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) =>
          response.json()
        )
      );

      const resolvedCards = await Promise.all(promises);
      const cardsData = resolvedCards.map((data) => {
        let imageUrl =
          data.sprites.other.dream_world.front_default ||
          data.sprites.front_default ||
          'https://thumbs.dreamstime.com/b/no-pokemon-here-sign-riga-latvia-july-restricted-area-over-white-background-go-very-popular-virtual-74549871.jpg';
        return {
          id: data.id,
          name: data.name,
          imageUrl: imageUrl,
        };
      });

      setCards(cardsData);
      setLoading(false);
    } catch (error) {
      alert(`Failed to fetch cards: ${error}`);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleNewGame = () => {
    setGameState('start');
    setCurrentScore(0);
    setPlayerWon(false);
    fetchCards();
  };

  const handleRetry = () => {
    setGameState('playing');
    setCurrentScore(0);
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
            <MoonLoader color='#fff' />
          ) : (
            <GameScreen
              difficulty={difficulty}
              setGameState={setGameState}
              cards={cards}
              currentScore={currentScore}
              setCurrentScore={setCurrentScore}
              highScore={highScore}
              setHighScore={setHighScore}
              setPlayerWon={setPlayerWon}
            ></GameScreen>
          ))}
        {gameState === 'gameover' && (
          <GameOver
            playerWon={playerWon}
            handleNewGame={handleNewGame}
            handleRetry={handleRetry}
          ></GameOver>
        )}
      </div>
    </>
  );
}

export default App;
