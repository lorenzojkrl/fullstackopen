import React from 'react'
import { useDispatch } from 'react-redux'
import { filterAction } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()
    const style = {
        marginBottom: 10
    }

    const handleChange = (event) => {
        // input-field value is in variable event.target.value
        // console.log(event.target.value);
        dispatch(filterAction(event.target.value))
    }


    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter