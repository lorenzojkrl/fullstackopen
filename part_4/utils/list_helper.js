const dummy = () => {
    return 1
}

const totalLikes = blogs => {
    const reducer = (sum, item) => {
        return sum + item
    }

    let arrLikes = []
    for (let i = 0; i < blogs.length; i++) {
        arrLikes.push(blogs[i].likes)
    }

    return blogs.length === 1
        ? blogs[0].likes
        : arrLikes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    let max = 0
    let index = 0
    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].likes > max) {
            max = blogs[i].likes
            index = i
        }
    }

    let obj = {
        'title': `${blogs[index].title}`,
        'author': `${blogs[index].author}`,
        'likes': blogs[index].likes
    }

    return obj
}

// To be reviewed for efficiency - Lodash suggested on fullstackopen
const mostBlogs = (blogs) => {
    let blogsByAuthor = {}
    for (let i = 0; i < blogs.length; i++) {
        // eslint-disable-next-line no-prototype-builtins
        if (blogsByAuthor.hasOwnProperty(`${blogs[i].author}`)) {
            blogsByAuthor[blogs[i].author] += 1
        } else {
            blogsByAuthor[blogs[i].author] = 1
        }
    }

    let max = 0
    let mostBlogsAuthor = {}
    for (const [key, value] of Object.entries(blogsByAuthor)) {
        if (value > max) {
            max = value
            mostBlogsAuthor['author'] = key
            mostBlogsAuthor['blogs'] = value
        }
    }
    return mostBlogsAuthor
}

// To be reviewed as above
const mostLikes = (blogs) => {
    let likesByAuthor = {}
    for (let i = 0; i < blogs.length; i++) {
        // eslint-disable-next-line no-prototype-builtins
        if (likesByAuthor.hasOwnProperty(`${blogs[i].author}`)) {
            likesByAuthor[blogs[i].author] += blogs[i].likes
        } else {
            likesByAuthor[blogs[i].author] = blogs[i].likes
        }
    }

    let max = 0
    let mostLikesAuthor = {}
    for (const [key, value] of Object.entries(likesByAuthor)) {
        if (value > max) {
            max = value
            mostLikesAuthor['author'] = key
            mostLikesAuthor['likes'] = value
        }
    }
    return mostLikesAuthor
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}