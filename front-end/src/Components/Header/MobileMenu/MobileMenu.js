import React, { useContext, Fragment } from 'react'
import './MobileMenu.scss'
import { Link } from 'react-router-dom'
import Icon from '../../Icon/Icon'

import { headerContext } from '../../../Context/HeaderContext.js'
import { useSelector } from 'react-redux'

function MobileMenu() {
  const userLogin = useSelector((state) => state.userLogin)
  const { open, setOpen } = useContext(headerContext)
  const { userInfo } = userLogin

  return (
    <div className={`mobile-menu ${open}`}>
      <div className="mobile-menu--inner">
        <div className="search-box">
          <form action="#" method="get" className="search-form">
            <button type="button" className="search-form__submit" />
            <Icon
              className="search-form__icon"
              icon="search"
              size={37}
              color="white"
            />
            ;
            <div className="search-form__container">
              <input
                type="text"
                className="search-form__container--input"
                placeholder="search"
              />
            </div>
          </form>
        </div>
        <div className="mobile-nav">
          <ul className="nav-menu">
            <li>
              <Link onClick={() => setOpen('')} to="/">
                home
              </Link>
            </li>
            <li>
              <Link onClick={() => setOpen('')} to="/mens-clothing">
                Mens
              </Link>
            </li>
            <li>
              <Link onClick={() => setOpen('')} to="/womens-clothing">
                Womens
              </Link>
            </li>
            <li>
              <Link onClick={() => setOpen('')} to="/accessories">
                ACCESSORIES
              </Link>
            </li>
            <li>
              <Link onClick={() => setOpen('')} to="/">
                about yuniver
              </Link>
            </li>
            <li>
              <Link onClick={() => setOpen('')} to="/">
                faq
              </Link>
            </li>
            <li>
              <Link onClick={() => setOpen('')} to="/">
                delivery & returns
              </Link>
            </li>
            <li>
              <Link onClick={() => setOpen('')} to="/">
                contact us
              </Link>
            </li>
            <Fragment>
              {userInfo ? (
                <li>
                  <Link onClick={() => setOpen('')} to="/user-account">
                    my account
                  </Link>
                </li>
              ) : (
                <li>
                  <Link onClick={() => setOpen('')} to="/user-account">
                    login / register
                    <Icon
                      className="action__icon"
                      icon="user"
                      size={24}
                      color="white"
                    />
                  </Link>
                </li>
              )}
            </Fragment>
          </ul>
        </div>
        {/* <div className="action">
            <Link className="action__link" to='/'> login / register  <Icon className='action__icon' icon="user" size={27} color="white" /></Link>
          </div> */}
      </div>
    </div>
  )
}

export default MobileMenu
