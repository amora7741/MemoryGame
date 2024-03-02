import * as React from 'react';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function PokemonCard({ id, name, imageUrl, onCardClick }) {
  const capitalizedName = capitalizeFirstLetter(name);

  return (
    <button className='pokemoncard' onClick={onCardClick}>
      <img src={imageUrl} alt={`Pokemon ${capitalizedName}`} />#{id}
    </button>
  );
}

export default PokemonCard;
