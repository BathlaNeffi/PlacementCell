const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:
    {
        type : String,
        required : true,
    },
    batch:
    {
        type : String,
        required : true
    },
    college:
    {
        type : String,
        required : true
    },
    status:
    {
        type : String,
        required : true
    },
    DSAFinalScore:
    {
        type : Number,
        required : true
    },
    WebDFinalScore:
    {
        type : Number,
        required : true
    },
    ReactFinalScore:
    {
        type : Number,
        required : true
    },
},{
    timestamps: true,
});


const Student = mongoose.model('Student',studentSchema);

module.exports= Student;