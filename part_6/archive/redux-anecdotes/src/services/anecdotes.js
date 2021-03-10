import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
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
    let voted = anecdote
    voted.votes += 1
    const response = await axios.put(updateUrl, voted)
    return response.data
}

export default { getAll, createNew, updateVote }