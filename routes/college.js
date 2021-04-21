var express = require('express');
var collegeRouter = express.Router();
const College = require('../models/college');

// https://zellwk.com/blog/async-await-express/
function runAsyncWrapper(callback) {
    return function (req, res, next) {
        callback(req, res, next)
            .catch(next)
    }
}


collegeRouter
.get('/name/:collegeName', async (req, res, next) => {
    try {
        let collegeObject = await College.find({ "name": req.params.collegeName }).exec();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(collegeObject);
    } catch (error){
        return next(error);
    }
})
.get('/id/:collegeid', async (req, res, next) => {
    try {
        let collegeObject = await College.find({ "_id": req.params.collegeid }).exec();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(collegeObject);
    } catch (error){
        return next(error);
    }
});

collegeRouter.post('/', async (req, res, next) => {
    try {
        let collegeObject = College.create(req.body);
        res.status(200).json(collegeObject);
    } catch(error){
        return next(error);
    }

});

module.exports = collegeRouter;




