const express = require('express');
const router= express.Router();
const studentsController= require('../controller/students_controller');

router.get('/',studentsController.studentsPage);
router.post('/add-students',studentsController.addStudents);
module.exports=router;