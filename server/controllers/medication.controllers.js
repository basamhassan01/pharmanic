import Medication from "../models/medication.model.js";

// Endpoint to get all medications
export const getMedications = async (req, res, next) => {
  try {
    const medications = await Medication.find();
    res.status(200).json(medications);
  } catch (error) {
    next(error);
  }
};

export const createMedication = async (req, res, next) => {
  try {
    const {name, quantity, price} = req.body;

    // validate the required fields
    if (!name || !quantity || !price) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // create a new medication
    const newMedication = new Medication({
      name,
      quantity,
      price,
    });
    const savedMedication = await newMedication.save();
    res.status(201).json(savedMedication);
  } catch (error) {
    next(error);
  }
}

// Endpoint to delete an existing medication
export const deleteMedication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedMedication = await Medication.findByIdAndDelete(id);

    if (!deletedMedication) {
      return res.status(404).json({ message: "Medication not found." });
    }

    res.status(200).json({ message: "Medication deleted successfully." });
  } catch (error) {
    next(error);
  }
};