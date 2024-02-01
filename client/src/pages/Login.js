import React from 'react'

import '../index'
import {Form, Input,message} from 'antd'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useUserContext } from '../context/UserContext'

const Login = () => {
  const navigate= useNavigate()
const {updateUser}=useUserContext();
  //form handler
  const onfinishHandler=async(values)=>{
     try{
      //sucess response with help axios ntwrk response will send
      const res =await axios.post('/api/v1/user/login',values)
      if(res.data.success){
            //genarate tokrn with local storage
            localStorage.setItem("token",res.data.token);
            //to update user data after login
         
            message.success('Login Successfully')
            navigate('/')
      }else{
        message.error(res.data.message)
      }

     }catch(error){
      console.log(error)
      message.error('something went wrong')
     }
 
};
  return (
    <>
 <div className="form-container">
    <Form layout='vertical' onFinish={onfinishHandler} className="register-form">
    <h2 >HAI REMEMBER ME PLEASE LOGIN !!!!!</h2>
        
        <Form.Item label="Email" name="email">
            <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
            <Input type="password" required />
        </Form.Item>
        
        <button className="btn btn-primary" type="submit"> LOGIN</button>
        <Link to="/register" className='ms-2 '>New to This </Link>
    </Form>
    </div>


    
    </>
  );
};

export default Login;