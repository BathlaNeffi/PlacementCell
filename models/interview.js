const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    company:
    {
        type : String,
        required : true,
        unique: true
    },
    date:
    {
        type : Date,
        required : true
    },
    students:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Student'
        }
    ],
    results:[
        {
            student: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student",
              },
              result:{
                type:String,
              } ,
        }
    ]
},{
    timestamps: true,
});


const Interview = mongoose.model('Interview',interviewSchema);

module.exports= Interview;