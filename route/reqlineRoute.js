const express = require('express');
const router = express.Router();
const { parseReqline } = require('../controller/reqlineController')



router.post('/parse', parseReqline);
router.get('/parse', parseReqline);

module.exports = router;