import React from 'react'
import Icon from '../Icon/Icon'
import { Link } from 'react-router-dom'
import {  useSelector } from 'react-redux'


function WishList() {

 
  const userWishList = useSelector((state) => state.userWishList)
  const { wishList } = userWishList


  const itemsinWIshList = wishList.length
  return (
    <div className="wishlist">
      <Link className="wishlist__link" to="/my-wishlist">
        <span
          className={`wishlist${itemsinWIshList > 0 ? '__hasItems' : '__emty'}`}
        >
          {itemsinWIshList === 0 ? '' : itemsinWIshList}
        </span>
        <Icon className="wishlist__icon" icon="heart" size={25} color="white" />
      </Link>
    </div>
  )
}

export default WishList
