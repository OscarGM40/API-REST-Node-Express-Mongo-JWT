const { mongo:
    { teachersModel,
        coursesModel
    }, } = require('../../databases')

module.exports = {
    getAll: async (req, res) => {
        const teachers = await teachersModel.find();
        res.json(teachers);
    },
    createOne: async (req, res) => {

        const { firstName:nombre, lastName:apellido, age:edad } = req.body;
        //Forma 1 con JS NO USAR, es para peña prehistoric
        // const newTeacher = new teachersModel();
        //     newTeacher.firstName = firstName;
        //     newTeacher.lastName = lastName;
        //     newTeacher.age = age;
        // await newTeacher.save();

        //Forma 2 ojo,se llaman igual .Mejor con Create()¿?
        const newTeacher = new teachersModel({
            firstName:nombre,
            lastName:apellido,
            age:edad,
        })
        await newTeacher.save();

        res.json(`${newTeacher.firstName} created`);
    },
    updateOne: async (req, res) => {
        const { id } = req.params;
        const { firstName, lastName, age } = req.body;
        const updatedTeacher = await teachersModel.findByIdAndUpdate(id,{
            $set:{firstName, lastName, age}
        },{new:true});
        res.json(`${updatedTeacher.firstName} updated`);
    },
    deleteOne: async (req, res) => {
        const { id} = req.params;
        const deletedTeacher = await teachersModel.findByIdAndRemove(id);
        res.json(`${deletedTeacher.firstName} deleted`);
    },
    getCourses: async (req, res) => {
        const {teacherName } = req.query;

        await coursesModel.find({teachers:{$not:{$size:0}}})
        .populate({path:'teachers',match:{firstName:teacherName}})
        .exec((error,courses) => {
            if(error){
                console.log(error);
                return res.send(error.message);
            }
            const teachersCourses = courses.filter(
                (course) => course.teachers.lenght > 0
            );

            res.json(courses)
        })
    }
};