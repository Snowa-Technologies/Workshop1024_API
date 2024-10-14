const { Router } = require('express');

//Load Modules
const campaignController = require('../controllers/campaignController');

// Initialization
const router = Router();

router.get('/campaigns', campaignController.getCampaigns);
router.post('/campaigns/add', campaignController.addNewCampaign);

module.exports = router;