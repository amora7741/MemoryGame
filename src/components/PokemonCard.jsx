import * as React from 'react';

import pokemonButtonClick from '../assets/pokemonbuttonclick.mp3';
import useSound from 'use-sound';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function PokemonCard({ id, name, imageUrl, onCardClick }) {
  const capitalizedName = capitalizeFirstLetter(name);
  const [play] = useSound(pokemonButtonClick);

  return (
    <button className='pokemoncard' onClick={onCardClick} onMouseEnter={play}>
      <img src={imageUrl} alt={`Pokemon ${capitalizedName}`} />#{id}
    </button>
  );
}

export default PokemonCard;
