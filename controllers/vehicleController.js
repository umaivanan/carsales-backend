import Vehicle from '../models/Vehicle.js';
import cloudinary from '../config/cloudinary.js';

// Create Vehicle
export const createVehicle = async (req, res) => {
  try {
    const { make, model, year, price, description } = req.body;
    const image = req.file.path;

    const result = await cloudinary.uploader.upload(image, { folder: 'vehicles' });

    const vehicle = new Vehicle({
      make,
      model,
      year,
      price,
      description,
      image: result.secure_url,
    });

    await vehicle.save();
    res.status(201).json({ message: 'Vehicle added successfully!', vehicle });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all vehicles
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Vehicle
export const updateVehicle = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const { make, model, year, price, description } = req.body;
    const image = req.file ? req.file.path : req.body.image;

    let imageUrl = image;
    if (req.file) {
      const result = await cloudinary.uploader.upload(image, { folder: 'vehicles' });
      imageUrl = result.secure_url;
    }

    const updatedVehicle = await Vehicle.findByIdAndUpdate(vehicleId, {
      make,
      model,
      year,
      price,
      description,
      image: imageUrl,
    }, { new: true });

    res.status(200).json(updatedVehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Vehicle
export const deleteVehicle = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    await Vehicle.findByIdAndDelete(vehicleId);
    res.status(200).json({ message: 'Vehicle deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
