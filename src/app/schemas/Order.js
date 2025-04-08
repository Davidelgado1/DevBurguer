import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  user: {
    id: String,
    name: String,
  },
  products: [
    {
      id: Number,
      name: String,
      category: String,
      price: Number,
      url: String,
      quantity: Number,
    }
  ]
}, {
  timestamps: true,
});

export default mongoose.model('Order', OrderSchema);