import React, { useMemo } from 'react'

import Button from '../../utils/Button/Button'
import LoadingBox from '../../utils/LoadingBox/LoadingBox'
import MessageBox from '../../utils/MessageBox/MessageBox'

function ItemsInCart(props) {
  let itemsInCart = props.cartItems
    .slice(0)
    .reverse()
    .map((product, index) => {
      return <SelectedProducts key={index} product={product} />
    })

  const countItems = useMemo(() => {
    return props.cartItems.reduce(function (a, b) {
      return a + Number(b.qty)
    }, 0)
  }, [props.cartItems])

  return (
    <div className=" ItemsInCart">
      <div className="ItemsInCart__top">{itemsInCart}</div>
      <div className="ItemsInCart__bottom">
        <h3>
          <span>Subtotal :</span>
          <span>${props.itemsPrice.toFixed(2)} usd</span>
        </h3>
        <h3>
          <span>shipping :</span>
          <span>
            {props.shippingPrice === 0
              ? 'Free'
              : props.shippingPrice.toFixed(2)}{' '}
          </span>
        </h3>
        <h3>
          <span>tax :</span>
          <span>${props.taxPrice.toFixed(2)} usd</span>
        </h3>
        <h3>
          <span>items :</span>
          <span>{countItems} pcs</span>
        </h3>
        
        <h3>
          <span>total :</span>
          <span>${props.totalPrice.toFixed(2)} usd</span>
        </h3>
      </div>
      {props.error && <MessageBox varient="danger">{props.error}</MessageBox>}

      <div>
        <Button
          disabled={props.cartItems.length === 0}
          type="button"
          onClick={props.placeOrderHandler}
          className="btn btn--primary"
        >
          {props.loading ? <LoadingBox /> : 'place order'}
        </Button>
      </div>
    </div>
  )
}

const SelectedProducts = ({ product }, props) => {
  const { name, image, price, qty, size } = product
  const totPrice = price * qty
  return (
    <div className="SelectedProducts">
      <div className="SelectedProducts__main">
        <div className="SelectedProducts__left">
          <img src={image} alt={name} />
        </div>
        <div className="SelectedProducts__right">
          <div className="SelectedProducts__right--top">
            <h2>{name}</h2>
            <h2>${totPrice.toFixed(2)}</h2>
          </div>
          <div className="SelectedProducts__right--bottom">
            <h2>{size}</h2>
            <h2>qty : {qty}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemsInCart
