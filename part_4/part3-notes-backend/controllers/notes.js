const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes)

  // syntax using .then
  // Note.find({}).then(notes => {
  //   response.json(notes.map(note => note.toJSON()))
  // })
})

notesRouter.get('/:id', async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id)
    note ? response.json(note) : response.status(404).end()
  } catch (exception) {
    next(exception)
  }

  // syntax using .then
  // Note.findById(request.params.id)
  //   .then(note => {
  //     if (note) {
  //       response.json(note.toJSON())
  //     } else {
  //       response.status(404).end()
  //     }
  //   })
  //   .catch(error => next(error))
})

notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  // Using promise .then
  // note.save()
  //   .then(savedNote => {
  //     response.json(savedNote.toJSON())
  //   })
  //   .catch(error => next(error))
  try {
    const savedNote = await note.save()
    response.json(savedNote)
  } catch (exception) {
    next(exception)
  }
})

notesRouter.delete('/:id', async (request, response, next) => {
  // Using promise .then
  try {
    await Note.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
  // Note.findByIdAndRemove(request.params.id)
  //   .then(() => {
  //     response.status(204).end()
  //   })
  //   .catch(error => next(error))
})

notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote.toJSON())
    })
    .catch(error => next(error))
})

module.exports = notesRouter