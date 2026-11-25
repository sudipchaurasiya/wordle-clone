import Tile from "./Tile";
import { evaluateGuess } from "../utils/gameLogic";

function Row({ guess, currentGuess, solutionWord, isSubmitted }) {
  const letters = isSubmitted
    ? guess.split("")
    : currentGuess.split("");

  const statuses = isSubmitted
    ? evaluateGuess(guess, solutionWord)
    : [];

  return (
    <div className="row">
      {Array.from({ length: 5 }, (_, index) => (
        <Tile
          key={index}
          letter={letters[index] || ""}
          status={statuses[index] || ""}
        />
      ))}
    </div>
  );
}

export default Row;
