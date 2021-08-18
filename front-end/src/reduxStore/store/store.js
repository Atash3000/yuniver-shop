import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { cartReducer} from '../reducers/cartReducer'
import { orderCreateReducer, orderDetailsReducer, orderMineListReducer, orderPayReducer } from '../reducers/orderReducers'
import {
  productDetailsReducer,
  productReducer,
  productSortReducer,
} from '../reducers/productReducer'
import { updateUserDetailsReducer, userDetailsReducer, userForgotPasswordReducer, userLoginReducer, userRegisterReducer, userUpdatePasswordReducer } from '../reducers/userReducer'
import { wishListReducer } from '../reducers/wishListReducer'

const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    paymentMethod: 'PayPal',
  },
  userWishList: {
    wishList: localStorage.getItem('wishList')
      ? JSON.parse(localStorage.getItem('wishList'))
      : [],
  
  },

  userLogin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
}

const reducer = combineReducers({
  productList: productReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userSignUp: userRegisterReducer,
  orderCreate: orderCreateReducer,

  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
  userDetails: userDetailsReducer,
  passwordUpdate: userUpdatePasswordReducer,
  detailsUpdate: updateUserDetailsReducer,
  userWishList: wishListReducer,
  forgotPasswordUser: userForgotPasswordReducer,
  sortedProducList: productSortReducer,
})

const composeEnhanser = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  initialState,
  composeEnhanser(applyMiddleware(thunk))
)

export default store
