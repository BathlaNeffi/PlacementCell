const employee= require('../models/employee');

module.exports.home=async(req,res)=>{
    try {
        if(req.isAuthenticated()){
            return res.render('home.ejs',{
                title:'Home'
            });
        }
        else{
            return res.redirect('/employees/sign-in')
        }
       
    } catch (error) {
        console.log(error);
        return;
    }
}