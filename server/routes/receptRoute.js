const { createToken } = require('../controllers/addToken');
const { createRecept } = require('../controllers/createRecept');
const { receptRegister } = require('../controllers/receptController');
const { receptDataReader } = require('../controllers/receptDataReader');

const router = require('express').Router();

router.post("/createRecept",createRecept);
router.post("/receptRegister",receptRegister);
router.post("/retrecept",receptDataReader);
router.post("/createToken",createToken);

module.exports = router;