import { useEffect, useState } from 'react'
import AddForm from './components/AddForm'
import axios from 'axios'

interface Fly {
  id: number,
  date: string,
  weather: string,
  visibility: string,
  comment: string
}


function App() {
  const [fly, setFly] = useState<Fly[]>([])
  const [newFly, setNewFly] = useState({ date: '',
  weather: '',
  visibility: '',
  comment: ''})
  const [error, setError] = useState<string | null>(null)


const addFlyEntry = async (entry: Omit<Fly, 'id'>) => {
  try {
    const response = await axios.post<Fly>('http://localhost:3000/api/diaries', entry);
    setFly(fly.concat(response.data));
    setError(null);
  } catch (error: unknown) {
    if ((error as any).isAxiosError) {
      setError((error as any).response?.data.message || 'An error occurred');
    } else {
      setError('An unexpected error occurred');
    }
  }
};

  useEffect(() => {
    axios.get<Fly[]>('http://localhost:3000/api/diaries')
      .then((response) => {
        console.log(response.data)
        setFly(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])
  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <AddForm
        onAddDiary={addFlyEntry}
        newFly={newFly}
        setNewFly={setNewFly}
      />

      <ul>
        <h3>Diary entries</h3>
        {fly.map((f) => (
          <li key={f.id}>
            <h4>{f.date}</h4>
            <p>Weather: {f.weather}</p>
            <p>Visibility: {f.visibility}</p>
            <p>Comments: {f.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
