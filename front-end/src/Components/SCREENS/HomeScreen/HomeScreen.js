import React, {useEffect,Fragment } from 'react'
import './HomeScreen.scss'
import Video from '../../utils/Video/Video'
import Featured from './Featured/Featured'
import { listProducts } from '../../../reduxStore/actions/productAction'
import LoadingBox from '../../utils/LoadingBox/LoadingBox';
import MessageBox from '../../utils/MessageBox/MessageBox';
import {useDispatch,useSelector} from 'react-redux';
import Button from '../../utils/Button/Button'
import { useHistory } from 'react-router'



function HomeScreen(props) {
  const history =useHistory();
const productList = useSelector((state) => state.productList)
const {products, error, loading} = productList
const dispatch = useDispatch()

 let featuredProducts =products ? products.slice(0, 5).map((product) => {
   return <Featured key={product._id} product={product} />
 }) : [];
 useEffect(() => {
   dispatch(listProducts())
 }, [dispatch])

 const handlePushMens =()=>{
   history.push('/mens-clothing')
 };
  const handlePushWomens = () => {
    history.push('/womens-clothing')
  }
  return (
    <div className="HomeScreen">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox varient="danger">{error}</MessageBox>
      ) : (
        <Fragment>
          <div className="HomeScreen__top">
            <div className="HomeScreen__top--button">
              <div>
                <Button onClick={handlePushMens} className="btn btn--white">
                  shop men
                </Button>
              </div>
              <div>
                <Button onClick={handlePushWomens} className="btn btn--white">
                  shop women
                </Button>
              </div>
            </div>

            <Video />
          </div>

          <div className="HomeScreen__featured">
            <h1>Featured Products</h1>
            <div className="featured-grid">{featuredProducts}</div>
          </div>
        </Fragment>
      )}
    </div>
  )
}

export default HomeScreen
