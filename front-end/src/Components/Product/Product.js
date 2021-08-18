import React, { useContext} from 'react';
import { Link } from 'react-router-dom';
import Button from '../utils/Button/Button';
import { useDispatch } from 'react-redux';
import './Product.scss';
import { addToCart } from '../../reduxStore/actions/cartActions';
import { productContext } from '../../Context/ProductContext';
import WishIcon from '../utils/WishIcon/WishIcon';

function Product({ product }) {
  const dispatch = useDispatch()

  const { reNameDepartment } = useContext(productContext)

  const {
    _id,
    slug,
    name,
    price,
    department,
    imageCover,
    color,
    discount,
    quantity,
    options,
  } = product

  let productDep = reNameDepartment(department)
  let calculatedDiscount = ((discount / price) * 100).toFixed(0)

  let saleOrSold = discount > 0 && (
    <span className="Card__sale">{`${
      quantity === 0 ? 'sold out' : `sale -${calculatedDiscount}%`
    } `}</span>
  )


  function getKey(options) {
    const arr = [],
      obj = Object.keys(options)
    for (var x in obj) {
      if (options[obj[x]] > 0) {
        //arr.push(obj[x])getKey(options)
        switch (obj[x]) {
          case 'extra small':
            arr.push('XS')
            break
          case 'small':
            arr.push('S')
            break
          case 'medium':
            arr.push('M')
            break
          case 'large':
            arr.push('L')
            break
          case 'extra large':
            arr.push('XL')
            break;
            default:arr.push('L')
           
        }
      }
    }
    return arr
  }

  const sizeChanger = (size) => {
    switch (size) {
      case 'XS':
        return 'extra small'
      case 'S':
        return 'small'
      case 'M':
        return 'medium'
      case 'L':
        return 'large'
      case 'XL':
        return 'extra large'
        default: return 'extra small'
    }
  }
  const handleAddCart = (e) => {
    const size = sizeChanger(e.target.textContent)

    dispatch(addToCart(_id, 1, size))
  }
  return (
    <div className="Card">
      <div className="Card__top">
        <div className="Card__image-box">
          <WishIcon className="small" id={_id} />

          <Link className="Card__link" to={`/${productDep}/${slug}`}>
            <img className="Card__image " src={imageCover} alt={name} />
            {saleOrSold}
          </Link>
          <div className="Card__button">
            <div className="Card__size">
              <ul>
                {getKey(options).map((size, index) => (
                  <li onClick={handleAddCart} key={index}>
                    {size}
                  </li>
                ))}
              </ul>
            </div>
            <Button type="button" className="btn btn--dark">
              quick shop
            </Button>
          </div>
        </div>
      </div>
      <div className="Card__body">
        <Link className="Card__link-name" to={`/${productDep}/${slug}`}>
          <h2 className="Card__name">{name}</h2>
        </Link>
        <h3 className="Card__color">{color}</h3>
        <div className="Card__price-box">
          {discount > 0 ? (
            <>
              <h3 className="Card__price">${price}.00</h3>
              <h3 className="Card__discount">was ${discount + price}.00</h3>
            </>
          ) : (
            <h3 className="Card__price">${price}.00</h3>
          )}
        </div>
      </div>
    </div>
  )
}

export default Product
