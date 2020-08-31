import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  return (
    <div>
      <h1>{props.courseName}</h1>
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <p>
        {props.partX} {props.exercisesX}
      </p>
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part partX={props.part1} exercisesX={props.exercises1} />
      <Part partX={props.part2} exercisesX={props.exercises2} />
      <Part partX={props.part3} exercisesX={props.exercises3} />
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {props.exercises1 + props.exercises2 + props.exercises3}
      </p>
    </div>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };

  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };

  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  return (
    <div>
      <Header courseName={course} />
      <Content
        part1={part1.name}
        part2={part2.name}
        part3={part3.name}
        exercises1={part1.exercises}
        exercises2={part2.exercises}
        exercises3={part3.exercises}
      />
      <Total
        exercises1={part1.exercises}
        exercises2={part2.exercises}
        exercises3={part3.exercises}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
