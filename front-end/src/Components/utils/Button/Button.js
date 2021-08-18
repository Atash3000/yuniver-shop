import React from 'react'
import './Button.scss';





export function Button(props) {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      type={props.type || 'button'}
      className={props.className}
    >
      {props.children}
    </button>
  )
}

export default Button
