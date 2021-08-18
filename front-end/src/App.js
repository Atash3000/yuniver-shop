import Account from './Components/Account/Account'
import Header from './Components/Header/Header'
import { Route, Switch } from 'react-router-dom'
import './App.scss'
import React, { useContext } from 'react'
import MobileMenu from './Components/Header/MobileMenu/MobileMenu'
import { headerContext } from './Context/HeaderContext'
import Mens from './Components/SCREENS/Mens/Mens'
import HomeScreen from './Components/SCREENS/HomeScreen/HomeScreen'
import MyBasket from './Components/MyBasket/MyBasket'
import MyWishList from './Components/SCREENS/MyWishList/MyWishList'
import Footer from './Components/Footer/Footer'
import Accessories from './Components/SCREENS/Accessories/Accessories'
import Womens from './Components/SCREENS/Womens/Womens'
import Search from './Components/Search/Search'
import ProductScreen from './Components/ProductScreen/ProductScreen'
import { withRouter } from 'react-router'
import UserAccount from './Components/Account/user account/UserAccount'
import Chekout from './Components/Chekout/Chekout'

import NotFound from './Components/SCREENS/NotFound/NotFound'
import ShippingAddressScreen from './Components/SCREENS/ShippingAddressScreen/ShippingAddressScreen'

import PaymentMethodScreen from './Components/SCREENS/PaymentMethodScreen/PaymentMethodScreen'
import PlaceorderScreen from './Components/SCREENS/PlaceorderScreen/PlaceorderScreen'
import OrderScreen from './Components/SCREENS/OrderScreen/OrderScreen'
import AccountDetails from './Components/Account/user account/AccountDetails'
import ForgotPassword from './Components/Account/ForgotPassword/ForgotPassword'

function App() {
  const { open } = useContext(headerContext)

  return (
    <div className="App">
      <div className={`App__container App__container--${open}`}>
        <MobileMenu />
        <Header />
        <main>
          <Switch>
            <Route path="/forgot-password" component={ForgotPassword}></Route>
            <Route path="/account-details" component={AccountDetails}></Route>
            <Route path="/user-account" component={Account}></Route>
            <Route path="/user-page" component={UserAccount}></Route>
            <Route exact path="/shipping" component={ShippingAddressScreen}></Route>
            <Route path="/placeorder" component={PlaceorderScreen}></Route>
            <Route path="/payment" component={PaymentMethodScreen}></Route>
            <Route path="/order/:id" component={OrderScreen}></Route>
            <Route exact path="/" component={HomeScreen}></Route>
            <Route path="/accessories" component={Accessories}></Route>
            <Route path="/chekout" component={Chekout}></Route>

            <Route exact path="/mens-clothing/" component={Mens}></Route>
            <Route
              path="/mens-clothing/:slug"
              component={ProductScreen}
            ></Route>
            <Route exact path="/womens-clothing" component={Womens}></Route>
            <Route path="/my-basket/:id?" component={MyBasket}></Route>
            <Route path="/my-wishlist" component={MyWishList}></Route>
            <Route path="/search" component={Search}></Route>

            <Route path="/womens/:slug" component={ProductScreen}></Route>
            <Route path="*" component={NotFound}></Route>
          </Switch>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default withRouter(App)
