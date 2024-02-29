function Button({ text, setGameState, setDifficulty }) {
  const handleClick = () => {
    setGameState('playing');
    setDifficulty(text);
  };

  return <button onClick={handleClick}>{text}</button>;
}

export default Button;
