import React from 'react'
import './Account.scss'
import Jumbotron from '../utils/Jumbotron/Jumbotron'
import Login from './Login/Login'
import Signup from './Signup/Signup'
import { useSelector } from 'react-redux'



function Account() {
  
    const userSignUp = useSelector((state) => state.userSignUp)
    const { userInfo } = userSignUp
    
  return (
    <div className="My-account">
      <Jumbotron title="my yuniver account" />
      <div className="My-account__main">
        {userInfo && (
          <div className="My-account__status-text">
            <h2>
              your account has been created please login using your credentials
            </h2>
          </div>
        )}

        <div className="My-account__left">
         
          <Login />
        </div>
        <div className="My-account__right">
          <Signup />
        </div>
      </div>
    </div>
  )
}

export default Account
