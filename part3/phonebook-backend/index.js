require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();

app.use(express.static("dist"));
app.use(express.json());
// app.use(cors());
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
	morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

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

app.get("/info", (req, res, next) => {
	Person.find({}).then((persons) => {
		const body = `<div><p>Phonebook has info for ${persons.length} people</p><p>${new Date().toString()}</p></div>`;
		res.send(body);
	}).catch(error => next(error));
});

app.get("/api/persons", (req, res) => {
	Person.find({}).then((people) => res.json(people));
});

app.get("/api/persons/:id", (req, res, next) => {
	Person.findById(req.params.id)
		.then((person) => {
			if (!person) {
				return res.status(404).end();
			}

			res.json(person);
		})
		.catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
	Person.findByIdAndDelete(req.params.id)
		.then((result) => res.status(204).end())
		.catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
	const { name, number } = req.body;

	if (!name || !number) {
		return res.status(400).json({
			error: "name and number fields are required",
		});
	}

	const person = new Person({
		name: name,
		number: number,
	});

    person.save()
        .then((savedPerson) => res.json(savedPerson))
        .catch(error => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
	const { name, number } = req.body;

	Person.findById(req.params.id)
		.then((person) => {
			if (!person) {
				return res.status(404).end();
			}

			person.name = name;
			person.number = number;

			return person.save().then((updatedPerson) => res.json(updatedPerson));
		})
		.catch((error) => next(error));
});

const errorHandler = (error, req, res, next) => {
	console.log(error.message);

	if (error.name === "CastError") {
		return res.status(400).send({ error: "malformatted id" });
    } else if (error.name === "ValidationError") {
        return res.status(400).send({ error: error.message });
    }

	next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
