import { useState } from 'react';

type NewDiaryEntry = {
  date: string;
  weather: string;
  visibility: string;
  comment: string;
};

type Props = {
  onAddDiary: (entry: NewDiaryEntry) => void;
};

const NewDiaryForm = ({ onAddDiary }: Props) => {
  const [newEntry, setNewEntry] = useState<NewDiaryEntry>({
    date: '',
    weather: '',
    visibility: '',
    comment: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewEntry({
      ...newEntry,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddDiary(newEntry);
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Diary Entry</h3>
      <div>
        <label>Date: </label>
        <input
          type="date"
          name="date"
          value={newEntry.date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Weather: </label>
        <select
          name="weather"
          value={newEntry.weather}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="sunny">Sunny</option>
          <option value="rainy">Rainy</option>
          <option value="cloudy">Cloudy</option>
          <option value="stormy">Stormy</option>
          <option value="windy">Windy</option>
        </select>
      </div>
      <div>
        <label>Visibility: </label>
        <select
          name="visibility"
          value={newEntry.visibility}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="great">Great</option>
          <option value="good">Good</option>
          <option value="ok">Ok</option>
          <option value="poor">Poor</option>
        </select>
      </div>
      <div>
        <label>Comment: </label>
        <input
          type="text"
          name="comment"
          value={newEntry.comment}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default NewDiaryForm;
