import { useEffect, useState } from "react";
import personsService from "./services/persons";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";


const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");

	useEffect(() => {
		personsService.getAll().then((initialPersons) => {
			setPersons(initialPersons);
		});
	}, []);

	const addPerson = (event) => {
		event.preventDefault();

		if (persons.some(({ name }) => name === newName)) {
			alert(`${newName} is already added to phonebook`);
			return;
		}

		const newPerson = {
			name: newName,
			number: newNumber,
		};

		personsService.create(newPerson).then((returnedPerson) => {
			setPersons([...persons, returnedPerson]);
			setNewName("");
			setNewNumber("");
		});
	};

	const personsToShow =
		filter === ""
			? persons
			: persons.filter(({ name }) =>
					name.toLowerCase().includes(filter.toLowerCase())
			  );

	const handleFilterChange = (event) => setFilter(event.target.value);
	const handleNameChange = (event) => setNewName(event.target.value);
	const handleNumberChange = (event) => setNewNumber(event.target.value);

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={filter} onChange={handleFilterChange} />
			<h3>add a new</h3>
			<PersonForm
				newName={newName}
				newNumber={newNumber}
				addPerson={addPerson}
				onNameChange={handleNameChange}
				onNumberChange={handleNumberChange}
			/>
			<h3>Numbers</h3>
			<Persons persons={personsToShow} />
		</div>
	);
};

export default App;
