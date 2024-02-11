//Will Get The Deatils of All the Doctor,Patients Consultants

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
            // const doctorDetails = {
            //     name: recept.doctor.docObjectId.name,
            //     // Add more properties as needed
            // };
            
            // // Extract patient details
            // const patientDetails = {
            //     name: recept.doctor.patId.name,
            //     // Add more properties as needed
            // };
            
            // // Merge doctor and patient details into a single object
            // const mergeData = {
            //     doctor: doctorDetails,
            //     patient: patientDetails,
            // };
            console.log(recept)
        if (!recept) return res.status(200).send({ data: "No data" });
        return res.status(200).send({ data: recept });
    } catch (error) {
        return res.status(500).send("Retrieve Error " + error);
    }
};

module.exports = { receptDataReader };
