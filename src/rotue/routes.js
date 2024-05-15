const router=require('express').Router();

//ดึง module.exports=router; หน้าlogin_all
router.use('/dashboard',require('./work/show_work'));
router.use('/dashboard',require('./sucess/work/routes._s'));

router.use('/dashboard',require('./sucess/healthy/food'));
router.use('/dashboard',require('./sucess/healthy/exercise'));
router.use('/dashboard',require('./sucess/healthy/weight'));
router.use('/dashboard',require('./sucess/healthy/bmi'));
router.use('/dashboard',require('./healthy/show_healthy'));
router.use('/dashboard',require('./healthy/show_food'));
router.use('/dashboard',require('./healthy/show_exercise'));
router.use('/dashboard',require('./healthy/show_weight'));
router.use('/dashboard',require('./healthy/show_bmi'));

router.use('/dashboard',require('./travel/show_travel'));
router.use('/dashboard',require('./sucess/travel/routes-travel'));

router.use('/dashboard',require('./personal/show_personal'));
router.use('/dashboard',require('./sucess/personal/routes-personal'));

router.use('/dashboard',require('./money/show_money'));
router.use('/dashboard',require('./sucess/money/routes-money'));

module.exports=router