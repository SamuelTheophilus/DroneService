const mongoose = require('mongoose');

const medSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name of the medication is required'],
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9-_-]+$/.test(value)
      },
      message: 'Name Should Contain Letters, Numbers, Underscores, and Dashes Only '
    }
    //allow only letters, numbers dashes and underscores
  },
  weight: {
    type: Number,
    required: [true, 'Weight of the medication is required']
  },
  code: {
    type: String,
    required: [true, 'Code of the medication is required'],
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9_]+$/.test(value)
      },
      message: 'Code of Medication Should Contain Letters, Numbers and Underscores Only'
    }
    //allow only uppercase, underscores and numbers
  },
  image: {
    type: String,
    required: true
  }
})

const Med = mongoose.model('meds', medSchema);
module.exports = Med;

