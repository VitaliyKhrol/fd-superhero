'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
       await queryInterface.createTable('superhero_to_superpower', {
         id: {
          allowNull:false,
          autoIncrement: true,
          type: Sequelize.INTEGER,
          primaryKey:true
        },
        superpowerId:{
          field:'superpower_id',
          type:Sequelize.INTEGER,
          allowNull:false,
          references:{
            model:'superpowers',
            key:'id'
          }
        },
        superheroId:{
          field:'superhero_id',
          type:Sequelize.INTEGER,
          allowNull:false,
          references:{
            model:'superheros',
            key:'id'
          }
        },
        createdAt: {
          field:'created_at',
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          field: 'updated_at',
          allowNull: false,
          type: Sequelize.DATE
        }

      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('superpowers_to_images');
    
  }
};
