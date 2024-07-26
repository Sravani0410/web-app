const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  userId: { type: mongoose.Types.ObjectId, ref: 'User' }
},
{
  timestamps: true,
  versionkey: false,
});

module.exports = mongoose.model('Product', ProductSchema);