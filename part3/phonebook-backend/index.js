const express = require("express");
const app = express();
const morgan = require('morgan');

morgan.token('body', req => JSON.stringify(req.body));

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
	{
		id: "1",
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: "2",
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: "3",
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: "4",
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
];

const generateId = () => String(Math.floor(Math.random() * 1_000_000_000)); // range: 0 to 999,999,999

app.get("/info", (req, res) => {
	const body = `<div><p>Phonebook has info for ${persons.length} people</p><p>${new Date().toString()}</p></div>`;
	res.send(body);
});

app.get("/api/persons", (req, res) => {
	res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    const person = persons.find(p => p.id === id);

    if (person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
})

app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    persons = persons.filter(p => p.id !== id);
    res.status(204).end();
})

app.post("/api/persons", (req, res) => {
    const body = req.body;

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: "name and number fields are required"
        });
    }

    if (persons.some(({ name }) => name === body.name)) {
        return res.status(400).json({
            error: "name must be unique"
        });
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    };

    persons = persons.concat(person);
    res.json(person);
})

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
