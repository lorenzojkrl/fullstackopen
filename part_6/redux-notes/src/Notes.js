import React from 'react';
import { toggleImportanceOf } from './reducers/noteReducer'
import { useSelector, useDispatch } from 'react-redux'



const Notes = () => {
  const notes = useSelector(state => state)
  const dispatch = useDispatch()

  const Note = ({ note, handleClick }) => {
    return (
      <li onClick={handleClick}>
        {note.content}
        <strong> {note.important ? 'important' : ''}</strong>
      </li>
    )
  }

  return (
    <ul>
      {notes.map(note =>
        <Note
          key={note.id}
          note={note}
          handleClick={() =>
            dispatch(toggleImportanceOf(note.id))
          }
        />
      )}
    </ul>
  );
};

export default Notes;