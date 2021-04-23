var express = require('express');
var collegeRouter = express.Router();
const College = require('../models/college');

collegeRouter
.get('/list', async (req, res, next) => {
    try {
        let collegeObject = await College.find({}).exec();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(collegeObject);
    } catch (error){
        return next(error);
    }
})
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
})
.get('/simillar/:collegeid', async (req, res, next) => {
    try {
        let firstCollegeObject = await College.find({ "_id": req.params.collegeid }).exec();
        let simillarCollegeListWithFirstCollege = await College.find({"state": firstCollegeObject[0].state});
        let simillarCollegeList = simillarCollegeListWithFirstCollege.filter(item => item._id != req.params.collegeid);
        // let firstCollegeObject = await College.find({ "_id": {$in:req.params.stateName} }).exec();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(simillarCollegeList);
    } catch (error){
        return next(error);
    }
})
.get('/course/:courseName', async (req, res, next) => {
    try {
        let collegeObject = await College.find({ "courses": {$in:req.params.courseName} }).exec();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(collegeObject);
    } catch (error){
        return next(error);
    }
})
.get('/state/:stateName', async (req, res, next) => {
    try {
        let collegeObject = await College.find({ "state": {$in:req.params.stateName} }).exec();
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




