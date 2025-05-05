import "./App.css";
import { languages } from "./languages";
import { useState } from "react";
import { getFarewellText, getRandomWord } from "./utils";
import Confetti from "react-confetti";

function App() {
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessed, setGuessed] = useState([]);

  const handleNewGame = () => {
    setGuessed([])
    setCurrentWord(() => getRandomWord())
  }

  const numberOfGuessesLeft = languages.length - 1
  const wrongGuessCount = guessed.filter(
    (g) => !currentWord.includes(g.toLowerCase())
  );
  //console.log("tracer: ", wrongGuessCount.length);

  const isGameWon = currentWord
    .split("")
    .every((letter) => guessed.includes(letter.toUpperCase()));
  const isGameLost = wrongGuessCount.length >= languages.length -1;
  const isGameOver = isGameWon || isGameLost;
  const addGuessedLetter = (event) => {
    if (!guessed.includes(event.target.value)) {
      setGuessed(guessed.concat(event.target.value));
    }
    //console.log(guessed);
  };

  const lastGuessedLetter = guessed[guessed.length - 1];
  const isLastGuessIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  //console.log(isGameWon)

  const word = currentWord.split("").map((char) => {
    const shouldReveal = isGameLost || guessed.includes(char.toUpperCase())
    //const isGuessed = guessed.includes(char.toUpperCase());
    return <span key={char} className={isGameLost && !guessed.includes(char) ? "missed-letters" : undefined}>{shouldReveal ? char.toUpperCase() : ""}</span>;
  });

  const languageElements = languages.map((l, index) => {
    return (
      <span
        className={index <= wrongGuessCount.length - 1 ? "dead" : undefined}
        key={l.name}
        style={{ backgroundColor: l.backgroundColor, color: l.color }}
      >
        {l.name}
      </span>
    );
  });

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const keyboardElements = alphabet.split("").map((letter) => {
    const isGuessed = guessed.includes(letter.toUpperCase());
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);
    //console.log("keyboard rendered")

    return (
      <button
        disabled={isGameOver}
        aria-disabled={guessed.includes(letter)}
        aria-label={`Letter ${letter}`}
        className={isCorrect ? "correct" : isWrong ? "wrong" : "vanilla"}
        onClick={addGuessedLetter}
        key={letter}
        value={letter.toUpperCase()}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  return (
    <>
      <main>

{
  isGameWon &&
  <Confetti 
  recycle={false}
  numberOfPieces={1000}
  />
}

        <header>
          <h1>Assembly: Endgame</h1>
          <p>
            Guess the word within 8 tries to keep the programming world safe
            from Asssembly!
          </p>
        </header>

        <section
        aria-live="polite"
        role="status"
          className={`game-status ${
            isGameWon
              ? "won"
              : isGameLost
              ? "lost"
              : isLastGuessIncorrect
              ? "farewell-message"
              : ""
          }`}
        >
          {isGameOver ? (
            isGameWon ? (
              <>
                <h2>You win!</h2>
                <p>Well done! 🎉</p>
              </>
            ) : (
              <>
                <h2>Game over!</h2>
                <p>You lose! Better start learning Assembly!</p>
              </>
            )
          ) : isLastGuessIncorrect ? (
            <p>{getFarewellText(languages[wrongGuessCount.length - 1].name)}</p>
          ) : null}
        </section>

        <section className="languages">{languageElements}</section>

        <section className="word-display">{word}</section>

        <section className="sr-only" aria-live="polite" role="status">
          <p>
          {currentWord.includes(lastGuessedLetter) ? 
          `Correct! The letter ${lastGuessedLetter} is in the word.`
          : `Sorry, the letter ${lastGuessedLetter} is not in the word.`  
        }
        You have ${numberOfGuessesLeft} attempts left.
          </p>
          <p>Current word: {currentWord.split("").map(letter =>
            guessed.includes(letter) ? letter + "." : "blank."
          ).join(" ")}</p>
        </section>

        <section className="keyboard">{keyboardElements}</section>

        {isGameOver && <button onClick={handleNewGame} className="new-game-btn">New Game</button>}
      </main>
    </>
  );
}

export default App;
