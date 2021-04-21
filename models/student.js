const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    yearOfBatch: {
        type: Number,
        required: true
    },
    college: {
        type: Schema.Types.ObjectId,
        ref: 'College'
    },
    skills: [String],
}, {
    timestamps: true
});

var Student = mongoose.model('Student', studentSchema, 'students');

module.exports = Student;