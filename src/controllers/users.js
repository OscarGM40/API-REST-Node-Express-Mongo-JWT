const { mongo:
    { usersModel
    }, } = require('../../databases');
const {
    bcryptHelpers: {
        encryptPassword, 
        comparePassword
    }
} = require('../../helpers');

const jwt = require('jsonwebtoken');
const{jwtSecret} = require('../../config');

module.exports = {

    signUp: async (req, res) => {

        try {
            const { username, password } = req.body;
            const encryptedPassword = await encryptPassword(password);
            console.log(encryptedPassword);
            const newUser = await new usersModel({
                username, password: encryptedPassword
            }).save();

            res.send(`${newUser.username} registered`);
        } catch (error) {
            res.send(error.message)
        }
    },

    signIn: async (req, res) => {
        try {
            const { username, password } = req.body;
            //debemos buscar si el username existe antes de nada
            const userFound = await usersModel.findOne({
                username
            });
            if(!userFound) return res.send("User not registered");
            //Si llegamos aqui hay que comparar las passwords
            const {password:passwordFromDB} = userFound;
            //console.log(userFound);  

            const isValidPassword = await comparePassword(password,passwordFromDB);
            //console.log(isValidPassword)

            if(!isValidPassword) return res.send("The password is Invalid");

            //No usar este metodo porque no a todo string se le pued añadir propiedades y no deja setear la expiracion
            // const token = jwt.sign(JSON.stringify(userFound),jwtSecret,{
            //     expiresIn:600
            // });

            //debemos hacerlo con un objeto o literal como payload
            const token = jwt.sign({userFound},jwtSecret,{
                expiresIn:86400
            });        
            
            res.json({
                auth:true,
                token:token
            })

        } catch (error) {
            res.send(error.message)
        }

    },

}