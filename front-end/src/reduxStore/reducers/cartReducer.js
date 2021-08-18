import {

  CART_ADD_REQUEST,
  CART_ADD_SUCCESS,
  CART_ADD_FAIL,
  CART_EMTY,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIIPING_ADDRESS,
} from '../constanses/cartConstance'

export const cartReducer = (state = { cartItems: [],loading:true }, action) => {
  switch (action.type) {
    case CART_ADD_REQUEST:
      return {...state,cartitems:[],loading:true}
    case CART_ADD_SUCCESS:
      const productFromData = action.payload

      const existProduct = state.cartItems.find(
        (el) =>
          el.product === productFromData.product &&
          el.size === productFromData.size
      )

      if (existProduct) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.size === existProduct.size && x.product === existProduct.product
              ? productFromData
              : x
          ),
          loading: false
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, productFromData],
          loading: false,
        }
      };
      case CART_ADD_FAIL: 
      return { loading: false, error: action.payload }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems
          .slice(0)
          .reverse()
          .filter((el, index) => index !== action.payload),
      }
    case CART_SAVE_SHIIPING_ADDRESS:
      return { ...state, shippingAddress: action.payload }
      case CART_SAVE_PAYMENT_METHOD:
        return {...state,paymentMethod:action.payload}
        case CART_EMTY :
          return {...state,cartItems:[]}
    default:
      return state
  }
}
