const bcrypt = require('bcrypt');
const {saltRounds} = require('../config')

const genSalt = async () => {
    return await bcrypt.genSalt(+saltRounds)
}

const encryptPassword = async(password) => {
    const salt = await genSalt();
    console.log(salt)
    return await bcrypt.hash(password,salt)
}

const comparePassword = async (passwordFromClient,encryptedPassword)=> {
    return await bcrypt.compare(passwordFromClient,encryptedPassword);
}

module.exports = {encryptPassword,genSalt,comparePassword};