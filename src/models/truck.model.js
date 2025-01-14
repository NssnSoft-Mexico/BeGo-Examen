const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
  
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  year: { type: String, required: true },
  color: { type: String, required: true },
  plates: { type: String, required: true },

}, { timestamps: true});

const Truck = mongoose.model('Truck', truckSchema);

module.exports = Truck;