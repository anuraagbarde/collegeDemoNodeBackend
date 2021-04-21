const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collegeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    yearFounded: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    noOfStudents: {
        type: Number,
        required: true
    },
    courses: [String]
}, {
    timestamps: true
});

var College = mongoose.model('College', collegeSchema, 'colleges');

module.exports = College;