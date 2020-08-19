const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema for resume data
let Resume = new Schema({
    name: {
        type: String
    },
    age: {
        type: String
    },
    gender: {
        type: String
    },
    dob: {
        type: String
    },
    image:{
        type: String
    },
    imageId: {
        type: String
    }
});

module.exports = Resume = mongoose.model('Resume', Resume);