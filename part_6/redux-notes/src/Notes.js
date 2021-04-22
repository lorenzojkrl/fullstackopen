import React from 'react';
import { toggleImportanceOf } from './reducers/noteReducer'
import { useSelector, useDispatch } from 'react-redux'

import noteService from './services/notes'

const Notes = () => {
  const dispatch = useDispatch()

  const notes = useSelector(({ filter, notes }) => {
    if (filter === 'ALL') {
      return notes
    }
    return filter === 'IMPORTANT'
      ? notes.filter(note => note.important)
      : notes.filter(note => !note.important)
  })

  const Note = ({ note, handleClick }) => {
    return (
      <li onClick={handleClick}>
        {note.content}
        <strong> {note.important ? 'important' : ''}</strong>
      </li>
    )
  }

  const changeImportance = async (note) => {
    const updatedImportance = await noteService.changeImportance(note)
    dispatch(toggleImportanceOf(updatedImportance.id))
  }

  return (
    <ul>
      {notes.map(note =>
        <Note
          key={note.id}
          note={note}
          handleClick={() =>
            changeImportance(note)
          }
        />
      )}
    </ul>
  );
};

export default Notes;