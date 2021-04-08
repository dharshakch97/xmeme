const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const normalize = require('normalize-mongoose');

const MemeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    }
});

MemeSchema.plugin(normalize);

const meme = mongoose.model('meme', MemeSchema);
module.exports = meme;