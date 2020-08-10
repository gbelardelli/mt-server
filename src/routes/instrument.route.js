const express = require('express');
const router = express.Router();

const instrumentController = require('../controllers/instrument.controller');

router.get( '/instruments/:itemId', instrumentController.load);
router.get( '/instruments/', instrumentController.list);
router.post('/instruments/', instrumentController.create);
router.patch('/instruments/', instrumentController.update);
router.delete('/instruments/',instrumentController.delete);

instrumentController.reset();

module.exports = router;
