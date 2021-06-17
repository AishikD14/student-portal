const router = require('express').Router();
let Student = require('../models/student.model');

router.route('/').get((req,res) => {
    Student.find()
        .then(students => {
            res.json(students);
        })
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/login').post((req,res) => {
    const name = req.body.userName;
    const password = req.body.password;
    if(name=="test" && password=="12345"){
        res.json({"success": true, "name": "Aishik Deb"});
    }
    else{
        res.json({"success": false});
    }
});

router.route('/:id').get((req,res) => {
    const filterId = req.params.id;
    Student.findOne({ id: filterId }, 'id name address school subject score')
        .then(student => {
            if(!student){
                res.status(204).json({'message': 'Failed'});
            }
            else{
                res.json(student);
            }
        })
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/update').post((req,res) => {
    const updatedStudent = req.body;
    Student.findOne({ id: updatedStudent.id })
        .then(student => {
            if(!student){
                res.json({'message': 'Failed'});
            }
            else{
                student.name = updatedStudent.name;
                student.address = updatedStudent.address;
                student.school = updatedStudent.school;
                student.subject = updatedStudent.subject;
                student.score = updatedStudent.score;
                student.save()
                    .then(() => {
                        res.json({"message": "Success"});
                    })
                    .catch(err => res.status(400).json('Error:' + err));
            }
        })
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/delete/:id').delete((req,res) => {
    const deleteId = req.params.id;
    Student.deleteOne({ id: deleteId })
        .then(() => {
            res.json({"message": "Success"});
        })
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/add').post((req,res) => {
    const student = req.body;
    Student.find()
        .then(students => {
            const newId = students[students.length-1].id + 1;
            const newStudent = new Student({ id: newId, name: student.name, address: student.address, school: student.school, subject: student.subject, score: student.score });
            console.log(newStudent);

            newStudent.save()
                .then(() => res.status(201).json({
                    "message": "Success"
                }))
                .catch(err => res.status(400).json('Error:' + err));
        })
        .catch(err => res.status(400).json('Error:' + err));
});

module.exports = router;