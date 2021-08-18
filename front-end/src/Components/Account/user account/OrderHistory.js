import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { listOrderMine } from '../../../reduxStore/actions/orderActions';
import Button from '../../utils/Button/Button';
import LoadingBox from '../../utils/LoadingBox/LoadingBox';
import MessageBox from '../../utils/MessageBox/MessageBox';



function OrderHistory() {
  const history = useHistory()
  const dispatch = useDispatch();
  const orderMineList = useSelector(state=>state.orderMineList);
  const {orders,loading,error} = orderMineList;

  useEffect(() => {
    dispatch(listOrderMine());
  },[dispatch])

  return (
    <div className="OrderHistory">
     
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox varient="danger">{error}</MessageBox>
      ) : (
        <table className="OrderHistory__table">
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>ORDER DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const {
                _id,
                createdAt,
                totalPrice,
                isPaid,
                paidAt,
                deliveredAt,
                delivered,
              } = order
              return (
                <tr key={_id}>
                  <td>{_id.split('').slice(18).join('')}</td>
                  <td>{createdAt.substring(0, 10)}</td>
                  <td>${totalPrice.toFixed(2)}</td>
                  <td>{isPaid ? paidAt.substring(0, 10) : 'not paid'}</td>
                  <td>{delivered ? deliveredAt.substring(0, 10) : 'No'}</td>
                  <td className="OrderHistory__button">
                    <Button
                      onClick={() => history.push(`/order/${_id}`)}
                      type="button"
                      className="btn btn--primary"
                    >
                      view order
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default OrderHistory
