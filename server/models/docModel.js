const mongoose = require('mongoose');
const docSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    // photo:{type:Buffer,default:"https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"},
    age: { type: Number, required: true },
    phno: { type: String, required: true },
    gender: { type: String, required: true },
    exp: { type: Number },
    prevCompany: { type: String },
    patConsult: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pats',
        }
    ]
})

// const validate = (data) =>{
//     const passOption = {
//         min:8,
//         max:30
//     };
//     const schema = joi.object({
//         name:joi.string().required().label("Name"),
//         email:joi.string().email().required().label("Email"),
//         password:passwordComplexity(passOption).required().label("Password")
//     })
//     return schema.validate(data);
// }
const Doc = mongoose.model("Doc", docSchema);
module.exports = { Doc};