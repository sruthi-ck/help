import React from 'react';
import {useNavigate} from "react-router-dom";

const DoctorList = ({ doctor}) => {
  const navigate =useNavigate()
  return (
    <>
      <div className='card m-2'
       style={{cursor:'pointer'}}
       onClick={()=> navigate(`/doctor/book-appointment/${doctor._id}`)}>
        <div className='card-header'>
            Dr.{doctor.firstName} {doctor.lastname}
        </div>
            <div className='card-body'>
                <p>
                    <b>Specialization :</b> {doctor .specialization}
                </p>
                <p>
                    <b>Experience :</b> {doctor .experience}
                </p>
                <p>
                    <b>Cunsaltation fee :</b> {doctor .feePerCunsaltation }
                </p>
                <p>
                    <b>Timing</b> {doctor .timings[0]} - {doctor .timings[1]}
                </p>
                <p>
                {doctor.rating && (
            <p>
              <b>Total Rating :</b> {doctor.rating} 
            </p>
          )}
                </p>
                
            </div>
        
      </div>


    </>
  )
}

export default DoctorList;
