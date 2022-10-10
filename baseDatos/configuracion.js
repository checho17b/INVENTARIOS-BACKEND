const mongoose = require("mongoose");

const getConnection = async() => {
    try {
        const url = ("mongodb+srv://rootIUD:iudigital@cluster0.hfikzln.mongodb.net/?retryWrites=true&w=majority");

        await mongoose.connect(url);
        console.log("conexion Ok con mongo")
    } catch (error) {
        console.log(error);
    }

}
module.exports = {
    getConnection,
}