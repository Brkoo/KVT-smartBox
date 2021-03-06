var PaketnikModel = require('../models/paketnikModel.js');
const Console = require("console");

/**
 * paketnikController.js
 *
 * @description :: Server-side logic for managing paketniks.
 */
module.exports = {

    /**
     * paketnikController.list()
     */

    //izpiše vse paketnike
    list: function (req, res) {
        var id = req.session.userId;

        PaketnikModel.find({ownerId: id}, function (err, paketniks) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting paketnik.',
                    error: err
                });
            }

            return res.json(paketniks);
        });
    },

    dodaj: function(req, res){
        return res.render('paketnik/dodaj');
    },

    /**
     * paketnikController.show()
     */

    ///izpis enega paketnika
    show: function (req, res) {
        var id = req.params.id;

        PaketnikModel.findOne({_id: id}, function (err, paketnik) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting paketnik.',
                    error: err
                });
            }

            if (!paketnik) {
                return res.status(404).json({
                    message: 'No such paketnik'
                });
            }

            return res.json(paketnik);
        });
    },

    /**
     * paketnikController.create()
     */
    create: function (req, res) {
        var paketnik = new PaketnikModel({
            id : req.body.id,
            ulica: req.body.ulica,
            hisnaStevilka : req.body.hisnaStevilka,
            postnaStevilka : req.body.postnaStevilka,
            mesto : req.body.mesto,
            ownerId : req.session.userId,
            users : []
        });

        paketnik.save(function (err, paketnik) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating paketnik',
                    error: err
                });
            }
            return res.status(201).json(paketnik);
        });
    },

    checkAccess: function (req, res) {
        //funkcija preveri, ce lahko uporabnik odklene paketnik
        var iden = req.query.iden;
        console.log(iden)
        var uporabnik = req.query.uporabnik;

        PaketnikModel.findOne({id: iden}, function (err, paketniks) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting paketniks',
                    error: err
                });
            }

            if (!paketniks) {
                return res.status(404).json({
                    message: 'No such paketniks'
                });
            }

            if(paketniks.users.includes(uporabnik)){
                console.log("Odklep odobren.")
                return res.status(200).json({
                    message: 'ODKLEP ODOBREN'
                });
            }
            else {
                console.log("Nimate dostopa do tega paketnika.")
                return res.status(401).json({
                    message: 'ODKLEP ZAVRNJEN'
                });
            }
        });
    },

    addUsers: function (req, res) {
        var iden = req.body.iden;
        var uporabnik = req.body.uporabnik;
        PaketnikModel.findOne({id: iden}, function (err, paketniks) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting paketniks',
                    error: err
                });
            }

            if (!paketniks) {
                console.log("No such oaketniks");
                return res.status(404).json({
                    message: 'No such paketniks'
                });
            }

            paketniks.users.addToSet(uporabnik);
            paketniks.save(function (err, answers) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating paketniks.',
                        error: err
                    });
                }

                return res.redirect('/paketnik');
            });
        });
    },

    deleteUsers: function (req, res) {
        var iden = req.query.iden;
        var uporabnik = req.query.uporabnik;

        PaketnikModel.findOne({id: iden}, function (err, paketniks) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting paketniks',
                    error: err
                });
            }

            if (!paketniks) {
                return res.status(404).json({
                    message: 'No such paketniks'
                });
            }

            paketniks.users.pull(uporabnik);

            paketniks.save(function (err, answers) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating paketniks.',
                        error: err
                    });
                }

                return res.redirect('/paketnik');
            });
        });
    },

    /**
     * paketnikController.update()
     */
    /*
    update: function (req, res) {
        var id = req.params.id;

        PaketnikModel.findOne({_id: id}, function (err, paketnik) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting paketnik',
                    error: err
                });
            }

            if (!paketnik) {
                return res.status(404).json({
                    message: 'No such paketnik'
                });
            }

            paketnik.userId = req.body.userId ? req.body.userId : paketnik.userId;
			paketnik.addressId = req.body.addressId ? req.body.addressId : paketnik.addressId;
			
            paketnik.save(function (err, paketnik) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating paketnik.',
                        error: err
                    });
                }

                return res.json(paketnik);
            });
        });
    },*/



    //primer updejtaa
    //http://localhost:3000/paketnik/posodobi?id=1&ulica=krEnaUlica&hisnaStevilka=9&mesto=krEno

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

                    paketnik.id = req.query.id ? req.query.id : paketnik.id
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

    /**
     * paketnikController.remove()
     */
    remove: function (req, res) {
        //primer urlja:
        //http://localhost:3000/paketnik/izbrisi?id=1
        var iskanId = req.query.id;

        PaketnikModel.findOneAndDelete({id:iskanId}, function (err, paketnik) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the paketnik.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
