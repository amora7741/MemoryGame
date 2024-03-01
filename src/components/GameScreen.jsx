import * as React from 'react';
import { motion } from 'framer-motion';
import PokemonCard from './PokemonCard';

function GameScreen({ setGameState, cards, setCurrentScore, setHighScore }) {
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
          <PokemonCard id={card.id} name={card.name} imageUrl={card.imageUrl} />
        </motion.div>
      ))}
    </motion.main>
  );
}

export default GameScreen;
