import React from "react";


const PersonForm = ({addPerson,
     handlePersonChange,
      handleNumberChange, 
      newName,
    newNumber}) => {
 return (
   <div>
    <form onSubmit={addPerson}>
   <div>Name: <input value={newName} onChange={handlePersonChange} /></div> 
   <div>Number: <input value={newNumber} onChange={handleNumberChange} /></div> 
    <button type="submit">add</button>
        
      </form>
    </div> 
 )
}

export default PersonForm;