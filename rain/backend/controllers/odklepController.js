var OdklepModel = require('../models/odklepModel.js');
const PaketnikModel = require("../models/paketnikModel");
const UserModel = require("../models/userModel");

/**
 * odklepController.js
 *
 * @description :: Server-side logic for managing odkleps.
 */
module.exports = {

    /**
     * odklepController.list()
     */
    list: function (req, res) {
        var id = req.session.userId;
        var username;

        UserModel.findOne({_id:id}, function (err, user){
            {username=user.name}
            OdklepModel.find({username: username}, function (err, odkleps) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting odklep.',
                        error: err
                    });
                }

                console.log(username);

                return res.json(odkleps);
            })


        });
    },

    /**
     * odklepController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        OdklepModel.findOne({_id: id}, function (err, odklep) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting odklep.',
                    error: err
                });
            }

            if (!odklep) {
                return res.status(404).json({
                    message: 'No such odklep'
                });
            }

            return res.json(odklep);
        });
    },

    /**
     * odklepController.create()
     */
    create: function (req, res) {
        var odklep = new OdklepModel({
            username : req.body.username,
            paketnikId : req.body.paketnikId,
            datum : (new Date()).toJSON()
        });

        //if(req.session.userId===userId) {
            odklep.save(function (err, odklep) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when creating odklep',
                        error: err
                    });
                }

                return res.status(201).json(odklep);
            });
        //}
        /*else{
            return res.status(404).json({
                message: 'User not logged in',
                error: err
            });
        }*/
    },

    /**
     * odklepController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        OdklepModel.findOne({_id: id}, function (err, odklep) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting odklep',
                    error: err
                });
            }

            if (!odklep) {
                return res.status(404).json({
                    message: 'No such odklep'
                });
            }

            odklep.userId = req.body.userId ? req.body.userId : odklep.userId;
			odklep.paketnikId = req.body.paketnikId ? req.body.paketnikId : odklep.paketnikId;
			odklep.steviloOdklepov = req.body.steviloOdklepov ? req.body.steviloOdklepov : odklep.steviloOdklepov;
			odklep.datum = req.body.datum ? req.body.datum : odklep.datum;
			
            odklep.save(function (err, odklep) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating odklep.',
                        error: err
                    });
                }

                return res.json(odklep);
            });
        });
    },

    /**
     * odklepController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        OdklepModel.findByIdAndRemove(id, function (err, odklep) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the odklep.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
