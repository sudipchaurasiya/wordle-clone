import { evaluateGuess } from "../utils/gameLogic";

function getKeyStatus(letter, pastGuesses, solutionWord) {
  const priority = {
    absent: 1,
    present: 2,
    correct: 3
  };

  let bestStatus = "";

  pastGuesses.forEach((guess) => {
    const statuses = evaluateGuess(guess, solutionWord);

    guess.split("").forEach((char, index) => {
      if (char === letter) {
        const status = statuses[index];

        if (
          !bestStatus ||
          priority[status] > priority[bestStatus]
        ) {
          bestStatus = status;
        }
      }
    });
  });

  return bestStatus;
}

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"]
];

function Keyboard({ onKeyPress, pastGuesses, solutionWord }) {
  return (
    <div className="keyboard" aria-label="Keyboard">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div className="keyboard-row" key={rowIndex}>
          {row.map((key) => {
            const isWideKey = key === "ENTER" || key === "BACKSPACE";
            const status = isWideKey
              ? ""
              : getKeyStatus(key, pastGuesses, solutionWord);

            return (
              <button
                type="button"
                className={`key ${isWideKey ? "wide-key" : ""} ${status}`}
                key={key}
                onClick={() => onKeyPress(key)}
                aria-label={
                  key === "BACKSPACE"
                    ? "Backspace"
                    : key === "ENTER"
                      ? "Enter"
                      : key
                }
              >
                {key === "BACKSPACE" ? "DEL" : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
