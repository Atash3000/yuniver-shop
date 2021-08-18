const Product = require('../models/productModel');
const ApiFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');


exports.getAllProducts =catchAsync(async(req,res,next) =>{
  
   const features = new ApiFeatures(Product.find(),req.query)
   .filter()
   .sort()
   .paginate();
    const products = await features.query
    res.status(200).json({
      status:"Success",
      length: products.length,
      data:{
        products
      }
    });
});

exports.createProduct = catchAsync(async(req,res,next) =>{
  const newProduct = await Product.create(req.body)
    res.status(201).json({
      status:"Success",
      data:{
        newProduct
      }
    });
});


exports.getProduct =catchAsync(async(req,res,next) =>{
   const product = await Product.findById(req.params.id)
    if(!product){
    return next(new AppError('Product with that ID not found', 404));
   };
    res.status(200).json({
      status:"Success",
      data:{
        product
      }
    });
});

exports.updateProduct =catchAsync(async(req,res,next) =>{
    const product = await Product.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true
    });
     if(!product){
    return next(new AppError('Product with that ID not found', 404))
   }
    res.status(200).json({
      status:"Success",
      data:{
      product
      }
    })
});

exports.deleteProduct =catchAsync(async(req,res,next) =>{
  const product = await Product.findByIdAndDelete(req.params.id)
   if(!product){
    return next(new AppError('Product with that ID not found', 404))
   }
    res.status(204).json({
      status:"Success",
      data:null
    })
});