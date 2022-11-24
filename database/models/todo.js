'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User, {
        foreignKey: 'userId',
      })
    }
  }
  Todo.init({
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references:  {
        key: 'id',
        model: 'Todo',
      },
      allowNull: true,
      defaultValue: null,
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }
  }, {
    sequelize,
    modelName: 'Todo',
    paranoid: true, // soft deletion 
  });
  return Todo;
};