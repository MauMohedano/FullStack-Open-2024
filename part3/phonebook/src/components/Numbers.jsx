import React from "react";

const Numbers = ({ personFilter, delPerson }) => {
  return (
    <div>
      {personFilter.map((persons) => (
        <li key={persons.id}>
          {persons.name} {persons.number}
          <button id={persons.id} onClick={() => delPerson(persons.id)}>
            Delete
          </button>
        </li>
      ))}
    </div>
  );
};
export default Numbers;
