const {Superhero} =require('../models');

module.exports.getSuperheroInstance = async (req, res, next) =>{
    try {
        const {params:{superheroId}} = req;
        const superhero = await Superhero.findByPk(superheroId);
        if (superhero) {
            req.superheroInstance = superhero;
            next();
        }else {
            res.status(404).send({error:'No SUPERHEROS'})
        }
    } catch (error) {
        next (error);
    }
}