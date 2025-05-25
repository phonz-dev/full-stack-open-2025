const Countries = ({ countries }) => {
	if (countries.length > 10) {
		return <p>Too many matches, specify another filter</p>;
    }

    if (countries.length === 1) {
        const { name: { common }, languages, flags: { png }, capital, area } = countries[0];

        return (
            <>
                <h2>{common}</h2>
                <div>Capital: {capital[0]}</div>
                <div>Area: {area}</div>
                <h3>Languages</h3>
                <ul>
                    {Object.values(languages).map(lang => <li key={lang}>{ lang }</li>)}
                </ul>
                <img src={png} />
            </>
        )
    }

	return countries.map(({ name: { common } }) => (
		<div key={common}>{common}</div>
	));
};

export default Countries;
