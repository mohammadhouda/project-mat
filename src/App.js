import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import {AdminPage, LoginForm, UserPage} from './components/index'
const App = () => {

  
    const [userType, setUserType] = useState('');
    
  
    return (
      <Fragment> 
        <Router>
          <Routes>
            <Route path = '/' element = {<LoginForm userType = {userType} setUserType = {setUserType}/>} />
            <Route path = '/admin' element = {userType === 'admin' ? <AdminPage/> : <Navigate to = '/'/>}/>
            <Route path = '/user' element = {userType === 'user' ? <UserPage/> : <Navigate to = '/'/>}/>
     
          </Routes>
        </Router>
        </Fragment>
  
 
    )
  }


export default App;