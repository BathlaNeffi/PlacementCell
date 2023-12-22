const Employee = require('../models/employee');
const passport= require('passport');
const LocalStrategy= require('passport-local').Strategy;

passport.use(new LocalStrategy( {
    usernameField: 'email',
    passReqToCallback: true
    },

    async function(req,email, password, done) {
        try {
           const employee= await  Employee.findOne({ email: email });
                if (!employee || employee.password!= password) { 
                    // req.flash('error','Invalid username/Password');
                    console.log('Invalid username/Password');
                    return done(null, false); 
                }
                return done(null, employee);
        } catch (error) {
            req.flash('error',error);
            console.log('err in finding user ---> Passport')
            return done(error);
        }
    }
      
  ));


// //   serialize the user  to decide wich key is to be kept in the cookies

passport.serializeUser(function(employee, done) {

      done(null, employee.id);

  });


//   deserialize the user from the key from cookies


passport.deserializeUser(async function(id, done) {
    try {
        const employee= await Employee.findById(id);
        if(employee){
            return done(null,employee);
        }
    } catch (error) {
        console.log('err in finding user ---> Passport')
        return done(error);
    }
    
  });

// check if the user is authenticated
passport.checkAuthentication= function(req,res,next){

    // if the user is signed in the pass on the control to next function(that is user's controller)
    if(req.isAuthenticated()){
        return next();
    };
    // if the user is not signed in

    return res.redirect('/employee/sign-in');
}

passport.setAuthenticateEmployee = function(req,res,next){
    if(req.isAuthenticated()){
        //  req.user contains  the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
       
    }
    return next();
}


module.exports=passport;



 
