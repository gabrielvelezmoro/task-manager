module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'tasks',
        {
          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
          },
          titulo: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          descricao: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          data_da_atividade: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          status: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          data_criacao: {
            type: Sequelize.DATE,
          },
          data_atualizacao: {
            type: Sequelize.DATE,
          },
        },
        { transaction },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: queryInterface => {
  
    return queryInterface.dropTable('tasks');
  },
};
