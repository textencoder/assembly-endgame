import "./App.css";
import { languages } from "./languages";
import { useState } from "react";

function App() {
  const [currentWord, setCurrentWord] = useState("react");
  const [guessed, setGuessed] = useState([]);

  const addGuessedLetter = (event) => {
    if (!guessed.includes(event.target.value)) {
      setGuessed(guessed.concat(event.target.value));
    }
  };

  const word = currentWord.split("").map((char) => {
    return <span key={char}>{char.toUpperCase()}</span>;
  });

  const languageElements = languages.map((l) => {
    return (
      <span
        key={l.name}
        style={{ backgroundColor: l.backgroundColor, color: l.color }}
      >
        {l.name}
      </span>
    );
  });

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const keyboardElements = alphabet.split("").map((letter) => {
    return (
      <button onClick={addGuessedLetter} key={letter} value={letter.toUpperCase()}>
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

        <section className="game-status">
          <h2>You win!</h2>
          <p>Well done!</p>
        </section>

        <section className="languages">{languageElements}</section>

        <section className="word-display">{word}</section>

        <section className="keyboard">{keyboardElements}</section>

        <button className="new-game-btn">New Game</button>
      </main>
    </>
  );
}

export default App;
