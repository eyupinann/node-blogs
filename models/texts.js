const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const textSchema = new Schema({
    title: { type: String, unique: true, required: true },
}, {
        collection: 'texts'
    }
);

const Text = mongoose.model('Text', textSchema);

module.exports = Text;
