import React ,{useEffect ,useState}from 'react'
import axios from 'axios'
import Layout from '../components/Layout';
import { Row } from 'antd';
import DoctorList from '../components/DoctorList';
const HomePage = () => {


  const [doctors , setDoctors] = useState([])
  //for sending tokens by clients 
const getUserData = async()=>{
try{
  // by await function user getuserdata and target heder for authorization
  const res = await axios.get('/api/v1/user/getAllDoctors', {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"), //to get token
    },
  });
  if(res.data.success){
    setDoctors(res.data.data);
  }

}catch (error){
 console.log(error)
}
}

useEffect(()=>{
getUserData()
},[]);




  return (
    <Layout>
        <h1 className='text-center'>Home page</h1>
        <Row>
        {doctors && doctors.map((doctor) => <DoctorList doctor={doctor}/>)}
        </Row>
    </Layout>
  )
}

export default HomePage;
