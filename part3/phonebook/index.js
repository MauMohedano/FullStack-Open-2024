const express = require("express");
const app = express();
const morgan = require('morgan')
app.use(express.json())
app.use(morgan('tiny'))

morgan.token('object', function(request, response){
    return `${JSON.stringify(request.body)}`
})

app.use(morgan(':object'))

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/info", (request, response) => {
    const currentDate = new Date()
  response.end(`<p>Phonebook has info for ${persons.length} people </p> ${currentDate}`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
    const body = request.body
    const generateId = Math.random(100000)
    
    let newPerson = {
        id: generateId,
        name: body.name,
        number: body.number
    }
    if(!body.name){
        return response.status(400).json({ error: 'name is missing'})
    }
    if(!body.number){
        return response.status(400).json({ error: 'number is missing'})
    }
    if(persons.find(newPerson => newPerson.name === body.name)){
        return response.status(400).json({ error: 'name must be unique'})
    }
    console.log(body)
    persons = persons.concat(newPerson)
    response.json(newPerson)
  })

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`);});

