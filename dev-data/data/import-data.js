const Product = require('../../models/productModel');
const data = require('./products.json')
const Order = require('../../models/orderModel')

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./../../config.env'});


const DB = process.env.DATABASE

mongoose.connect(DB,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false,
  useUnifiedTopology: true
}).then(()=>console.log('Connected to Mongo DB'))





async function importData(){
  try{
    await Product.insertMany(data)
    console.log('Products imported succsessfully')
  }catch(err){
    console.log(err.message)
  }
  process.exit()

}


async function deleteData(){
  try{
    await Product.deleteMany()
    console.log('Products deleted succsessfully')
  }catch(err){
    console.log('err')
  }
  process.exit()
}
if(process.argv[2]=='--import'){
  importData()
}else if(process.argv[2]=='--delete'){
  deleteData()
}


async function deleteOrders() {
  try {
    await Order.deleteMany()
    console.log('Orders deleted succsessfully')
  } catch (err) {
    console.log('err')
  }
  process.exit()
}
if (process.argv[2] == '--delete-orders') {
  deleteOrders()
} 