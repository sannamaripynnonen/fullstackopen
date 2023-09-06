const blog = require("../models/blog");

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    } else if (blogs.length === 1) {
        return blogs[0].likes
    } else {
        let result = 0
        blogs.forEach(blog => {
            result += blog.likes
        });
        return result
    }
}

const favoriteBlog = (blogs) => {
    let i = 0
    let highestLikes = 0
    let blogWithHighlikes = 0

    blogs.forEach(blog => {
        if (blog.likes > highestLikes) {
            highestLikes = blog.likes
            blogWithHighlikes = i
        }
        i = i + 1
    })
    return blogs[blogWithHighlikes]
}

module.exports = {
    totalLikes,
    favoriteBlog
}