import React, {  useState,useEffect } from 'react'
import Jumbotron from '../utils/Jumbotron/Jumbotron'
import './ProductScreen.scss'

import { withRouter } from 'react-router-dom'
import { Button } from '../utils/Button/Button'
import { Link } from 'react-router-dom'
import PriceBox from './PriceBox'
import Carousel from '../utils/Carousel/Carousel'
import SizeOptions from './Size Options/SizeOptions'
import QtyOptions from './Qty Options/QtyOptions'
import {useSelector,useDispatch} from 'react-redux';
import {addToCart} from '../../reduxStore/actions/cartActions';
import {listProducts} from '../../reduxStore/actions/productAction';
import LoadingBox from '../utils/LoadingBox/LoadingBox'
import MessageBox from '../utils/MessageBox/MessageBox'
import WishIcon from '../utils/WishIcon/WishIcon'



function ProductScreen(props) {
   
  
  const dispatch = useDispatch()
  const productList= useSelector(state=>state.productList);
  const {products} = productList; 
  const cart = useSelector(state=>state.cart)
  const { error, loading } = cart
  const userWishList = useSelector((state) => state.userWishList)
  const { wishList } = userWishList
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])
  let slugName = props.match.params.slug
  const product = products.find((el) => el.slug === slugName)

  const [qty, setQty] = useState('1')
  const [size,setSize]=useState('extra-small')
 
  useEffect(() => {
    setSize(() => {
      if (product) {
        return Object.keys(product.options).find(
          (key) => product.options[key] > 0
        )
      } 
    })
  }, [product])




  //let urlSize = size.split(' ').join('-').toLowerCase()
  const gobackToPrevPage = () => {
    props.history.goBack()
  }

  if (!product) {
    return (
      <div className="ProductScreen">
        <Jumbotron title="Product not found ..." />
      </div>
    )
  }
  
  const {
    _id,
    category,
    name,
    price,
    sale,
    discount,
    color,
    quantity,
    fit,
    options,
    department,
    images,
  } = product



  //const prodDeparment = reNameDepartment(department)

  //  CHECK IF SIZE AND QUATITY AVIABLE

  let qtyBySize = false
  let numItemsBySize = 0
  for (const [key, value] of Object.entries(options)) {
    if (size === key) {
      numItemsBySize = value
      if (value > 0) {
        qtyBySize = true
      } else {
        qtyBySize = false
      }
    }
  }
 

  const addItemToBasketHandler = (e) => {
    e.preventDefault();
   // props.history.push(`/my-basket/${slugName}?qty=${qty}&size=${urlSize}`)
    props.history.push(`/my-basket`)
   //  props.history.push(`/my-basket/${_id}?qty=${qty}&size=${urlSize}`)
    //  addToCart(_id, qty, size)
    dispatch(addToCart(_id,qty,size))
  };



  return (
    <div className="ProductScreen ">
      <div className="ps">
        <div className="ps__top">
          <div className="ps__top--left">
            <WishIcon className="big" wishList={wishList} id={_id} />
            <Carousel images={images} />
          </div>
          <div className="ps__top--right">
            <div className="overview">
              <div className="overview__url-box">
                <Link className="overview--link" to="/">
                  home <span>&#47;</span>
                </Link>
                <Link
                  className="overview--link"
                  onClick={gobackToPrevPage}
                  to="/"
                >
                  {department}
                  <span>&#47;</span>
                </Link>
                <Link
                  to="/"
                  onClick={gobackToPrevPage}
                  className="overview--link"
                >
                  {category}
                </Link>
              </div>
              <div className="info-box">
                <h1 className="info-box--name">{name}</h1>
                <h2 className="info-box--color">{color}</h2>
                <h3 className="info-box--fit">
                  {fit ? fit : <span>&nbsp;</span>}
                </h3>
              </div>
              <div className="price-box">
                <PriceBox sale={sale} price={price} discount={discount} />
              </div>
              <form onSubmit={addItemToBasketHandler}>
                <SizeOptions
                  options={options}
                  size={size}
                  quantity={quantity}
                  setSize={setSize}
                />
                <QtyOptions
                  quantity={quantity}
                  qtyBySize={qtyBySize}
                  qty={qty}
                  setQty={setQty}
                  numItemsBySize={numItemsBySize}
                />

                {error && <MessageBox varient="danger">{error}</MessageBox>}
                <div className="button-box">
                  <div className="button-box--main">
                    {qtyBySize ? (
                      <Button className="btn btn--primary" type="submit">
                        {loading ? <LoadingBox /> : 'add to basket'}
                      </Button>
                    ) : (
                      quantity === 0 && (
                        <Button className="btn btn--primary" type="button">
                          Notify me when available
                        </Button>
                      )
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(ProductScreen)
