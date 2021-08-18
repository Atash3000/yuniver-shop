import React, { useState, useEffect } from 'react'

import './Login.scss'
import Button from '../../utils/Button/Button'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { login } from '../../../reduxStore/actions/userActions'
import { withRouter } from 'react-router-dom'
import MessageBox from '../../utils/MessageBox/MessageBox'
import LoadingBox from '../../utils/LoadingBox/LoadingBox'
import { USER_SIGNIN_RESET } from '../../../reduxStore/constanses/userConstants'

function Login(props) {
  const dispatch = useDispatch()

  const history = useHistory()

  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredPassword, setEnteredPassowrd] = useState('')
  const [loginFormIsValid, setloginFormIsValid] = useState(false)

  //  const redirect = props.location.search ? props.location.search('=')[1] : '/';
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo, error, loading } = userLogin

  const onInputPassword = (e) => {
    setEnteredPassowrd(e.target.value)
  }

  const onInputEmail = (e) => {
    setEnteredEmail(e.target.value)
  }

   useEffect(() => {
     dispatch({ type: USER_SIGNIN_RESET })
   }, [dispatch])


  useEffect(() => {
    if (
      enteredEmail.trim().includes('@') &&
      enteredPassword.trim().length >= 8
    ) {
      setloginFormIsValid(true)
    }
  }, [enteredEmail, enteredPassword])

  const formLoginHandler = (e) => {
    e.preventDefault()

    if (loginFormIsValid) {
      dispatch(login(enteredEmail, enteredPassword))
      // loginHandler(enteredEmail, enteredPassword)
    }
  }

  useEffect(() => {
    if (userInfo && cartItems.length === 0) {
      history.push('/user-page')
    } else if (userInfo && cartItems.length > 0) {
      // history.push(redirect)
      history.push('/shipping')
    }
  }, [cartItems, userInfo, history])

 
  return (
    <form onSubmit={formLoginHandler} className="Login">
      <div className="Login__main">
        <div className="Login__heading">
          <h2 className="Login__heading--text">
            Secure login to your existing account
          </h2>
        </div>
        <div className="Login__email">
          <label className="Login--label" htmlFor="email">
            email adress
          </label>
          <input
            onChange={onInputEmail}
            autoComplete="off"
            className="Login--input"
            type="email"
            id="email"
            value={enteredEmail}
          />
        </div>

        <div className="Login__password">
          <label className="Login--label" htmlFor="password">
            password
          </label>
          <input
            onChange={onInputPassword}
            autoComplete="off"
            className="Login--input"
            type="password"
            id="password"
            value={enteredPassword}
          />
        </div>

        {error && <MessageBox varient="danger">{error}</MessageBox>}

        <div className="Login__forget">
          <Link className="Login__forget--link" to="/forgot-password">
            forgot your password ?
          </Link>
        </div>
        <div className="Login__button-box">
          <Button
            disabled={!loginFormIsValid}
            className="btn btn--dark-light"
            type="submit"
          >
            {loading ? <LoadingBox /> : 'login'}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default withRouter(Login)
