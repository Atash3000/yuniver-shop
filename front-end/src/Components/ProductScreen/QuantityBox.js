// import React from 'react'

// function QuantityBox({ quantity, numItemsBySize, qty, setQty, qtyBySize }) {
//   return (
//     <div className="qty-box__main">
//       <div className="qty-box-select-box">
//         {numItemsBySize > 0 && (
//           <select
//             className="qty-box--select-qty"
//             value={qty}
//             onChange={(e) => setQty(e.target.value)}
//           >
//             {[...Array(numItemsBySize).keys()].slice(0, 10).map((num) => {
//               return (
//                 <option key={num+1} value={num+1}>
//                   {num+1}
//                 </option>
//               )
//             })}
//           </select>
//         )}
//       </div>
//       <div className="qty-box--stock-box">
//         {qtyBySize ? (
//           <span className="qty-box--true">
//             <span>&#10004;</span> In Stock
//           </span>
//         ) : (
//           <span
//             className={quantity > 0 ? 'qty-box--false' : 'qty-box--false-big'}
//           >
//             {quantity > 0 ? <span>&#10006; out of stock</span> : ' sold out'}
//           </span>
//         )}
//       </div>
//     </div>
//   )
// }

// export default QuantityBox
