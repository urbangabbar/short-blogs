const mongoose = require('mongoose');

const blogCollection = 'blog';

const Blog = mongoose.model(blogCollection, {
    title: String,
    content: String,
    userID: mongoose.Types.ObjectId
});

module.exports = Blog;