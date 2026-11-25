import Row from "./Row";

function GameBoard({ pastGuesses, currentGuess, solutionWord }) {
  return (
    <div className="game-board">
      {Array.from({ length: 6 }, (_, index) => (
        <Row
          key={index}
          guess={pastGuesses[index] || ""}
          currentGuess={
            index === pastGuesses.length ? currentGuess : ""
          }
          solutionWord={solutionWord}
          isSubmitted={index < pastGuesses.length}
        />
      ))}
    </div>
  );
}

export default GameBoard;
