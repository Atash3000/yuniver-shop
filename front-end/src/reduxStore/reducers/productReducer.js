
import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCSESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCSESS,PRODUCT_SORT_REQUEST } from '../constanses/productConstance';


 export  const productReducer = (state ={loading:true,products:[]},action)=>{
  switch(action.type){
    case  PRODUCT_LIST_REQUEST :
    return state
    case PRODUCT_LIST_SUCCSESS: 
    return {loading:false,products:action.payload}
    case PRODUCT_LIST_FAIL : 
    return {loading:false,error: action.payload};
    default: 
    return state;
  }
}



export const productDetailsReducer = (state ={product:{},loading:true},action)=>{
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true }
    case PRODUCT_DETAILS_SUCCSESS:
      return { loading: false, product: action.payload }
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
};


export const productSortReducer = (state={products:[]},action)=>{
  switch (action.type){
    case  PRODUCT_SORT_REQUEST:
      return {products: action.payload}
      default:return state;
  }
}