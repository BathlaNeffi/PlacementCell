const Employee = require('../models/employee');

module.exports.signIn= async(req,res)=>{
    try {
        if(req.isAuthenticated()){
            return res.redirect('/');
        }
        
        return res.render('sign-in',{
            title:'Sign-In'
        })
    } catch (error) {
        console.log('Error in signin:',error);
    }
}
module.exports.signUp= async(req,res)=>{
    try {
        if(req.isAuthenticated()){
            return res.redirect('/');
        }
        return res.render('sign-up',{
            title:'Sign-Up'
        })
    } catch (error) {
        console.log('Error in signin:',error);
    }
}

module.exports.create= async(req,res)=>{
    try{
        if(req.body.password!==req.body.confirmPassword){
            return res.redirect('back');
        };
        const employee=await Employee.findOne({email: req.body.email});
            if(!employee){
                const employeeCreated=await Employee.create(req.body);
                
                    if(employeeCreated){
                        return res.redirect('/employees/sign-in');
                    }
                    
                } else{
                    console.log('user Already Exist');
                return res.redirect('back');
            }
    }catch(err){
        console.log(err,'Error in Signup function');
    }
};


module.exports.createSession=async(req,res)=>{
    // console.log(req.body);
    return res.redirect('/')
};

module.exports.destroySession=async (req,res)=>{
    try {
        
        await req.logout( (err)=>{
        
            if(err){console.log(err);
            }
            // req.flash('success','You have LoggedOut!!');
            
            return res.redirect('/employees/sign-in');
        });

    } catch (error) {
        console.log('error' ,error);
        
    }

    
};

module.exports.profile=async(req,res)=>{
    if(req.isAuthenticated()){
        return res.render('profile',{
            title:'Profile'
        })
    }
}

module.exports.forgotPasswordForm=async(req,res)=>{

    try {
        if(req.isAuthenticated()){

            await req.logout( (err)=>{
                if(err){console.log(err);}
                        // req.flash('success','You have LoggedOut!!');
                        // return res.redirect('/employees/sign-in');
                     });
            }
            if(req.body.password!==req.body.confirmPassword){
                return res.redirect('back');
            };
            const employee=await Employee.findOneAndUpdate({email: req.body.email},{password:req.body.password});
            if(employee){
                return res.redirect('/employees/sign-in');
                } else{
                    console.log('error in updating');
                return res.redirect('back');
            }
            
    } catch (error) {
        console.log(error);
    }
   
};


module.exports.forgotPasswordPage=(req,res)=>{
    return res.render('forgot_password',{
        title:'Forgot password'
    })
}