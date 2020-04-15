// Initialize express router
const router = require('express').Router();

// Import contact controller
const storesController = require('./controllers/stores');
const singleStoreController = require('./controllers/singleStore');
const lineStatusController = require('./controllers/lineStatus');

// /stores route
router.route('/stores')
    .post(storesController.new)
    .get(storesController.list);

// /search?q=
router.route('/stores/search')
    .get(storesController.searchByKeyword);

// /stores/:country/:province/:city
router.route('/stores/:country/:province/:city')
    .get(storesController.searchByLocation);  

// /store/:storeId routes
router.route('/store/:storeId')
    .get(singleStoreController.view);

// /line-status routes
router.route('/:storeId/line-status')
    .post(lineStatusController.createLineStatus)   
    .get(lineStatusController.getLineStatus);

// /:storeId/line-status/:day routes
router.route('/:storeId/line-status/:day')
    .get(lineStatusController.lineStatusDay);

// Export API routes
module.exports = router;