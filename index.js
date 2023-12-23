const express = require('express');
const app = express();
const port = 9000;
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');

const db=require('./config/mongoose');
const routes = require('./routes');

// required for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-startegy');
const MongoStore=require('connect-mongo');
const sassMiddleware= require('node-sass-middleware');
const flash = require('connect-flash');
const customMware= require('./config/middleware');


app.use(sassMiddleware({
    src:path.join(__dirname,'/assets','/scss'),
    dest: path.join(__dirname,'/assets','/css'),
    debug: false,
    outputStyle: 'expanded',
    prefix:'/css'

}));



// for getting the data encoded
app.use(express.urlencoded());
app.use(cookieParser());
// using the express ejs layouts
app.use(expressLayouts);
// monoStore is use to store session cookies in db

// seeing up session and secret key for passport authentication
app.use(session({
    name: 'placementCell',
    secret: 'blabla',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: (1000 * 60 * 100) },
    store : MongoStore.create (
            {
                mongoUrl: 'mongodb://localhost:27017/placementCell_development',
                autoRemove: 'disable'
            },
        function(err){
            console.log(err || 'connected-mongodb setup ok');
        }
    )
  }));

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(passport.setAuthenticateEmployee);
  app.use(flash());
  app.use(customMware.setFlash);



app.use('/',routes);
// setting up the view engine as ejs
app.set('view engine','ejs');
// setting up the views folder as ./views
app.set('views',path.join(__dirname,'./views'));



// setting up the assests path
app.use(express.static('./assets'));

// extract style and scripts from sub pages into the payout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);




app.listen(port,function(error){
    if(error){
        console.log('Eroor:',error);
        return;
    }
    console.log('Server is running on port :',port)
})