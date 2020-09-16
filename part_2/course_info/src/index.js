import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  // Create array containing the number of exercises for each part
  const exercisesArray = course.parts.map(part => part.exercises);
  // Creating and using reduce
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const sum = exercisesArray.reduce(reducer);

  return (
    <div>
      <p><b>Total of {sum} exercises</b></p>
      {/* Validating */}
      {/* {console.log(exercisesArray)}
      {console.log(exercisesArray.reduce(reducer))} */}

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
  // Just checking .map()
  // const parti = course.parts.map(part => part);

  return (
    <div>
      {/* {console.log(parti)} */}
      {/* <Part part={course.parts[0]} />
      <Part part={course.parts[1]} />
      <Part part={course.parts[2]} /> */}
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

const App = () => {
  const course = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))
