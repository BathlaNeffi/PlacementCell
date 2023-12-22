const Student= require('../models/student');
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
        return res.redirect('back');    
    } catch (error) {
        console.log('Error occured in adding student',error);
        return res.redirect('back');
    }
}