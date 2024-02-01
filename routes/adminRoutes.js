const express = require('express');
const
 { getAllUsersController,
     getAllDoctorsController, 
     changeAccountStatusController ,
    } = require('../controllers/adminCtrl');




const authMiddleware = require ('../middlewares/authMiddleware');






const router = express.Router();

//for getting all users ||get method
router.get('/getAllUsers',authMiddleware,getAllUsersController);

//for getting all users ||get method
router.get('/getAllDoctors',authMiddleware,getAllDoctorsController);

 //to change account status ||post
 router.post('/changeAccountStatus',authMiddleware,changeAccountStatusController);


module.exports=router;