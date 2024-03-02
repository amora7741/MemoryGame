import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PokemonCard from './PokemonCard';

function GameScreen({
  setGameState,
  cards,
  currentScore,
  setCurrentScore,
  highScore,
  setHighScore,
}) {
  const [clickedCards, setClickedCards] = useState({});

  const handleCardClick = (cardId) => {
    if (clickedCards[cardId]) {
      setGameState('gameover');
    } else {
      setClickedCards({ ...clickedCards, [cardId]: true });

      const newScore = currentScore + 1;
      setCurrentScore(newScore);

      if (newScore > highScore) {
        setHighScore(newScore);
      }
    }
  };

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

  return (
    <motion.main
      className='gamecontainer'
      variants={container}
      initial='hidden'
      animate='visible'
    >
      {cards.map((card) => (
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
