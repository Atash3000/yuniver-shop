import React, { useEffect } from 'react';
import ProductList from './ProductList';
import './MyBasket.scss';
import Jumbotron from '../utils/Jumbotron/Jumbotron';
import Button from '../utils/Button/Button';
import CheckoutForm from './CheckoutForm'
import {useDispatch, useSelector} from 'react-redux';
import { listProducts } from '../../reduxStore/actions/productAction';



function MyBasket(props) {
const productList = useSelector((state) => state.productList)
const { products } = productList;
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  //@----Product infor from URL
  // const productId = props.match.params.id
  // const productSize = props.location.search.split('=')[2] ? props.location.search.split('=')[2] :'extra-small'
  // const productQty = props.location.search
  //   ? props.location.search.match(/\d+/)[0]
  //   : 1;
    
  //@----Product infor from URL

const cartItemsId = cartItems.map(item=>item.product);
const productInDataBase = products.find((el) => el._id === cartItemsId)

  const dispatch = useDispatch()



  let productsInBasket = cartItems
    .slice(0)
    .reverse()
    .map((product, index) => {
      return (
        <ProductList
          idnx={index}
          key={index}
          singleProduct={product}
          
        />
      )
    })
      // useEffect(() => {
      //   dispatch(addToCart(productId, productQty, productSize))
      // }, [ productId, productQty, productSize])
 useEffect(() => {
   dispatch(listProducts())
 }, [dispatch])


  if (cartItems.length === 0) {
    return (
      <div className="Basket Emty">
        <Jumbotron title="your basket is emty..." />
        <div>
          <Button
            onClick={() => props.history.push('/')}
            className="btn btn--dark"
            type="button"
          >
            Start shopping
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="Basket">
      <div className="Basket__main">
        <div className="Basket__left">
          <div className="Basket__left--products">{productsInBasket}</div>
        </div>
        <div className="Basket__right">
          <CheckoutForm cart={cartItems} />
        </div>
      </div>
    </div>
  )
}

export default MyBasket
