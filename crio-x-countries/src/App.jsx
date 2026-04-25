import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);

  const fetchCountries = async () => {
    try {
      let countriesData = await fetch(
        "https://xcountries-backend.labs.crio.do/all",
      );
      let countries = await countriesData.json();
      setCountries(countries);
    } catch (error) {
      console.error("Error fetching data: ", error);
      return null;
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div className="container">
      {countries.map((country, index) => {
        return (
          <div className="card" key={country.name + index}>
            <img src={country.flag} alt={country.abbr} />
            <span>{country.name}</span>
          </div>
        );
      })}
    </div>
  );
}

export default App;