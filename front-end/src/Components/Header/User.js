import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Icon from '../Icon/Icon'



function User() {

  // const { userInfo } = useContext(userContext);
   const userLogin = useSelector(state=>state.userLogin)
   const {userInfo} = userLogin


return (
  <div className="user">
    {userInfo ? (
      <Link className="user__link" to="/user-page">
        <Icon className="user__icon" icon="user" size={24} color="blue" />;
      </Link>
    ) : (
      <Link className="user__link" to="/user-account">
        <Icon className="user__icon" icon="user" size={24} color="white" />;
      </Link>
    )}
  </div>
)



  // return (
  //   <div className="user">
  //     {userInfo ? (
  //       <Link className="user__link" to="/user-page">
  //         <Icon className="user__icon" icon="user" size={24} color="green" />;
  //       </Link>
  //     ) : (
  //       <Link className="user__link" to="/user-account">
  //         <Icon className="user__icon" icon="user" size={24} color="white" />;
  //       </Link>
  //     )}
  //   </div>
  // )
}

export default User
