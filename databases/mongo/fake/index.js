const faker = require('faker');
const { studentsModel } = require('../')

module.exports = async () => {
    for (let i = 0; i < 5; i++) {

        const newStudent = new studentsModel({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            age: faker.random.number(50),
        });
        console.log(newStudent);
        await newStudent.save();
    }
};