import React from 'react'
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <Link to='/'>
      <h1>
        <span>yuniver</span>
        <span>essentials</span>
      </h1>
    </Link>
  )
}

export default Logo
