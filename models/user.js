const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('instagram', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',

});

const User = sequelize.define('users', {
  _id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  profile_picture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  followers: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
  following: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },

  created_at: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  updated_at: {
    type: Sequelize.DATE,
    allowNull: true,
  },


}, {
  // Define additional options for the model
  underscored: true, // use snake_case for table names
});

User.associate = (models) => {
  User.hasMany(models.Image, {
    foreignKey: 'userId',
  });
};

module.exports = User;
