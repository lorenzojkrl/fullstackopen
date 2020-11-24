/* eslint-disable no-undef */
require('dotenv').config()

// TEST_MONGODB_URI to use test db

const PORT = process.env.PORT
let MONGODB_URI = process.env.TEST_MONGODB_URI
// console.log("Port in config: ", PORT)

if (process.env.NODE_ENV === 'test') {
    MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
    MONGODB_URI,
    PORT
}