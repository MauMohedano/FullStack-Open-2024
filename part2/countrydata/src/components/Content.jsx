import React from "react"
import WeatherInfo from "./WeatherInfo";

const Content = ({ filterCountries, setSearchFilter }) => {
    if (filterCountries.length === 1) {
      const country = filterCountries[0];
     
      return (
        <div>
          <h1>{country.name.official}</h1>
          <div>Capital: {country.capital}</div>
          <div> Area: {country.area} </div>
          <h2> Languages: </h2>
          <div>
            {Object.keys(country.languages).map((key) =><li key={key}>{country.languages[key]}</li> )}

           <div>
            <img src={country.flags.png}/>
           </div>
           <WeatherInfo country={country}/>
          </div>
        </div>
      );
    }

    if (filterCountries.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    }
    return filterCountries.map((country, index) => (
      <div key={index}>{country.name.official}
      <button value={country.name.official} onClick={event => setSearchFilter(event.target.value)}>Show</button>
     
      </div>
    ));
  };

  export default Content