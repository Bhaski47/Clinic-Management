//The Doctor Will Just Display The Details Of The Patient To The Doctor 
//And Retrieve The Disease And Gives The Prescription

const { Doc } = require('../models/docModel');
const { Pats } = require('../models/patModel');
const mongoose = require('mongoose');

const enquirePatController = async (req, res) => {
    try {
        const doc = await Doc.findById(req.body.id);
        if (!doc) {
            return res.status(404).send("Doctor Not Found");
        }
        const docId = req.body.docId;
        const prescription = req.body.prescription;
        const docObjectId = new mongoose.Types.ObjectId(docId);
        const patDetail = await Pats.findOne({phno:patPh})
        if(patDetail){
            patDetail.docConsult.push({ doctor:docObjectId, prescription });
            await patDetail.save();
            doc.patConsult.push(patDetail._id);
        }
        else{
        const newPatient = await new Pats({
            name: patName,
            age: patAge,
            gender: patGender,
            phno: patPh,
            docConsult: [{ doctor:docObjectId, prescription }],
        }).save();
        doc.patConsult.push(newPatient._id);
    }
        await doc.save();
        res.status(200).json({ message: 'Patient details added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error " + err.message);
    }
};

module.exports = { enquirePatController };
