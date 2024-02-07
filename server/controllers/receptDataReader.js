const { Recept } = require("../models/receptModel");

const receptDataReader = async (req, res) => {
    try {
        const recept = await Recept.findById(req.body.id)
            .populate({
                path: 'doctor.docObjectId',
                model: 'Doc',
            })
            .populate({
                path: 'doctor.patId',
                model: 'Pats',
            });

        if (!recept) return res.status(200).send({ data: "No data" });
        return res.status(200).send({ data: recept });
    } catch (error) {
        return res.status(500).send("Retrieve Error " + error);
    }
};

module.exports = { receptDataReader };
