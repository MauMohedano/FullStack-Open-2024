/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import { useField } from "./hooks";

// eslint-disable-next-line no-unused-vars
const Menu = ({ anecdotes, addNew }) => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <div>
        <Link style={padding} to="/anecdotes">
          Anecdotes
        </Link>
        <Link style={padding} to="/about">
          About
        </Link>
        <Link style={padding} to="/create">
          Create New
        </Link>
      </div>

      <div>
        <i>Note app, Department of Computer Science 2024</i>
      </div>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => {
  if (!anecdotes || anecdotes.length === 0) {
    return <p>No anecdotes available.</p>;
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const AnecdoteDetail = ({ anecdotes }) => {
  const { id } = useParams();
  // eslint-disable-next-line react/prop-types
  const anecdote = anecdotes.find((a) => a.id === Number(id));
  if (!anecdote) {
    return <p>Anecdote not found!</p>;
  }

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>
        <strong>Author:</strong> {anecdote.author}
      </p>
      <p>
        <strong>Info:</strong> <a href={anecdote.info}>{anecdote.info}</a>
      </p>
      <p>
        <strong>Votes:</strong> {anecdote.votes}
      </p>
    </div>
  );
};

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote 
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
    See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

const CreateNew = (props) => {
  const { reset: resetContent, ...content } = useField("");
  const { reset: resetAuthor, ...author } = useField("");
  const { reset: resetInfo, ...info } = useField("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line react/prop-types
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate("/anecdotes");
  };

  const handleReset = (e) => {
    e.preventDefault()
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button onClick={handleReset} type="button">
          Reset
        </button>
      </form>
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  // eslint-disable-next-line no-unused-vars
  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  // eslint-disable-next-line no-unused-vars
  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <Router>
      <h1>Software anecdotes</h1>
      <Menu />

      <Routes>
        <Route
          path="/anecdotes/:id"
          element={<AnecdoteDetail anecdotes={anecdotes} />}
        />

        <Route
          path="/anecdotes"
          element={<AnecdoteList anecdotes={anecdotes} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
