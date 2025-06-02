const express = require('express');
const router = express.Router();
const {getAllProducts , getAllProductTested} = require('./controller.js');
router.route('/').get(getAllProducts);
router.route('/testing').get(getAllProductTested);

module.exports = router;