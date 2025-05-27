const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.mrk1y3h.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema);

if (process.argv.length > 3) {
    const name = process.argv[3];
    const number = process.argv[4];

    const person = new Person({ name, number });

    person.save().then(_ => {
        console.log(`added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
    })
} else {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(({name, number}) => {
            console.log(`${name} ${number}`);
        })
        mongoose.connection.close();
    })
}
