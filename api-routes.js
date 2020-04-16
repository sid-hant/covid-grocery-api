// Initialize express router
const router = require('express').Router();
const { check, validationResult } = require('express-validator');

// Import contact controller
const storesController = require('./controllers/stores');
const singleStoreController = require('./controllers/singleStore');
const lineStatusController = require('./controllers/lineStatus');

// /stores route
router.route('/stores/search')
    .get(storesController.search);

// /store/:placeId route
router.route('/store/:placeId')
    .get(singleStoreController.storeInformation);


// /:placeId/line-status routes
router.route('/:placeId/line-status')
    .post(lineStatusController.createLineStatus)   
    .get(lineStatusController.getLineStatus);


// /:placeId/line-status/:day routes
router.route('/:placeId/line-status/:day')
    .get(lineStatusController.lineStatusDay);

// /:placeId/seniorHours
router.route('/:placeId/seniorHours')
    .post(singleStoreController.seniorHours);



// Export API routes
module.exports = router;