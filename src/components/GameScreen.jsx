import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import PokemonCard from './PokemonCard';

function shuffleArray(array) {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function GameScreen({
  difficulty,
  setGameState,
  cards,
  currentScore,
  setCurrentScore,
  highScore,
  setHighScore,
  setPlayerWon,
}) {
  const [clickedCards, setClickedCards] = useState({});

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const cardsToDisplay = useMemo(() => {
    let numCards;
    switch (difficulty) {
      case 'Easy':
        numCards = 5;
        break;
      case 'Medium':
        numCards = 10;
        break;
      case 'Hard':
      default:
        numCards = 15;
        break;
    }

    return cards.slice(0, numCards);
  }, [cards, difficulty]);

  const [shuffledCards, setShuffledCards] = useState(cardsToDisplay);

  const handleCardClick = (cardId) => {
    if (clickedCards[cardId]) {
      setGameState('gameover');
    } else {
      const updatedClickedCards = { ...clickedCards, [cardId]: true };
      setClickedCards(updatedClickedCards);

      const newScore = currentScore + 1;
      setCurrentScore(newScore);

      if (newScore > highScore) {
        setHighScore(newScore);
      }

      setShuffledCards(shuffleArray(shuffledCards));

      if (Object.keys(updatedClickedCards).length === shuffledCards.length) {
        setGameState('gameover');
        setPlayerWon(true);
      }
    }
  };

  return (
    <motion.main
      className='gamecontainer'
      variants={container}
      initial='hidden'
      animate='visible'
    >
      {shuffledCards.map((card) => (
        <motion.div key={card.id} variants={item}>
          <PokemonCard
            id={card.id}
            name={card.name}
            imageUrl={card.imageUrl}
            onCardClick={() => handleCardClick(card.id)}
          />
        </motion.div>
      ))}
    </motion.main>
  );
}

export default GameScreen;
