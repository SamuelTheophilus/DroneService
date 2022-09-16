const droneModel = require('../models/droneModel');
const medModel = require('../models/medModel');
const generator = require('generate-serial-number')
generator.generate(15);


const registerDrone = async (req, res) => {
  let { model, weight } = req.body;
  let serialNumber = generator.generate(15);
  let battery = 100;
  let state = 'idle';


  if (model && weight) {
    try {
      let newDrone = await droneModel.create({ serialNumber, model, weight, battery, state });
      if (newDrone) {
        return res.status(200).json({ message: 'Drone successfully registered', droneDetails: newDrone })
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Drone failed to resgister', error: error.message })
    }
  }
}


const loadingDrone = async (req, res) => {
  let { name, weight, code, image, serialNumber } = req.body;

  try {
    let medication = await medModel.create({ name, weight, code, image });
    if (medication) {
      let loadingDrone = await droneModel.findOneAndUpdate({ serialNumber: serialNumber }, { loadedMedications: medication.name })
      if (loadingDrone) {
        return res.status(200).json({ message: 'Medication Loaded Unto Drone' })
      }
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Medication was not loaded unto the drone' })
  }
}


const droneContents = async (req, res) => {
  let { serialNumber } = req.body;

  try {
    let drone = await droneModel.findOneAndUpdate({ serialNumber: serialNumber }, { state: 'loading' })
    if (drone) {
      return res.status(200).json({ droneContents: drone.loadedMedications })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Could not retrieve the drone contents, check the serial Number you entered' })
  }

}


const availableDrone = async (req, res) => {

  let availableDrones = await droneModel.find({ state: 'idle' })
  try {
    if (availableDrones) {
      return res.status(200).json({ availableDrones: availableDrones })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'No Drones are available for loading' })
  }

}


const droneBattery = (req, res) => {

}


module.exports = {
  registerDrone,
  loadingDrone,
  droneContents,
  availableDrone,
  droneBattery,
}