const express = require('express');
const router = express.Router();
const { getAddressFromCoordinates} = require('../controller/reverseGeocodeController')



router.post('/get-address', getAddressFromCoordinates);


module.exports = router;