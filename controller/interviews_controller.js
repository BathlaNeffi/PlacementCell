const Interview=require('../models/interview');
const Student= require('../models/student');
module.exports.interviewPage=async(req,res)=>{
    try {

        if(req.isAuthenticated()){
            const interview=await Interview.find({}).sort('date');
            return res.render('interviews',{
                title:'Interviews',
                interview:interview
            })
        }
        
    } catch (error) {
        console.log('Error:' ,error);
        return res.redirect('back');
    }
};


module.exports.addInterviews= async(req,res)=>{
    try {
        const interview=await Interview.create(req.body);
        return res.redirect('back');
    } catch (error) {
        console.log('Error:' ,error);
        return res.redirect('back');
    }
}

module.exports.interviewDetails=async(req,res)=>{
    try {
        if(req.isAuthenticated()){
            // console.log(req.query);
            const id=req.query.id;
            const interviewDetail= await Interview.findById(id);
            // .populate({path:'students',populate:{path:'interviews'}}).populate({path:'resuts',populate:{path:'student'}}).exec();
            const students=await Student.find({}).sort('-createdAt');
            const allocatedStudentsId= interviewDetail.students;
            // console.log(allocatedStudents);
            const allocatedStudents = await Student.find({_id:{$in:allocatedStudentsId}});
            //   console.log(jama.length);
            return res.render('interviewsDetails',{
                title:'Interviews Details',
                interviewDetail: interviewDetail,
                students:students,
                allocatedStudents:allocatedStudents
            })
        }
    } catch (error) {
        console.log('Error:' ,error);
        return res.redirect('back');
    }
};

module.exports.markResult=async(req,res)=>{
    try {
        // console.log(req.query);
        // console.log(req.body);
        const interview=await Interview.findById(req.query.id);
        const student = await Student.findById(req.body.id);
        let result= req.body.result;
            interview.results.push({student,result});
            await interview.save();
        
        
        console.log("success fully marked");
        return res.redirect('back');

    } catch (error) {
        console.log('Error:' ,error);
        return res.redirect('back');
    }
};



module.exports.allocate=async(req,res)=>{
    try {
        // console.log(req.query);
        // console.log(req.body);
        let interview = await Interview.findById(req.query.id);
        let student= await Student.findById(req.body.id);
        student.interviews.push(interview);
        await student.save();
        interview.students.push(student);
        await interview.save();
        
        console.log("success", "Allocated Student to Interview Successfully");
        return res.redirect('back');
    } catch (error) {
        console.log('Error:' ,error);
        return res.redirect('back');
    }
}