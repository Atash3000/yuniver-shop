import Axios from 'axios';
import { CART_EMTY } from '../constanses/cartConstance';
import {
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCSESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCSESS,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_FAIL,
  ORDER_MINE_LIST_SUCCESS,
} from '../constanses/orderConstants'



export const createOrder = (order)=>async (dispatch, getState)=>{
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  try {
    const {userLogin:{userInfo}}=getState();
    const {data} = await Axios.post('/api/v1/orders',order,{
      headers:{ Authorization: `Bearer ${userInfo.token}`}
    });
    dispatch({ type:ORDER_CREATE_SUCCESS,payload:data.data.order});
    dispatch({ type:CART_EMTY});
    localStorage.removeItem('cartItems')

  }catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({ type: ORDER_CREATE_FAIL, payload: message });

  }
}




export const detailsOrder = (orderId) => async(dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  const {userLogin:{userInfo}} = getState()
  try {
    const { data } = await Axios.get(`/api/v1/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
    dispatch({ type: ORDER_DETAILS_SUCCSESS, payload:data.data.order})
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
        dispatch({type: ORDER_DETAILS_FAIL,payload:message})
  }
}


export const payOrder =(order,paymentResult)=>async(dispatch, getState) =>{
  dispatch({ type:ORDER_PAY_REQUEST, payload:{order,paymentResult}})
  const {userLogin:{userInfo}} = getState();
  try{
    const {data}= await Axios.patch(`/api/v1/orders/${order._id}/pay`,paymentResult,{
      headers:{ Authorization: `Bearer ${userInfo.token}`}
    })
    dispatch({ type: ORDER_PAY_SUCCSESS, payload: data.data.updatedOrder })

  }catch(error){
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({ type: ORDER_PAY_FAIL, payload: message })
  }
};


export const listOrderMine =()=>async(dispatch, getState) =>{
  dispatch({ type:ORDER_MINE_LIST_REQUEST});
  const {userLogin:{userInfo}} = getState();
  try{
    const {data} = await Axios.get('api/v1/orders/myorders',{
      headers:{ Authorization: `Bearer ${userInfo.token}`}
    });
    dispatch({ type:ORDER_MINE_LIST_SUCCESS, payload:data.data.orders})

  }catch(error){
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({ type:ORDER_MINE_LIST_FAIL, payload:message})
  }
}