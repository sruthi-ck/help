const userModel=require('../models/userModels');
const bcrypt =require('bcryptjs'); // for decoding
const jwt = require('jsonwebtoken');
const doctorModel = require('../models/doctorModel');
const appointmentModel = require('../models/appointmentModel');
const moment = require('moment');
//await funtion to wait for promise funtion to fullfill the function
//for registration
const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Sucessfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};



//for login

const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invlid EMail or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

//doctor apply controlr
const applyDoctorController = async (req, res) => {
  try {

    
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastname} Has Applied For A Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/docotrs",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied SUccessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error WHile Applying For Doctotr",
    });
  }
};


//for notification
const getAllNotificationController= async(req,res)=>{
try{
//to get user from usermodel
const user = await userModel.findOne({ _id:req.body.userId});
//will get the id and compare
const seenNotification =user.seennotification;
const notifications = user.notification;
//to push this notification
seenNotification.push(...notifications);
//to clear the seen notification to emplty arrey
user.notification = [];
user.seennotification =notifications;
//to update user
const updateUser = await user.save();
res.status(200).send({
  message:'all notification marked as read',
  data : updateUser,
});
}catch(error){
  console.log(error)
  res.status(500).send({
    message:'Error in notification',
    success:false,
    error
  });
}

};

//for delete notification on doctor apply
const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }

    user.notification = [];
    user.seennotification = [];

    const updateUser = await user.save();
    updateUser.password = undefined;

    res.status(200).send({
      success: true,
      message: 'All notifications deleted successfully',
      data: updateUser,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Unable to delete all notifications",
      error: error.message,
    });
  }
};

//to get doctor infrm on user page 
const getAllDoctorsController =async(req,res)=>{
try{
  const doctors = await doctorModel.find({status:'approved'});
  res.status(200).send({
    success: true,
    message: "Doctor list fetched Successfully",
    data: doctors,
  });
}catch(error){
  console.log(error)
  res.status(500).send({
    success:false,
    error,
    message:'Error while fetching data'
  });
}
};


// to get details on appont ment
const bookAppointmentController = async(req,res)=>{
  try{
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = "pending";
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
    user.notification.push({
      type: "New-appointment-request",
      message: `A nEw Appointment Request from ${req.body.userInfo.name}`,
      onCLickPath: "/user/appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Book succesfully",
    });

  }catch(error){
  console.log(error)
  res.status(500).send({
    success:false,
    error,
    message:"Error While Booking appointment"
  });
  }
};

//for checking availablity of appointment
const bookingAvailablityController = async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString(); // to make a delay of 1hr 
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({
      doctorId,
      date,
      time: {
        $gte: fromTime, //grater than and lessthan
        $lte: toTime,
      },
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointments not Availibale at this time",
        success: true,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Appointments available",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Booking",
    });
  }
};

//on doctor side to give appointment approvel 
const userAppointmentsController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({
      userId: req.body.userId,
    });
    res.status(200).send({
      success: true,
      message: "Users Appointments Fetch SUccessfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In User Appointments",
    });
  }
};



module.exports= {loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorsController,
  bookAppointmentController,
  bookingAvailablityController,
  userAppointmentsController,
 
};
  
