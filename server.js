const express = require('express');
const app = new express();
const { port } = require('./config');
const courseRoutes = require('./src/routes/courses');
const studentRoutes = require('./src/routes/students');
const teacherRoutes = require('./src/routes/teachers');
const userRoutes = require('./src/routes/users');
const validateToken = require('./src/middlewares/validateAuth');

app.use(express.json());

//app.use(validateToken) <- otra Forma en vez de repetirla ↓↓ como aqui
app.use('/courses', validateToken , courseRoutes);
app.use('/students', validateToken , studentRoutes);
app.use('/teachers', validateToken , teacherRoutes);
app.use('/users', validateToken , userRoutes);

app.listen(port, () => { 
    console.log("Server listening on port %s", port);
});