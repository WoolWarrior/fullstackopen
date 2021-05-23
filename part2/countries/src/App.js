import React, {useState, useEffect} from 'react';
import axios from 'axios'

const CountryDetail = ({country}) => {
  const capital = country.capital
  const api_key = process.env.REACT_APP_API_KEY
  const url = 'http://api.weatherstack.com/current?access_key=' + api_key +'&query=' + capital
  const [ temp, setTemp ] = useState('')
  const [ weatherIcon, setWeatherIcon] = useState('')
  const [ wind, setWind] = useState('')
  useEffect(() => {
    axios
    .get(url)
    .then(response => {
      console.log(response.data.current)
      try{
        setTemp(response.data.current.temperature)
        setWeatherIcon(response.data.current.weather_icons)
        setWind(response.data.current.wind_speed + ' mph direction ' + response.data.current.wind_dir)
      } catch {

      }
      
    })
  },[])

  return (
    <div>
      <h3>{country.name}</h3>
      <p>capital: {capital}</p>
      <p>population: {country.population}</p>
      <h4>Languages</h4>
      <ul>
        {country.languages.map((language,index) => 
          <li key={index}>{language.name}</li>)
        }
      </ul>
      <img alt="flag of the country" src={country.flag} height='100'/>
      <h4>Weather in {capital}</h4>
      <p><b>Temperature</b> {temp} Celcius</p>
      <img alt="weather icon" src={weatherIcon} height='100'/>
      <p><b>Wind</b> {wind}</p>
    </div>
  )
}

const TooManyWarning = ({number}) => {
  return (
    <div>
    <p>Too many matches ({number}), specify another filter</p>
  </div>
  )
}

const ShowList = ({countriesToShow,onClick}) => {
  return (
    <div> 
      {countriesToShow.map((country,index) => 
      <p key={index}>{country.name}<button value={country.name} onClick={onClick}>show</button></p>)}
    </div>
  )
}


const Countries = ({countriesToShow,onClick}) => {
  if (countriesToShow.length === 0) {
    return (
      <p>No match</p>
    )
  } else if(countriesToShow.length === 1) {
    return (
      <CountryDetail country={countriesToShow[0]}/>
    )
  } else if(countriesToShow.length > 10) {
    return (
      <TooManyWarning number={countriesToShow.length}/>
    )
  } else {
    return(
      <ShowList countriesToShow={countriesToShow} onClick={onClick}/>
    )
  }
}

const Filter = ({searchCountry,handleSearchCountryChange}) => {
  return (
    <div>
      <input value={searchCountry} onChange={handleSearchCountryChange}/>
    </div>
  )
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ showAll, setShowAll ] = useState(true)
  const [ searchCountry, setSearchCountry ] = useState('')

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  },[])

  const handleSearchCountryChange = (event) => {
    setSearchCountry(event.target.value)
    setShowAll(false)
  }

  const countriesToShow = showAll
  ? countries
  : countries.filter(country => country.name.toLowerCase().includes(searchCountry.toLocaleLowerCase()))

  return (
    <div>
      <p>find countries</p>
      <Filter searchCountry={searchCountry} handleSearchCountryChange={handleSearchCountryChange} />
      <Countries countriesToShow={countriesToShow} onClick={handleSearchCountryChange}/>
    </div>
  );
}

export default App;
