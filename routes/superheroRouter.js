const {Router} = require ('express');
const SuperheroController = require('../controllers/superheroes.controller');
const {getSuperheroInstance}  = require('../middlewares/getSuperheroInstance ');
const {getSuperpowerInstance}  = require('../middlewares/getSuperpowerInstance');
const {pagination} = require('../middlewares/pagination');
const multer = require('multer');
const path = require ('path');

const imagePath = path.resolve(__dirname, '../public/images');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb (null, imagePath)
    },
    filename: function (req, file, cb) {
        cb(null,`${Date.now()}.${file.originalname}`)
      }
    
})
const upload = multer({storage});

const superheroRouter = Router();

superheroRouter.post('/', SuperheroController.createSuperhero);
superheroRouter.get('/:superheroId', getSuperheroInstance , SuperheroController.getOneSuperheroWithSuperpower);
superheroRouter.get('/', pagination, SuperheroController.getAllSuperhero);
superheroRouter.delete('/:superheroId',getSuperheroInstance, SuperheroController.deleteSuperhero);
superheroRouter.patch('/:superheroId', upload.any('imageImage'), getSuperheroInstance, SuperheroController.createImageAndUpdateSuperhero);
superheroRouter.put('/:superheroId', getSuperheroInstance,getSuperpowerInstance, SuperheroController.createSuperpowerAndUpdateSuperhero );

module.exports = superheroRouter;