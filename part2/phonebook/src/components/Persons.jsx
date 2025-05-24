const Person = ({ name, number }) => (
    <div>
        {name} {number}
    </div>
);

const Persons = ({ persons }) =>
    persons.map(({ name, number }) => (
        <Person key={name} name={name} number={number} />
    ));

export default Persons
