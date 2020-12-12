const express = require('express');
const router = express.Router();
const Joi = require('joi');

const courses = [
    {id: 1 , name: 'course1'},
    {id: 2 , name: 'course2'},
    {id: 3 , name: 'course3'}
]

router.get('/', (req, res) => {
    res.send(courses)
})

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('course not found');
    return;
    res.send(course)
})

//POST, create new course
router.post('/', (req, res) => {
    //validate name of new course
    //if not correct 404 status
    const {error} = courseValidate(req.body)
    if(error){
        res.status(404).send(error.details[0].message)
        return;
    }

    //save new course
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(courses);
})

// PUT , update name of course by id
router.put('/:id', (req, res) => {
    //find ID course
    //if not found status 404 not found
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send(`ID not found`);
        return;
    }
    //validate name of course update
    //if not correct 404 status

    const {error} = courseValidate(req.body)
    if(error){
        res.status(404).send(error.details[0].message)
        return;
    }

    //update name
    //print new info about update
    course.name =req.body.name;
    res.send(course)

    
})
function courseValidate(course){
    schema = Joi.object({
        name : Joi.string().min(3).required() 
    });
    return schema.validate(course);
}

module.exports = router;