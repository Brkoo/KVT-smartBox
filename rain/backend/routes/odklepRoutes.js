var express = require('express');
var router = express.Router();
var odklepController = require('../controllers/odklepController.js');

/*
 * GET
 */
router.get('/', odklepController.list);

/*
 * GET
 */
router.get('/:id', odklepController.show);

/*
 * POST
 */
router.post('/', odklepController.create);

/*
 * PUT
 */
router.put('/:id', odklepController.update);

/*
 * DELETE
 */
router.delete('/:id', odklepController.remove);

module.exports = router;
