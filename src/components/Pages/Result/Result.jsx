import { Button } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Result.css";

const Result = (props) => {
  const history = useHistory();

  useEffect(() => {
    if (!props.name) {
      history.push("/");
    }
  }, [props.name, history]);

  return (
    <div className="result">
      <span className="final">Final Score: {props.score}/10</span>
      <Button
        variant="contained"
        size="large"
        style={{
          alignSelf: "center",
          marginTop: 60,
          padding: 20,
          backgroundColor: "#ff6090",
        }}
        href="/"
      >
        Return to Home Page
      </Button>
    </div>
  );
};

export default Result;
