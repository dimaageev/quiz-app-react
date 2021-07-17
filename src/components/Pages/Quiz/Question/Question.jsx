import { Button } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorMessage from "../../../Error/Error";
import "./Question.css";

const Question = (props) => {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);

  // This function sets correct and incorrect answer visuals
  const handleSelect = (i) => {
    if (selected === i && selected === props.correct) {
      return "select";
    } else if (selected === i && selected != props.correct) {
      return "wrong";
    } else if (i === props.correct) {
      return "select";
    }
  };

  // This function checks is the answer correct or not and sets score
  const handleCheck = (i) => {
    setSelected(i);
    if (i === props.correct) props.setScore(props.score + 1);
    setError(false);
  };
  // This function gives functionality to "Quit" button
  const handleQuit = () => {
    props.setCurrentQuestions(0);
    props.setQuestions();
  };

  const history = useHistory();

  // This function gives functionality to "Next" button
  const handleNext = () => {
    if (props.currentQuestion > 8) {
      history.push("/result");
    } else if (selected) {
      props.setCurrentQuestion(props.currentQuestion + 1);
      setSelected();
    } else {
      setError("Select an option");
    }
  };

  return (
    <div className="question">
      <h1>Question {props.currentQuestion + 1}</h1>
      <div className="current-question">
        <h2>{props.questions[props.currentQuestion].question}</h2>
        <div className="options">
          {error && <ErrorMessage>Fill all the fields</ErrorMessage>}
          {props.options &&
            props.options.map((i) => (
              <button
                onClick={() => handleCheck(i)}
                className={`current-option ${selected && handleSelect(i)}`}
                key={i}
                disabled={selected}
              >
                {i}
              </button>
            ))}
        </div>
      </div>
      <div className="controls">
        <Button
          variant="contained"
          size="large"
          style={{ width: 185, backgroundColor: "#ff6090" }}
          href="./"
          onClick={handleQuit}
        >
          Quit
        </Button>
        <Button
          variant="contained"
          size="large"
          style={{ width: 185, backgroundColor: "#757de8" }}
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Question;
