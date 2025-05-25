const Person = ({ name, number, deletePerson }) => {
	return (
		<div>
			{name} {number} <button onClick={deletePerson}>delete</button>
		</div>
	);
};

const Persons = ({ persons, deletePersonOf }) =>
	persons.map(({ name, number, id }) => (
		<Person key={name} name={name} number={number} deletePerson={() => deletePersonOf(id)} />
	));

export default Persons;
