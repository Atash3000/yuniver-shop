const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError');
const Order = require ('../models/orderModel');


exports.orderProduct = catchAsync(async(req, res, next)=>{
if(req.body.orderItems.length===0){
  next(new AppError('Cart is Emty', 400))
}else{
  const order = await Order.create({
    orderItems :req.body.orderItems,
    shippingAddress:req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod,
    itemsPrice:req.body.itemsPrice,
    shippingPrice: req.body.shippingPrice,
    taxPrice: req.body.taxPrice,
    totalPrice: req.body.totalPrice,
    user:req.user._id
  })

 
  res.status(201).json({
    status: 'Success',
    data:{
      order
    }
  })
}
});



exports.getOrderById = catchAsync(async(req, res, next)=>{
  const order = await Order.findById(req.params.id)
  if(order){
    res.status(200).json({
      status:'Success',
      data:{ 
        order
      }
    })
  }else{
    next(new AppError('Order with that Id not found',404))
  }
})

exports.getAllOrders = catchAsync(async(req, res, next)=>{
  const orders = await Order.find()

  res.status(200).json({
    status: 'Success',
    length: orders.length,
    data: {
      orders,
    },
  })
})


exports.payOrder = catchAsync(async(req, res, next)=>{
   
  const order = await Order.findById(req.params.id)
  if(order){
    order.isPaid=true;
    order.paidAt=Date.now();
    order.paymentResult = {
      id:req.body.id,
      status:req.body.status,
      update_time:req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();
    res.status(201).json({
      status:'Success',
      data:{updatedOrder}
    })
  }else{
    next(new AppError('Order not found',404))
  }
});

exports.orderHistory =catchAsync(async(req, res, next)=>{
  const orders = await Order.find({ user: req.user._id })
  if (!orders) {
    next(new AppError('Order history is emty'))
  }

  res.status(200).json({
    status: 'Success',
    data: { orders },
  })
})