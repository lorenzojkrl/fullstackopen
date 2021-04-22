import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import App from './App';
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

import noteService from './services/notes'

import reportWebVitals from './reportWebVitals';

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})

const store = createStore(
  reducer,
  composeWithDevTools()
)

noteService
  .getAll()
  .then(notes =>
    notes.forEach(note => {
      store.dispatch({
        type: 'NEW_NOTE',
        data: note
      })
    })
  )

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
