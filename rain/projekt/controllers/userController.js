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
                return next(err);
            } else{
                req.session.userId = user._id;
                return res.redirect('profile');
            }
        });
    },

    profile: function(req, res, next){
        UserModel.findById(req.session.userId)
            .exec(function( error, user){
                if(error){
                    return next(error);
                } else {
                    if (user === null){
                        var err = new Error("Not authorized! Go back!");
                        err.status = 400;
                        return next(err);
                    } else{
                        res.render('user/profile', user);
                    }
                }
            });
    },

    logout: function (req,res,next){
        if(req.session){
            req.session.destroy(function(err){
                if(err){
                    return next(err);
                } else {
                    return res.redirect('/');
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
            password : req.body.password,
            phoneNumber : req.body.phoneNumber,
            owner : req.body.owner
        });

        user.save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating user',
                    error: err
                });
            }

            return res.status(201).json(user);
        });
    },


    //primer za updejt usera
    // http://localhost:3000/users/posodobi?id=627aa46ade32077241801663&name=posodobljeno&surname=pos&email=pos&password=pos&phoneNumber=123
    update: function (req, res) {
        var reqId = req.query.id;

        UserModel.findOne({ _id: reqId }, function (err, user) {
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

};
