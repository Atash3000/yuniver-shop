import React,{Fragment} from 'react';
import './QtyOptions.scss';


function QtyOptions(props) {
  const { quantity, numItemsBySize, qty, setQty, qtyBySize } = props;



  const productQty = [...Array(numItemsBySize).keys()]
    .slice(0, 10)
    .map((num) => {
      return (
        <option key={num + 1} value={num + 1}>
          {num + 1}
        </option>
      )
    })

  return (
    <div className="QtyOptions">
      <div className="qo">
        {numItemsBySize > 0 && (
          <Fragment>
            <h2 className="qo--tag">QTY :</h2>
            <div className="qo__select-box">
              <select
                className="qo--select"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              >
                {productQty}
              </select>
            </div>
          </Fragment>
        )}
        <div className="qo__in-stock ">
          {qtyBySize ? (
            <span className="qo__in-stock--true">
              <span>&#10004;</span> In Stock
            </span>
          ) : (
            <span
              className={
                quantity > 0 ? 'qo__in-stock--false' : 'qo__in-stock--false-big'
              }
            >
              {quantity > 0 ? <span>&#10006; out of stock</span> : ' sold out'}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default QtyOptions;
