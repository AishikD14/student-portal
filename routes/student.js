const router = require('express').Router();
var students = require('../database');

router.route('/').get((req,res) => {
    res.json(students);
});

router.route('/:id').get((req,res) => {
    const id = req.params.id;
    const student = students.find((student) => student.id == id);
    res.json(student);
});

router.route('/update').post((req,res) => {
    const student = req.body;
    const index = students.findIndex((element) => element.id == student.id);
    students[index] = student;
    res.json("updated student");
});

router.route('/delete/:id').delete((req,res) => {
    const id = req.params.id;
    students = students.filter(student => student.id != id);
    res.json("deleted student");
});

router.route('/add').post((req,res) => {
    const student = req.body;
    const newId = students.length ? students[students.length-1].id + 1 : 1;
    var newStudent = student;
    newStudent["id"] = newId;
    students.push(newStudent);
    res.json(newStudent);
});

module.exports = router;