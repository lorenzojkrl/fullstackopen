const mongoose = require('mongoose')

// Create personSchema Schema
const personSchema = new mongoose.Schema({
    name: String,
    number: String // because it can contain non numeric characters
})

const Person = mongoose.model('Person', personSchema)

const password = process.argv[2]
const url =
    `mongodb+srv://thephonebook:${password}@cluster0.1uzb3.mongodb.net/phonebookDB?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })


// Ask user to input 3 args: password, name, number
if (process.argv.length < 5 && process.argv.length > 3) {
    console.log(`Please provide more arguments. You are missing either the password, the name or the phone number: node mongo.js <password> <name> <number>`)
    process.exit(1)
} else if (process.argv.length === 3) {
    console.log('phonebook:')

    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
        // console.log('Connection closed')
    })
} else {
    // Save args from user
    const nameInput = process.argv[3]
    const numberInput = process.argv[4]

    const person = new Person({
        name: nameInput,
        number: numberInput
    })

    person.save().then(result => {
        console.log(`added ${nameInput} number ${numberInput} to phonebook`)
        mongoose.connection.close()
    })
}

