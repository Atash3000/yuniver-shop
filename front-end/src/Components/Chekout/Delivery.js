import React from 'react'

function Delivery() {
  return (
    <div className="Delivery">
      <h2>Delivery address</h2>
      <div className="Delivery__address">
        <input
          type="text"
          placeholder="address (Only Englis/Latin characters)"
        />
        <input type="text" placeholder="apartment,suite,etc (optional)" />
        <input type="text" placeholder="city" />
        <div className="Delivery__country">
         <input type="text" value='United States (ONLY)'/>
         <input type="text"  placeholder='state'/>
         <input type="text" placeholder='zip code' />
        </div>
      </div>
    </div>
  )
}

export default Delivery
