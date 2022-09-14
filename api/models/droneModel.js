const mongoose = require('mongoose');

const droneSchema = new mongoose.Schema({
  serialNumber: {
    type: Number,
    required: true,
    maxLength: [100, 'Not More Than 100 characters'],
    required: true
  },
  model: {
    type: String,
    enum: ['Light', 'Middle','Cruise','Heavy'],
    default: 'Light',
    required: true
  },
  weight: {
    type: Number,
    max: 500,
    required: true
  },
  battery:{
    type: Number,
    max: 100,
    required: true
  },
  state: {
    type: String,
    enum: ['idle','loading', 'loaded', 'delivering','delivered','returning'],
    default: 'idle',
    required: true
  }

})


const Drone = mongoose.model('drone', droneSchema)
module.exports = Drone;