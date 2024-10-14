const { Router } = require('express');

//Load Modules
const promotionController = require('../controllers/promotionController');

// Initialization
const router = Router();

router.get('/promotions', promotionController.getPromotions);

module.exports = router;