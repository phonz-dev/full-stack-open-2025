import { useEffect, useState } from "react";
import personsService from "./services/persons";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");
	const [noficationMsg, setNotificationMsg] = useState(null);

	useEffect(() => {
		personsService.getAll().then((initialPersons) => {
			setPersons(initialPersons);
		});
	}, []);

	const addPerson = (event) => {
		event.preventDefault();

		if (newName === "" || newNumber === "") return;

		if (persons.some(({ name }) => name === newName)) {
			const personExist = confirm(
				`${newName} is already added to phonebook, replace the old number with a new one?`
			);

			if (personExist) {
				const personToBeUpdated = persons.find((p) => p.name === newName);
				const updatedPerson = {
					...personToBeUpdated,
					number: newNumber,
				};

				personsService.update(updatedPerson.id, updatedPerson).then((res) => {
					setPersons(persons.map((p) => (p.id === res.id ? res : p)));
					setNewName("");
					setNewNumber("");
					setNotificationMsg(`Updated ${res.name}`);
					setTimeout(() => {
						setNotificationMsg(null);
					}, 5000);
				});
				return;
			}
		}

		const newPerson = {
			name: newName,
			number: newNumber,
			id: String(persons.length + 1),
		};

		personsService.create(newPerson).then((returnedPerson) => {
			setPersons([...persons, returnedPerson]);
			setNewName("");
			setNewNumber("");
			setNotificationMsg(`Added ${returnedPerson.name}`);
			setTimeout(() => {
				setNotificationMsg(null);
			}, 5000);
		});
	};

	const deletePerson = (id) => {
		const personToBeDeleted = persons.find((p) => p.id === id);
		const remove = confirm(`Delete ${personToBeDeleted.name}?`);

		if (remove) {
			personsService
				.remove(id)
				.then((res) => setPersons(persons.filter((p) => p.id !== res.id)));
		}
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
			<Notification message={noficationMsg} />
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
			<Persons persons={personsToShow} deletePersonOf={deletePerson} />
		</div>
	);
};

export default App;
