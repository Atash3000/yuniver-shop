import React, { useState, useEffect } from 'react';
import Button from '../../utils/Button/Button';
import './Signup.scss';
import {useDispatch,useSelector} from 'react-redux';
import {signUp} from '../../../reduxStore/actions/userActions';
import MessageBox from '../../utils/MessageBox/MessageBox'
import LoadingBox from '../../utils/LoadingBox/LoadingBox';


function Signup() {
  const dispatch = useDispatch();
  const userSignUp = useSelector((state) => state.userSignUp);
  const { userInfo, error, loading } = userSignUp;
  const [signInFormIdValid, setSignInFormIsValid] = useState(false)
  const [enteredName, setEnteredName] = useState('')
  const [enteredLastName, setEnteredLastName] = useState('')
  const [enteredPassword, setEnteredPassword] = useState({
    password: '',
    passwordConfirm: '',
  });

  const [enteredEmail, setEnteredEmail] = useState('')

  const nameInputNamdler = (e) => {
    setEnteredName(e.target.value)
  };

  const lastNameInputHandler = (e) => {
    setEnteredLastName(e.target.value)
  };

  const passwordInputHandler = (e) => {
    const value = e.target.value
    setEnteredPassword({
      ...enteredPassword,
      [e.target.name]: value,
    })
  }

  const emailInputHandler = (e) => {
    setEnteredEmail(e.target.value)
  }
  const handleSignupForm = (e) => {
    e.preventDefault()
    if(signInFormIdValid){
      dispatch(signUp(enteredName,enteredLastName,enteredEmail, enteredPassword.password,enteredPassword.passwordConfirm))
    }

  };

  useEffect(() => {
    if(userInfo){

    setEnteredEmail('')
    setEnteredLastName('')
    setEnteredPassword({
      password: '',
      passwordConfirm: '',
    })

    setEnteredName('')
    }
  },[userInfo])

  useEffect(() => {
    if (
      enteredLastName.trim().length !== '' &&
      enteredName.trim().length !== '' &&
      enteredEmail.trim().includes('@') &&
      enteredPassword.password.trim().length >= 8 &&
      enteredPassword.passwordConfirm.trim().length >= 8 &&
      enteredPassword.password === enteredPassword.passwordConfirm
    ) {
      setSignInFormIsValid(true)
    }
  }, [
    enteredName,
    enteredLastName,
    enteredEmail,
    enteredPassword.password,
    enteredPassword.passwordConfirm,
  ])

  return (
    <form onSubmit={handleSignupForm} className="Signup">
      
      <div className="Signup__main">
        <div className="Signup__heading">
          <h2 className="Signup__heading--text">create account</h2>
        </div>
        <div className="Signup__main--top">
          <div className="Signup__name">
            <label className="Signup--label" htmlFor="name">
              first name
            </label>
            <input
              value={enteredName}
              onChange={nameInputNamdler}
              name="name"
              autoComplete="off"
              className="Signup--input"
              type="text"
              id="name"
            />
          </div>

          <div className="Signup__lastName">
            <label className="Signup--label" htmlFor="lastName">
              last name
            </label>
            <input
              onChange={lastNameInputHandler}
              value={enteredLastName}
              name="lastName"
              autoComplete="off"
              className="Signup--input"
              type="text"
              id="lastName"
            />
          </div>
        </div>
        <div className="Signup__email">
          <label className="Signup--label" htmlFor="signup_email">
            email
          </label>
          <input
            onChange={emailInputHandler}
            value={enteredEmail}
            autoComplete="off"
            className="Signup--input"
            type="email"
            id="signup_email"
          />
        </div>

        <div className="Signup__password">
          <label className="Signup--label" htmlFor="signup_password">
            password
          </label>
          <input
            value={enteredPassword.password}
            onChange={passwordInputHandler}
            name="password"
            autoComplete="off"
            className="Signup--input"
            type="password"
            id="signup_password"
          />
        </div>

        <div className="Signup__password">
          <label className="Signup--label" htmlFor="confirm_password">
            confirm password
          </label>
          <input
            value={enteredPassword.passwordConfirm}
            onChange={passwordInputHandler}
            name="passwordConfirm"
            autoComplete="off"
            className="Signup--input"
            type="password"
            id="confirm_password"
          />
        </div>
          {error && <MessageBox varient='danger'>{error}</MessageBox>}
        <div className="Signup__button-box">
          <Button
            disabled={!signInFormIdValid}
            type="submit"
            className="btn btn--dark-light"
          >
            
            {loading ?<LoadingBox /> :'create'}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default Signup
