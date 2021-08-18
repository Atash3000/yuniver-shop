const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');
const crypto = require('crypto');
const { promisify } = require('util');
// function for TOKEN
const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
};




const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id)
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  }
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true

  res.cookie('jwt', token, cookieOptions)

  // Remove password from output
  user.password = undefined

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
     _id:user
    },
  })
};



//@-------------------------------CREATE USER--------------------------------
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    passwordConfirm: req.body.passwordConfirm,
  });
 createSendToken(newUser._id,201,res);
 
});


//@-------------------------------LOGIN USER--------------------------------

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body
  // Check if email and password is exists
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400))
  }

  // check if user exist and if password is correct
  const user = await User.findOne({ email }).select('+password')

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect password or email', 401))
  }
  // if evrthing is okey send a token
  createSendToken(user._id, 200, res)
});



//@-------------------------------PROTECTED ROUTE--------------------------------
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    )
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id)
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    )
  }

  // 4) Check if user changed password after the token was issued
  // if (currentUser.changedPasswordAfter(decoded.iat)) {
  //   return next(
  //     new AppError('User recently changed password! Please log in again.', 401)
  //   )
  // }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser
  next();
});




//@-------------------------------RESTRICTION--------------------------------
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      )
    }

    next()
  }
}


//@-------------------------------FOTGOT PASSWORD--------------------------------


exports.forgotPassword = catchAsync(async (req, res, next) => {
  // get user based on posted emails
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return next(new AppError('There is no user with that email address', 404))
  }
  // generate random token
  const resetToken = user.createPasswordResetToken()
  await user.save({ validateBeforeSave: false })
  // send ot to user a email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`

  const message = `Forgot your password ? Submit a patch request with your new password and passwordConfirm to : <a href=${resetURL}</a>  . If you did not forgot your password , please ignore this email `

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (it is valid only for 10 minutes)',
      message,
     // url :resetURL
    });

    res.status(200).json({
      status: 'Success',
      message: 'Token sent to your email!',
    })
  } catch (error) {
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save({ validateBeforeSave: false })
    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    )
  }
});

//@-------------------------------RESET PASSWORD--------------------------------

exports.resetPassword = catchAsync(async (req, res, next) => {
  // get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400))
  }

  user.password = req.body.password
  user.passwordConfirm = req.body.passwordConfirm
  user.passwordResetToken = undefined
  user.passwordResetExpires = undefined
  await user.save()
  // update changed passswordAt property for the user matching
  // log the user in
  createSendToken(user, 200, res)
})



//@-------------------------------UPDATE PASSWORD--------------------------------

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  
 
  const user = await User.findById(req.user._id).select('+password')
 // console.log(req.user)
  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401))
  }

  // 3) If so, update password
  user.password = req.body.password
  user.passwordConfirm = req.body.passwordConfirm
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, res)
})






