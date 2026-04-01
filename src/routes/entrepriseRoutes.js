const express = require('express');
const router = express.Router();
const entrepriseController = require('../controllers/entrepriseController');

router.get('/search', entrepriseController.search);
router.get ('/:id', entrepriseController.getEntrepriseById);
router.post('/:id/contact', entrepriseController.sendContactEmail);


module.exports = router;