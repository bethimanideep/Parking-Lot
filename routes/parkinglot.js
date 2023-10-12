const express = require('express');
const Parking = require('../models/parkingModel');
const { v4: uuidv4 } = require('uuid'); // Import UUID generator
const router = express.Router();

// Route to park a car
router.post('/park', async (req, res) => {
  try {
    const { carNumber } = req.body;

    // Check if the parking lot is full
    const parkingLotSize = process.env.PARKING_LOT_SIZE || 20; // Default size is 20
    const occupiedSlotsCount = await Parking.countDocuments(); // Count occupied slots
    const existingDocument = await Parking.findOne({ carNumber });

    if (existingDocument) {
      // Handle the duplicate, e.g., return an error response
      return res.status(400).json({ message: 'Car with the same number already exists.' });
    } else {

      if (occupiedSlotsCount >= parkingLotSize) {
        return res.status(400).json({ message: 'Parking lot is full.' });
      }

      // Generate a new UUID for the slot
      const slotNumber = uuidv4();

      // Park the car in the available slot
      const parkingSlot = new Parking({
        slotNumber,
        carNumber,
      });

      await parkingSlot.save();
      return res.status(201).json({ slot: slotNumber });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Rest of the routes remain the same...

// Route to unpark a car
router.delete('/unpark/:slotNumber', async (req, res) => {
  try {
    const { slotNumber } = req.params;

    const parkingSlot = await Parking.findOne({ slotNumber });

    if (!parkingSlot) {
      return res.status(404).json({ message: 'Slot not found.' });
    } else {
      await Parking.findOneAndDelete({ slotNumber })
      return res.status(200).json({ message: 'Unpark Successfull.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Route to get car/slot information
router.get('/info/:query', async (req, res) => {
  try {
    const query = req.params.query;

    // Check if the query is a slot number or a car number
    if (query) {
      let data1 = await Parking.findOne({ carNumber: query });
      let data2 = await Parking.findOne({ slotNumber: query });
      if (data1 || data2) {
        if (data1) return res.status(200).json({ data: data1 });
        else return res.status(200).json({ data: data2 });
      } else {
        return res.status(404).json({ message: 'Slot or car not found.' });
      }

    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
