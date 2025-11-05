const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Category = sequelize.define('Category', {
  name: { type: DataTypes.STRING, allowNull: false },
  imageUrl: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  taxApplicable: { type: DataTypes.BOOLEAN, defaultValue: false },
  taxRate: { type: DataTypes.FLOAT },
  taxType: { type: DataTypes.STRING }
}, {
  tableName: 'categories',
  timestamps: true,
});

module.exports = Category;
