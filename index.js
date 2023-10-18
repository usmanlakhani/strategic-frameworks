
//**Imports */
import express from 'express';
import chalk from 'chalk';
import debug from 'debug';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';


// *** basic configurations and instance creation ***//
const PORT = process.env.PORT || 3000;
const app = express();
const bugCheck = debug('index');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//*** Create constant variables to hold Routers for each page */
const finopsViewRouter = express.Router();
const finopsEditRouter = express.Router();
const devSecOpsViewRouter = express.Router();
const empexpViewRouter = express.Router();

// *** Middleware *** //
app.use(morgan('tiny')); // replace combined with tiny if you want less console printout
app.use(express.static('static'));
app.use('/finops', finopsViewRouter);
app.use('/finopsedit', finopsEditRouter);
app.use('/devsecops',devSecOpsViewRouter);
app.use('/empexp',empexpViewRouter);

//** Rendering and Templating***//
app.set('views','./src/views');
app.set('view engine','ejs');

//*** Routing Rules ***//
app.get('/',(req,res)=> {
    res.render('index');
});

finopsViewRouter.route('/').get((req,res) => {
    res.render('finops')
});

finopsEditRouter.route('/').get((req,res) => {
    res.render('finopsedit');
});

devSecOpsViewRouter.route('/').get((req,res) => {
    res.render('devsecops');
});

empexpViewRouter.route('/').get((req,res) => {
    res.render('empexp');
});


//** Console printout for debug info ***//
app.listen(PORT,() => {
    bugCheck(`listening on port ${chalk.green(PORT)}`);
});