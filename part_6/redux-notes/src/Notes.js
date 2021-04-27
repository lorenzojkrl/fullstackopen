import React from 'react';
import { toggleImportanceOf } from './reducers/noteReducer'
// import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'

import noteService from './services/notes'

const Notes = (props) => {
  // const dispatch = useDispatch()

  // const notes = useSelector(({ filter, notes }) => {
  //   if (filter === 'ALL') {
  //     return notes
  //   }
  //   return filter === 'IMPORTANT'
  //     ? notes.filter(note => note.important)
  //     : notes.filter(note => !note.important)
  // })

  // const notesToShow = () => {
  //   if (props.filter === 'ALL') {
  //     return props.notes
  //   }

  //   return props.filter === 'IMPORTANT'
  //     ? props.notes.filter(note => note.important)
  //     : props.notes.filter(note => !note.important)
  // }

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
    props.toggleImportanceOf(updatedImportance.id)
  }

  return (
    <ul>
      {/* {notesToShow.map(note =>
        <Note
          key={note.id}
          note={note}
          handleClick={() =>
            changeImportance(note)
          }
        />
      )} */}
      {props.notes.map(note =>
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

const mapStateToProps = (state) => {
  if (state.filter === 'ALL') {
    return {
      notes: state.notes
    }
  }
  return {
    notes: (state.filter === 'IMPORTANT'
      ? state.notes.filter(note => note.important)
      : state.notes.filter(note => !note.important)
    )
  }
}

const mapDispatchToProps = {
  toggleImportanceOf,
}

// export default Notes;
const ConnectedNotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes)

export default ConnectedNotes