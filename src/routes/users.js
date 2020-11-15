const express = require('express');
const router = express.Router();
const userSchema = require('../schemas/users');
const validate = require('../middlewares/validateData');

const {
 signIn,signUp

} = require('../controllers/users')


router.post('/signUp', validate(userSchema) , signUp);

router.post('/signIn', validate(userSchema) , signIn);



module.exports = router;