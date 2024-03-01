function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function PokemonCard({ id, name, imageUrl }) {
  const capitalizedName = capitalizeFirstLetter(name);

  return (
    <div className='pokemoncard'>
      <img src={imageUrl} alt='' />
      <h1>{capitalizedName}</h1>
    </div>
  );
}

export default PokemonCard;
