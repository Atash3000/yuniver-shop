import React from 'react'

function AdressCheckBox() {
  return (
    <div className="AdressCheckBox">
      <input type="checkbox" id="checkaddress" />
      <label htmlFor="checkaddress">
        my billing address matches my delivery adress
      </label>
    </div>
  )
}

export default AdressCheckBox
