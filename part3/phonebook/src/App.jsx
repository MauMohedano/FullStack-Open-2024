import { useState, useEffect } from "react";
import personService from "./services/persons";
import axios from "axios";
import PersonForm from "./components/PersonForm";
import Numbers from "./components/Numbers";
import Filter from "./components/Filter";
import Notification from "./components/Notification";




const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);



  useEffect(() => {
    const dataHook = () => {
      personService.getAll().then((initialPersons) => {
        setPersons(initialPersons);
      });
    };
    dataHook();
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const message = `${newName} is already added to phonebook. Do you want to replace the old number with the new One?`;
    const findPerson = persons.find((p) => p.name === newName);

    if (findPerson) {
      if (window.confirm(message) === true)
        personService
          .update(findPerson.id, personObject)
          .then(returnedPerson => {

            setNotificationMessage({
                "text": `${ returnedPerson.name } has been updated`,
                "type": "notification"
            })

            setTimeout(() => {
                setNotificationMessage(null)
            }, 5000)

            setPersons(persons.map(p => p.id !== findPerson.id ? p : returnedPerson))
            setNewName("");
            setNewNumber("");
        }
        )

    } else {
      event.preventDefault();
      personService.create(personObject)
      .then((response) => {{
        setNotificationMessage({
          "text": `${ personObject.name } has been added`,
          "type": "notification"
      })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000);
      }
        setPersons(persons.concat(response));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setShowAll(event.target.value);
  };

  const personFilter =
    showAll === ""
      ? persons
      : persons.filter(
          (person) =>
            person.name.toLocaleLowerCase() === showAll.toLocaleLowerCase()
        );

  const delPerson = (id) => {
    const findPerDel = persons.find((person) => person.id === id);
    if (
      window.confirm(
        `Are you sure you want to delete ${findPerDel.name} from phonebook`
      )
    ) {
      personService
        .remove(findPerDel)
        .then(() =>
          setPersons(persons.filter((newObject) => newObject.id !== id))
        )
        .catch(error => {
          setNotificationMessage({
            "text": `${ findPerDel.name } has been eliminated from server`,
            "type": "error"
        })
        })
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      { notificationMessage !== null ? <Notification message={ notificationMessage } /> : null }
      <div>
        <h2>Find a number</h2>
        <Filter showAll={showAll} handleFilter={handleFilter} />

        <h2>Add a new</h2>
      </div>
      <div>
        <PersonForm
          addPerson={addPerson}
          handleNumberChange={handleNumberChange}
          handlePersonChange={handlePersonChange}
          newName={newName}
        />
      </div>

      <h2>Numbers</h2>
      <Numbers personFilter={personFilter} delPerson={delPerson} />
    </div>
  );
};

export default App;
