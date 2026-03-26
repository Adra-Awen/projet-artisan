const express = require('express');
const router = express.Router();
const entrepriseController = require('../controllers/entrepriseController');

router.get ('/:id', entrepriseController.getEntrepriseById);

module.exports = router;