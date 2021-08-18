import React, { useContext } from 'react'

import './Header.scss'
import Navigation from './Navigation'
import Logo from './Logo'
import Basket from './Basket'
import Search from './Search'
import User from './User'
import Hamburger from './Hamburger/Hamburger'
import { headerContext } from '../../Context/HeaderContext'
import WishList from './WishList'
function Header() {
  const { active } = useContext(headerContext)

  return (
    <header className={`header ${active}`}>
      <Hamburger />
      <div className="header__nav">
        <Navigation />
      </div>
      <div className="header__logo">
        <Logo />
      </div>
      <div className="header__right">
        <Search />
        <WishList />
        <Basket />
        <User />
      </div>
    </header>
  )
}

export default Header
