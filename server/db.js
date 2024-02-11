const mongoose = require('mongoose');

const connectDB = async() =>{
    try {
        await mongoose.connect("mongodb+srv://bhaskarg2003:7904610528ig@system.8j33bfu.mongodb.net/?retryWrites=true&w=majority");
        console.log("Connected To DB");
    } catch (error) {
        console.error('Error Connecting To DB '+error);
    }
}

module.exports = {connectDB}
