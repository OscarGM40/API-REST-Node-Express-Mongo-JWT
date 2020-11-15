const express = require('express');
const router = express.Router();
const teacherSchema = require('../schemas/teachers');
const validate = require('../middlewares/validateData');

const {
    getAll,
    createOne,
    updateOne,
    deleteOne,
    getCourses
} = require('../controllers/teachers')


router.get('/', getAll)
router.get('/getCourses',getCourses);
router.post('/', validate(teacherSchema) , createOne);
router.put('/:id', validate(teacherSchema) ,updateOne);
router.delete('/:id', deleteOne);



module.exports = router;