import {
  ADD_ITEM_WISHLIST,
  REMOVE_ITEM_WISHLIST,
} from '../constanses/wishListConstantes'

export const wishListReducer = (state = { wishList: [] }, action) => {
  switch (action.type) {
    case ADD_ITEM_WISHLIST:
      const productFromData = action.payload
      const existProduct = state.wishList.find(
        (el) => el._id === productFromData._id
      )
      if (existProduct) {
        return {
          ...state,
          wishList: state.wishList.map((x) =>
            x._id === existProduct._id ? productFromData : x
          ),
         
        }
      } else {
        return {
          ...state,
          wishList: [...state.wishList, productFromData],
         
        }
      }
    case REMOVE_ITEM_WISHLIST:
      return {
        ...state,
        wishList: state.wishList.filter(
          (el) => el._id !== action.payload
        ),
       
      }

    default:
      return state
  }
}
