import React from 'react'
import './CheckoutSteps.scss';



function CheckoutSteps(props) {
  return (
    <div className="CheckoutSteps">
      <div className={props.step1 ? 'active' : ''}>
        login<span>&#x27A4;</span>
      </div>
      <div className={props.step2 ? 'active' : ''}>
        shipping<span>&#x27A4;</span>
      </div>
      <div className={props.step3 ? 'active' : ''}>
        payment<span>&#x27A4;</span>
      </div>
      <div className={props.step4 ? 'active' : ''}>
        place order<span>&#x27A4;</span>
      </div>
     
    </div>
  )
}

export default CheckoutSteps
