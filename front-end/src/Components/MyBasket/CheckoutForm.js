import React, { useMemo, Fragment, useState} from 'react'
import countries from './Country'
import {  useHistory } from 'react-router-dom';
import {useSelector} from 'react-redux';

import Button from '../utils/Button/Button'




function CheckoutForm({ cart }) {
  const userLogin = useSelector(state=>state.userLogin);
const { userInfo } = userLogin
  const history = useHistory();


  const [country, setCountry] = useState('United States')
  const listOfCountryies = countries.map((el, index) => (
    <option disabled key={index} value={el}>
      {el}
    </option>
  ))


  const checkOutFormHandler = (e) => {
    e.preventDefault();
    

    if(userInfo && cart.length > 0){
      history.push('/shipping')
        //history.push('/shipping')
    }else{
       history.push('/user-account')
    }
  
    
      //history.push('/user-account?redirect=shipping')
   
  }

  return (
    <Fragment>
      <form
        action="#"
        className="CheckOut__form"
        onSubmit={checkOutFormHandler}
      >
        <div className="Form__top">
          <h1>Delivery</h1>
          <div className="Form__top--select-box">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {listOfCountryies}
            </select>
          </div>
          <div className="Form__top--zipCode">
            <input type="text" placeholder="zip code" />
          </div>
        </div>

        <div className="Form__bottom">
          <div className="Form__bottom--info">
            <InforAboutProduct cart={cart} />
          </div>
        </div>
        <div className="Form__button-box">
          <Button type="submit" className="btn btn--primary">
            CheckOut
          </Button>
        </div>
      </form>
     
    </Fragment>
  )
}

export default CheckoutForm

const InforAboutProduct = ({ cart }) => {
  const subTotal = useMemo(() => {
    return cart.reduce(function (a, b) {
      return a + Number(b.qty) * b.price
    }, 0)
  }, [cart]);

  const countItems = useMemo(() => {
    return cart.reduce(function (a, b) {
      return a + Number(b.qty) 
    }, 0)
  }, [cart])

  let taxPrice = (subTotal * 8.87) / 100

  const totalAmount = (taxPrice + subTotal).toFixed(2)
  const delivery = 10
  return (
    <div className="InforAboutProduct">
      <h2>
        <span>Subtotal:</span>
        <span>${subTotal} USD</span>
      </h2>
      <h2>
        <span>items:</span>
        <span>{countItems}</span>
      </h2>
      <h3>
        <span>tax :</span>
        <span>${taxPrice.toFixed(2)} USD</span>
      </h3>
      <h5>
        <span>delivery :</span>
        {subTotal >= 50 ? (
          <span className="InforAboutProduct--free">Free</span>
        ) : (
          <span>${delivery} USD</span>
        )}
      </h5>
      <h4 className="InforAboutProduct--total">
        <span>total amount</span>
        <span>${totalAmount} USD</span>
      </h4>
    </div>
  )
}
