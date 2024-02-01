const express = require('express')

const { getDoctorInfoController,
     updateProfileController, 
     getDoctorByIdController,
     doctorAppointmentsController,
     updateStatusController} = require('../controllers/doctorCtrl');

const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

//to post approved doctor info ||post
router.post('/getDoctorInfo',authMiddleware,getDoctorInfoController);

//post update update profile
router.post('/updateProfile',authMiddleware,updateProfileController);

//post to get doctor info on booking page
router.post('/getDoctorById',authMiddleware,getDoctorByIdController);

//for appoinntments page on doctor
router.get('/doctor-appointments' , authMiddleware ,doctorAppointmentsController);

//to update status of appoinmtment||post
router.post('/update-status' ,authMiddleware ,updateStatusController);

module.exports =router;