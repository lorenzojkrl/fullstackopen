import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const zeroArray = Array.apply(null, new Array(anecdotes.length)).map(
  Number.prototype.valueOf,
  0
);

const VoteCounterBlock = (props) => {
  let totalVotes = props.vote;
  console.log("totalVotes = ", totalVotes);
  return <div>has {totalVotes} votes</div>;
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState([...zeroArray]);

  const handleClickNext = () => {
    let selected = Math.floor(Math.random() * anecdotes.length);
    setSelected(selected);
    console.log(`Anecdote`, selected);
  };

  const handleClickVote = () => {
    vote[selected] += 1;
    setVote(vote);
    console.log(`Array: `, vote);
  };

  return (
    <div>
      <div>{anecdotes[selected]}</div>
      <div>
        <VoteCounterBlock vote={vote[selected]} />
        <Button onClick={handleClickVote} text="Vote" />
        <Button onClick={handleClickNext} text="Next anecdote" />
      </div>
    </div>
  );
};

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
