import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const responseData = await axios
    .get(baseUrl)
    .then(response => response.data)
    .catch(error => console.log(error))

  return responseData
}

export default {
  getAll
}