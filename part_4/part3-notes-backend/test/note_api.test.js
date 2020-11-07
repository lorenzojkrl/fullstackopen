const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Note = require('../models/note')


beforeEach(async () => {
    await Note.deleteMany({})
    // console.log('cleared')

    // Best option
    const noteObjects = helper.initialNotes
        .map(note => new Note(note))
    const promiseArray = noteObjects.map(note => note.save())
    await Promise.all(promiseArray)

    // for (let note of helper.initialNotes) {
    //     let noteObject = new Note(note)
    //     await noteObject.save()
    // }

    // let noteObject = new Note(helper.initialNotes[0])
    // await noteObject.save()
    // noteObject = new Note(helper.initialNotes[1])
    // await noteObject.save()
})

describe('When there is initially some notes saved', () => {
    test('notes are returned as json', async () => {
        await api
            .get('/api/notes')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all notes are returned', async () => {
        const response = await api.get('/api/notes')

        expect(response.body).toHaveLength(helper.initialNotes.length)
    })

    test('a specific note is within the returned notes', async () => {
        const response = await api.get('/api/notes')

        const contents = response.body.map(r => r.content)
        expect(contents).toContain(
            'Browser can execute only Javascript'
        )
    })
})

describe('Viewing a specific note', () => {
    // tests for fetching an individual note
    test('succeed with a valid id', async () => {
        const notesAtStart = await helper.notesInDb()
        const noteToView = notesAtStart[0]

        const resultNote = await api
            .get(`/api/notes/${noteToView.id}`)
            .expect(200)
            .expect('COntent-Type', /application\/json/)

        const processesNoteToView = JSON.parse(JSON.stringify(noteToView))
        expect(resultNote.body).toEqual(processesNoteToView)
    })

    test('fails with statuscode 404 if note does not exist', async () => {
        const validNonexistingId = await helper.nonExistingId()

        // Log id of deleted note
        console.log(validNonexistingId)

        await api
            .get(`/api/notes/${validNonexistingId}`)
            .expect(404)
    })

    test('fails with statuscode 400: id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'

        await api
            .get(`/api/notes/${invalidId}`)
            .expect(400)
    })
})

describe('Addition of a new note', () => {
    test('succeed with valid data', async () => {
        const newNote = {
            content: 'async/await simplifies making async calls',
            important: true,
        }

        await api
            .post('/api/notes')
            .send(newNote)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        // Validate a new note added
        // const response = await api.get('/api/notes')
        const notesAtEnd = await helper.notesInDb()
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)
        const contents = notesAtEnd.map(note => note.content)

        // Validate content
        // const contents = response.body.map(r => r.content)
        // expect(response.body).toHaveLength(helper.initialNotes.length + 1)
        expect(contents).toContain(
            'async/await simplifies making async calls'
        )
    })

    test('fails with status 400 if data is invalid', async () => {
        const newNote = {
            important: true
        }

        await api
            .post('/api/notes')
            .send(newNote)
            .expect(400)

        // Validate a new note is NOT added
        // const response = await api.get('/api/notes')
        // expect(response.body).toHaveLength(initialNotes.length)
        const notesAtEnd = await helper.notesInDb()
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
    })
})

describe('Deletion of a note', () => {
    // tests for removing an individual note
    test('succeed with status 204 if id is valid', async () => {
        const notesAtStart = await helper.notesInDb()
        const noteToDelete = notesAtStart[0]

        await api
            .delete(`/api/notes/${noteToDelete.id}/`)
            .expect(204)

        // Validate a note is removed
        const notesAtEnd = await helper.notesInDb()
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1)

        // Validate content is removed
        const contents = notesAtEnd.map(r => r.content)
        expect(contents).not.toContain(noteToDelete.content)
    })
})


afterAll(() => {
    mongoose.connection.close()
});

`
The provided parameter can refer to the name of the test or the describe block. 
The parameter can also contain just a part of the name. 
The following command will run all of the tests that contain notes in their name:

npm test -- -t 'notes'
`