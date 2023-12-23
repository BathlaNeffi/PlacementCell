const express = require('express');
const router= express.Router();
const interviewsController= require('../controller/interviews_controller');

router.get('/',interviewsController.interviewPage);
router.post('/add-interviews',interviewsController.addInterviews);
router.get('/details',interviewsController.interviewDetails);
router.post('/details/mark-result',interviewsController.markResult);
router.post('/details/allocate',interviewsController.allocate);

module.exports=router;