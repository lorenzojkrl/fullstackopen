import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = async () => {
  const response = await axios
    .get(baseUrl)
    .then(response => response.data)
    .catch(error => console.log(error))

  return response
}

const createNew = async (content) => {
  const object = { content, important: false }
  const response = await axios
    .post(baseUrl, object)
    .then(response => response)
    .catch(error => console.log(error))

  return response.data
}

const changeImportance = async (content) => {
  const object = { content: content.content, important: !content.important }
  const response = await axios
    .put(
      `http://localhost:3001/notes/${content.id}`,
      object
    )
    .then(response => response)
    .catch(error => console.log(error))

  return response.data

}

export default {
  getAll,
  createNew,
  changeImportance
}