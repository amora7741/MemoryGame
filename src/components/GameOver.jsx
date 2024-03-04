import React from 'react';
import { motion } from 'framer-motion';
import PikaDub from '../assets/pikachudub.gif';
import PikaL from '../assets/pikachul.gif';

function GameOver({ playerWon, handleNewGame, handleRetry }) {
  const picsrc = playerWon ? PikaDub : PikaL;
  const result = playerWon ? 'You Won! :D' : 'You Lost :(';

  return (
    <motion.main
      className='endscreen'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1>{result}</h1>
      <img src={picsrc} alt='' />
      <div className='buttons'>
        <button onClick={handleNewGame}>Main Menu</button>
        {!playerWon && <button onClick={handleRetry}>Retry</button>}
      </div>
    </motion.main>
  );
}

export default GameOver;
