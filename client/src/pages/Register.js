import React from 'react'

import '../index'
import {Form, Input,message} from 'antd'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom' // to navigate if its already register
const Register = () => {
   const navigate =useNavigate()


    //form handler
    const onfinishHandler=async (values)=>{
        try{
            const res =await axios.post('/api/v1/user/register',values)
            if(res.data.success){
                message.success('register sucessfully')
                navigate('/login') // after registration navigate to login page
            }else{
                message.error(res.data.message);
            }
        }catch(error){
            console.log(error)
            message.error('something went wrong')
        }
    }
  return (
    <>
    <div className="form-container">
    <Form layout='vertical' onFinish={onfinishHandler} className="register-form">
    <h2 >REGISTER HERE</h2>
        <Form.Item label="Name" name="name">
            <Input type="text" required />
        </Form.Item>
        <Form.Item label="Email" name="email">
            <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
            <Input type="password" required />
        </Form.Item>
        
        <button className="btn btn-primary" type="submit">Register </button>
        <Link to="/login" className='ms-2 '>Already User</Link>
    </Form>
    </div>
    </>
  );
};

export default Register;
