import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";

/**
 * Keyboard Component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.currentWord - The current word being input.
 * @param {function} props.setCurrentWord - Function to set the current word.
 * @param {function} props.handleEnter - Function to handle Enter key press.
 * @param {function} props.setInstructions - Function to set instructions.
 */

function Keyboard({
  currentWord,
  setCurrentWord,
  handleEnter,
  setInstructions,
}) {
  // Maximum allowed letters per word
  const maxLettersPerWord = 5;

  // Handle click event for each keyboard button.
  const handleClick = (letter) => {
    if (currentWord.length < maxLettersPerWord) {
      setCurrentWord(
        (prevCurrentWord) => prevCurrentWord + letter.toUpperCase()
      );
    } else {
      setInstructions(<FontAwesomeIcon icon={faPaperPlane} />);
    }
  };

  // Handle delete (backspace) event.
  const handleDelete = () => {
    if (currentWord.length > 0) {
      setCurrentWord((prevCurrentWord) => prevCurrentWord.slice(0, -1));
    }
  };

  return (
    <div className="light-box keyboard">
      <div className="box-inner">
        <div className="key" onClick={() => handleClick("q")}>
          <div className="key-content">Q</div>
        </div>
        <div className="key" onClick={() => handleClick("w")}>
          <div className="key-content">W</div>
        </div>
        <div className="key" onClick={() => handleClick("e")}>
          <div className="key-content">E</div>
        </div>
        <div className="key" onClick={() => handleClick("r")}>
          <div className="key-content">R</div>
        </div>
        <div className="key" onClick={() => handleClick("t")}>
          <div className="key-content">T</div>
        </div>
        <div className="key" onClick={() => handleClick("y")}>
          <div className="key-content">Y</div>
        </div>
        <div className="key" onClick={() => handleClick("u")}>
          <div className="key-content">U</div>
        </div>
        <div className="key" onClick={() => handleClick("i")}>
          <div className="key-content">I</div>
        </div>
        <div className="key" onClick={() => handleClick("o")}>
          <div className="key-content">O</div>
        </div>
        <div className="key" onClick={() => handleClick("p")}>
          <div className="key-content">P</div>
        </div>
      </div>
      <div className="box-inner">
        <div className="key" onClick={() => handleClick("a")}>
          <div className="key-content">A</div>
        </div>
        <div className="key" onClick={() => handleClick("s")}>
          <div className="key-content">S</div>
        </div>
        <div className="key" onClick={() => handleClick("d")}>
          <div className="key-content">D</div>
        </div>
        <div className="key" onClick={() => handleClick("f")}>
          <div className="key-content">F</div>
        </div>
        <div className="key" onClick={() => handleClick("g")}>
          <div className="key-content">G</div>
        </div>
        <div className="key" onClick={() => handleClick("h")}>
          <div className="key-content">H</div>
        </div>
        <div className="key" onClick={() => handleClick("j")}>
          <div className="key-content">J</div>
        </div>
        <div className="key" onClick={() => handleClick("k")}>
          <div className="key-content">K</div>
        </div>
        <div className="key" onClick={() => handleClick("l")}>
          <div className="key-content">L</div>
        </div>
        <div className="key" onClick={() => handleDelete()}>
          <div className="key-content">
            <i className="fa-solid fa-delete-left"></i>
          </div>
        </div>
      </div>
      <div className="box-inner">
        <div className="key" onClick={() => handleDelete()}>
          <div className="key-content">
            <i className="fa-solid fa-delete-left"></i>
          </div>
        </div>
        <div className="key" onClick={() => handleClick("z")}>
          <div className="key-content">Z</div>
        </div>
        <div className="key" onClick={() => handleClick("x")}>
          <div className="key-content">X</div>
        </div>
        <div className="key" onClick={() => handleClick("c")}>
          <div className="key-content">C</div>
        </div>
        <div className="key" onClick={() => handleClick("v")}>
          <div className="key-content">V</div>
        </div>
        <div className="key" onClick={() => handleClick("b")}>
          <div className="key-content">B</div>
        </div>
        <div className="key" onClick={() => handleClick("n")}>
          <div className="key-content">N</div>
        </div>
        <div className="key" onClick={() => handleClick("m")}>
          <div className="key-content">M</div>
        </div>
        <div className="key">
          <div className="key-content">?</div>
        </div>
        <div className="key" onClick={() => handleEnter()}>
          <div className="key-content">
            <i className="fa-regular fa-paper-plane"></i>
          </div>
        </div>
      </div>
      <a href="https://www.linkedin.com/in/sara-moreira-g">@saramordev</a>
    </div>
  );
}

export default Keyboard;
