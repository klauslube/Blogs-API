'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BlogPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      published: {
        allowNull: false,
        type: Sequelize.DATE,
       defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()'),
      },
      updated: {
        allowNull: false,
        type: Sequelize.DATE,
       defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()'),
      }
    },
    {
      timestamps: false,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BlogPosts');
  }
};
