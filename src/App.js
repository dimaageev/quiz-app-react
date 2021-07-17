import axios from "axios";
import { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Pages/Home/Home";
import Quiz from "./components/Pages/Quiz/Quiz";
import Result from "./components/Pages/Result/Result";

function App() {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState({
    loading: false,
    error: false,
    data: null,
  });
  const [score, setScore] = useState(0);

  const fetchQuestions = async (category = "", difficulty = "") => {
    setQuestions({ ...questions, loading: true, error: false });
    try {
      const { data } = await axios.get(
        `https://opentdb.com/api.php?amount=10${
          category && `&category=${category}`
        }${difficulty && `&difficulty${difficulty}`}&type=multiple`
      );
      setQuestions({ ...questions, loading: false, data: data.results });
    } catch (error) {
      setQuestions({ ...questions, loading: false, error: true, data: null });
    }
  };

  return (
    <BrowserRouter>
      <div className="app" style={{ backgroundImage: "url(./back.jpg)" }}>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Home
              name={name}
              setName={setName}
              fetchQuestions={fetchQuestions}
            />
          </Route>
          <Route path="/quiz" exact>
            <Quiz
              name={name}
              questions={questions}
              score={score}
              setQuestions={setQuestions}
              setScore={setScore}
            />
          </Route>
          <Route path="/result" exact>
            <Result name={name} score={score} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
