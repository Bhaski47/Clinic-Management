const { Doc } = require('../models/docModel');
const bcrypt = require('bcrypt');

const createDoc = async (req, res) => {
    try {
        // const { error } = validate(req.body);
        // if (error)
        //     return res.status(400).send({ message: error.details[0].message });
        const doc = await Doc.findOne({ email: req.body.email });
        if (doc) return res.status(409).send({ message: "Already Registered" });
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        await Doc({ ...req.body, password: hashedPass }).save();
        res.status(200).send({ message: "Doctor Account Created" });
    } catch (err) {
        return res.status(500).send({ message: "Server Error For Creating Doctor " + err })
    }
}

module.exports = { createDoc };