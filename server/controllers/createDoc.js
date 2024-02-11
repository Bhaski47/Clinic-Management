const { Doc } = require('../models/docModel');
const bcrypt = require('bcrypt');

const createDoc = async (req, res) => {
    try {
        const doc = await Doc.findOne({ email: req.body.email });
        if (doc) return res.status(409).send({ message: "Already Registered" });

        // Generate a salt
        const salt = await bcrypt.genSalt(10);

        // Hash the password using the generated salt
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        // Save the document with the hashed password
        await Doc({ ...req.body, password: hashedPass }).save();

        res.status(200).send({ message: "Doctor Account Created" });
    } catch (err) {
        return res.status(500).send({ message: "Server Error For Creating Doctor " + err });
    }
}

module.exports = { createDoc };
