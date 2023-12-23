const express = require('express');
const router= express.Router();
const studentsController= require('../controller/students_controller');

router.get('/',studentsController.studentsPage);
router.post('/add-students',studentsController.addStudents);
router.get('/download-csv',studentsController.downloadCSV);
module.exports=router;