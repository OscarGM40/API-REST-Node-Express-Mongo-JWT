const express = require('express');
const router = express.Router();
const studentSchema = require('../schemas/students');
const validate = require('../middlewares/validateData');
//en vez de validar una por una se puede hacer desde el index
// const validateToken = require('../middlewares/validateAuth');


const {
    getAll,
    createOne,
    updateOne,
    deleteOne,
    assignCourse,
    removeCourse,
    count,
    getByfirstName,
    getStudentsAgeGreaterThan,
    orderByAge,
    getStudentsByCourse
} = require('../controllers/students')


router.get('/',getAll);
router.get('/count', count);
router.get('/getByfirstName', getByfirstName);
router.get('/getStudentsAgeGreaterThan', getStudentsAgeGreaterThan);
router.get('/orderByAge', orderByAge);
router.get('/getStudentsByCourse',getStudentsByCourse);


router.post('/',validate(studentSchema), createOne)
router.put('/:id', validate(studentSchema),updateOne)
router.put('/assignCourse/:id', assignCourse)
router.put('/removeCourse/:id', removeCourse)
router.delete('/:id', deleteOne)

module.exports = router;