const express = require('express');
const router= express.Router();
const employeesController = require('../controller/employees_controller');
const passport = require('passport');

router.get('/sign-in',employeesController.signIn);
router.get('/sign-up',employeesController.signUp);
router.post('/create',employeesController.create);
router.post('/create-session',passport.authenticate('local',{failureRedirect:'/employees/sign-in'}),employeesController.createSession);
router.get('/sign-out',employeesController.destroySession);
router.get('/profile',employeesController.profile);
router.get('/forgotPasswordPage',employeesController.forgotPasswordPage);
router.post('/forgotPasswordForm',employeesController.forgotPasswordForm);
module.exports=router;
