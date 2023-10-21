//aqui vamos a hacer la conexion a la base de datos

const mongoose= require("mongoose");


const dbConnection = async() =>{

    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('DB online');
    } catch (error) {
        console.log(error);
        throw new Error('error a la hora de inicializar la db')
    }
}



module.exports = {
    dbConnection
}