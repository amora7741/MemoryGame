function GameOver({ playerWon, handleRetry }) {
  return (
    <>
      <h1>Game Over</h1>
      <p>Player Won: {playerWon.toString()}</p>
      <button onClick={handleRetry}>Retry</button>
    </>
  );
}

export default GameOver;
