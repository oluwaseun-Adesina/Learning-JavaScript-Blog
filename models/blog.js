const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const blogSchema = new Schema({
    title: {
        type: String,
        requiried: true
    },
    snippet: {
        type: String,
        requiried: true
    },
    body: {
        type: String,
        requiried: true
    }
}, {timestamps: true})


const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog; 
