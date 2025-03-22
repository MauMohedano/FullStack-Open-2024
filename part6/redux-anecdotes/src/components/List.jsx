import { useDispatch, useSelector } from "react-redux";

import { voteAnecdote } from "../reducers/anecdoteReducer";

const List = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector((state) => state.anecdotes);
    const filter = useSelector((state) => state.filter);


     
    const filteredAnecdotes = anecdotes.filter(anecdote =>
      anecdote?.content && typeof anecdote.content === "string" &&
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );

    const sortedAnecdotes = filteredAnecdotes.slice().sort((a, b) => b.votes - a.votes);

    const vote = (id) => {
        dispatch(voteAnecdote(id));
      };
   
      return (
        <div>
          <h2>Anecdotes</h2>
          {sortedAnecdotes.length === 0 ? (
            <p>No anecdotes found</p>
          ) : (
            sortedAnecdotes.map((anecdote) => (
              <div key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>
                  has {anecdote.votes} votes
                  <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
              </div>
            ))
          )}
        </div>
      );
}

export default List