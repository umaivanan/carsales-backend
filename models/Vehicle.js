import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  price: Number,
  image: String,
  description: String,
}, { timestamps: true });

export default mongoose.model('Vehicle', vehicleSchema);
