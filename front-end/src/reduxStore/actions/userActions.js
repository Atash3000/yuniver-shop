import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_PASSWORD_REQUEST,
  USER_UPDATE_PASSWORD_FAIL,
  USER_UPDATE_PASSWORD_SUCCESS,
  USER_UPDATE_DETAILS_SUCCESS,
  USER_UPDATE_DETAILS_REQUEST,
  USER_UPDATE_DETAILS_FAIL,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_FAIL,
  USER_FORGOT_PASSWORD_SUCCESS,
} from '../constanses/userConstants'
import Axios from 'axios'

export const login = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
    payload: { email, password },
  })

  try {
    const { data } = await Axios.post('/api/v1/users/login', {
      email,
      password,
    })
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingAddress');
  localStorage.removeItem('wishList')
  dispatch({
    type: USER_SIGNOUT,
  })
};






export const signUp =
  (name, lastName, email, password, passwordConfirm) => async (dispatch) => {
    dispatch({
      type: USER_SIGNUP_REQUEST,
      payload: { name, lastName, email, password, passwordConfirm },
    })

    try {
      const { data } = await Axios.post('/api/v1/users/signup', {
        name,
        lastName,
        email,
        password,
        passwordConfirm,
      });
        dispatch({
          type: USER_SIGNUP_SUCCESS,
          payload: data
        });
        // dispatch({
        //   type: USER_SIGNIN_SUCCESS,
        //   payload: data,
        // })
    } catch (error) {
      dispatch({
        type: USER_SIGNUP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }


  export const detailsUser=(userId)=>async (dispatch,getState)=>{
    dispatch({ type:USER_DETAILS_REQUEST, payload: userId});
    const {userLogin:{userInfo}} = getState();
    try{
      const {data} = await Axios.get(`/api/v1/users/${userId}`,{
        headers: { Authorization: `Bearer ${userInfo.token}`}
      })
      dispatch({type:USER_DETAILS_SUCCESS,payload:data.data.user})

    }catch (error){
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type:USER_DETAILS_FAIL, payload: message })
    }
  };


  export const updatePassword =
    ( passwordCurrent, password, passwordConfirm ) =>
    async (dispatch, getState) => {
      dispatch({
        type: USER_UPDATE_PASSWORD_REQUEST,
        payload: { passwordCurrent, password, passwordConfirm },
      })
      const {userLogin: { userInfo }} = getState()
        
      try {
        const { data } = await Axios.patch(
          '/api/v1/users/updateMyPassword',
         { passwordCurrent,
          password,
          passwordConfirm},
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        )

        dispatch({ type: USER_UPDATE_PASSWORD_SUCCESS, payload: data });
        //  dispatch({
        //    type: USER_SIGNIN_SUCCESS,
        //    payload: data,
        //  })
        // localStorage.setItem('userInfo', JSON.stringify(data))
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: USER_UPDATE_PASSWORD_FAIL, payload: message })
      }
    };


    export const updateDetails = ( name,lastName,email,phoneNumber ) =>
    async (dispatch, getState) => {
       dispatch({
         type: USER_UPDATE_DETAILS_REQUEST,
         payload: { name, lastName, email, phoneNumber },
       })
       const {userLogin: { userInfo }} = getState();
       
        try {
          const { data } = await Axios.patch(
            '/api/v1/users/updateMe',
            { name,lastName, email, phoneNumber },
            {
              headers: { Authorization: `Bearer ${userInfo.token}` },
            }
          )
        
          dispatch({
            type: USER_UPDATE_DETAILS_SUCCESS,
            payload: data.data.updatedUser,
            
          })
          
          
        } catch (error) {
          const message =
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
          dispatch({ type: USER_UPDATE_DETAILS_FAIL, payload: message })
        }
    };



    export const userForgotPassword =(email) => async (dispatch)=>{
      dispatch({ type:USER_FORGOT_PASSWORD_REQUEST, payload: email});

      try{
        const {data} = await Axios.post('/api/v1/users/forgotPassword',email)
        dispatch({ type: USER_FORGOT_PASSWORD_SUCCESS, payload: data.message})

      }catch (error) {
         const message =
           error.response && error.response.data.message
             ? error.response.data.message
             : error.message
         dispatch({ type: USER_FORGOT_PASSWORD_FAIL, payload: message })
      }
    }