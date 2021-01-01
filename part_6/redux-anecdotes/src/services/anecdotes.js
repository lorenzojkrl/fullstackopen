import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    console.log("typeof response.data:", typeof response.data);
    console.log('response.data:', response.data);
    return response.data
}

const createNew = async (content, votes = 0) => {
    const object = {
        content,
        votes
    }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const updateVote = async (anecdote) => {
    let updateUrl = `${baseUrl}/${anecdote.id}`
    const response = await axios.put(updateUrl, anecdote)
    return response.data
}

export default { getAll, createNew, updateVote }