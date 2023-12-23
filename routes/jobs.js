const express= require('express');
const router= express.Router();
const jobsController=require('../controller/jobs_controller');
router.get('/',jobsController.jobs);


module.exports=router;