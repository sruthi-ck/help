import React from 'react';
import { Navigate } from 'react-router-dom';


export default function PublicRoute({ children }) {
    if (localStorage.getItem("token")) {
        // Token exists, redirect to the home route
        return <Navigate to="/" />;
    } else {
        // Token doesn't exist, render the provided children
        return children;
    }
}
