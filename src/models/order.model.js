const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  truck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Truck',
    required: true,
  },
  status: {
    type: String,
    enum: ['created', 'in transit', 'completed'],
    default: 'created',
    required: true,
  },
  pickup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true,
  },
  dropoff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true,
  },
}, { timestamps: true });  // Esto agrega campos 'createdAt' y 'updatedAt' automáticamente

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;