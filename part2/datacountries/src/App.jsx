import { useEffect, useState } from "react";
import dataCountriesService from "./services/data-countries";
import Countries from "./components/Countries";

function App() {
	const [searchVal, setSearchVal] = useState("");
  const [countries, setCountries] = useState([]);

	useEffect(() => {
		dataCountriesService.getAll().then((res) => setCountries(res));
  }, []);

  const filteredCountries = () =>
		countries.filter(({ name }) =>
			name.common.toLowerCase().includes(searchVal.toLowerCase())
		);

	const handleSearchChange = (e) => setSearchVal(e.target.value);

  const handleShowCountryClick = country => setSearchVal(country);

	return (
		<>
			<div>
				<span className="input-label">find countries</span>
				<input type="text" value={searchVal} onChange={handleSearchChange} />
			</div>
			{searchVal === '' ? null : <Countries countries={filteredCountries()} onShowCountryClick={handleShowCountryClick} />}
		</>
	);
}

export default App;
