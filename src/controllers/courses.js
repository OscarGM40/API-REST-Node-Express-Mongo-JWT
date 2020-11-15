const { mongo : {coursesModel}} = require('../../databases');

module.exports = {
    getAll: async (req,res) => {
         await coursesModel.find()
        .populate('teachers')
        .exec((err,courses) => {
            if(courses.length != 0){
                res.json(courses);
           } else {
               res.status(204).send("No hay cursos que mostrar aún!")
           }
        });    
    },
    createOne: async (req,res) => {
        const {name} = req.body;
        const newCourse = new coursesModel({
            name,            
        });
        await newCourse.save();
        res.json(`${name} saved!`);
    },
    updateOne: async (req,res) => {

        const { id } = req.params;
        const { name} = req.body;
        const returnValue  = await coursesModel.findByIdAndUpdate(id,{$set:{name}},{new:true});
        console.log(returnValue);

        res.send(`${name} updated`);
    },
    deleteOne: async (req,res)=> {
        const { id } = req.params;
        const removed = await coursesModel.findByIdAndDelete(id);

        res.send(`${removed.name} deleted `);
    },
    assignTeacher: async (req,res) => {
        const{ id } = req.params;
        const { teacher } = req.body;

       const courseUpdated = await coursesModel.findByIdAndUpdate(id,{
            $push:{teachers:teacher}
        });

        res.send(`${courseUpdated.name} updated with a teacher`);
    },
    removeTeacher: async (req,res) => {
        const { id } = req.params;
        const { teacher } = req.body;

        const courseUpdated = await coursesModel.findByIdAndUpdate(id,{
            $pull:{teachers:teacher}
        });
        res.send(`deleted a teacher for ${courseUpdated.name}`);
    }
    
};