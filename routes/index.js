const {Router} = require ('express');
const superheroRouter = require('./superheroRouter');


const rootRouter = Router();
rootRouter.use('/superheros',superheroRouter);


module.exports = rootRouter;
