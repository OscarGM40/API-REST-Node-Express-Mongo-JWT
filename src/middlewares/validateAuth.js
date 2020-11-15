const jwt = require('jsonwebtoken');
const {jwtSecret} = require('./../../config');
const Boom = require('@hapi/boom');

//no le vamos a dar nombre en este proyecto
module.exports =  (req,res,next) => {
    try {
        //el token para comprobar es el que vendra por los headers de la request
        const token = req.headers["authorization"] ? 
        req.headers["authorization"].replace('Bearer ',''):   
        undefined;
       // console.log(token);

        const decodedToken = jwt.verify(token,jwtSecret)
      //  console.log(decodedToken);
        const {userFound} = decodedToken;
        console.log(userFound);
        req.userData = userFound;

        next();
        
    } catch (error) {
        //return res.status(500).json({msg:error.message})
        res.send(Boom.forbidden(error.message))
    }
}