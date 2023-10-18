import express from 'express';

const finopsEditRouter = express.Router();

finopsEditRouter.route('/').get((req,res) => {
    res.render('finopsedit')
});

