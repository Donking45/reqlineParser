const express = require('express');
const router = express.Router();
const { reqline } = require('../controller/reqlineController')



router.post('./parse', reqline);
router.get('./parse', reqline);

module.exports = router;