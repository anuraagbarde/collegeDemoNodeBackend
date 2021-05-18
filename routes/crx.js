var express = require('express');
var crxRouter = express.Router();

crxRouter.post('/name', async (req, res, next) => {
    try {
        let responseObj = {
            "customGreeting" : "Hello, " + req.body.personName + " This message was created in the backend!"
        }
        res.status(200).json(responseObj);
    } catch(error){
        return next(error);
    }

});

// test 11:49

module.exports = crxRouter;