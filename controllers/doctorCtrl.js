const doctorModel = require('../models/doctorModel')
const appointmentModel = require('../models/appointmentModel')
const userModel = require('../models/userModels')
const getDoctorInfoController=async(req,res)=>{
    try{
     // to get doctor from doctormodel with userid on body
     const doctor = await doctorModel.findOne({userId:req.body.userId})
     res.status(200).send({
        success:true,
        message:'doctor data fetched',
        data:doctor,
     });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in fetching doctor details'
        })
    }
};

//update doctor profilr
const updateProfileController = async (req, res) => {
    try {
        console.log('Request Body:', req.body);

        const doctor = await doctorModel.findOneAndUpdate(
            { userId: req.body.userId },
            req.body,
            { new: true }
        );

        console.log('Updated Doctor:', doctor);

        res.status(201).send({
            success: true,
            message: 'Doctor Profile Updated',
            data: doctor,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Doctor profile Update issue',
            error,
        });
    }
};

//to get doctor info on booking page 
const getDoctorByIdController=async(req,res)=>{
    try{
      const doctor = await doctorModel.findOne({_id:req.body.doctorId})
      if (doctor) {
        res.status(200).send({
          success: true,
          message: "Single Doctor info Fetched",
          data: doctor,
        });
      } else {
        res.status(404).send({
          success: false,
          message: "Doctor not found",
        });
      }
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Doctor data fetching error',
            error,
        });
    }
};

//for geting appointments on doctor sie
const doctorAppointmentsController = async(req,res)=>{
    try{
        const doctor = await doctorModel.findOne({userId:req.body.userId});
        const appointments = await appointmentModel.find
        ({doctorId:doctor._id,});
        res.status(200).send({
            success:true,
            message:"Doctor Appointments fetch Succesfully",
            data:appointments,
        });

    }catch(error){
       console.log(error)
       res.status(500).send({
        success:false,
        error,
        message:'Error in Doctor Appointments'
       })
    }
};

const updateStatusController = async (req, res) => {
    try {
      const { appointmentsId, status } = req.body;
      const appointments = await appointmentModel.findByIdAndUpdate(
        appointmentsId,
        { status }
      );
      const user = await userModel.findOne({ _id: appointments.userId });
      const notification = user.notification;
      notification.push({
        type: "status-updated",
        message: `your appointment has been updated ${status}`,
        onCLickPath: "/doctor-appointments",
      });
      await user.save();
      res.status(200).send({
        success: true,
        message: "Appointment Status Updated",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error In Update Status",
      });
    }
  };




module.exports = {getDoctorInfoController,
    updateProfileController,
    getDoctorByIdController,
    doctorAppointmentsController,
    updateStatusController,
};