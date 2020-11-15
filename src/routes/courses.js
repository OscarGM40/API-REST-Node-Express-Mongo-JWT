const express = require('express');
const router = express.Router();
const courseSchema = require('../schemas/courses');
const validate = require('../middlewares/validateData');
/*validate es una funcion que recibe un argumento schema */
const {
    getAll,
    createOne,
    updateOne,
    deleteOne,
    assignTeacher,
    removeTeacher,
} = require('../controllers/courses')


router.get('/', getAll);
router.post('/', validate(courseSchema),createOne);
router.put('/:id', validate(courseSchema),updateOne);
router.put('/assignTeacher/:id',assignTeacher);
router.put('/removeTeacher/:id',removeTeacher);
router.delete('/:id', deleteOne);

module.exports = router;