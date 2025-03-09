import { Sequelize, Model, DataTypes } from 'sequelize';

class Cars extends Model {
  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.UUIDV4,
          allowNull: false,
        },
        titulo: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        descricao: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        data_da_atividade: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        data_de_criacao: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        data_de_atualizacao: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: 'cars',
        sequelize,
      },
    );

    return this;
  }
}

export default Cars;
