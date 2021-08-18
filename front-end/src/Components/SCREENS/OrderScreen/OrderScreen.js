import React, { Fragment, useEffect, useState } from 'react'
import './OrderScreen.scss'

import { withRouter } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import MessageBox from '../../utils/MessageBox/MessageBox'
import LoadingBox from '../../utils/LoadingBox/LoadingBox'
import {
  detailsOrder,
  payOrder,
} from '../../../reduxStore/actions/orderActions'
import { ORDER_PAY_RESET } from '../../../reduxStore/constanses/orderConstants'

function OrderScreen(props) {
  const dispatch = useDispatch()
  const [sdkReady, setSdkReady] = useState(false)
  const orderDetails = useSelector((state) => state.orderDetails)
  const { loading, error, order } = orderDetails
  const orderPay = useSelector((state) => state.orderPay)
  const { error: errorPay, success: successPay, loading: loadingPay } = orderPay
  const orderId = props.match.params.id;

  const {
    orderItems,
    itemsPrice,
    shippingPrice,
    totalPrice,
    taxPrice,
    isDelivered,
    isPaid,
    
    paymentMethod,
    shippingAddress,
    deliveredAt,
    _id,
  } = order

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get('/api/config/paypal')

      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}&currency=USD`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay || (order && _id !== orderId)) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(detailsOrder(orderId))
    } else {
      if (!isPaid) {
        if (!window.paypal) {
          addPayPalScript()
        } else {
          setSdkReady(true)
        }
      }
    }
  }, [_id, dispatch, sdkReady, orderId, isPaid, order, successPay])

  useEffect(() => {
    dispatch(detailsOrder(orderId))
  }, [successPay, dispatch, orderId])


  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult))
  }
  return (
    <Fragment>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox varient="danger">{error}</MessageBox>
      ) : (
        <div className="OrderScreen">
          <div className="OrderScreen__main">
            <div className="OrderScreen__left">
              <h2>Order id :{_id}</h2>
              <div className="OrderScreen__shipping">
                <div className="OrderScreen__shipping--top">
                  <h2>Ship to :</h2>
                  <p>{shippingAddress.fullName}</p>
                </div>
                <div className="OrderScreen__shipping--bottom">
                  <h2>address :</h2>
                  <p>{shippingAddress.address},</p>
                  <p>{shippingAddress.city},</p>
                  <p> {shippingAddress.state},</p>
                  <p> {shippingAddress.country}</p>
                </div>
              </div>
              <div className="OrderScreen__payment">
                <h2>payment method : {paymentMethod}</h2>
              </div>

              <div className="OrderScreen__deliver">
                {isDelivered ? (
                  <MessageBox varient="succsess">
                    delivered at {deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox varient="danger">not delivered</MessageBox>
                )}
              </div>
              <div className="OrderScreen__paid">
                { isPaid ? (
                  <MessageBox varient="success">
                    Order was paid successfully
                  </MessageBox>
                ) : (
                  <MessageBox varient="danger">not paid</MessageBox>
                )}
              </div>

              <div className="OrderScreen__products">
                <h2>
                  items :
                  {orderItems.map((el) => (
                    <span key={el._id}>{el.name}</span>
                  ))}
                </h2>
              </div>
            </div>
            <div className="OrderScreen__right">
              <div className="OrderScreen__summary">
                <h2>order summary</h2>
                <h3>
                  <span>subtotal :</span> <span>${itemsPrice.toFixed(2)}</span>{' '}
                </h3>
                <h3>
                  <span>shipping :</span>{' '}
                  <span>
                    {shippingPrice === 0 ? 'Free' : shippingPrice.toFixed(2)}
                  </span>
                </h3>
                <h3>
                  <span>tax :</span> <span>${taxPrice.toFixed(2)}</span>
                </h3>
                <h3>
                  <span>total :</span> <span>${totalPrice.toFixed(2)}</span>
                </h3>
              </div>
              <div className='OrderScreen__pay'>
                {!isPaid  && (
                  <h2>
                    {!sdkReady ? (
                      <LoadingBox />
                    ) : (
                      <Fragment>
                        <div>
                          {errorPay && (
                            <MessageBox varient="danger">{errorPay}</MessageBox>
                          )}
                          <div>{loadingPay && <LoadingBox />}</div>
                        </div>
                        <PayPalButton
                          amount={totalPrice}
                          onSuccess={successPaymentHandler}
                        />
                      </Fragment>
                    )}
                  </h2>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default withRouter(OrderScreen)
//!order || successPay || (order && _id !== orderId