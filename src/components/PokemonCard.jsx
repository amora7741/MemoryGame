function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function PokemonCard({ id, name, imageUrl }) {
  const capitalizedName = capitalizeFirstLetter(name);

  return (
    <button className='pokemoncard'>
      <img src={imageUrl} alt='Pokemon' />#{id}
    </button>
  );
}

export default PokemonCard;
