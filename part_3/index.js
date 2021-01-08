// require('dotenv').config()
// const { request, response } = require('express')
// const express = require('express')
// const morgan = require('morgan')
// const app = express()
// const cors = require('cors')
// const mongoose = require('mongoose')
// const Person = require('./models/person')

// // Hard coded into.env, then.gitignore.env
// // const password = process.argv[2]
// // const url =
// //     `mongodb+srv://thephonebook:${password}@cluster0.1uzb3.mongodb.net/phonebookDB?retryWrites=true&w=majority`

// // Moved to modules/person.js
// // mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

// // Create personSchema Schema moved to models/person.js
// // Format the objects returned by Mongoose moved to models/person.js

// // const Person = mongoose.model('Person', personSchema)

// app.use(cors());
// app.use(express.static('build'))

// app.use(express.json()) // remember this with api.post!!
// // app.use(morgan('tiny')) // default version of morgan
// morgan.token("body", req => JSON.stringify(req.body));
// app.use(morgan(`:method :url :status :res[content-length] - :response-time ms :body`))


// app.get('/api/persons', (request, response) => {
//     Person.find({})
//         .then(persons => {
//             response.json(persons)
//         })
//         .catch(err => next(err))
// })

// app.get('/info', (req, res) => {
//     Person.find({})
//         .then(persons => {
//             persons.map(person => person.toJSON());
//             res.send(`<div><p>Phonebook has info for ${persons.length} people</p> <p>${Date()}</p></div>`)
//         })
// })


// app.get('/api/persons/:id', (req, res) => {
//     // const id = Number(req.params.id)
//     // const person = persons.find(person => person.id === id)
//     Person.findById(req.params.id)
//         .then(person => {
//             res.json(person)
//         })
//         .catch(err => next(err))
// })


// app.delete('/api/persons/:id', (req, res, next) => {
//     // const id = Number(req.params.id)
//     // persons = persons.filter(person => person.id !== id)
//     Person.findByIdAndRemove(req.params.id)
//         .then(result => {
//             console.log(`${result} deleted`)
//             res.status(204).end()
//         })
//         .catch(err => next(err))
//     // res.status(204).end()
// })


// app.post('/api/persons', (req, res, next) => {
//     const body = req.body

//     const person = new Person({
//         name: body.name,
//         number: body.number,
//     })

//     person.save()
//         .then(savedPerson => {
//             res.json(savedPerson)
//         })
//         .catch(err => next(err))
// })

// app.put('/api/persons/:id', (req, res, next) => {
//     const body = req.body

//     const person = {
//         name: body.name,
//         number: body.number
//     }

//     Person.findByIdAndUpdate(req.params.id, person, { new: true })
//         .then(updateContact => {
//             res.json(updateContact)
//         })
//         .catch(err => next(err))
// })

// const errorHandler = (error, request, response, next) => {
//     console.error(error.message)
//     if (error.name === 'CastError') {
//         return response.status(400).send({ error: 'malformatted id' })
//     } else if (error.name === 'ValidationError') {
//         return response.status(400).json({ error: error.message })
//     }

//     next(error)
// }

// app.use(errorHandler)

// const PORT = process.env.PORT
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })

const express = require('express')
const app = express()

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2019-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2019-05-30T19:20:14.298Z",
        important: true
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})