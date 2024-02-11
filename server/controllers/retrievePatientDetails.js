const { Pats } = require('../models/patModel');

const retrievePatientDetails = async(req,res) =>{
    try {
        const fetchDetails = await Pats.findOne({phno:req.body.phno});
        if(!fetchDetails) return res.status(404).send({data:"Patient Not Found"});
        return res.status(200).send(fetchDetails);
    } catch (err) {
        return res.status(500).send({message:"Server Error"}+err);
    }
}

module.exports = {retrievePatientDetails}