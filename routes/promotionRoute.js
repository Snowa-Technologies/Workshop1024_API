const { Router } = require('express');

//Load Modules
const promotionController = require('../controllers/promotionController');

// Initialization
const router = Router();

router.get('/promotions', promotionController.getPromotions);
router.post('/promotions/add', promotionController.addPromotion);
router.get('/campaign/names', promotionController.getCampaignNames);

module.exports = router;