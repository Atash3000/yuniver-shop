import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_RESET,
  USER_SIGNOUT,
  USER_SIGNIN_SUCCESS,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PASSWORD_REQUEST,
  USER_UPDATE_PASSWORD_RESET,
  USER_UPDATE_PASSWORD_SUCCESS,
  USER_UPDATE_PASSWORD_FAIL,
  USER_UPDATE_DETAILS_REQUEST,
  USER_UPDATE_DETAILS_SUCCESS,
  USER_UPDATE_DETAILS_FAIL,
  USER_UPDATE_DETAILS_RESET,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
  USER_FORGOT_PASSWORD_RESET
} from '../constanses/userConstants'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true }
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_SIGNIN_RESET:
      return {}
    case USER_SIGNOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true }
    case USER_SIGNUP_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_SIGNUP_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
};


export const userDetailsReducer = (state = {loading:true}, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true};
      case USER_DETAILS_SUCCESS:
        return { loading: false, user: action.payload}
        case USER_DETAILS_FAIL:
          return { loading: false,error: action.payload};
          default: return state;
  }
};



export const userUpdatePasswordReducer = (state = { success:false}, action) => {
  switch (action.type) {
    case USER_UPDATE_PASSWORD_REQUEST:
      return state
    case USER_UPDATE_PASSWORD_SUCCESS:
      return { loading: false, success: true }
    case USER_UPDATE_PASSWORD_FAIL:
      return { loading: false, error: action.payload }
      case USER_UPDATE_PASSWORD_RESET:
        return {}
    default:
      return state
  }
}



// export const updateUserDetailsReducer = (
//   state = { loading: false, success: false, updatedUser :{}},
//   action
// ) => {
//   switch (action.type) {
//     case USER_UPDATE_DETAILS_REQUEST:
//       return { loading:true}
//     case USER_UPDATE_DETAILS_SUCCESS:
//       return { loading: false, updatedUser: action.payload, success: true }
//     case USER_UPDATE_DETAILS_FAIL:
//       return { loading: false, error: action.payload, success: false }
//     default:
//       return state
//   }
// }


export const updateUserDetailsReducer = (
  state = { loading: false, success:false },
  action
) => {
  switch (action.type) {
    case USER_UPDATE_DETAILS_REQUEST:
      return { loading: true }
    case USER_UPDATE_DETAILS_SUCCESS:
      return { loading: false, success: true }
    case USER_UPDATE_DETAILS_FAIL:
      return { loading: false, error: action.payload, success: false}
    case USER_UPDATE_DETAILS_RESET:
      return {}
    default:
      return state
  }
};


export const userForgotPasswordReducer = (state = {},action)=>{
  switch (action.type){
    case USER_FORGOT_PASSWORD_REQUEST:
      return { loading: true};
      case USER_FORGOT_PASSWORD_SUCCESS:
        return { loading: false, success: true,message:action.payload}
        case USER_FORGOT_PASSWORD_FAIL: 
        return { loading:false,error: action.payload};
        case USER_FORGOT_PASSWORD_RESET:
          return {}
        default : return state;
  }

}