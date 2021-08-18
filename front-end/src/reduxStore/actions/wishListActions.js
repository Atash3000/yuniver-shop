import Axios from 'axios'
import { ADD_ITEM_WISHLIST, REMOVE_ITEM_WISHLIST } from '../constanses/wishListConstantes'

export const addToWishList = (id) => async (dispatch, getState) => {
 
  const { data } = await Axios.get(`/api/v1/products/${id}`)
  const product = data.data.product;
  dispatch({
    type: ADD_ITEM_WISHLIST,
    payload: {
      name: product.name,
      _id: product._id,
     
    },
  })

  localStorage.setItem(
    'wishList',
    JSON.stringify(getState().userWishList.wishList)
  )
}



 export const removeItemWishList = (productId) => (dispatch, getState) => {
   dispatch({
     type: REMOVE_ITEM_WISHLIST,
     payload: productId,
   })
   localStorage.setItem(
     'wishList',
     JSON.stringify(getState().userWishList.wishList)
   )
 }