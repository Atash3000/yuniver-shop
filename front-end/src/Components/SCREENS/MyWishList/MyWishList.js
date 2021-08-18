import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeItemWishList } from '../../../reduxStore/actions/wishListActions';
import Jumbotron from '../../utils/Jumbotron/Jumbotron'
import './MyWishList.scss';



function MyWishList() {
const userWishList = useSelector((state) => state.userWishList)
const {wishList} = userWishList;
const dispatch = useDispatch()
const handleClick=(id)=>{

  dispatch(removeItemWishList(id))


}

  if(wishList.length===0){
    return (
      <div className="MyWishList">
        <Jumbotron title="Your wishlist is emty..." />
      </div>
    )
  }
  return (
    <div className="MyWishList">
      <Jumbotron title = "My Wish List"/>
      <div>
        {wishList.map(item=>{
          const {name,_id} = item
          return (
            <div key={_id}>
              <h1>{name}</h1>
              <button onClick={() => handleClick(_id)} type="button">
                remove
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyWishList
