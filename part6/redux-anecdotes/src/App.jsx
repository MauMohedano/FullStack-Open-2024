import NewAnecdote from "./components/NewAnecdote";
import List from "./components/List";
import Notification from "./components/Notification";
import VisibilityFilter from "./components/VisibilityFilter";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <VisibilityFilter />
      <Notification />
      <List />
      <NewAnecdote />
    </div>
  );
};

export default App;
