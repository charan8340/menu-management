const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Category = sequelize.define('Category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  tax_applicable: { type: DataTypes.BOOLEAN },
  tax: { type: DataTypes.FLOAT },
  tax_type: { type: DataTypes.STRING },
}, {
  tableName: 'Categories',
  timestamps: true,
});

module.exports = Category;
