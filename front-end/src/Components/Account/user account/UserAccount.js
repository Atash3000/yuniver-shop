import React from 'react'
import './UserAccount.scss'

import Button from '../../utils/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../reduxStore/actions/userActions'
import Jumbotron from '../../utils/Jumbotron/Jumbotron'
import OrderHistory from './OrderHistory'


function UserAccount(props) {
  const dispatch = useDispatch();
  const userLogin = useSelector(state=>state.userLogin);
  const {userInfo} = userLogin;
  if(!userInfo){
    props.history.push('/user-account')
  }
  const logoutHandler = () => {
    dispatch(logout())
    props.history.push('/user-account')
  }

  return (
    <div className="UserAccount">
      <Jumbotron title="My account" />
      <div className="UserAccount__main">
        <div className="UserAccount__nav">
          <h2 onClick={() => props.history.push('/user-page')}>
            order history
          </h2>
          <h2 onClick={() => props.history.push('/account-details')}>
            account details
          </h2>
        </div>
        <div>
          <OrderHistory />
        </div>
        <div className="UserAccount__button">
          <Button
            onClick={logoutHandler}
            className="btn btn--primary"
            type="button"
          >
            logout
          </Button>
        </div>
      </div>
    </div>
  )
}

export default UserAccount
