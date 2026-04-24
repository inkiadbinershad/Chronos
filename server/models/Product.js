const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  shortDesc: { type: String },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, enum: ['military', 'contemporary', 'ultra-luxury'], required: true },
  brand: { type: String, default: 'CHRONOS' },
  movement: { type: String },
  caseMaterial: { type: String },
  waterResistance: { type: String },
  diameter: { type: String },
  strap: { type: String },
  inStock: { type: Boolean, default: true },
  stockCount: { type: Number, default: 50 },
  featured: { type: Boolean, default: false },
  rating: { type: Number, default: 4.8, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
