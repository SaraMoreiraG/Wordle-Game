import { useState, useEffect } from "react";
import "./App.css";
import Keyboard from "./components/keyboard.js";

function App() {
  const [word, setWord] = useState("");
  const [currentWord, setCurrentWord] = useState("");
  const [userWords, setUserWords] = useState([]);
  const [colorMarkings, setColorMarkings] = useState([]);
  const [instructions, setInstructions] = useState("Guess the hidden word");

  useEffect(() => {
    const fetchWord = async () => {
      try {
        const response = await fetch(
          "https://random-word-api.herokuapp.com/word?length=5"
        );
        const data = await response.json();
        setWord(data[0]);
      } catch (error) {
        console.error("Error fetching word:", error);
      }
    };

    fetchWord();
  }, []);

  const evaluateSituation = () => {
    if (userWords.length === 4) {
      setInstructions(
        `You loose. The hidden word was: ${word.toUpperCase()}. Try again`
      );
      setCurrentWord("");
      setUserWords([]);
      setColorMarkings([]);
    } else {
      evaluateWord();
    }
  };
  const evaluateWord = () => {
    if (currentWord.length === 5) {
      const markings = currentWord.split("").map((letter, index) => {
        const lowercaseLetter = letter.toLowerCase();
        if (word[index] === lowercaseLetter) {
          return { letter, color: "green" }; // Correct letter in the correct spot
        } else if (word.includes(lowercaseLetter)) {
          return { letter, color: "yellow" }; // Correct letter in the wrong spot
        } else {
          return { letter, color: "red" }; // Incorrect letter
        }
      });

      setUserWords((prevUserWords) => [...prevUserWords, currentWord]);
      setColorMarkings((prevColorMarkings) => [...prevColorMarkings, markings]);
      setCurrentWord("");
      setInstructions("Guess the hidden word");
    } else {
      setInstructions("Too short");
    }
  };

  return (
    <div className="App">
      <header className="App-view">
        <div className="row justify-content-center mx-0 pt-5">
          <div className="light-box solution-panel col-lg-4 col-md-5 col-6">
            <div>
              {colorMarkings.map((markings, index) => (
                <div className="letter-box" key={index}>
                  {markings.map((value, index) => (
                    <div className={`letter ${value.color}`} key={index}>
                      <div className="key-content">{value.letter}</div>
                    </div>
                  ))}
                </div>
              ))}
              <div className="letter-box">
                {currentWord.split("").map((letter, index) => (
                  <div className="letter blue" key={index}>
                    <div className="key-content">{letter}</div>
                  </div>
                ))}
              </div>
            </div>
            <p>{instructions}</p>
          </div>
        </div>
        <div className="row justify-content-center m-0">
          <div className="col-lg-7 col-md-9 col-sm-11">
            <Keyboard
              currentWord={currentWord}
              setCurrentWord={setCurrentWord}
              evaluateSituation={evaluateSituation}
              setInstructions={setInstructions}
            />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
