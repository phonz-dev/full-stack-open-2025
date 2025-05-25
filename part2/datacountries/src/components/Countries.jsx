import Country from "./Country";

const Countries = ({ countries, onShowCountryClick }) => {
	if (countries.length > 10) {
		return <p>Too many matches, specify another filter</p>;
	}

	if (countries.length === 1) {
		return <Country country={countries[0]} />
	}

	return countries.map(({ name: { common } }) => (
		<div key={common}>{common} <button onClick={() => onShowCountryClick(common)}>show</button></div>
	));
};

export default Countries;
