const config = require('../config/config.json');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: config.development.dialect,
  logging: false,

});
const Image = sequelize.define("Image", {
  public_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  userId:{
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

Image.associate = (models) => {
  Image.hasMany(models.Comment, {
    foreignKey: 'ImagePublicId',
  });
};

Image.associate = (models) => {
  Image.belongsTo(models.user, {
    foreignKey: 'userId',
  });
};

module.exports = Image;