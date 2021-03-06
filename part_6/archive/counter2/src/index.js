import './App.css';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

// reducer function
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}

// Don't call reducer directly
// The store uses the reducer to handle actions
// which are dispatched to the store with its dispatch method.
const store = createStore(counterReducer)

store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Counter
        </p>
        <div>
          <div>
            {/* App renders the value of the counter 
          by asking it from the store 
          with the method store.getState(). */}
            {store.getState()}
          </div>
          <button
            // The action handlers of the buttons dispatch the right actions to the store.
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
      </header>
    </div>
  );
}

// When the state in the store is changed, 
// React is not able to automatically rerender the application. 
// Thus we have registered a function renderApp, which renders the whole app, 
// to listen for changes in the store with the store.subscribe method.

const renderApp = () => {
  ReactDOM.render(<App />,
    document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)

// getState(), dispatch(), subscribe()
// 1) Implement the state in the store 
// 2) Create reducer, pass in the state of the store and actions
// Reducer returns a new state based on the actions type.
// 3) A reducer is never supposed to be called directly from the applications code
// the reducer is only given as a parameter to the createStore function which creates the store
// 4) The store now uses the reducer to handle actions, dispatch() 
// 'send' to the store with its dispatch method.
// 5) getState(), find out the state of the store
// 6) subscribe() creates callback functions the store calls when its state is changed.