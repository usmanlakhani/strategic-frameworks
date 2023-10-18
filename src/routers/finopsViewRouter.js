import express from 'express';

const finopsViewRouter = express.Router();

finopsViewRouter.route('/').get((req,res) => {
    res.render('finops');
});

module.exports = finopsViewRouter;