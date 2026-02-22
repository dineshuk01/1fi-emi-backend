const mongoose = require('mongoose');

const emiPlanSchema = new mongoose.Schema({
  monthlyAmount: { type: Number, required: true },
  tenure: { type: Number, required: true }, // in months
  interestRate: { type: Number, required: true }, // percentage, e.g. 0 or 10.5
  cashback: { type: Number, default: 0 }, // cashback amount in rupees
});

const variantSchema = new mongoose.Schema({
  label: { type: String, required: true }, // e.g. "256GB - Natural Titanium"
  color: { type: String },
  storage: { type: String },
  mrp: { type: Number, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  emiPlans: [emiPlanSchema],
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // e.g. "iphone-17-pro"
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    variants: [variantSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);