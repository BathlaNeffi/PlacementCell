const Student= require('../models/student');
const csv = require("fast-csv");
const fs = require("fs");
module.exports.studentsPage=async(req,res)=>{
    try {
        if(req.isAuthenticated()){
            const student=await Student.find({}).sort('-createdAt');
            return res.render('students',{
                title:'Students',
                student:student
            })
        }
        
    } catch (error) {
        console.log('Error occured at student page render',error);
        return res.redirect('back');
    }
};

module.exports.addStudents= async(req,res)=>{
    try {
        const student=await Student.create(req.body);
        req.flash('success','Student added');
        return res.redirect('back');    
    } catch (error) {
        console.log('Error occured in adding student',error);
        return res.redirect('back');
    }
}



//Download a complete CSV of all the data of students
module.exports.downloadCSV = async (req, res) => {
    try {
      let students = await Student.find().populate("interviews");
      const csvStream = csv.format({ headers: true });
  
      if (!fs.existsSync("assets/files/export")) {
        if (!fs.existsSync("assets/files")) {
          fs.mkdirSync("assets/files/");
        }
  
        if (!fs.existsSync("assets/files/export/")) {
          fs.mkdirSync("./assets/files/export/");
        }
      }
  
      const writeableStream = fs.createWriteStream(
        "assets/files/export/students.csv"
      );
  
      csvStream.pipe(writeableStream);
  
      writeableStream.on("finish", function () {
        return res.json({
         downloadURL: `${process.env.PLACEMENT_CELL_URL}/files/export/students.csv`,
        });
      });
      if (students.length > 0) {
  
        students.map((student) => {
  
          let interviews = student.interviews || [];
  
          interviews.map((interview) => {
  
            let results = interview.results || [];
  
            results.map((result) =>{
  
            
          csvStream.write({
            Student_id: student._id ? student._id : "-",
            Student_Name: student.name ? student.name : "-",
            Student_College: student.college ? student.college : "-",
            Student_Status: student.status ? student.status : "-",
            Student_DSAFinalScore: student.DSAFinalScore ? student.DSAFinalScore : "-",
            Student_WebDFinalScore: student.WebDFinalScore ? student.WebDFinalScore : "-",
            Student_ReactFinalScore: student.ReactFinalScore ? student.ReactFinalScore : "-",
            Student_InterviewDate: interview.date ? interview.date : "-",
            Student_InterviewCompany: interview.company ? interview.company : "-",
            Student_InterviewResult: result.result ? result.result : "-",
          });
        });
      });
    });
  
      }
      csvStream.end();
      writeableStream.end();
    } catch (err) {
      console.log(`error in download CSV controller ${err}`);
      return;
    }
  };
  