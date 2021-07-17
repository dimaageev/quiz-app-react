import { CircularProgress } from "@material-ui/core";
import React from "react";
import { useState, useEffect } from "react";
import Question from "./Question/Question";
import "./Quiz.css";

const Quiz = (props) => {
  const [options, setOptions] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    console.log(props.questions);

    // This function sets question options
    setOptions(
      props.questions &&
        shuffle([
          props.questions[currentQuestion]?.correct_answer,
          ...props.questions[currentQuestion]?.incorrect_answers,
        ])
    );
  }, [props.questions, currentQuestion]);

  console.log(options);

  // This function shuffles questions
  const shuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="quiz">
      <span className="subtitle">Welcome, {props.name}</span>
      {props.questions ? (
        <>
          <div className="quizInfo">
            <span>{props.questions[currentQuestion].category}</span>
            <span>Your Score: {props.score}</span>
          </div>
          <Question
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            questions={props.questions}
            options={options}
            correct={props.questions[currentQuestion]?.correct_answer}
            score={props.score}
            setScore={props.setScore}
          />
        </>
      ) : (
        <CircularProgress
          style={{ margin: 100 }}
          color="inherit"
          size={150}
          thickness={1}
        />
      )}
    </div>
  );
};

export default Quiz;
