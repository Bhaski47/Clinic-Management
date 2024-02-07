const { createToken } = require('../controllers/addToken');
const { createRecept } = require('../controllers/createRecept');
const { receptRegister } = require('../controllers/receptRegister');
const { receptDataReader } = require('../controllers/receptDataReader');

const router = require('express').Router();

router.post("/createrecept",createRecept);
router.post("/createtoken",createToken);
router.post("/receptregister",receptRegister);
router.post("/retrecept",receptDataReader);


module.exports = router;