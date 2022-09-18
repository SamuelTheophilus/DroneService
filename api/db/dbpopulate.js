const droneModel = require('../models/droneModel');
const medModel = require('../models/medModel');
const generator = require('generate-serial-number');
const fs = require('fs')
const { resolve } = require('path')

let absolutePath = resolve(__dirname, './droneSerialNumbers.txt')



async function droneUploads() {

  for (let index = 0; index < 5; index++) {
    let serialNumber = generator.generate(15)
    let model = 'Heavy';
    let weight = 500;
    let battery = 100;
    let state = 'idle'
    await droneModel.create({ serialNumber, model, weight, battery, state })

    fs.appendFile(absolutePath, `${serialNumber}\n`, function () {
      console.log(`${serialNumber} is saved in the droneSerialNumbers text file`)
    })

  }

}

module.exports = { droneUploads, }

