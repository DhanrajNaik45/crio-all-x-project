import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchCountries, setSearchCountries] = useState([]);

  const fetchCountries = async () => {
    try {
      let countriesData = await fetch(
        "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries",
      );
      let countries = await countriesData.json();
      setCountries(countries);
    } catch (error) {
      console.error( error);
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    const filtered = countries.filter((country) =>
      country.common.toLowerCase().includes(searchText.toLowerCase()),
    );
    setSearchCountries(filtered);
  }, [searchText, countries]);

  return (
    <div className="">
      <input
        type="text"
        placeholder="Search for countries..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className="container">
        {searchCountries.map((country, index) => {
          return (
            <div className="countryCard" key={country.common + index}>
              <img src={country.png} alt={country.common} />
              <span>{country.common}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
