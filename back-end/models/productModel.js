const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Product must have a name'],
      trim: true,
    },
    slug: String,
    department: {
      type: String,
      required: [true, 'Product must have a department'],
      enum: ['mens', 'womens', 'accsessories'],
    },
    category: {
      type: String,
      required: [true, 'Product must have a category'],
    },
    color: {
      type: String,
      required: [true, 'Product must have a color'],
    },
    price: {
      type: Number,
      required: [true, 'Product must have a price'],
    },
    discount: {
      type: Number,
      default: 0,
    },
    sale: {
      type: Boolean,
      default: false,
    },
    inStock: {
      type: Boolean,
      default: false,
    },

    totalSold: {
      type: Number,
      default: 0,
    },
    fit: {
      type: String,
      required: [true, 'Product must have a fit style'],
    },
    materialInformation: {
      type: String,
      required: [true, 'Product must have a material Information'],
    },
    careInstructions: [String],

    options: {
      type: Object,
      required: [true, 'Pruduct must have options and quantity'],
    },
    size: {
      type: Object,
      required: [true, 'Product must have a size'],
    },
    imageCover: String,
    images: [String],
    description: {
      type: String,
      required: [true, 'Product must have a description'],
    },
    details: {
      type: String,
      required: [true, 'Product must have a details'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true }
)




productSchema.pre('save',function(next){
  this.name = this.name.split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');

     if(this.discount > 0){
    this.sale= true
   this.price =  this.price-this.discount
  }
  next()
})

productSchema.pre('save',function(next){  
  this.slug = slugify(this.name,{lower:true})
  next()
})


productSchema.virtual('quantity').get(function () {
  const numbers = Object.values(this.options)
 
  const qty = numbers.reduce((acc, val) => acc + val)
  return qty
});


const Products = mongoose.model('Products',productSchema);

module.exports=Products