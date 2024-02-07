const mongoose = require('mongoose');

const patSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: String, required: true },
    phno: { type: String, required: true },
    gender: { type: String, required: true },
    amount: { type: String },
    docConsult: [
        {
            doctor: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Doc',
            },
            prescription: { type: String },
            createdAt: { type: Date, default: Date.now }
        }
    ],
})

const Pats = mongoose.model("Pats", patSchema);
module.exports = { Pats };