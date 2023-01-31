const {Superpower} =require('../models');


module.exports.getSuperpowerInstance = async (req, res, next) =>{
    try {
        const {body:{superName}}  = req;
        const array = {};
        for (let i = 0; i < superName.length; i++) {
            array.superName = superName[i]
            const superpower = await Superpower.findOne({where:array});
            console.log(superpower);
        if (superpower) {
            req.superpowerInstance = superpower;
        }else {
            const result = await Superpower.create(array);
            req.superpowerInstance = superpower;
        }
    }
    next()
    } catch (error) {
        next (error);
    }
}




// module.exports.getSuperpowerInstance = async (req, res, next) =>{
//     try {
//         const {body:{superName}}  = req;
//         console.log(superName)
//         const powerInstanceArray = [];
//         console.log(powerInstanceArray);
//         superName.forEach (async (power) => {
//                 console.log(power)
//                 let superName = await Superpower.findOne({
//                     where:{
//                         name: power}
//                 });
//         if (!superName) {
//             consol.log(superName)
//             superpowerInstance = await Superpower.create(power);
//         }
//             powerInstanceArray.push(superpowerInstance) 
               
        
//     } );
//     req.superpowers = powerInstanceArray
//     next()
//     } catch (error) {
//         next (error);
//     }
// }
