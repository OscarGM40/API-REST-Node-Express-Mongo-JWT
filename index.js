require('dotenv').config();
// console.log(process.argv);


const {
   environmentUtils: { validateRequiredEnvs }
} = require('./utils');

const requiredEnvs = ['PORT', 'MONGO_URI']

validateRequiredEnvs(requiredEnvs);

//MongoDBHelpers.connect retorna una Promise!
const { mongoDBHelpers } = require('./helpers');
/*O hacemos un .then o una funcion autoejecutable↓↓ asincrona*/
(async () => {
   await mongoDBHelpers.connect();

   //si hay posicion dos autoejecuta esa funcion
   //if(+process.argv[2]) require('./databases/mongo/fake/index')();
   //podemos hacer con dos trues tmb
   +process.argv[2] && require('./databases/mongo/fake')();  

   require('./server');
})();



//Captamos que matamos el proceso con CTRL+C asi
process.on('SIGINT',  () => {
   mongoDBHelpers.disconnect()
      .then((connectionState) => {
         console.log("Database Disconnected, connectionState: ", connectionState);
      });
   console.log("Closing process...");
   process.exit(0);
})

