const droneModel = require('../models/droneModel');
const medModel = require('../models/medModel');
const generator = require('generate-serial-number')


async function checkCurrentWeight(medications, newMedicationWeight) {
  let ids = medications.map(x => x.toString())
  let finalWeight = 0;
  if (!medications) {
    return newMedicationWeight;
  }

  // ids.forEach(async (element) => {
  //   let medication = await medModel.findById(element)
  //   finalWeight = finalWeight + medication.weight;
  // });

  for (let index = 0; index < ids.length; index++) {
    let medication = await medModel.findById(ids[index])
    if (medication) {
      finalWeight = finalWeight + medication.weight;
    }

  }
  return finalWeight + newMedicationWeight;
}


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
      let loadingDrone = await droneModel.findOne({ serialNumber: serialNumber })
      let finalWeight = await checkCurrentWeight(loadingDrone.loadedMedications, medication.weight)

      if (finalWeight <= loadingDrone.weight) {
        await droneModel.updateOne({ serialNumber: serialNumber }, { $push: { loadedMedications: medication._id }, $set: { state: 'loaded' } })
        return res.status(200).json({ message: 'Medication Loaded Unto Drone' });
      } else {
        return res.status(400).json({ message: 'Cannot Load the Medication Unto Drone, Weight Exceesds The Drone\'s carrying capacity ' })

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


const droneBattery = async (req, res) => {

  let { serialNumber } = req.body;

  try {
    let drone = await droneModel.findOne({ serialNumber: serialNumber })
    if (drone) {
      return res.status(200).json({ message: `Battery Level of the Drone is ${drone.battery}` })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Cannot obtain the drone battery level' })
  }


}


module.exports = {
  registerDrone,
  loadingDrone,
  droneContents,
  availableDrone,
  droneBattery,
}