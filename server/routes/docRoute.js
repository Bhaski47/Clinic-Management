const router = require('express').Router();
const { createDoc } = require('../controllers/createDoc');
const { docDataReader } = require('../controllers/docDataReader');
const { enquirePatController } = require('../controllers/enquirePatController');
const { getTokensForToday } = require('../controllers/retrieveToken');

router.post('/enqPat',enquirePatController);
router.post('/createDoc',createDoc);
router.post('/retDoc',docDataReader);
router.post('/retToken',getTokensForToday);

module.exports = router;