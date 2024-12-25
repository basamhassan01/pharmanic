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