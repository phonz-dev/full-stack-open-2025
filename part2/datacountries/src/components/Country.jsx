const Country = ({ country }) => {
	const {
		name: { common },
		languages,
		flags: { png },
		capital,
		area,
	} = country;

	return (
		<>
			<h2>{common}</h2>
			<div>Capital: {capital[0]}</div>
			<div>Area: {area}</div>
			<h3>Languages</h3>
			<ul>
				{Object.values(languages).map((lang) => (
					<li key={lang}>{lang}</li>
				))}
			</ul>
			<img src={png} />
		</>
	);
};

export default Country
