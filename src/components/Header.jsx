function Header({ currentScore, highScore }) {
  return (
    <header>
      <h2>Pokémon: Battle Recon Zone</h2>
      <div className='scores'>
        <h2>Current Score: {currentScore}</h2>
        <h2>High Score: {highScore}</h2>
      </div>
    </header>
  );
}

export default Header;
