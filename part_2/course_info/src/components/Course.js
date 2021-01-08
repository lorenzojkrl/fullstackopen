import React from 'react';

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  const exercisesArray = course.parts.map(part => part.exercises);
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const sum = exercisesArray.reduce(reducer);

  return (
    <div>
      <p><b>Total of {sum} exercises</b></p>
    </div>

  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = ({ course }) => {

  return (
    <div>
      {course.parts.map(part => <Part key={part.id} part={part} />)}
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      {course.map(courseX => (
        <div key={courseX.id}>
          <Header key={courseX.name} course={courseX} />
          <Content key={courseX.parts} course={courseX} />
          <Total key={courseX.id} course={courseX} />
        </div>
      ))}

    </div>
  )
}

export default Course;

