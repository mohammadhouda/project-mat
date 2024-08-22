import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import AdminPage from './AdminPage';
import UserPage from './UserPage';

const App = () => {
    const [userType, setUserType] = useState('');
    
  
    return(
      <>
        <Router>
          <Routes>
            <Route path = '/' element = {<LoginForm userType = {userType} setUserType = {setUserType}/>} />
            <Route path = '/admin' element = {userType === 'admin' ? <AdminPage/> : <Navigate to = '/'/>}/>
            <Route path = '/user' element = {userType === 'user' ? <UserPage/> : <Navigate to = '/'/>}/>
     
          </Routes>
        </Router>
      </>
  
      
    )
  }

export default App;
