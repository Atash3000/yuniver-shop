import React, { useContext,useMemo } from 'react'
import './ChekoutCart.scss'
import { productContext } from '../../../Context/ProductContext'

function ChekoutCart() {
  const { cart } = useContext(productContext)
  let productsInChekout = cart
    .slice(0)
    .reverse()
    .map((product,index) => {
      return <SelectedProducts key={index} product={product} />
    })

  const subTotal = useMemo(() => {
    return cart.reduce(function (a, b) {
      return a + Number(b.qty) * b.price
    }, 0)
  }, [cart])

  return (
    <div className=" ChekoutCart">
      <div className="ChekoutCart__top">{productsInChekout}</div>
      <div className="ChekoutCart__bottom">
        <h3> Subtotal :{subTotal}</h3>
        <h3> shipping :{subTotal > 50 ? 'Free' : 10}</h3>
        <h4> total :{subTotal}</h4>
      </div>
    </div>
  )
}

export default ChekoutCart

const SelectedProducts = ({ product }) => {
  const { name, price, image, qty, size } = product
  return (
    <div className="SelectedProducts">
      <div className="SelectedProducts__main">
        <div className="SelectedProducts__left">
          <img src={image} alt={name} />
        </div>
        <div className="SelectedProducts__right">
          <div className="SelectedProducts__right--top">
            <h2>{name}</h2>
            <h2>${price}.00</h2>
          </div>
          <div className="SelectedProducts__right--bottom">
            <h2>{size}</h2>
            <h2>{qty}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}
