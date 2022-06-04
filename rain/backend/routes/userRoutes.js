var express = require('express');
const multer = require('multer');
const path = require('path')

var router = express.Router();
var userController = require('../controllers/userController.js');
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, 'Images');
    },
    filename: function (req, file, callback) {
      console.log(file);
      callback(null,Date.now() + path.extname(file.originalname) );
      
    }
  });
  
  const upload = multer({storage: storage})
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
router.post('/login2', userController.login2);
//router.post('/login/login', userController.login2);
router.post('/register', userController.create);
router.post('/faceLogin', upload.single('image'), userController.faceLogin);

/*
 * PUT
 */

/*
 * DELETE
 */
router.delete('/:id', userController.remove);

module.exports = router;
