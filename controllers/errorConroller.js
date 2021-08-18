const AppError = require('../utils/appError')

const handleDuplicateFieldsDB = (err) => {
  const message = `Duplicate field value. Please use another value!`
  return new AppError(message, 400)
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message)

  const message = `Invalid input data. ${errors.join('. ')}`
  return new AppError(message, 400)
}

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`
  return new AppError(message, 400,)
}

const sendErrorDev = (err, req, res) => {
  // A) API
 
  let error = {
    ...err,
    name: err.name
  }
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: error,
      message: err.message,
      stack: err.stack,
    })
  }

  // B) RENDERED WEBSITE
  console.error('ERROR 💥', err)
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message,
  })
};



const sendErrorProd = (err, req, res) => {
  // A) API
  
  if (req.originalUrl.startsWith('/api')) {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
       
      })
    }
    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error('ERROR 💥', err)
    // 2) Send generic message
    return res.status(500).json({
      status: 'Error just happened',
      message: 'Something went very wrong!',
    });
  }

  // B) RENDERED WEBSITE
  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    })
  }
  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  console.error('ERROR 💥', err)
  // 2) Send generic message
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later.',
  })
};


const globalErrorHandler = (err, req, res, next) => {
  // let erroNames = Object.values(err.errors).map((el) => el.name)
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'Error happened'
   
 
  if (process.env.NODE_ENV === 'development') {
   

    sendErrorDev(err, req, res)
  } else if (process.env.NODE_ENV === 'production') {
    // let error = {...err,name:err.name,errmsg:err.errmsg};
    // let erroNames = Object.values(err.errors).map((el) => el.name)

  
    if (err.name === 'CastError') err = handleCastErrorDB(err)
    if (err.code === 11000) err = handleDuplicateFieldsDB(err)
    if (err.message.startsWith('User validation failed')) {
      err = handleValidationErrorDB(err)
    }
    
   
    sendErrorProd(err, req, res)
  }
}

module.exports = globalErrorHandler
