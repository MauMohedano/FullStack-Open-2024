import { useState } from "react";

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text} </td>
      <td> {value}</td>
    </tr>
  );
};

const Statistics = ({ good, bad, neutral }) => {
  const total = good + bad + neutral;

  const average = () => ((good - bad) / total).toFixed(2);
  const resultA = average();
  const positive = () => ((good / total) * 100).toFixed(2) + " %";

  if (total === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticsLine text="Good" value={good} />
          <StatisticsLine text="Neutral" value={neutral} />
          <StatisticsLine text="Bad" value={bad} />
          <StatisticsLine text="All" value={total} />
          <StatisticsLine text="Average" value={positive()} />
          <StatisticsLine text="Positive" value={resultA} />
        </tbody>
      </table>
    </div>
  );
};

const Button = ({ onClick, text }) => {
  return (
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodButton = () => {
    setGood(good + 1);
  };
  const handleNeutralButton = () => {
    setNeutral(neutral + 1);
  };
  const handleBadButton = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      Give Feedback
      <p></p>
      <Button onClick={handleGoodButton} text="Good" />
      <Button onClick={handleNeutralButton} text="Neutral" />
      <Button onClick={handleBadButton} text="Bad" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
