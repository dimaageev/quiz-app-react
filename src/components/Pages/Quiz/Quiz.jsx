import { CircularProgress } from "@material-ui/core";
import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Question from "./Question/Question";
import "./Quiz.css";

const Quiz = (props) => {
  const [options, setOptions] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const history = useHistory();

  useEffect(() => {
    if (!props.questions.data && !props.questions.loading) {
      history.push("/");
    }
  }, []);

  useEffect(() => {
    // This function sets question options
    setOptions(
      props.questions.data &&
        shuffle([
          props.questions.data[currentQuestion]?.correct_answer,
          ...props.questions.data[currentQuestion]?.incorrect_answers,
        ])
    );
  }, [props.questions.data, currentQuestion]);

  // This function shuffles questions
  const shuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="quiz">
      <span className="subtitle">Welcome, {props.name}</span>
      {props.questions.data && (
        <>
          <div className="quizInfo">
            <span>{props.questions.data[currentQuestion].category}</span>
            <span>Your Score: {props.score}</span>
          </div>
          <Question
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            questions={props.questions.data}
            options={options}
            correct={props.questions.data[currentQuestion]?.correct_answer}
            score={props.score}
            setScore={props.setScore}
          />
        </>
      )}{" "}
      {props.questions.loading && (
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
