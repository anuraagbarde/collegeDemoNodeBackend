var express = require('express');
var studentRouter = express.Router();
const Student = require('../models/student');

// https://zellwk.com/blog/async-await-express/
function runAsyncWrapper(callback) {
    return function (req, res, next) {
        callback(req, res, next)
            .catch(next)
    }
}

studentRouter
.get('/name/:studentName', async (req, res, next) => {
    try {
        let studentObject = await Student.find({ "name": req.params.studentName }).exec();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(studentObject);
    } catch (error){
        return next(error);
    }
})
.get('/id/:studentid', async (req, res, next) => {
    try {
        let studentObject = await Student.find({ "_id": req.params.studentid }).exec();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(studentObject);
    } catch (error){
        return next(error);
    }
});


studentRouter.post('/', async (req, res, next) => {
    try {
        let studentObject = Student.create(req.body);
        res.status(200).json(studentObject);
    } catch(error){
        return next(error);
    }

});

module.exports = studentRouter;