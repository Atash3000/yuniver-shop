import React, { Fragment, useContext} from 'react'
import './ProductList.scss'
import { Link} from 'react-router-dom'
import { productContext } from '../../Context/ProductContext'
import {
  addToCart,
  removeItemFromBasket,
} from '../../reduxStore/actions/cartActions'
import {useDispatch} from 'react-redux';

function ProductList({ singleProduct, idnx }) {
 
  const {  reNameDepartment } = useContext(productContext)
  const dispatch = useDispatch();
  const { product, image, price, name, qty, size, options, department, slug } =
    singleProduct
  let aviableQtyInStock = '1';
  Object.entries(options).map(([key, value]) => {
    if (key === size) {
      aviableQtyInStock = value
    }

    return aviableQtyInStock
  })
  // this functions renames department in DB to mens-clothing
  let prodDep = reNameDepartment(department)
const totalPrice = price*qty;
  return (
    <div className="ProductList">
      <div className="ProductList__image-box">
        <Link to={`/${prodDep}/${slug}`}>
          <img
            className="ProductList__image-box--image"
            src={image}
            alt={name}
          />
        </Link>
      </div>
      <div className="ProductList__main">
        <div className="ProductList__top">
          <span>
            {name}
          </span>
          <span>{size}</span>
          <span>${totalPrice.toFixed(2)} usd</span>
        </div>
        <div
          className={`ProductList__bottom ${aviableQtyInStock === 0 && 'emty'}`}
        >
          <div>
            {aviableQtyInStock > 0 && (
              <Fragment>
                <span>Qty:</span>
                <select
                  className="ProductList__select"
                  value={qty}
                  onChange={(e) =>
                    dispatch(addToCart(product, Number(e.target.value), size))
                  }
                >
                  {[...Array(aviableQtyInStock).keys()]
                    .slice(0, 10)
                    .map((num) => {
                      return (
                        <option key={num + 1} value={num + 1}>
                          {num + 1}
                        </option>
                      )
                    })}
                </select>
              </Fragment>
            )}
          </div>

          {aviableQtyInStock > 0 ? (
            <span className="ProductList__inStock">&#10004;In stock</span>
          ) : (
            <h2 className="ProductList__soldOut">sold out</h2>
          )}
          <div className="ProductList__button-box">
            <div
              className="btn-remove"
              onClick={() => dispatch(removeItemFromBasket(idnx))}
            >
              <span className="btn-remove--span"> &#10006; remove </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
