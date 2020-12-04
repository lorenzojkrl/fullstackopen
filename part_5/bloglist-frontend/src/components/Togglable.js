import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'


const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>{props.back}</button>
      </div>
    </div>
  )
})

// this way around the problem, or propTypes
Togglable.defaultProps = {
  buttonLabel: 'New',
  back: 'Cancel'
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable