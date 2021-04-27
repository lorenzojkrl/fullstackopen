import React from 'react'
import { connect } from 'react-redux'

// import { useDispatch } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducer'

const Filter = (props) => {
  // const dispatch = useDispatch()

  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    // console.log(event.target.value);
    // dispatch(filterAnecdotes(event.target.value))
    props.filterAnecdotes(event.target.value)

  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter
      <input
        onChange={handleChange}
      />
    </div>
  )
}


// export default Filter

const ConnectedFilter = connect(
  null,
  { filterAnecdotes }
)(Filter)

export default ConnectedFilter