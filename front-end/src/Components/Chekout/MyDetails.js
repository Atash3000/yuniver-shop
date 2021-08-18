import React from 'react'

function MyDetails() {
  return (
    <div className="MyDetails">
      <h2>my details</h2>
      <div className="MyDetails__name">
        <input className="MyDetails--input" type="text" placeholder="name" />

        <input
          className="MyDetails--input"
          type="text"
          placeholder="last name"
        />
      </div>
      <div className="MyDetails__number">
        <input
        type="number"
          className="MyDetails--input"
          placeholder="mobile number (optional)"
        />
      </div>
      <div className="MyDetails__email">
        <input
          type="email"
          className="MyDetails--input"
          placeholder="email adress "
        />
      </div>
    </div>
  )
}

export default MyDetails
