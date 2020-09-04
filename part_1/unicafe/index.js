import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistic = (props) => {
  if (props.text !== "Positive") {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    );
  }
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}%</td>
    </tr>
  );
};

const Statistics = (props) => {
  let good = props.good;
  let bad = props.bad;
  let neutral = props.neutral;
  if (good !== 0 || bad !== 0 || neutral !== 0) {
    return (
      <div>
        <table>
          <tbody>
            <Statistic text="Good" value={good} />
            <Statistic text="Neutral" value={neutral} />
            <Statistic text="Bad" value={bad} />
            <Statistic text="All" value={good + neutral + bad} />
            <Statistic
              text="Average"
              value={(good - bad) / (good + neutral + bad)}
            />
            <Statistic
              text="Positive"
              value={(good / (good + neutral + bad)) * 100}
            />
          </tbody>
        </table>
      </div>
    );
  }
  return <div>No Feedback Given</div>;
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  // const [allClicks, setAll ]

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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
