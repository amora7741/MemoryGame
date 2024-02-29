// import Button from './Button';

function StartScreen({ setgameStatus, setDifficulty }) {
  return (
    <div className='card'>
      <div className='info'>
        <h1>Pokémon: Battle Recon Zone</h1>
        <p>Try not to select the same card twice.</p>
        <p>
          The higher the difficulty, the more cards there are to choose from.
        </p>
        <p>See how far you can go!</p>
      </div>
      <p>Select your difficulty:</p>
      <div className='buttons'>{/* <Button text={'Easy'}></Button> */}</div>
    </div>
  );
}

export default StartScreen;
