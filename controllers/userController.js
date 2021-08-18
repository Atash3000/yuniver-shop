const catchAsync = require('../utils/catchAsync')
const User = require('../models/userModel')
const AppError = require('../utils/appError')


const filterObj = (obj, ...allowedFields) => {
  const newObj = {}
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el]
  })
  return newObj
};




exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find()

  res.status(200).json({
    status: 'Succsess',
    length: users.length,
    data: {
      users,
    },
  })
})

exports.createUser = (req, res) => {
  res.status(201).json({
    status: 'Success',
    message: 'NICE',
  })
};



exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    return next(new AppError('User with that ID not found', 404))
  }
  res.status(201).json({
    status: 'Success',
    data: {
      user,
    },
  })
});




//@-------------------------------UPDATE ME--------------------------------
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    )
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name','lastName', 'email','phoneNumber')

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    status: 'success',
    data: {
    updatedUser,
    },
  })
});

//@-------------------------------DELETE ME--------------------------------
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false })

  res.status(204).json({
    status: 'success',
    data: null,
  })
})


exports.updateUser = (req, res) => {
  res.status(201).json({
    status: 'Success',
    message: 'NICE',
  })
}

exports.deleteUser = (req, res) => {
  res.status(201).json({
    status: 'Success',
    message: 'NICE',
  })
}
