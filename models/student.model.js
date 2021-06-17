const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    school: { type: String, required: true },
    subject: { type: String, required: true },
    score: { type: Number, required: true }
},
{
    timestamps: true
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;