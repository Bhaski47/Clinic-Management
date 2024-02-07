//To add the Token Generation To The Collection

const { Token } = require("../models/tokModel");
const mongoose = require("mongoose");
const createToken = async (req, res) => {
    try {
        const existingToken = await Token.findOne({})
            .sort({ "tokens.token": -1 })

        let newTokenValue = 1;

        if (existingToken) {
            newTokenValue = existingToken.tokens[0].token + 1;
        }

        const updatedToken = await Token.findOneAndUpdate(
            {},
            { $push: { tokens: { token: newTokenValue, docs: new mongoose.Types.ObjectId(req.body.docs), patient: new mongoose.Types.ObjectId(req.body.patient) } } },
            { new: true, upsert: true }
        );

        res.status(200).send({ message: "Token Created", token: updatedToken });
    } catch (err) {
        return res.status(500).send({ message: "Server Error For Creating Token " + err });
    }
};

module.exports = { createToken };
