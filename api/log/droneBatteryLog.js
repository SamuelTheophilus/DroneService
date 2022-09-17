const droneModel = require('../models/droneModel');
const fs = require('fs')
const { resolve } = require('path')

let absolutePath = resolve(__dirname, './auditLog.txt')


//Logger Function 
async function checkBatteryLevels() {
  let drones = await droneModel.find()
  for (let index = 0; index < drones.length; index++) {
    let newDate = new Date()
    let log = `${drones[index].serialNumber}\t\t\t\t\t${drones[index].battery}\t\t\t\t\t\t\t\t\t\t\t\t${newDate.toString()}\n`
    fs.appendFile(absolutePath, log, function () {
      console.log('Drone Battery Levels Logged')
    })

  }

}


//Interval for Logging the Battery Levels
function logger() { setInterval(async function () { await checkBatteryLevels() }, 18000000); }
module.exports = logger;


