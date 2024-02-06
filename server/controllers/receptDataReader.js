const { Recept } = require("../models/receptModel");

const receptDataReader = async (req, res) => {
    try {
        const recept = await Recept.findById(req.body.id)
            .populate({
                path: 'doctor.docObjectId', // assuming this is the path to the Doctor model
                model: 'Doc', // specify the model to populate
            })
            .populate({
                path: 'doctor.patId', // assuming this is the path to the Pats model
                model: 'Pats', // specify the model to populate
            });

        if (!recept) return res.status(200).send({ data: "No data" });
        return res.status(200).send({ data: recept });
    } catch (error) {
        return res.status(500).send("Retrieve Error " + error);
    }
};

module.exports = { receptDataReader };
