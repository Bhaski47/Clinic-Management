const { Doc } = require('../models/docModel');
const { Pats } = require('../models/patModel');
const { Recept } = require("../models/receptModel");
const mongoose = require('mongoose');

const receptRegister = async (req, res) => {
    try {
        const recept = await Recept.findById(req.body.id);
        const doc = await Doc.findOne({ phno: req.body.docPhno });
        const patDetail = await Pats.findOne({ phno: req.body.patPh })
        if (!doc || !patDetail) {
            return res.status(404).send("Credentials Not Registered");
        }
        const amount = req.body.amount;
        // console.log(docObjectId)
        if (!patDetail) {
            return res.status(404).send("Patient Not Found");
        }
        const docObjectId = new mongoose.Types.ObjectId(req.body.docId);
        const patId = new mongoose.Types.ObjectId(patDetail._id);
        recept.doctor.push({ docObjectId, patId, amount });
        await recept.save();
        // await doc.save();
        res.status(200).json({ message: 'Patient details added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error " + err.message);
    }
};

module.exports = { receptRegister };
