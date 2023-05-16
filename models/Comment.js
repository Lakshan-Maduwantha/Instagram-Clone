const config = require('../config/config.json');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: config.development.dialect,
  logging: false,

});

const Comment = sequelize.define("Comment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imagePublicId:{
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Comment.associate = (models) => {
  Comment.belongsTo(models.Image, {
    foreignKey: 'imagePublicId'
  });
};


module.exports = Comment;