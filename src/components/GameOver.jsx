import React from 'react';
import { motion } from 'framer-motion';
import PikaDub from '../assets/pikachudub.gif';
import PikaL from '../assets/pikachul.gif';

function GameOver({ playerWon, handleRetry }) {
  const picsrc = playerWon ? PikaDub : PikaL;
  const result = playerWon ? 'You Won! :3' : 'You Lost :(';

  return (
    <motion.main
      className='endscreen'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1>{result}</h1>
      <img src={picsrc} alt='' />
    </motion.main>
  );
}

export default GameOver;
