const controllers = require('../controllers/droneControllers');
const konst = require('../constants/constants')
const { Router } = require('express');

const router = Router();

//Register Drone
router.post(konst.register, controllers.registerDrone)

//Loading Drone With Medications
router.post(konst.api + konst.loading, controllers.loadingDrone)

//Checking Drone Contents
router.get(konst.api + konst.contents, controllers.droneContents)

//Checking available Drones
router.get(konst.api + konst.available, controllers.availableDrone)

//Checking the Battery level of a Drone
router.get(konst.api + konst.battery + konst.id, controllers.droneBattery)


module.exports = router;