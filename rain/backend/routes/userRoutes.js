var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController.js');

/*
 * GET
 */
router.get('/', userController.list);
router.get('/login', userController.showLogin);
router.get('/register', userController.showRegister);
router.get('/logout', userController.logout);
router.get('/profile', userController.profile);
router.get('/izbrisi', userController.remove);
router.get('/posodobi', userController.update);

/*
 * GET
 */
router.get('/:id', userController.show);

/*
 * POST
 */
router.post('/', userController.create);
router.post('/login', userController.login);
router.post('/register', userController.create);
/*
 * PUT
 */

/*
 * DELETE
 */
router.delete('/:id', userController.remove);

module.exports = router;
