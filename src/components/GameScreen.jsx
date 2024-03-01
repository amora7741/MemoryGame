import * as React from 'react';
import { motion } from 'framer-motion';

function GameScreen({ setGameState, cards }) {
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
    ></motion.main>
  );
}

export default GameScreen;
