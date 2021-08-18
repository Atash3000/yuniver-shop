import React, { Fragment } from 'react'
import './WishIcon.scss';
import { useDispatch, useSelector } from 'react-redux'
import { addToWishList, removeItemWishList } from '../../../reduxStore/actions/wishListActions';


function WishIcon(props) {
   const userWishList = useSelector((state) => state.userWishList)
   const { wishList } = userWishList
  const dispatch = useDispatch()
   let productExist = wishList.find((el) => el._id === props.id)
   const handleClick = () => {
     if (productExist) {
       dispatch(removeItemWishList(props.id))
     } else {
       dispatch(addToWishList(props.id))
     }
   }
  return (
    <Fragment>
      <div className="WishIcon">
        {!productExist ? (
          <i
            onClick={handleClick}
            className={`far fa-heart  WishIcon--emty WishIcon--${props.className}`}
          ></i>
        ) : (
          <i
            onClick={handleClick}
            className={`far fa-heart  WishIcon--full WishIcon--${props.className}`}
          ></i>
        )}
      </div>
    </Fragment>
  )
}

export default WishIcon
