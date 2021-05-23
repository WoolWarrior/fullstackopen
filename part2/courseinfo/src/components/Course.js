import React from 'react';

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Part = ({part}) => {
  console.log('part',part)
  return (
    <p>
      {part.name} {part.exercises}
    </p>    
  )
}

const Content = ({parts}) => {
  console.log('parts',parts)
  console.log('parts[0]',parts[0])
  const total = parts.reduce((accumulator,currentValue) => {
    return accumulator + currentValue.exercises;
  },0)
  console.log('total',total)
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} part={part}/>)}
        <p>Total of {total}</p>
    </div>
  )
}

const Course = ({course}) => {
  console.log('course',course)
  console.log('course name',course.name)
  console.log('course parts',course.parts)
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts}/>
    </div>
  )
}

export default Course