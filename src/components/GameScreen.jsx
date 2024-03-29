import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import PokemonCard from './PokemonCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import { useMediaQuery } from 'react-responsive';

import 'swiper/css';
import '../styles/slider.css';

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
  const shouldRenderSwiper = useMediaQuery({ query: '(max-width: 450px)' });

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

  const renderCard = (card) => (
    <PokemonCard
      key={card.id}
      id={card.id}
      name={card.name}
      imageUrl={card.imageUrl}
      onCardClick={() => handleCardClick(card.id)}
    />
  );

  return (
    <>
      {shouldRenderSwiper ? (
        <Swiper
          spaceBetween={10}
          loop={true}
          slidesPerView={3}
          centeredSlides={true}
        >
          {shuffledCards.map((card) => (
            <SwiperSlide key={card.id}>{renderCard(card)}</SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <motion.main
          className='gamecontainer'
          variants={container}
          initial='hidden'
          animate='visible'
        >
          {shuffledCards.map((card) => (
            <motion.div key={card.id} variants={item}>
              {renderCard(card)}
            </motion.div>
          ))}
        </motion.main>
      )}
      <h1>Don't click the same card twice!</h1>
    </>
  );
}

export default GameScreen;
