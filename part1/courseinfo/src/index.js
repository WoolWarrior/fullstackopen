import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <div>
      <p>
        {props.course.name}        
      </p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part.name} {props.part.exercises}        
      </p>
    </div>
  )
}

const Content = (pros) => {
  return (
    <div>
      <Part part={pros.parts[0]}/>
      <Part part={pros.parts[1]}/>
      <Part part={pros.parts[2]}/>
    </div>
  )
}

const Total = (prop) => {
  return (
    <div>
      <p>
        Number of exercises {prop.parts[0].exercises + prop.parts[1].exercises + prop.parts[2].exercises}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}



ReactDOM.render(<App />, document.getElementById('root'))