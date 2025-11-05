const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SubCategory = sequelize.define('SubCategory', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  tax_applicable: { type: DataTypes.BOOLEAN, defaultValue: false },
  tax: { type: DataTypes.FLOAT, defaultValue: 0 },
  // categoryId will be added by association (keeps column name consistent)
  categoryId: { type: DataTypes.INTEGER, allowNull: true }
}, {
  tableName: 'SubCategories',
  timestamps: true,
});

module.exports = SubCategory;
