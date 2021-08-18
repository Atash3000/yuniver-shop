import React, { useState } from 'react'
import Button from '../../utils/Button/Button'
import CheckoutSteps from '../../utils/CheckoutSteps/CheckoutSteps'
import './ShippingAddressScreen.scss'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../../../reduxStore/actions/cartActions'
import { useHistory } from 'react-router-dom'


function ShippingAddressScreen(props) {
  const history = useHistory()
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart;
   if (!userInfo) {
     history.push('/user-account')
   }

  const [fullName, setFullName] = useState(shippingAddress.fullName)
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [state, setState] = useState(shippingAddress.state)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)
  const [addressFormIsValid, setAddressFormIsValid] = useState(false)

 
  const shippingFormHandler = (e) => {
    e.preventDefault()

    // if(!addressFormIsValid) return;
    const userAddress = {
      fullName: fullName,
      address: address,
      city: city,
      state: state,
      postalCode: postalCode,
      country: country,
    }
    dispatch(saveShippingAddress(userAddress))
    history.push('/payment')
  }

  // useEffect(() => {
  //   if (
  //     fullName.trim().length !== '' &&
  //     address.trim().length !=='' &&
  //     city.trim().length !=='' &&
  //     country.trim().length !=='' &&
  //     postalCode.trim().length !==''
  //   ) {
  //     setAddressFormIsValid(true)
  //   }
  // }, [fullName, address, city, postalCode, country])

  return (
    <div className="ShippingAddressScreen">
      <CheckoutSteps step1 step2 />
      <form
        className="ShippingAddressScreen__form"
        onSubmit={shippingFormHandler}
      >
        <div className="ShippingAddressScreen__header">
          <h1>Delivery address</h1>
        </div>
        <div>
          <label htmlFor="fullName">full name</label>
          <input
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            autoComplete="off"
            id="fullName"
            placeholder="enter full name"
            value={fullName}
            required
          />
        </div>
        <div>
          <label htmlFor="address">address</label>
          <input
            autoComplete="off"
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            id="address"
            placeholder="address (only English/Latin characters)"
            value={address}
            required
          />
        </div>
        <div>
          <label htmlFor="city">city</label>
          <input
            autoComplete="off"
            onChange={(e) => setCity(e.target.value)}
            type="text"
            id="city"
            placeholder="enter a city"
            value={city}
            required
          />
        </div>
        <div>
          <label htmlFor="city">state</label>
          <input
            autoComplete="off"
            onChange={(e) => setState(e.target.value)}
            type="text"
            id="city"
            placeholder="enter a state"
            value={state}
            required
          />
        </div>
        <div>
          <label htmlFor="postalCode">postal code</label>
          <input
            autoComplete="off"
            onChange={(e) => setPostalCode(e.target.value)}
            type="text"
            id="postalCode"
            placeholder="enter postalCode"
            value={postalCode}
            required
          />
        </div>
        <div>
          <label htmlFor="country">country</label>
          <input
            autoComplete="off"
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            id="country"
            placeholder="enter country"
            value={country}
            required
          />
        </div>
        <div>
          <Button type="submit" className="btn btn--primary">
            continue to payment
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ShippingAddressScreen
