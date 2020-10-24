require('dotenv').config()
const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')

// Hard coded into.env, then.gitignore.env
// const password = process.argv[2]
// const url =
//     `mongodb+srv://thephonebook:${password}@cluster0.1uzb3.mongodb.net/phonebookDB?retryWrites=true&w=majority`

// Moved to modules/person.js
// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

// Create personSchema Schema moved to models/person.js
// Format the objects returned by Mongoose moved to models/person.js

// const Person = mongoose.model('Person', personSchema)


app.use(cors());
app.use(express.static('build'))

// Not in use anymore when MongoDB is connected
// let persons = [
//     {
//         "name": "Arto Hellas",
//         "number": "040-123456",
//         "id": 1
//     },
//     {
//         "name": "Ada Lovelaceee",
//         "number": "39-44-5323523",
//         "id": 2
//     },
//     {
//         "name": "Dan Abramov",
//         "number": "12-43-234345",
//         "id": 3
//     },
//     {
//         "name": "Mary Poppendieck",
//         "number": "39-23-6423122",
//         "id": 4
//     }
// ]

app.use(express.json()) // remember this with api.post!!
// app.use(morgan('tiny')) // default version of morgan
morgan.token("body", req => JSON.stringify(req.body));
app.use(morgan(`:method :url :status :res[content-length] - :response-time ms :body`))

// Commented out when MongoDB is connected
// app.get('/api/persons', (req, res) => {
//     res.json(persons)
// })

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (req, res) => {
    res.send(`<div><p>Phonebook has info for ${persons.length} people</p> <p>${Date()}</p></div>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
        // res.send(`<p> As of now, ${Date()}, we don't know this person</p></div>`)

    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})



const generateRandomId = () => {
    const randomId = Math.floor(Math.random() * 1000000)
    return randomId
}

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'name or number missing'
        })
    } else if (persons.find(person => person.name === body.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateRandomId(),
    }

    persons = persons.concat(person)

    res.json(person)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

