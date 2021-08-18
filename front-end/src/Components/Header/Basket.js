import React, { useMemo} from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux';

function Basket() {
  const cart = useSelector(state=>state.cart)
  const {cartItems } = cart

 const sum = useMemo(() => {
   return cartItems.reduce(function (a, b) {
     return a + Number(b.qty)
   }, 0)
 }, [cartItems])

// const sum = cartItems.reduce(function (a, b) {
//   return a + Number(b.qty)
// }, 0)
  


   
  return (
    <Link className="link-basket" to="/my-basket">
     {sum >0 ? sum : 0}
    </Link>
  )
}

export default React.memo(Basket)
