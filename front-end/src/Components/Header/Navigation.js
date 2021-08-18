import React,{useContext} from 'react'
import {Link} from 'react-router-dom';
import {headerContext} from '../../Context/HeaderContext';






function Navigation() {
const {changeDepartment}= useContext(headerContext)
  return (
    <nav className='nav'>
      <ul className="nav__menu">
        <li className="nav__items"><Link onClick={changeDepartment}  className='nav__link' to="/mens-clothing">mens</Link></li>
        <li className="nav__items"><Link className='nav__link' to="/womens-clothing">collections</Link></li>
        <li className="nav__items"><Link className='nav__link' to='/accessories'>accessories</Link></li>
      </ul>
    </nav>
  )
}

export default Navigation
