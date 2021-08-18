import React from 'react'
import './SideBar.scss'

import { withRouter } from 'react-router'
import { useDispatch } from 'react-redux'
import { productSortBy } from '../../../reduxStore/actions/productAction'

// This component need two main props
//1) an array of products aka mens or womens to filter it
//2) a function which passes data to parent with filtered values.
function SideBar(props) {
 const dispatch = useDispatch()
  let prodCategories = props.mensProducts.map((product) => product.category)
  let uniqueCategories = prodCategories.filter(function (item, pos) {
    return prodCategories.indexOf(item) === pos
  })

  const filterHandler = (e) => {
    
    let filteredItems = props.mensProducts.filter(
      (el) => el.category === e.target.textContent
    )

    // let categoryname = e.target.textContent
    // categoryname = categoryname.split(' ').join('-')

    //props.history.push(`/mens-clothing/${categoryname}`)
    props.passDataToParent(filteredItems)
    
  
  }

  uniqueCategories = uniqueCategories.map((item, index) => {
    return (
      <li
        className="SideBar__menu--items"
        onClick={filterHandler}
        key={index}
      >
        {item}
      </li>
    )
  });


  const sortHandlerByDiscount=()=>{
    dispatch(productSortBy('-discount'))
  }

  return (
    <div className="SideBar">
      <div className="SideBar__main">
        <div className="SideBar__nav">
          <ul className="SideBar__menu">
            <li
              onClick={sortHandlerByDiscount}
              className="SideBar__menu--items"
            >
              bestsellers
            </li>
            {uniqueCategories}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default withRouter(SideBar)
