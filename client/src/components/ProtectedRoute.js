import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { Spin } from "antd"; //  Ant Design for the loading spinner
import { useUserContext } from "../context/UserContext";

export default function ProtectedRoute({ children }) {
  //state to load user data and loading status
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const navigate = useNavigate();

  const { updateUser }=useUserContext();
  useEffect(() => {
    const fetchData = async () => {
      
        try {

          const token = localStorage.getItem("token");
        console.log("Token:", token);

        if (token) {
          const res = await axios.post(
            "/api/v1/user/getUserData",
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          if (res.data.success) {
            //set usr state if the request is successful
            setUser(res.data.data);
            updateUser(res.data.data);
          } else {
            //clear the local storage and navigate to login
            localStorage.clear();
            navigate("/login");
          }
        } else {
          localStorage.clear();
          navigate("/login");
        }
        } catch (error) {
          localStorage.clear();
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false); // Set loading to false regardless of success or failure
        }
      
    };

    fetchData();
  }, [ navigate, updateUser]);

  //to check a valid token &user data

  if (localStorage.getItem("token") && user) {
    return children; // render the protected content if contition ok
  } else if (loading) {
    // Show loading spinner
    return <Spin size="large" />;
  } else {
    // to redirect if no valid token
    return <Navigate to="/login" />;
  }
}
