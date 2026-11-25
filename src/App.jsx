import { useState, useEffect, useCallback } from "react";
import GameBoard from "./components/GameBoard";
import Keyboard from "./components/Keyboard";
import "./App.css";

const WORDS = [
  "APPLE", "GRAPE", "PLANT", "BRAIN", "CHAIR",
  "HOUSE", "MOUSE", "WATER", "LIGHT", "SMILE",
  "EARTH", "CLOUD", "TRAIN", "MUSIC", "DREAM"
];

const getRandomWord = () =>
  WORDS[Math.floor(Math.random() * WORDS.length)];

function App() {
  const [solutionWord, setSolutionWord] = useState(getRandomWord);
  const [currentGuess, setCurrentGuess] = useState("");
  const [pastGuesses, setPastGuesses] = useState([]);
  const [gameStatus, setGameStatus] = useState("IN_PROGRESS");

  // Submit a completed guess
  const submitGuess = useCallback(() => {
    if (gameStatus !== "IN_PROGRESS") return;

    if (currentGuess.length !== 5) {
      alert("Please enter a 5-letter word!");
      return;
    }

    const updatedGuesses = [...pastGuesses, currentGuess];

    setPastGuesses(updatedGuesses);
    setCurrentGuess("");

    if (currentGuess === solutionWord) {
      setGameStatus("WON");
    } else if (updatedGuesses.length === 6) {
      setGameStatus("LOST");
    }
  }, [currentGuess, pastGuesses, solutionWord, gameStatus]);

  // Handle keyboard input
  const handleKey = useCallback((key) => {
    if (gameStatus !== "IN_PROGRESS") return;

    if (key === "ENTER") {
      submitGuess();
      return;
    }

    if (key === "BACKSPACE") {
      setCurrentGuess((previous) => previous.slice(0, -1));
      return;
    }

    if (/^[A-Z]$/.test(key)) {
      setCurrentGuess((previous) =>
        previous.length < 5 ? previous + key : previous
      );
    }
  }, [gameStatus, submitGuess]);

  // Listen for physical keyboard events
  useEffect(() => {
    const handlePhysicalKey = (event) => {
      if (event.ctrlKey || event.altKey || event.metaKey) return;

      if (event.key === "Enter") {
        handleKey("ENTER");
      } else if (event.key === "Backspace") {
        event.preventDefault();
        handleKey("BACKSPACE");
      } else if (/^[a-zA-Z]$/.test(event.key)) {
        handleKey(event.key.toUpperCase());
      }
    };

    window.addEventListener("keydown", handlePhysicalKey);

    return () => {
      window.removeEventListener("keydown", handlePhysicalKey);
    };
  }, [handleKey]);

  // Restart the game
  const restartGame = () => {
    setSolutionWord((previous) => {
      const availableWords = WORDS.filter(
        (word) => word !== previous
      );
      return availableWords[
        Math.floor(Math.random() * availableWords.length)
      ];
    });

    setCurrentGuess("");
    setPastGuesses([]);
    setGameStatus("IN_PROGRESS");
  };

  return (
    <div className="app">
      <header className="header">
        <h1>WORDLE</h1>
        <p>Guess the hidden five-letter word!</p>
      </header>

      <main>
        <GameBoard
          pastGuesses={pastGuesses}
          currentGuess={currentGuess}
          solutionWord={solutionWord}
        />

        <Keyboard
          onKeyPress={handleKey}
          pastGuesses={pastGuesses}
          solutionWord={solutionWord}
        />

        <button className="restart-button" onClick={restartGame}>
          New Game
        </button>
      </main>

      {gameStatus !== "IN_PROGRESS" && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>
              {gameStatus === "WON"
                ? "Congratulations! 🎉"
                : "Game Over!"}
            </h2>

            <p>
              {gameStatus === "WON"
                ? "You guessed the correct word!"
                : "You used all 6 attempts."}
            </p>

            <p>
              The correct word was: <strong>{solutionWord}</strong>
            </p>

            <button onClick={restartGame}>
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
