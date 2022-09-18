const controllers = require('../controllers/droneControllers');
const konst = require('../constants/constants')
const { Router } = require('express');
const router = Router();
const multer = require('multer')
const path = require('path')

const filestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: filestorage })


//Register Drone
router.post(konst.register, controllers.registerDrone)

//Loading Drone With Medications
router.post(konst.api + konst.loading, upload.single('image'), controllers.loadingDrone)

//Checking Drone Contents
router.get(konst.api + konst.contents, controllers.droneContents)

//Checking available Drones
router.get(konst.api + konst.available, controllers.availableDrone)

//Checking the Battery level of a Drone
router.get(konst.api + konst.battery + konst.id, controllers.droneBattery)


module.exports = router;