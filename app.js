const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');
const hpp = require('hpp');
const productRouter  = require('./routes/productRouter');
const userRouter  = require('./routes/userRouter');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorConroller');
const orderRouter = require('./routes/orderRouter');

const app = express();

app.use(express.static(path.join(__dirname, './front-end/build')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './front-end/build'))
})


if(process.env.NODE_ENV=='development'){

  app.use(morgan('dev'));
  console.log('Started development mode')

}else if(process.env.NODE_ENV=='production'){
   console.log('Started production mode')
};
const limiter = rateLimit({
   max:500000 ,
   windowMs:60*60*1000,
   message:'Too many request from this IP, please try again in an hour!'
});
// SECURITY HHTP
app.use(helmet());
app.use('/api', limiter)
app.use(cors());
app.options('*', cors());


app.use(express.json({limit:'10kb'}));
app.use(express.urlencoded({ extended: true}));

// data sanitasion again noSQL query injection
app.use(mongoSanitize());
// dATA sanitizion against XXS
app.use(xss());
app.use(hpp({
   whitelist:[
      'price'
   ]
}));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './front-end/build', 'index.html'))
})
app.get('/api/config/paypal', (req, res)=>{
   res.send(process.env.PAYPAL_CLIENT_ID || 'sandbox')
})
app.use('/api/v1/products',productRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/orders', orderRouter);

app.all('*',(req, res, next) =>{
 
   next(new AppError(`Cant find ${req.originalUrl} on this server!!!`,404))
});
app.use(globalErrorHandler)


module.exports=app;