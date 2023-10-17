//const express = require ('express');
//const chalk = require ('chalk');

import express from 'express';
import chalk from 'chalk';
import debug from 'debug';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 3000;
const app = express();
const bugCheck = debug('index');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const finopsViewRouter = express.Router();

app.use(morgan('combined')); // replace combined with tiny if you want less console printout
//app.use(express.static(path.join(__dirname,'/public/')));
app.use(express.static('static'));

app.set('views','./src/views');
app.set('view engine','ejs');


app.get('/',(req,res)=> {
    res.render('index');
});

finopsViewRouter.route('/').get((req,res) => {
    res.render('finops');
});



app.use('/finops', finopsViewRouter);

app.listen(PORT,() => {
    bugCheck(`listening on port ${chalk.green(PORT)}`);
});