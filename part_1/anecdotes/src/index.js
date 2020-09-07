import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

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

const MostVoted = (props) => {
  let voteArray = props.voteArray;
  let max = Math.max(...voteArray); // highest value, not index
  let indexMax = voteArray.indexOf(max); // index of highest value
  if (max === 0) {
    return "No votes yet";
  }

  return (
    <div>
      <div>{props.anecdotes[indexMax]}</div>
    </div>
  );
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [voteArray, setVote] = useState([...zeroArray]);

  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleClickVote = (selected) => {
    const newVotes = [...voteArray];
    newVotes[selected] += 1;
    setVote(newVotes);
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div>{props.anecdotes[selected]}</div>
      <br />
      <div>
        Anectode {selected} has {voteArray[selected]} votes
      </div>
      <Button handleClick={() => handleClickVote(selected)} text="Vote" />
      <Button handleClick={randomAnecdote} text="Next Anecdote" />
      <h2>Anecdote with most votes</h2>
      <MostVoted voteArray={voteArray} anecdotes={anecdotes} />
    </div>
  );
};

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
