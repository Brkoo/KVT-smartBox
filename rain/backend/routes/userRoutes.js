var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController.js');

/*
 * GET
 */
router.get('/', userController.list);
//router.get('/login', userController.showLogin);
router.get('/register', userController.showRegister);
router.get('/profile', userController.profile);
router.get('/logout', userController.logout);
router.get('/posodobi', userController.update);
router.get('/izbrisi', userController.remove);


/*
 * GET
 */
router.get('/:id', userController.show);

/*
 * POST
 */
router.post('/', userController.create);
router.post('/login', userController.login);
//router.post('/login/login', userController.login2);
router.post('/register', userController.create);

/*
 * PUT
 */

/*
 * DELETE
 */
router.delete('/:id', userController.remove);

module.exports = router;
