import React, { useState, useEffect } from 'react'
import './Mens.scss'
import Jumbotron from '../../utils/Jumbotron/Jumbotron'
import Product from '../../Product/Product'
import SideBar from './SideBar'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../../../reduxStore/actions/productAction'
import LoadingBox from '../../utils/LoadingBox/LoadingBox'
import MessageBox from '../../utils/MessageBox/MessageBox'

function Mens() {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { products, error, loading } = productList
  const mensProducts = products.filter((el) => el.department === 'mens')
const  sortedProducList =useSelector(state =>state.sortedProducList);
const { products: sortedProducts } = sortedProducList;
console.log(sortedProducts)
  const [filteredProduct, setFilteredProduct] = useState([])

  const getDataFromChild = (val) => {
    if (val.length > 0) {
      setFilteredProduct(val)
    }
  }

  let mensFiltered = []
  if (filteredProduct.length > 0) {
    mensFiltered = filteredProduct.map((product) => {
      return <Product key={product._id} product={product} />
    })
  
  } else {
    mensFiltered = mensProducts.map((product) => {
      return <Product key={product._id} product={product} />
    })
  }
  useEffect(() => {
    if(sortedProducts.length>0){
      setFilteredProduct(()=>{
        return sortedProducts.filter(el => el.department==='mens')
      })
    }

  },[sortedProducts]);

  useEffect(() =>{
    
  },[])
 

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <div className="Mens">
      {error && <MessageBox varient="danger">{error}</MessageBox>}
      <Jumbotron title="MENS" />
      {loading ? (
        <LoadingBox />
      ) : (
        <div className="Mens__main">
          <div className="Mens__left">
            <SideBar
              passDataToParent={getDataFromChild}
              mensProducts={mensProducts}
            />
          </div>
          <div className="Mens__right">
            <div className="Mens__grid-container">{mensFiltered}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Mens
