import React, { useState } from 'react'
import './PaymentMethodScreen.scss'
import CheckoutSteps from '../../utils/CheckoutSteps/CheckoutSteps'
import Button from '../../utils/Button/Button'
import { useHistory } from 'react-router'
import { savePaymentMethod } from '../../../reduxStore/actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'

function PaymentMethodScreen() {
  const history = useHistory()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  if (!shippingAddress.address) {
    history.push('/shipping')
  }

  const paymentFormHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <div className="PaymentMethodScreen">
      <CheckoutSteps step1 step2 step3 />
      <form className="PaymentMethodScreen__form" onSubmit={paymentFormHandler}>
        <div className="PaymentMethodScreen__header">
          <h1>payment Method</h1>
        </div>

        <div>
          <input
            type="radio"
            id="paypal"
            value="PayPal"
            name="paymentMethod"
            required
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="paypal">paypal</label>
        </div>
        <div>
          <input
            type="radio"
            id="stripe"
            value="Stripe"
            name="paymentMethod"
            required
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="stripe">Stripe</label>
        </div>
        <div>
          <Button className="btn btn--primary" type="submit">
            Continue
          </Button>
        </div>
      </form>
    </div>
  )
}

export default PaymentMethodScreen
