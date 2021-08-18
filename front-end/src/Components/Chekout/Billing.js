import React from 'react'

function Billing() {
  return (
    <div className="Billing">
      <h2 className="Billing--header">Billing address</h2>
      <div className="Billing__name">
        <input type="text" placeholder="name" />
        <input type="text" placeholder="last name" />
      </div>
      <div className="Billing__address">
        <input
          type="text"
          placeholder="address (Only Englis/Latin characters)"
        />
        <input type="text" placeholder="apartment,suite,etc (optional)" />
        <input type="text" placeholder="city" />
      </div>
      <div className="Billing__country">
        <input type="text" value="United States (ONLY)" />
        <input type="text" placeholder="state" />
        <input type="text" placeholder="zip code" />
      </div>
    </div>
  )
}

export default Billing
