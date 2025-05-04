import "./App.css";
import { languages } from "./languages";

function App() {
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
      </main>
    </>
  );
}

export default App;
