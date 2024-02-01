const express=require('express');
const { loginController,
     registerController,
      authController ,
      applyDoctorController,
      getAllNotificationController,
      deleteAllNotificationController,
      getAllDoctorsController,
      bookAppointmentController,
      bookingAvailablityController,
      userAppointmentsController,
      
    }
 = require('../controllers/userController');
const authMiddleware = require ('../middlewares/authMiddleware');
//create router object to store Router full functionality
const router= express.Router()

//routes 

//for login || POST operation
router.post('/login',loginController);
//for register|| POSt operation
router.post('/register',registerController);

//for auth || POST operation
router.post('/getUserData',authMiddleware ,authController); // authCtrl call back function

//for apply doctor || POST operation
router.post('/apply-doctor',authMiddleware ,applyDoctorController);


//for notification doctor || POST operation
router.post('/get-all-notification', authMiddleware, getAllNotificationController);

//for delete notification doctor || POST operation
router.post('/delete-all-notification', authMiddleware, deleteAllNotificationController);

//for getting doc inform on user page 
router.get('/getAllDoctors' , authMiddleware, getAllDoctorsController);


//for getting doctor apponmnt details
router.post('/book-appointment' ,authMiddleware ,bookAppointmentController);


//for checking availablity of appointment
router.post('/booking-availblity',authMiddleware,bookingAvailablityController);

//for getting appointment list for approvel
router.get('/user-appointments',authMiddleware,userAppointmentsController);



module.exports=router;



