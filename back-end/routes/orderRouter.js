const express = require('express');
const {
  orderProduct,
  getOrderById,
  getAllOrders,
  payOrder,
  orderHistory,
} = require('../controllers/orderController')
const {restrictTo} = require('../controllers/authController')

const {protect} = require('../controllers/authController');
const router = express.Router()

router.route('/').post(protect, orderProduct).get(protect ,restrictTo('admin'),getAllOrders)
router.route('/myorders').get(protect, orderHistory)
router.route('/:id').get(protect,getOrderById);
router.route('/:id/pay').patch(protect, payOrder)
module.exports = router