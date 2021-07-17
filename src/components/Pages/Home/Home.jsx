import { Button, MenuItem, TextField } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Categories from "../../../Data/Categories";
import ErrorMessage from "../../Error/Error";
import "./Home.css";

const Home = (props) => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);

  const history = useHistory();

  const handleSubmit = () => {
    if (!category || !difficulty || !props.name) {
      setError(true);
      return;
    } else {
      setError(false);
      props.fetchQuestions(category, difficulty);
      history.push("/quiz");
    }
  };

  return (
    <div className="content">
      <div className="settings">
        <span style={{ fontSize: 30 }}>Quiz Settings</span>
        <div className="settings-select">
          {/* Error Message */}
          {error && <ErrorMessage>Fill all the fields</ErrorMessage>}
          {/* Name Button */}
          <TextField
            style={{ marginBottom: 25 }}
            label="Enter your name"
            variant="outlined"
            onChange={(e) => props.setName(e.target.value)}
            value={props.name}
          />
          {/* //Category Button */}
          <TextField
            style={{ marginBottom: 30 }}
            select
            label="Select category"
            variant="outlined"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            {Categories.map((cat) => (
              <MenuItem key={cat.category} value={cat.value}>
                {cat.category}
              </MenuItem>
            ))}
          </TextField>
          {/* //Difficulty Button */}
          <TextField
            style={{ marginBottom: 30 }}
            select
            label="Select difficulty"
            variant="outlined"
            onChange={(e) => setDifficulty(e.target.value)}
            value={difficulty}
          >
            <MenuItem key="Easy" value="easy">
              Easy
            </MenuItem>
            <MenuItem key="Medium" value="medium">
              Medium
            </MenuItem>
            <MenuItem key="Hard" value="hard">
              Hard
            </MenuItem>
          </TextField>
          {/* //Start Button */}
          <Button
            variant="contained"
            style={{ backgroundColor: "#757de8" }}
            size="large"
            onClick={handleSubmit}
          >
            Start Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
