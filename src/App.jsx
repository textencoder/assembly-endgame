import "./App.css";
import { languages } from "./languages";
import { useState } from "react";

function App() {
  const [currentWord, setCurrentWord] = useState("react");
  const [guessed, setGuessed] = useState([]);

  const wrongGuessCount = guessed.filter(
    (g) => !currentWord.includes(g.toLowerCase())
  );
  //console.log("tracer: ", wrongGuessCount.length);

  const isGameWon = currentWord
    .split("")
    .every((letter) => guessed.includes(letter.toUpperCase()));
  const isGameLost = wrongGuessCount.length >= languages.length;
  const isGameOver = isGameWon || isGameLost;
  const addGuessedLetter = (event) => {
    if (!guessed.includes(event.target.value)) {
      setGuessed(guessed.concat(event.target.value));
    }
    //console.log(guessed);
  };

  //console.log(isGameWon)

  const word = currentWord.split("").map((char) => {
    const isGuessed = guessed.includes(char.toUpperCase());

    return <span key={char}>{isGuessed && char.toUpperCase()}</span>;
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
        <header>
          <h1>Assembly: Endgame</h1>
          <p>
            Guess the word within 8 tries to keep the programming world safe
            from Asssembly!
          </p>
        </header>

        <section className={`game-status ${isGameWon ? "won" : isGameLost ? "lost" : ""}`}>
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
          ) : null}
        </section>

        <section className="languages">{languageElements}</section>

        <section className="word-display">{word}</section>

        <section className="keyboard">{keyboardElements}</section>

        {isGameOver && <button className="new-game-btn">New Game</button>}
      </main>
    </>
  );
}

export default App;
