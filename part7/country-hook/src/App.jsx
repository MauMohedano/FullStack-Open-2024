import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name) return

    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}?fullText=true`)
      .then((res) => {
        setCountry({
          found: true,
          data: res.data
        })
      })
      .catch(() => {
        setCountry({ found: false })
      })
  }, [name])

  return { country }
}

const Country = ({ country }) => {
  if (!country) {
    return <div>Enter a country name to search.</div>
  }

  if (!country.found || !country.data) {
    return <div>Country not found...</div>
  }

  const { name, capital, population, flags } = country.data

  return (
    <div>
      <h3>{name.common}</h3>
      <div>Capital: {capital}</div>
      <div>Population: {population}</div>
      <img src={flags.svg} height='100' alt={`Flag of ${name.common}`} />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const { country } = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value.trim())
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>Find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
