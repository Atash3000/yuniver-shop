import React from 'react'
import Button from '../utils/Button/Button'
import AdressCheckBox from './AdressCheckBox'
import Billing from './Billing'
import './Chekout.scss'
import ChekoutCart from './ChekoutCart/ChekoutCart'

import Delivery from './Delivery'
import Directions from './Directions'
import ExpressChekout from './ExpressChekout'
import Logo from './Logo'
import MyDetails from './MyDetails'

function Chekout(props) {
  const directToConfirmPage = (e)=>{
    e.preventDefault()
    props.history.push('/confirm')
  }
  return (
    <div className="Checkout">
      <div className="Checkout__main">
        <div className="Checkout__left">
          <div className="Checkout__Logo">
            <Logo />
          </div>
          <div className="Checkout__directions">
            <Directions />
          </div>
          <div className="Checkout__express">
            <ExpressChekout />
          </div>
          <form onSubmit={directToConfirmPage}>
            <div className="Checkout__details">
              <MyDetails />
            </div>
            <div className="Checkout__delivery">
              <Delivery />
            </div>
            <div className="Checkout__check">
              <AdressCheckBox />
            </div>

            <div className="Checkout__billing">
              <Billing />
            </div>
            <div className="Checkout__button">
              <div className="Checkout__button--1">
                <Button type="submit" className="btn btn--primary">
                  continue to payment
                </Button>
              </div>
              <div className="Checkout__button--2">
                <Button type="button" className="btn btn--dark-light">
                  back to basket
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="Checkout__right">
          <ChekoutCart />
        </div>
      </div>
    </div>
  )
}

export default Chekout
