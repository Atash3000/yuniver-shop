import React, { Fragment } from 'react'
import './SizeOptions.scss'

function SizeOptions(props) {
  
  const { quantity, size, setSize, options } = props

  const sizeOptionsList = Object.entries(options).map(([key, value]) => {
    return (
      <option key={key} value={key}>
        {key}
      </option>
    )
  })

  //{quantity > 0 && }
  return (
    <div className="SizeOptions">
      {quantity > 0 && (
        <Fragment>
          <h2 className="SizeOptions--tag">Size :</h2>
          <div className="SizeOptions__select-box">
            <select
              className="SizeOptions--select"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              {sizeOptionsList}
            </select>
          </div>
        </Fragment>
      )}
    </div>
  )
}

export default SizeOptions
