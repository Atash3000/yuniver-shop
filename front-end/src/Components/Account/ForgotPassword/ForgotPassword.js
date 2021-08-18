import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { userForgotPassword } from '../../../reduxStore/actions/userActions';
import { USER_FORGOT_PASSWORD_RESET } from '../../../reduxStore/constanses/userConstants';
import Button from '../../utils/Button/Button'
import LoadingBox from '../../utils/LoadingBox/LoadingBox';
import MessageBox from '../../utils/MessageBox/MessageBox';
import './ForgotPassword.scss'

function ForgotPassword(props) {
  const dispatch = useDispatch();
  const forgotPasswordUser = useSelector((state) => state.forgotPasswordUser);
  const { error, loading, success,message } = forgotPasswordUser;
  const [email,setEmail] = useState('');
  const [emailFormIsValid,setEmailFormIsValid] = useState(false);
  const handlePushToLogin = ()=>{
    props.history.push('/user-account')
  };

  const emailInputHandler=(e)=>{
    setEmail(e.target.value);
    if(e.target.value.includes('@')){
      setEmailFormIsValid(true)
    }
  }
  const forgotFormHandler = (e) => {
    e.preventDefault();
    if(emailFormIsValid){
     dispatch(userForgotPassword({email:email}))
    }
   

  }

console.log(email)
  useEffect(() => {
    dispatch({ type: USER_FORGOT_PASSWORD_RESET })
  }, [dispatch])
  return (
    <div className="ForgotPassword">
      <div className="ForgotPassword__main">
        <div className="ForgotPassword__left">
          <h1 className="ForgotPassword__heading">
            <span>reset your </span>
            <span>password</span>
          </h1>
        </div>
        <div className="ForgotPassword__right">
          <form onSubmit={forgotFormHandler}>
            <h4>We will send you an email to reset your password.</h4>
            <div className="ForgotPassword__input">
              <input
                onChange={emailInputHandler}
                type="email"
                value={email}
                placeholder="Email"
              />
            </div>
            {error ? (
              <MessageBox varient="danger">{error}</MessageBox>
            ) : (
              success && <MessageBox varient="success">{message}</MessageBox>
            )}

            <div className="ForgotPassword__button">
              <Button
                disabled={!emailFormIsValid}
                type="submit"
                className="btn btn--dark-light"
              >
                {loading ? <LoadingBox /> : 'submit'}
              </Button>
            </div>
            <div>
              <h2 onClick={handlePushToLogin}>cancel</h2>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
