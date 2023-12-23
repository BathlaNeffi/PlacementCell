const express = require('express');
const router= express.Router();
const homeController=require('../controller/home_controller');

router.get('/',homeController.home);
router.use('/employees',require('./employees'));
router.use('/students',require('./students'));
router.use('/interviews',require('./interviews'));
router.use('/jobs',require('./jobs'));

module.exports=router;