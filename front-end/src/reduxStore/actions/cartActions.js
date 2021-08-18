import {

  CART_SAVE_SHIIPING_ADDRESS,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_ADD_REQUEST,
  CART_ADD_SUCCESS,
  CART_ADD_FAIL,
 
} from '../constanses/cartConstance'
import Axios from 'axios';


export const addToCart =
  (productId, qty, size) => async (dispatch, getState) => {
      dispatch({type:CART_ADD_REQUEST, payload:productId})
    try{
       const { data } = await Axios.get(`/api/v1/products/${productId}`)
       let product = data.data.product
       dispatch({
         type: CART_ADD_SUCCESS,
         payload: {
           product: product._id,
           name: product.name,
           image: product.imageCover,
           price: product.price,
           qty: qty,
           size: size,
           options: product.options,
           department: product.department,
           slug: product.slug,
         },
       })
       localStorage.setItem(
         'cartItems',
         JSON.stringify(getState().cart.cartItems)
       )
    }catch(error){
       dispatch({
         type: CART_ADD_FAIL,
         payload:
           error.response && error.response.data.message
             ? error.response.data.message
             : error.message,
       })
    }
   
  }

 
  export const removeItemFromBasket = (productIndex) =>(dispatch,getState)=> {
   dispatch({
     type:CART_REMOVE_ITEM,
     payload:productIndex
    });
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
  }



  export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
      type: CART_SAVE_SHIIPING_ADDRESS,
      payload: data,
    })
    localStorage.setItem('shippingAddress', JSON.stringify(data))
  };

  export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({type:CART_SAVE_PAYMENT_METHOD ,payload:data})
  };

