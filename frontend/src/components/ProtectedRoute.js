
import React from 'react';
import { Route, Navigate } from 'react-router-dom';


const isAuthenticated = () => {
  
  const token = localStorage.getItem('token'); 
  return !!token; 
};


const Protectedroute = ({ element }) => {
  
  if (isAuthenticated()) {
    return element;
  } else {
    
    return <Navigate to="/register" replace />;
  }
}; 

export default Protectedroute;