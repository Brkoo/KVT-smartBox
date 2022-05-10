var express = require('express');
var router = express.Router();
var paketnikController = require('../controllers/paketnikController.js');


function requiresLogin(req,res,next){
    console.log("auth!");
    if(req.session && req.session.userId){
        return next();
    } else {
        var err = new Error("You must be logged in to view this page.");
        err.status = 401;
        //return next(err);
        return next(err);
    }
}
/*
 * GET
 */
router.get('/', paketnikController.list);
router.get('/dodaj', paketnikController.dodaj);
router.get('/izbrisi', paketnikController.remove);
router.get('/posodobi', paketnikController.update);

/*
 * GET
 */
router.get('/:id', paketnikController.show);

/*
 * POST
 */
router.post('/', paketnikController.create);

/*
 * PUT
 */

/*
 * DELETE
 */

module.exports = router;
