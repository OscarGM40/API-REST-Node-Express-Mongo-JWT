const mongoose = require('mongoose');
const {mongoURI} = require('../config');
//console.log(mongoURI);

const checkConnection = () => {
    return mongoose.connection.readyState;
    //0 disconected 1 conected 2 connecting 3 disconnecting
};

const connect = async () => {
    try {
        //un false es un 0!
     //   if(!checkConnection){
            console.log("Connecting...");
        // await mongoose.connect('mongodb://localhost/schoolManager',{
        await mongoose.connect(mongoURI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false,
            useCreateIndex:true,
            // serverSelectionTimeoutMS:10000,
        })
        console.log("Connected");
   // }

    } catch (error) {
        console.error(error)
    }
};

//console.log("Estado de la conexion " + checkConnection());

const disconnect = async () => {
    await mongoose.connection.close();
    return checkConnection();
}


module.exports = {
    checkConnection ,
    connect,
    disconnect,
};