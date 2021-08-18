import React, { useEffect } from 'react'
import CheckoutSteps from '../../utils/CheckoutSteps/CheckoutSteps'
import ItemsInCart from './ItemsInCart'
import './PlaceorderScreen.scss';
import {ORDER_CREATE_RESET} from '../../../reduxStore/constanses/orderConstants';
import {createOrder} from '../../../reduxStore/actions/orderActions';


import { useSelector, useDispatch } from 'react-redux'

function PlaceorderScreen(props) {
  const dispatch = useDispatch();
 
  const cart = useSelector((state) => state.cart)
  const orderCreate = useSelector((state) => state.orderCreate);
  const {loading,error,success,order} =orderCreate;
  

  const { address, fullName, city, country, state, postalCode } =
    cart.shippingAddress

  if (!cart.paymentMethod) {
    props.history.push(`/payment`)
  }
  const toPrice = (num) => Number(num.toFixed(2))

  cart.itemsPrice = cart.cartItems.reduce(function (a, b) {
    return a + Number(b.qty) * b.price
  }, 0)

  cart.shippingPrice = cart.itemsPrice > 50 ? toPrice(0) : toPrice(10);

  cart.taxPrice = toPrice((cart.itemsPrice * 8.87) / 100)
  cart.totalPrice =cart.itemsPrice+ cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = () => {
    
  

    dispatch(createOrder({...cart,orderItems:cart.cartItems}))
    
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`)
      dispatch({ type: ORDER_CREATE_RESET })
    }
  }, [dispatch,order,props.history,success])

  return (
    <div className="PlaceorderScreen">
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="PlaceorderScreen__main">
        <div className="PlaceorderScreen__left">
          <div className="ship-address">
            <h2>ship to :</h2>
            <p>
              <span>name:</span>
              {fullName}
            </p>
            <p>
              <span>address :</span>
              {address},{city},{state},{postalCode},{country}
            </p>
          </div>
          <div className="payment-method">
            <h2>
              <span>payment method :</span> <span>{cart.paymentMethod}</span>{' '}
            </h2>
          </div>
        </div>
        <div className="PlaceorderScreen__right">
          <ItemsInCart
            cartItems={cart.cartItems}
            shippingPrice={cart.shippingPrice}
            taxPrice={cart.taxPrice}
            itemsPrice={cart.itemsPrice}
            totalPrice={cart.totalPrice}
            loading={loading}
            error={error}
            placeOrderHandler={placeOrderHandler}
          />
        </div>
      </div>
    </div>
  )
}

export default PlaceorderScreen
