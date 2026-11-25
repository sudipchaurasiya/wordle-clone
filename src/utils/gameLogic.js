export function evaluateGuess(guess, solution) {
  const result = Array(5).fill("absent");
  const remaining = solution.split("");

  // First pass: find letters in the correct position
  for (let i = 0; i < 5; i++) {
    if (guess[i] === solution[i]) {
      result[i] = "correct";
      remaining[i] = null;
    }
  }

  // Second pass: find letters in the wrong position
  for (let i = 0; i < 5; i++) {
    if (result[i] === "correct") continue;

    const foundIndex = remaining.indexOf(guess[i]);

    if (foundIndex !== -1) {
      result[i] = "present";
      remaining[foundIndex] = null;
    }
  }

  return result;
}
