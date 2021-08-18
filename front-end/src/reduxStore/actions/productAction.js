import {
   PRODUCT_SORT_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCSESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCSESS,
} from '../constanses/productConstance';
import Axios from 'axios';

export const listProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST
    
  })
  try {
    const { data } = await Axios.get('/api/v1/products')
      const products= data.data.products
    dispatch({
      type: PRODUCT_LIST_SUCCSESS,
      payload:products ,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}



export const detailsProduct =(productId) => async(dispatch)=>{
dispatch({
  type: PRODUCT_DETAILS_REQUEST,
  payload: productId
})
  try {
    const { data } = await Axios.get(`/api/v1/products/${productId}`)
    const product = data.data.product
    dispatch({
      type: PRODUCT_DETAILS_SUCCSESS,
      payload: product,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}



export const productSortBy =(val)=>async (dispatch) =>{

 const {data}= await Axios.get(`/api/v1/products/?sort=${val}`)
    dispatch({ type: PRODUCT_SORT_REQUEST, payload: data.data.products })
}