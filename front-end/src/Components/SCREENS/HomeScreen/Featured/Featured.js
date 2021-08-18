import React from 'react'
import './Featured.scss'

function Featured(props) {
  const {imageCover} = props.product
  return (
    <div className="card">
      <div className="card__side card__side--front">
        <div className="card__picture card__picture--2">
          <img src={imageCover} alt=""/>
        </div>
      </div>
      <div className="card__side card__side--back card__side--back-2">
        <div className="card__cta">
        </div>
      </div>
    </div>
  )
}

export default Featured
