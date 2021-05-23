import React from 'react';
import { CoursePart } from "../types";

const assertNever = (value: any): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart}) => {
  switch(part.type) {
    case "normal":
      return (
        <div>
          <p>
            <strong>{part.name}</strong>
          </p>
          {part.description && (
            <p>
              <em>{part.description}</em>
            </p>
          )}
          <p>
            Exercises: <strong>{part.exerciseCount}</strong>
          </p>
          <hr />
        </div>
      );
    case "groupProject":
      return (
        <div>
          <p>
            <strong>{part.name}</strong>
          </p>
          <p>
            Exercises: <strong>{part.exerciseCount}</strong>
          </p>
          <p>
            Group Projects: <strong>{part.groupProjectCount}</strong>
          </p>
          <hr />
        </div>
      );
    case "submission":
      return(
        <div>
          <p>
            <strong>{part.name}</strong>
          </p>
          {part.description && (
            <p>
              <em>{part.description}</em>
            </p>
          )}
          <p>
            Exercises: <strong>{part.exerciseCount}</strong>
          </p>
          <p>
            Submission Link:{" "}
            <a href={part.exerciseSubmissionLink}>
              {part.exerciseSubmissionLink}
            </a>
          </p>
          <hr />
      </div>
      )
    case "special":
      return(
        <div>
          <p>
            <strong>{part.name}</strong>
          </p>
          {part.description && (
            <p>
              <em>{part.description}</em>
            </p>
          )}
          <p>
            Exercises: <strong>{part.exerciseCount}</strong>
          </p>
          <p>
            Requirement:{" "}
            {part.requirements.map(item => <span key={item}>{item} </span>)}
          </p>
          <hr />
        </div>
      );
    default:
      return assertNever(part);
  }
}

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </>
  );
};

export default Content;