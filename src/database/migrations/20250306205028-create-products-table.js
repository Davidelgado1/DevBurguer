module.exports = {
    async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products', { 
      
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      category: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      path: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      });

  },

  async down (queryInterface,) {
     await queryInterface.dropTable('products');
  }
};
