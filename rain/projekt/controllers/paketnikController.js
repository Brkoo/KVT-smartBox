var PaketnikModel = require('../models/paketnikModel.js');

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
        PaketnikModel.find(function (err, paketniks) {
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
			userId : req.body.userId,
			addressId : req.body.addressId
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

};
