import { useState, useEffect } from "react";
import axios from "axios";
import Content from "./components/Content";


function App() {
  const [searchFilter, setSearchFilter] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    console.log("effect");
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const filterCountries = countries.filter((country) =>
    country.name.official
      .toLowerCase()
      .includes(searchFilter.toLocaleLowerCase())
  );

  const handleChange = (event) => {
    setSearchFilter(event.target.value);
  };


  
  return (
    <div>
      Find country <input value={searchFilter} onChange={handleChange} />
      <Content filterCountries={filterCountries} setSearchFilter={setSearchFilter} />
      
    </div>
  );
}

export default App;
