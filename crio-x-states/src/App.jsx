import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const fetchCountries = async () => {
    try {
      let countriesData = await fetch(
        "https://location-selector.labs.crio.do/countries",
      );
      let countries = await countriesData.json();
      setCountries(countries);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const fetchStates = async () => {
    try {
      if (!selectedCountry) {
        throw new Error("Country is not selected");
      }
      let statesData = await fetch(
        `https://location-selector.labs.crio.do/country=${selectedCountry}/states`,
      );
      let states = await statesData.json();
      setStates(states);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const fetchCities = async () => {
    try {
      let citiesData = await fetch(
        `https://location-selector.labs.crio.do/country=${selectedCountry}/state=${selectedState}/cities`,
      );
      let cities = await citiesData.json();
      setCities(cities);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) fetchCities();
  }, [selectedState, selectedCountry]);

  return (
    <div>
      <h1>Select Location</h1>

      <div className="container">
        <select
          className="select"
          onChange={(e) => {
            setSelectedCountry(e.target.value);
            setSelectedState("");
            setSelectedCity("");
            setStates([]);
            setCities([]);
          }}
          value={selectedCountry}
        >
          <option value={""}>Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <select
          className="select"
          disabled={!selectedCountry}
          onChange={(e) => {
            setSelectedState(e.target.value);
            setCities([]);
            setSelectedCity("");
          }}
          value={selectedState}
        >
          <option value={""}>Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select
          className="select"
          disabled={!selectedState}
          onChange={(e) => {
            setSelectedCity(e.target.value);
            console.log(selectedCity);
          }}
          value={selectedCity}
        >
          <option value={""}>Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      {selectedCity && selectedState && selectedCountry && (
        <h2>
          You selected {selectedCity}, {selectedState}, {selectedCountry}
        </h2>
      )}
    </div>
  );
}

export default App;