const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    productName: { type: String, required: true },
    variantLabel: { type: String, required: true },
    variantPrice: { type: Number, required: true },
    emiPlan: {
      monthlyAmount: { type: Number, required: true },
      tenure: { type: Number, required: true },
      interestRate: { type: Number, required: true },
      cashback: { type: Number, default: 0 },
    },
    phone: { type: String, required: true },
    orderId: { type: String, unique: true },
    status: {
      type: String,
      enum: ['pending', 'under_review', 'approved', 'rejected'],
      default: 'under_review',
    },
  },
  { timestamps: true }
);

// Auto-generate orderId before saving
orderSchema.pre('save', function (next) {
  if (!this.orderId) {
    this.orderId = `1FI${Date.now().toString().slice(-8)}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);