const mongoose = require('mongoose')

// Moved to app.js
// const mongoUrl = process.env.MONGODB_URI

// mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
//     .then(result => {
//         console.log('Connected to MongoDB')
//     })
//     .catch((error) => {
//         console.log('Error connecting to MongoDB:', error.message)
//     })

// Add type and requirement
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    date: Date,
    url: {
        type: String,
        required: true,
        // minlength: 6
    },
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)
