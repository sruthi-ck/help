import React ,{useEffect ,useState}from 'react'
import axios from 'axios'
import Layout from '../components/Layout';
import moment from "moment";
import { useParams } from 'react-router-dom';
import { DatePicker, message, TimePicker } from "antd";
import { useUserContext } from "../context/UserContext";

const BookingPage = () => {
  const { user, updateUser } = useUserContext();
  const params = useParams();
  const [doctors , setDoctors] = useState([]);
  const [date, setDate] =useState();
  const[time ,setTime] =useState();
  const[isAvailable,setIsAvailable] =useState();
  const [rating, setRating] = useState(0);
  //for sending tokens by clients 
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
  });
  if(res.data.success){
    setDoctors(res.data.data);
    setIsAvailable(true);
    console.log(isAvailable);
    message.success(res.data.message);
  }else{
    message.error(res.data.message);
  }

}catch (error){
 console.log(error)
}
};
////////handle booking
const handleBooking = async()=>{
  try{
    setIsAvailable(true);
    if(!date && !time){
      return alert("Date and Time Required");
    }
    
    const res = await axios.post(
    "/api/v1/user/book-appointment",
    {
      doctorId: params.doctorId,
      userId: user._id,
      doctorInfo: doctors,
      userInfo: user,
      date: date,
      time: time,
      rating: rating,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  if (res.data.success) {
    message.success(res.data.message);
  }

  }catch(error){
   console.log(error)
  }
};

//to check availablity
const handleAvailability = async()=>{
  try{
    const res = await axios.post('/api/v1/user/booking-availblity',
    {doctorId :params.doctorId, date,time},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
    )
    if(res.data.success){
      setIsAvailable(true)
      message.success(res.data.message)
    }else{
      message.error(res.data.message)
     }
  }catch(error){
    console.log(error)
  }
}




useEffect(()=>{
getUserData()
// eslint-disable-next-line
 //<h4>Time : {doctors.timings[0]} - {doctors.timings[1]}  </h4>
},[]);
return (
  <Layout>
   <h3>Booking page</h3>
   <div className='container'>
    {doctors  && (
      <><div>
       <h4>Dr.{doctors.firstName}  {doctors.lastname}</h4>
       <h4>Fees : {doctors.feePerCunsaltation}</h4>
       <h4>
              Timings : {doctors.timings && doctors.timings[0]} -{" "}
              {doctors.timings && doctors.timings[1]}{" "}
            </h4>
       
       <div className="d-flex flex-column w-50">
            <DatePicker
            aria-required={"true"} // cant sumbit without filling
            className='m-2'
            format= "DD-MM-YY"
            onChange={(value) => {
              setIsAvailable(false)
              setDate(moment(value).format("DD-MM-YY"))
            }
              
            }
            />
            <TimePicker
            aria-required={"true"}
             className='m-2'
             format="HH:mm" 
             onChange={(value)=> {
              setIsAvailable(false)
              setTime(moment(value).format("HH;mm"))
             }
             
            }/>
            
            <button className='btn btn-primary mt-2' onClick={handleAvailability}>
              Check Availability
            </button>
            
              <button className='btn btn-dark mt-2' onClick={handleBooking}>
              Book Now
            </button>
            
            


        </div>
        </div></>
      
    )}

   </div>
  </Layout>
)
}

export default BookingPage ;