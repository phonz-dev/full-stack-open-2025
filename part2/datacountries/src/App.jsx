import { useEffect, useState } from "react";
import dataCountriesService from "./services/data-countries";
import Countries from "./components/Countries";

function App() {
	const [searchVal, setSearchVal] = useState("");
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		dataCountriesService.getAll().then((res) => setCountries(res));
	}, [searchVal]);

	const handleSearchChange = (e) => setSearchVal(e.target.value);

	const filteredCountries = () =>
		countries.filter(({ name }) =>
			name.common.toLowerCase().includes(searchVal.toLowerCase())
		);

	return (
		<>
			<div>
				<span className="input-label">find countries</span>
				<input type="text" value={searchVal} onChange={handleSearchChange} />
			</div>
			<Countries countries={filteredCountries()} />
		</>
	);
}

export default App;
