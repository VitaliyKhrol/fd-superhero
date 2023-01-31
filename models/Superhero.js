'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Superhero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Superhero.hasMany(models.Image, {
        foreignKey: 'superheroId'
      });
      Superhero.belongsToMany(models.Superpower, {
        through: 'superhero_to_superpower',
        foreignKey: 'superheroId'
      });
    }
  }
  Superhero.init({
    nickName: {
      field:'nick_name',
      type: DataTypes.STRING,
      allowNull:false
    },
    realName: {
      field:'real_name',
      type: DataTypes.STRING,
      allowNull:false
    },
    originDescription: {
      field:'origin_description',
      type:DataTypes.STRING,
    
    },
    catchPhrase:{
      field: 'catch_phrase',
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Superhero',
    tableName: 'superheros',
    underscored:true
  });
  return Superhero;
};