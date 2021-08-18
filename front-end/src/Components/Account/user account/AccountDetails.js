import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
  detailsUser,
  updateDetails,
  updatePassword,
} from '../../../reduxStore/actions/userActions'
import { USER_UPDATE_DETAILS_RESET, USER_UPDATE_PASSWORD_RESET } from '../../../reduxStore/constanses/userConstants'
import Button from '../../utils/Button/Button'
import Jumbotron from '../../utils/Jumbotron/Jumbotron'
import LoadingBox from '../../utils/LoadingBox/LoadingBox'
import MessageBox from '../../utils/MessageBox/MessageBox'

function AccountDetails(props) {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails;
  const passwordUpdate = useSelector((state) => state.passwordUpdate)
  const {
    success:successPassword,
    error: errorPassword,
    loading: loadingPassword,
  } = passwordUpdate

  const detailsUpdate = useSelector((state) => state.detailsUpdate)
  const {
    error: errorDetails,
    loading: loadingDetails,
    success: successStatus,
    
  } = detailsUpdate

  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCurrent, setPasswordCurrent] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
 

  if (!userInfo.token) {
    props.history.push('/user-account')
  }

  const passwordFormHandler = (e) => {
    e.preventDefault();
    dispatch(updatePassword(passwordCurrent, password, passwordConfirm))
   
    setPassword('')
    setPasswordCurrent('')
    setPasswordConfirm('')
  }

  const detailsFormHandler = (e) => {
    
    e.preventDefault();
    dispatch(updateDetails(name, lastName, email, phoneNumber))
       
    
  }

  const {_id}= userInfo.data;


  useEffect(() => {
    if (!user ) {
     
      dispatch(detailsUser(_id))
    } else {
      setName(user.name)
      setEmail(user.email)
      setLastName(user.lastName)
      setPhoneNumber(user.phoneNumber)
    }
  }, [user, _id, dispatch])


 useEffect(() => {
   dispatch({ type: USER_UPDATE_PASSWORD_RESET })
   dispatch({ type: USER_UPDATE_DETAILS_RESET })
 }, [dispatch])


  return (
    <div className="AccountDetails">
      <Jumbotron title="my account" />
      <div className="AccountDetails__nav">
        <h2 onClick={() => props.history.push('/user-page')}>order history</h2>
        <h2 onClick={() => props.history.push('/account-details')}>
          account details
        </h2>
      </div>
      <div className="AccountDetails__main">
        <h1>
          Your account is used to track your orders and save time by remembering
          your delivery details during checkout.
        </h1>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox varient="danger">{error}</MessageBox>
        ) : (
          <div className="AccountDetails__top">
            <div className="AccountDetails__left">
              <form onSubmit={detailsFormHandler}>
                <h3>contact details</h3>
                <div>
                  <label htmlFor="name">first name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="off"
                    required
                    type="text"
                    id="name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName">last name</label>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    autoComplete="off"
                    required
                    type="text"
                    id="lastName"
                  />
                </div>
                <div>
                  <label htmlFor="email">email address</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                    required
                    type="email"
                    id="email"
                  />
                </div>
                <div>
                  <label htmlFor="number">mobile number </label>
                  <input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    autoComplete="off"
                    placeholder="optional"
                    type="number"
                    id="number"
                  />
                </div>
                {errorDetails ? (
                  <MessageBox varient="error">{errorDetails}</MessageBox>
                ) : (
                  successStatus && (
                    <MessageBox varient="success">
                      profile updated successfully
                    </MessageBox>
                  )
                )}
                <div className="AccountDetails__button">
                  <Button type="submit" className="btn btn--primary">
                    {loadingDetails ? <LoadingBox /> : 'update'}
                  </Button>
                </div>
              </form>
            </div>
            <div className="AccountDetails__right">
              <form onSubmit={passwordFormHandler}>
                <h3>Account Security</h3>
                <div>
                  <label htmlFor="current_password">current password</label>
                  <input
                    value={passwordCurrent}
                    onChange={(e) => setPasswordCurrent(e.target.value)}
                    autoComplete="off"
                    required
                    type="password"
                    id="current_password"
                  />
                </div>

                <div>
                  <label htmlFor="new-password">new password</label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                    required
                    type="password"
                    id="new-password"
                  />
                </div>
                <div>
                  <label htmlFor="password"> confirm new password</label>
                  <input
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    autoComplete="off"
                    required
                    type="password"
                    id="password"
                  />
                </div>
                <div>
                  {errorPassword ? (
                    <MessageBox varient="danger">{errorPassword}</MessageBox>
                  ) : (
                    successPassword && (
                      <MessageBox varient="success">
                        Password updated successfully
                      </MessageBox>
                    )
                  )}
                </div>

                <div className="AccountDetails__button">
                  <Button type="submit" className="btn btn--primary">
                    {loadingPassword ? <LoadingBox /> : 'update'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AccountDetails
