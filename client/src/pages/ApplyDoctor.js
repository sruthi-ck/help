
import React ,{useState}from "react"
import Layout from "./../components/Layout";
import { Col, Form, Row ,TimePicker, message} from 'antd';
import Input from "antd/es/input/Input";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../context/UserContext";
import moment from "moment";

const ApplyDoctor = () => {
  const { user } = useUserContext(); // to get user
    console.log('User object:', user);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    
  
    const handleFinish = async (values) => {
      try {
        setLoading(true);
        

        // to have user data 
        const userId = user._id;
        console.log('User ID sent with the form:', userId);
        
        
        
        const res = await axios.post(
          "/api/v1/user/apply-doctor",
          {
            ...values,
            userId: user._id,
            timings: [
              moment(values.timings[0]).format("HH:mm"),
              moment(values.timings[1]).format("HH:mm"),
            ],
          },

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
  
        if(res.data.success){
            
         
          message.success('Apply Successfully')
          navigate('/');
    }else{
      message.error(res.data.message)
    }
      } catch (error) { 
        console.error("Error submitting form:",error);
        message.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
  return (
   <Layout>
    <h1 className="text-center">Apply Doctor</h1>
    
    <Form layout="vertical" onFinish={handleFinish} className="m-4">
    <h4 className="">Personal Details :</h4>  
        <Row gutter={20}>
               <Col xs={24} md={24} lg={8}>
               < Form.Item label="First Name" 
                name="firstName"
                 required rules={[{required:true}]}>  
                <Input type="text " placeholder="your name"/>
                </Form.Item>
                 </Col>

                <Col xs={24} md={24} lg={8}>
                < Form.Item label="Last Name" 
                name="lastname"
                 required rules={[{required:true}]}>  
                <Input type="text " placeholder="your lastname"/>
                </Form.Item>
                </Col>

                 <Col xs={24} md={24} lg={8}>
                < Form.Item label="Phone Number" 
                name="phone"
                 required rules={[{required:true}]}>  
                <Input type="text " placeholder="your number"/>
                </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                < Form.Item label="Email" 
                name="email"
                 required rules={[{required:true}]}>  
                <Input type="text " placeholder="your email"/>
                </Form.Item>
                </Col>

                 <Col xs={24} md={24} lg={8}>
                 < Form.Item label="Website" 
                name="website"
                 required rules={[{required:true}]}>  
                <Input type="text " placeholder="your website"/>
                </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                < Form.Item label="Address" 
                name="address"
                 required rules={[{required:true}]}>  
                <Input type="text " placeholder="your address"/>
                </Form.Item>
                </Col>

        </Row> 

        <h4 className="">Professional Details :</h4>  
        <Row gutter={20}>
               <Col xs={24} md={24} lg={8}>
               < Form.Item label="Specialization" 
                name="specialization"
                 required rules={[{required:true}]}>  
                <Input type="text " placeholder="your specialization"/>
                </Form.Item>
                 </Col>

                <Col xs={24} md={24} lg={8}>
                < Form.Item label="Experience" 
                name="experience"
                 required rules={[{required:true}]}>  
                <Input type="text " placeholder="your experience"/>
                </Form.Item>
                </Col>

                 <Col xs={24} md={24} lg={8}>
                < Form.Item label="FeePerCunsaltation" 
                name="feePerCunsaltation"
                 required rules={[{required:true}]}>  
                <Input type="text " placeholder="feePerCunsaltation"/>
                </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
            <Form.Item label="Timings" name="timings" required>
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>
          
                <Col xs={24} md={24} lg={8}></Col>
                <Col xs={24} md={24} lg={8}>
                <button className="btn btn-primary form-btn" type="submit">Submit</button>   
                </Col>
            </Row> 
            


    </Form>
   </Layout>
  );
};
export default ApplyDoctor;