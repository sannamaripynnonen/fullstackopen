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

module.exports = {
    totalLikes
}