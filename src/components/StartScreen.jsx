import React from 'react';
import Button from './Button';
import { motion } from 'framer-motion';

function StartScreen({ setDifficulty, setGameState }) {
  const difficulties = ['Easy', 'Medium', 'Hard'];

  const difficultyButtons = difficulties.map((difficulty) => {
    return (
      <Button
        key={difficulty}
        text={difficulty}
        setGameState={setGameState}
        setDifficulty={setDifficulty}
      ></Button>
    );
  });

  return (
    <motion.main
      className='startcard'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className='info'>
        <h1>Pokémon: Battle Recon Zone</h1>
        <p>Try not to select the same card twice.</p>
        <p>
          The higher the difficulty, the more cards there are to choose from.
        </p>
        <p>See how far you can go!</p>
      </div>
      <p>Select your difficulty:</p>
      <div className='buttons'>{difficultyButtons}</div>
    </motion.main>
  );
}

export default StartScreen;
