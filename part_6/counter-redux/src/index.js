import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default: // if none of the above matches, code comes here
      return state
  }
}

const store = createStore(counterReducer)


const App = () => {

  // .dispath() 
  // The store uses the reducer to handle actions, 
  // which are dispatched to the store with its dispatch-method.

  // .getState()
  // Get the state of the store

  // .subscribe()
  // Create callback functions the store calls when its state is changed.
  // console.log(store.getState())
  // store.dispatch({ type: 'INCREMENT' })
  // store.dispatch({ type: 'INCREMENT' })
  // store.dispatch({ type: 'INCREMENT' })
  // console.log(store.getState())
  // store.dispatch({ type: 'ZERO' })
  // store.dispatch({ type: 'DECREMENT' })
  // console.log(store.getState())

  // Adding this function to subscribe
  // store.subscribe(() => {
  //   const storeNow = store.getState()
  //   console.log(storeNow)
  // })
  // every change in the store gets printed to the console.
  // store.dispatch({ type: 'INCREMENT' })
  // store.dispatch({ type: 'INCREMENT' })
  // store.dispatch({ type: 'INCREMENT' })

  return (
    <div>
      <div>Hola Redux Counter</div>
      <div>
        <div>
          {store.getState()}
        </div>
        {/* The actionhandlers of the buttons dispatch the right actions to the store. */}
        <button
          onClick={e => store.dispatch({ type: 'INCREMENT' })}
        >
          plus
      </button>
        <button
          onClick={e => store.dispatch({ type: 'DECREMENT' })}
        >
          minus
      </button>
        <button
          onClick={e => store.dispatch({ type: 'ZERO' })}
        >
          zero
      </button>
      </div>


    </div>

  )

}

// When the state in the store is changed, React is not able to automatically rerender the application. Thus we have registered a function renderApp, which renders the whole app, 
// to listen for changes in the store with the store.subscribe method.
const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

// Note that we have to immediately call the renderApp method. 
// Without the call the first rendering of the app would never happen.

renderApp()
store.subscribe(renderApp)


