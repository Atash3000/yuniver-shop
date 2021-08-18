import React from 'react'

function PriceBox({sale,discount,price}) {
  const savedPrice = price+discount-price
  return (
    <>
     {
      discount> 0 ?
      <>
      <h2 className='price-box--price'>${price}.00 USD</h2>
      <h2 className="price-box--discount">was ${discount + price}.00</h2>
      <span>&#47;</span>
      <h2 className="price-box--save">save ${savedPrice}.00</h2>
      </>
       :
      <h2 className='price-box--price'>${price}.00 USD</h2>           }
    </>
  )
}

export default PriceBox
