const controllers = require('../controllers/droneControllers');
const konst = require('../constants/constants')
const { Router } = require(express);

const router = Router();

//Register Drone
router.post(konst.api + konst.register, controllers.registerDrone)

//Loading Drone With Medications
router.post(konst.api + konst.loading + konst.id, controllers.loadingDrone)

//Checking Drone Contents
router.get(konst.api + konst.contents + konst.id, controllers.droneContents)

//Checking available Drones
router.get(konst.api + konst.available, controllers.availableDrone)

//Checking the Battery level of a Drone
router.get(konst.api + konst.battery + konst.id, controllers.droneBattery)


module.export = router;