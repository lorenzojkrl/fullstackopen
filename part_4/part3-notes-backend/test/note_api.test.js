const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Note = require('../models/note')


beforeEach(async () => {
    await Note.deleteMany({})
    console.log('cleared')

    for (let note of helper.initialNotes) {
        let noteObject = new Note(note)
        await noteObject.save()
    }

    // let noteObject = new Note(helper.initialNotes[0])
    // await noteObject.save()
    // noteObject = new Note(helper.initialNotes[1])
    // await noteObject.save()
})

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

test('a valid note can be added', async () => {
    const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
    }

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    // const response = await api.get('/api/notes')
    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)
    const contents = notesAtEnd.map(note => note.content)
    // const contents = response.body.map(r => r.content)
    // expect(response.body).toHaveLength(helper.initialNotes.length + 1)
    expect(contents).toContain(
        'async/await simplifies making async calls'
    )
})

test('note without content is not added', async () => {
    const newNote = {
        important: true
    }

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(400)

    // const response = await api.get('/api/notes')
    // expect(response.body).toHaveLength(initialNotes.length)
    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
})

// tests for fetching an individual note
test('a specific note can be viewed', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToView = notesAtStart[0]

    const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('COntent-Type', /application\/json/)

    const processesNoteToView = JSON.parse(JSON.stringify(noteToView))
    expect(resultNote.body).toEqual(processesNoteToView)
})

// tests for removing an individual note
test('a note can be deleted', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToDelete = notesAtStart[0]

    await api
        .delete(`/api/notes/${noteToDelete.id}/`)
        .expect(204)

    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1)

    const contents = notesAtEnd.map(r => r.content)
    expect(contents).not.toContain(noteToDelete.content)
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