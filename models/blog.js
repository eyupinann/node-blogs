const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: { type: String, unique: true, required: true },
    content: { type: String, required: true },
    image: { type: String, unique: true, required: true },
}, {
        collection: 'blog' // Özelleştirilmiş koleksiyon adı
    }
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
