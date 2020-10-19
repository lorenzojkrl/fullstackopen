import axios from 'axios'
const baseUrl = '/api/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

// export default {
//     getAll: getAll,
//     create: create,
//     update: update
// }
// However, since both the property fields and the variable names in the object are the same, 
// it's enough to simply write the following in ES6 JavaScript:


export default { getAll, create, update }