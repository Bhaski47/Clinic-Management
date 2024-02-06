const router = require('express').Router();
const { createDoc } = require('../controllers/createDoc');
const { docDataReader } = require('../controllers/docDataReader');
const { enquirePatController } = require('../controllers/enquirePatController')

router.post('/enqPat',enquirePatController);
router.post('/createDoc',createDoc);
router.post('/retDoc',docDataReader);

module.exports = router;