import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    // This returns response but we only need response.data
    // return axios.get(baseUrl)
    // We no longer return the promise returned by axios directly. Instead, 
    // we assign the promise to the request variable and call its then method
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    // return axios.post(baseUrl, newObject)
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    // return axios.put(`${baseUrl}/${id}`, newObject)
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default {
    getAll: getAll,
    create: create,
    update: update
}