require('dotenv').config();
const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

const app = express();
morgan.token('body', req => JSON.stringify(req.body));

app.use(express.json());
app.use(cors())
app.use(express.static("dist"));
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
    Person.find({}).then(people => res.json(people));
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

app.delete("/api/persons/:id", (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(result => res.status(204).end())
        .catch(error => next(error))
})

app.post("/api/persons", (req, res) => {
    const body = req.body;

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: "name and number fields are required"
        });
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    });

    person.save().then(savedPerson => res.json(savedPerson));
})

const errorHandler = (error, req, res, next) => {
    console.log(error);

    if (error.message === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' });
    }

    next(error)
}

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
