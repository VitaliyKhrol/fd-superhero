const { Superhero, Image, Superpower } = require('../models/index');

module.exports.createSuperhero = async (req, res, next) => {
    try {
        const { body } = req;
        console.log(body);
        const result = await Superhero.create(body);
        res.status(201).send(result);
    } catch (error) {
        next(error);
    }
}

module.exports.getOneSuperheroWithSuperpower = async (req, res, next) => {
    try {
        const {params:{superheroId}} = req;
        const superheroWithSuperpowers = await Superhero.findByPk(superheroId, {
                        include: [{
                            model: Superpower
                        },
                    {
                        model: Image
                    }],
                    })
        res.status(200).send(superheroWithSuperpowers);
    } catch (error) {
        next(error);
    }
}


module.exports.getAllSuperhero = async (req, res, next) => {
    try {
        const { pagination } = req;
        console.log(pagination);
        const allSuperhero = await Superhero.findAll({
            ...pagination,
        });
        res.status(200).send(allSuperhero);
    } catch (error) {
        next(error)
    }
}

module.exports.deleteSuperhero = async (req, res, next) => {
    try {
        const { superheroInstance: { id } } = req;
        console.log(id);
        const deletedSuperhero = await Superhero.destroy({
            where: {
                id: id
            }
        });
        if (deletedSuperhero) {
            res.status(200).send()
        }
        else {
            res.status(404)
        }
    } catch (error) {
        next(error);
    }
}

module.exports.createImageAndUpdateSuperhero = async (req, res, next) => {
    try {
        
        const { superheroInstance, files, body } = req;
        files.forEach(async (i) => {
            const result = await superheroInstance.createImage({imagePath:i.filename});
        });
        const result2 = await superheroInstance.update(body);
        res.status(200).send(result2);
    } catch (error) {
        next(error);
    }
}


module.exports.createSuperpowerAndUpdateSuperhero = async (req, res, next) => {
    try {
        const { superheroInstance, body, body:{superName},params:{ superheroId }  } = req;
        console.log({superName});
        const array = {};
        for (let i = 0; i < superName.length; i++) {
            array.superName = superName[i]
            const pow = await Superpower.findOne({where:array});
            const powerInstance = await Superpower.findByPk(pow.id);
            const heroInstance = await Superhero.findByPk(superheroId);
            const resHero = await superheroInstance.update(body);
            const resPower = await powerInstance.addSuperhero(heroInstance);
        }
        res.status(200).send();
    } catch (error) {
        next(error);
    }
}



// module.exports.createSuperpowerAndUpdateSuperhero = async (req, res, next) => {
//     try {
//         const { superheroInstance, body, body: { superName }, params: { superheroId } } = req;
//         // console.log({superName});
//         const s = {};
//         for (let i = 0; i < superName.length; i++) {
//             s.superName = superName[i]
//             console.log(s)
//             const pow = await Superpower.findOne({where:s});
//             console.log(pow);
//             if (pow === null) {
//                 console.log('Not found!');
//                 const r = await Superpower.create(s);
//                 console.log(r.id)
//                 const powerInstance = await Superpower.findByPk(r.id);
//                 const heroInstance = await Superhero.findByPk(superheroId);
//                 const result = await powerInstance.addSuperhero(heroInstance);
//             } else {
//                 console.log(pow.id);
//                 const powerInstance = await Superpower.findByPk(pow.id);
//                 const heroInstance = await Superhero.findByPk(superheroId);
//                 const result = await powerInstance.addSuperhero(heroInstance);
//             }
//         }
//         res.status(200).send();
//     } catch (error) {
//         next(error);
//     }
// }

// module.exports.createImageAndUpdateSuperhero = async (req, res, next) => {
//     try {

//         const { superheroInstance, files, body } = req;

//         const result = await superheroInstance.createImage({imagePath: files[0].filename });
//         const result2 = await superheroInstance.update(body);

//         res.status(200).send(result2);
//     } catch (error) {
//         next(error);
//     }
// }

