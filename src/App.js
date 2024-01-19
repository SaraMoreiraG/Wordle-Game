// Importing necessary dependencies
import { useState, useEffect } from "react";
import "./App.css";
import Keyboard from "./components/keyboard.js";
import Language from "./components/language.js";

function App() {
  // State variables for managing the game
  const languages = ["english", "spanish", "french"];
  const [currentLanguage, setCurrentLanguage] = useState(languages[2]);
  const [word, setWord] = useState("");
  const [currentWord, setCurrentWord] = useState("");
  const [userWords, setUserWords] = useState([]);
  const [colorMarkings, setColorMarkings] = useState([]);
  const [instructions, setInstructions] = useState("Guess the hidden word");

  // Fetching a new word when the language changes or the component mounts
  useEffect(() => {
    const fetchWord = async () => {
      try {
        // API URLs for different languages
        let url;
        if (currentLanguage === "english") {
          url = "https://random-word-api.herokuapp.com/word?length=5";
          const response = await fetch(url);
          const data = await response.json();
          setWord(data[0]);
        } else if (currentLanguage === "spanish") {
          const randomSpanishWords = require("./random-spanish-words");
          function getWordWith5Letters() {
            const options = {
              length: 5,
              exactly: 1,
            };
            const word = randomSpanishWords(options);
            return word[0];
          }
          const wordWith5Letters = getWordWith5Letters();
          setWord(wordWith5Letters);
        } else if (currentLanguage === "french") {
          url =
            "https://random-words-spanish-and-french.p.rapidapi.com/french/one-word/5";
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
              "X-RapidAPI-Host":
                "random-words-spanish-and-french.p.rapidapi.com",
            },
          });
          const data = await response.json();
          setWord(data);
        }
      } catch (error) {
        console.error("Error fetching word:", error);
      }
    };
    fetchWord();
  }, [currentLanguage]);

  // Function to handle the user pressing the Enter key
  const handleEnter = () => {
    // Checking if the user has made 4 attempts or guessed the correct word
    if (userWords.length === 4 || currentWord.toLowerCase() === word) {
      if (currentWord.toLowerCase() !== word) {
        setInstructions(
          `You loose. The hidden word was: ${word.toUpperCase()}. Try again`
        );
      } else {
        setInstructions(
          `You win! The hidden word was: ${word.toUpperCase()}. Play again`
        );
      }
      setCurrentWord("");
      setUserWords([]);
      setColorMarkings([]);
    } else {
      evaluateWord();
    }
  };

  // Function to evaluate the current word
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

  // Function to handle language click
  const handleLanguageClick = (lan) => {
    setCurrentLanguage(lan);
    setCurrentWord("");
    setUserWords([]);
    setColorMarkings([]);
  };

  return (
    <div className="App">
      <div className="row justify-content-end mx-0 pt-5">
        <div className="col-lg-2 col-md-2 col-5 m-0">
          <div className="languages-box">
            {languages.map((language, index) => (
              <Language
                key={index}
                language={language}
                currentLanguage={currentLanguage}
                handleLanguageClick={handleLanguageClick}
              />
            ))}
          </div>
        </div>
      </div>
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
            handleEnter={handleEnter}
            setInstructions={setInstructions}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
