import React from 'react';
import type { CoursePart } from '../types.ts';

interface PartProps {
  part: CoursePart;
}

const Part: React.FC<PartProps> = ({ part }) => {
    switch (part.kind) {
        case "basic":
            return (
                <div>
                    <h3>{part.name}</h3>
                    <p>Exercises: {part.exerciseCount}</p>
                    <p><i>{part.description}</i></p>
                </div>
            )
        case "group":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>Exercises: {part.exerciseCount}</p>
          <p>Group projects: {part.groupProjectCount}</p>
        </div>
      );

    case "background":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>Exercises: {part.exerciseCount}</p>
          <p><i>{part.description}</i></p>
          <p>Background material: <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a></p>
        </div>
      );

       case "special":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>Exercises: {part.exerciseCount}</p>
          <p><i>{part.description}</i></p>
          <p>Rqeueriments: {part.requirements.join(", ")}</p>
        </div>
      );

    default:
       const _exhaustiveCheck: never = part;
      return _exhaustiveCheck;
    };
}

export default Part;