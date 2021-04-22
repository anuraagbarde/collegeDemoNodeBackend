var express = require('express');
var chartDataRouter = express.Router();
const College = require('../models/college');


chartDataRouter
    .get('/list/StatesvsCount', async (req, res, next) => {
        try {
            // This can be made more effecient by using model.aggregate TO-DO https://stackoverflow.com/q/41791015/10630458
            let stateList = await College.find().distinct("state").exec();

            const getCountData = async (stateList) => {
                return Promise.all(stateList.map(item => College.countDocuments({ state: item }).exec()))
            }

            getCountData(stateList).then(countDataList => {
                let stateNameWithCountList = [];
                stateList.map((stateName, idx) => {
                    let localStateNameWithCount = [];
                    localStateNameWithCount.push(stateName);
                    localStateNameWithCount.push(countDataList[idx]);
                    stateNameWithCountList.push(localStateNameWithCount);
                });
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(stateNameWithCountList);
            }).catch(err => { next(err); });

        } catch (error) {
            return next(error);
        }
    })
    .get('/list/CoursesvsCount', async (req, res, next) => {
        try {
            // This can be made more effecient by using model.aggregate TO-DO https://stackoverflow.com/q/41791015/10630458
            let coursesList = await College.find().distinct("courses").exec();

            const getCountData = async (coursesList) => {
                return Promise.all(coursesList.map(item => College.countDocuments({ "courses": {$in:item} }).exec()))
            }

            getCountData(coursesList).then(countDataList => {
                let collegeNameWithCountList = [];
                coursesList.map((courseName, idx) => {
                    let localCourseNameWithCount = [];
                    localCourseNameWithCount.push(courseName);
                    localCourseNameWithCount.push(countDataList[idx]);
                    collegeNameWithCountList.push(localCourseNameWithCount);
                });
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(collegeNameWithCountList);
            }).catch(err => { next(err); });

        } catch (error) {
            return next(error);
        }
    });

module.exports = chartDataRouter;




