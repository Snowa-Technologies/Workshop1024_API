const { Router } = require('express');

//Load Modules
const dashboardController = require('../controllers/dashboardController');

// Initialization
const router = Router();

router.get('/statistics', dashboardController.getCampaignStatistics);

module.exports = router;