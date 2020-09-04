import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodClicked = () => {
    setGood(good + 1);
  };

  const neutralClicked = () => {
    setNeutral(neutral + 1);
  };

  const badClicked = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h2>Give feedback</h2>
      <Button onClick={goodClicked} text="Good" />
      <Button onClick={neutralClicked} text="Neutral" />
      <Button onClick={badClicked} text="Bad" />

      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
