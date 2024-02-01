import React, { useState } from "react";
import '../index.css'
import '../layoutStyles.css'
import {  adminMenu, userMenu } from '../Data/Data'

import { Link, useLocation ,useNavigate} from "react-router-dom";
import { Badge, message, Spin } from "antd";
import {useUserContext} from '../context/UserContext'
//to define layout component
const Layout = ({ children }) => {
  //use the useusercontext hook to get user-related data
  const { user, loading } = useUserContext(); 
  
  const location = useLocation();
  const navigate = useNavigate();

  // logout function
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    // Redirect to the login page
   
    window.location.href = "/login";
  };


  ////////////////////doctor menu details when user change to doctor /////
   const doctorMenu=[
    {
    name:'Home',
    path:"/",
    icon:'fa-solid fa-house',
    },
    {
        name:'Appointments',
        path:"/doctor-appointments",
        icon:'fa-solid fa-list',
    },
    
    {
        name:'Profile',
        path: `/doctor/profile/${user?._id || ''}`,
        icon:'fa-solid fa-user',
    },
    
];
 ////////////////////doctor menu details when user change to doctor /////

  // sidebar based on user.isAdmin
  const SidebarMenu = user?.isAdmin 
  ? adminMenu : user?.isDoctor?doctorMenu:userMenu;
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>HELP</h6>
              <hr />
            </div>
            <div className="menu">
              {loading ? (
                // Show loading spinner during data fetching
                <Spin size="large" />
              ) : (
                // Render menu items when not loading
                SidebarMenu.map((menu) => {
                  const isActive = location.pathname === menu.path;
                  return (
                    <div className={`menu-item ${isActive && "active"}`} key={menu.path}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  );
                })
              )}
              <div className={`menu-item `} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content" style={{ cursor: "pointer" }}>
              <Badge count={user?.notification?.length || 0} onClick={() => navigate("/notification")}>
                <i className="fa-solid fa-bell"></i>
                </Badge>
                {loading ? (
    <span>Loading...</span>
  ) : (
    <Link to="/profile">{user?.name}</Link>
  )}
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
