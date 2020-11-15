const { mongo: { studentsModel } } = require('../../databases');

module.exports = {

    getAll: async (req, res) => {
        const students = await studentsModel.find().populate('courses');

        if (students.length !== 0) {
            res.json(students);
        } else {
            res.status(204).json("No hay estudiantes que mostrar!")
        }
    },

    createOne: async (req, res) => {
        const { firstName, lastName, age } = req.body;

        const newStudent = await studentsModel.create(
            { firstName, lastName, age }
        )
        res.json(`${newStudent.firstName} created`);
    },
    updateOne: async (req, res) => {

        const { id } = req.params;
        const { firstName, lastName, age } = req.body;

        const updatedStudent = await studentsModel.findByIdAndUpdate(id, {
            $set: { firstName, lastName, age, updatedBy:req.userData._id }
        }, { new: true })
       // console.log(updatedStudent);
        res.json(`${updatedStudent.firstName} updated `);
    },
    deleteOne: async (req, res) => {
        const { id } = req.params;
        const deletedStudent = await studentsModel.findByIdAndRemove(id);

        res.json(`${deletedStudent.firstName} deleted`);
    },
    assignCourse: async (req, res) => {
        const { id } = req.params;
        const { course } = req.body;

        const assignCourse = await studentsModel.findByIdAndUpdate(id, {
            $push: { courses: course }
        });

        res.json(`${assignCourse.firstName} updated with a new course`);
    },
    removeCourse: async (req, res) => {
        const { id } = req.params;
        const { course } = req.body;

        const removedCourse = await studentsModel.findByIdAndUpdate(id, {
            $pull: { courses: course }
        });

        res.json(`${removedCourse.firstName} updated without a course`)
    },

    count: async (req, res) => {
        const total = await studentsModel.find().count()
        res.json({ total })
    },
    getByfirstName: async (req, res) => {
        const { firstName } = req.query;
        const studentsFound = await studentsModel.find({
            firstName: { $eq: firstName },
        })
        res.json(studentsFound)
    },
    getStudentsAgeGreaterThan: async (req, res) => {
        const { age } = req.query;
        const studentsFound = await studentsModel.find({
            age: { $gte: age }
        }).limit(3);
        res.json(studentsFound)
    },
    orderByAge : async (req, res) => {
        const studentsFound = await studentsModel.find({
        }).sort({age:1}).skip(1)
        res.json(studentsFound)
    },
    // exists : async (req, res) => {
    //     const studentsExists = await studentsModel.find({
    //         createdAt:{$exists:true}
    //     }).sort({age:-1}).skip(3);
    //     res.json(studentsExists)
    // }

    getStudentsByCourse: async (req, res) => {

        const {courseName} = req.query;
        
        await studentsModel.find({courses:{$not:{$size:0}}}).populate({path:'courses',match:{name:courseName}}).exec((error,students)=> {
            if(error) {console.log(error)
               return res.send(error.message)
            }
            const studentsByCourse = students.filter(
                student => student.courses.length > 0
            )
            res.json(studentsByCourse);
        });       
        
}

};