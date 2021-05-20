import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config) //.then(console.log)
  return response.data
}

const update = async (id, updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const { id: _notUsedId, ...payload } = updatedBlog
  payload.user = payload.user.id

  console.log(`payload`, payload);
  const response = await axios.put(`${baseUrl}/${id}`, payload, config)

  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}


export default { getAll, create, update, remove, setToken }