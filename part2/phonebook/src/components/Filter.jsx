import React from "react";

const Filter = ({ handleFilter, showAll }) => {
  return (
    <div>
      Filter shown with <input value={showAll} onChange={handleFilter} />
    </div>
  );
};

export default Filter;
