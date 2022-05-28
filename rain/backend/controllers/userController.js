var UserModel = require('../models/userModel.js');
const PaketnikModel = require("../models/paketnikModel");

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.list()
     */
    list: function (req, res) {
        UserModel.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            return res.json(users);
        });
    },

    /**
     * userController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        UserModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            return res.json(user);
        });
    },

    showLogin: function(req, res){
        res.render('user/login');
    },

    showRegister: function(req, res){
        res.render('user/register');
    },

    login: function(req, res, next){
        UserModel.authenticate(req.body.username, req.body.password, function(error, user){
            if(error || !user){
                var err = new Error("Wrong username or password");
                err.status = 401;
                console.log("Neuspesen login");
                return next(err);
            } else{
                req.session.userId = user._id;
                //return res.redirect('profile');
                console.log("Uspešen login");

                console.log(req.session.userId);
                /*return res.status(200).json({
                    message: 'loginano',
                });*/
                return res.redirect('profile');
                //  return res.json(user);
            }
        });
    },

    login2: function(req, res, next){
        UserModel.authenticate(req.body.username, req.body.password, function(error, user){
            if(error || !user){
                var err = new Error("Wrong username or password");
                err.status = 401;
                console.log("Neuspesen login");
                return next(err);
            } else{
                req.session.userId = user._id;
                //return res.redirect('profile');
                console.log("Uspešen login");

                console.log(req.session.userId);
                return res.status(200).json({
                    message: 'loginano',
                });
                //return res.redirect('profile');
                //  return res.json(user);
            }
        });
    },

    profile: function(req, res, next){
        UserModel.findOne({_id:req.session.userId}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            return res.json(user);
        });
    },

    logout: function(req, res, next){
        if(req.session){
            req.session.destroy(function(err){
                if(err){
                    return next(err);
                } else{
                    console.log("Unicena seja");
                    return res.status(201).json({});
                }
            });
        }
    },

    /**
     * userController.create()
     */
    create: function (req, res) {
        var user = new UserModel({
            name : req.body.name,
            surname : req.body.surname,
            email : req.body.email,
            username : req.body.username,
            password : req.body.password,
            phoneNumber : req.body.phoneNumber,
            owner : req.body.owner
        });

        user.save(function (err, user) {
            if (err) {
                console.log("Neuspesna registracija");
                return res.status(500).json({
                    message: 'Error when creating userrr',
                    error: err
                });
            }
            console.log("Uspesna registtarcija");

            return res.status(201).json(user);
        });
    },

    create2: function (req, res) {
        var user = new UserModel({
            name : req.query.name,
            surname : req.query.surname,
            email : req.query.email,
            username : req.query.username,
            password : req.query.password,
            phoneNumber : req.query.phoneNumber,
            owner : req.query.owner
        });

        user.save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating userrr',
                    error: err
                });
            }

            return res.status(201).json(user);
        });
    },


    /**
     * userController.update()
     */
/*
    update: function (req, res) {
        var reqId = req.query.id;

        PaketnikModel.findOne({id:reqId}, function (err, paketnik) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting question',
                    error: err
                });
            }

            if (!paketnik) {
                return res.redirect();
            } else {
                PaketnikModel.findOne({id:reqId}, function (err, paketnik) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when getting paketniks',
                            error: err
                        });
                    }

                    if (!paketnik) {
                        return res.status(404).json({
                            message: 'No such paketniks'
                        });
                    }

                    paketnik.ulica = req.query.ulica ? req.query.ulica : paketnik.ulica;
                    paketnik.hisnaStevilka = req.query.hisnaStevilka ? req.query.hisnaStevilka : paketnik.hisnaStevilka;
                    paketnik.postnaStevilka = req.query.postnaStevilka ? req.query.postnaStevilka : paketnik.postnaStevilka;
                    paketnik.mesto = req.query.mesto ? req.query.mesto : paketnik.mesto;

                    paketnik.save(function (err, paketnik) {
                        if (err) {
                            return res.status(500).json({
                                message: 'Error when updating paketnik.',
                                error: err
                            });
                        }

                        return res.redirect('/paketnik/');
                    });
                });
            }
        });
    },
    */

//primer za updejt usera
// http://localhost:3000/users/posodobi?id=627aa46ade32077241801663&name=posodobljeno&surname=pos&email=pos&password=pos&phoneNumber=123
    update: function (req, res) {
        var reqId = req.query.id;

        UserModel.findOne({_id:reqId}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.name = req.query.name ? req.query.name : user.name;
            user.surname = req.query.surname ? req.query.surname : user.surname;
            user.email = req.query.email ? req.query.email : user.email;
            user.password = req.query.password ? req.query.password : user.password;
            user.phoneNumber = req.query.phoneNumber ? req.query.phoneNumber : user.phoneNumber;

            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    },

    /**
     * userController.remove()
     */


    remove: function (req, res) {
        var id = req.query.id;

        UserModel.findByIdAndRemove({_id:id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
