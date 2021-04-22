import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const responseData = await axios
    .get(baseUrl)
    .then(response => response.data)
    .catch(error => console.log(error))

  return responseData
}

const createAnecdote = async (newAnecdote) => {
  const anecdoteObject = {
    content: newAnecdote,
    votes: 0
  }

  const createdAnecdote = await axios
    .post(baseUrl, anecdoteObject)
    .then(response => response.data)
    .catch(error => console.log(error))

  return createdAnecdote
}


export default {
  getAll,
  createAnecdote
}